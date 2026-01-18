// components/updateFilterCounts.js
import { fetchProducts } from './createCards.js';
import ProductCard from './ProductCard.js';
import setupTooltips from './tooltips.js';

// Функция для обновления счётчиков рядом с чекбоксами
export default async function updateFilterCounts() {
  const productsData = await fetchProducts();

  if (productsData.length === 0) {
    console.warn('Нет данных для обновления счётчиков!');
    return;
  }

  // Считаем количество товаров по категориям
  const categoryCountMap = {};

  productsData.forEach(product => {
    product.type.forEach(type => {
      categoryCountMap[type] = (categoryCountMap[type] || 0) + 1;
    });
  });

  // Обновляем счётчики на странице
  const filterCheckboxes = document.querySelectorAll('.custom-checkbox__count');

  filterCheckboxes.forEach(checkbox => {
    const inputField = checkbox.closest('.custom-checkbox').querySelector('input');
    const typeValue = inputField.value;

    checkbox.textContent = categoryCountMap[typeValue] || 0;
  });
}

// Функция для фильтрации товаров по наличию
export async function applyStockFilter() {
  const radioStatusInput = document.querySelector('input[name="status"]:checked');
  const statusValue = radioStatusInput ? radioStatusInput.value : 'all-item';

  const productsData = await fetchProducts();

  if (productsData.length === 0) {
    console.warn('Нет данных для фильтрации!');
    return;
  }

  // Фильтруем товары в зависимости от выбранного статуса
  const filteredProducts = statusValue === 'instock'
    ? productsData.filter(product => product.availability.moscow > 0 || product.availability.orenburg > 0 || product.availability.saintPetersburg > 0)
    : productsData;

  // Применяем фильтрацию по чекбоксам
  const finalFilteredProducts = applyCheckboxFilters(filteredProducts);

  // Перестраиваем список товаров на странице
  rebuildCatalog(finalFilteredProducts);
}

// Функция для фильтрации товаров по чекбоксам
function applyCheckboxFilters(products) {
  const activeCheckboxes = document.querySelectorAll('.custom-checkbox__field:checked');
  const selectedTypes = Array.from(activeCheckboxes).map(checkbox => checkbox.value);

  if (selectedTypes.length === 0) {
    return products; // Нет активных чекбоксов — возвращаем все товары
  }

  return products.filter(product => {
    return product.type.some(type => selectedTypes.includes(type)); // Оставляем товары, совпадающие с отмеченными категориями
  });
}

// Функция для сортировки товаров
export async function sortProducts() {
  const selectSortOption = document.querySelector('.catalog__sort-select');
  const sortType = selectSortOption.value;

  const productsData = await fetchProducts();

  if (productsData.length === 0) {
    console.warn('Нет данных для сортировки!');
    return;
  }

  // Сортируем товары
  let sortedProducts = [...productsData]; // Копируем массив, чтобы не испортить оригинал

  switch (sortType) {
    case 'price-min':
      sortedProducts.sort((a, b) => a.price.new - b.price.new);
      break;
    case 'price-max':
      sortedProducts.sort((a, b) => b.price.new - a.price.new);
      break;
    case 'rating-max':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  // Перестраиваем интерфейс
  rebuildCatalog(sortedProducts);
}

// Функция для сброса всех фильтров
export async function resetFilters() {
  // Сброс радио-кнопок статуса товаров
  const statusRadios = document.querySelectorAll('input[name="status"]');
  statusRadios.forEach(radio => {
    if (radio.value === 'all-item') {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  });

  // Сброс выпадающего списка сортировки
  const sortSelect = document.querySelector('.catalog__sort-select');
  sortSelect.selectedIndex = 0; // Ставим на первую позицию (по умолчанию)

  // Сброс чекбоксов фильтров
  const filtersCheckboxes = document.querySelectorAll('.custom-checkbox__field');
  filtersCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Обновляем интерфейс (получаем все товары)
  const productsData = await fetchProducts();
  rebuildCatalog(productsData);
}

// Функция для обновления интерфейса товаров
function rebuildCatalog(products) {
  const catalogContainer = document.querySelector('.catalog__list');

  // Очищаем текущий список товаров
  while (catalogContainer.firstChild) {
    catalogContainer.removeChild(catalogContainer.lastChild);
  }

  // Создаем карточки товаров
  products.forEach(product => {
    const catalogItemEl = document.createElement('li');
    catalogItemEl.classList.add('catalog__item');

    const card = new ProductCard(product);
    catalogItemEl.appendChild(card.cardElement);
    catalogContainer.appendChild(catalogItemEl);
  });

  // Устанавливаем тултипы после построения карточек
  setupTooltips();
}

// Обработчик события сброса фильтров
document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.querySelector('.catalog-form__reset');

  resetButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы
    await resetFilters(); // Сбрасываем фильтры
  });

  // Обработчики других событий
  const statusRadioInputs = document.querySelectorAll('input[name="status"]');
  const sortSelect = document.querySelector('.catalog__sort-select');

  statusRadioInputs.forEach(input => {
    input.addEventListener('change', applyStockFilter);
  });

  sortSelect.addEventListener('change', sortProducts);

  // Добавляем слушателей для чекбоксов
  const checkboxes = document.querySelectorAll('.custom-checkbox__field');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyStockFilter);
  });
});