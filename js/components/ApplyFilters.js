// components/ApplyFilters.js

import ProductCard from './ProductCard.js';

function applyFilters(data) {
  let formEl = document.getElementById('filterForm');
  let checkEls = formEl.querySelectorAll('.custom-checkbox__field');
  let inStockEl = document.getElementById('instock');
  let allItemEl = document.getElementById('all-item');
  let resetEl = document.getElementById('filterResetBtn');

  // Формирование активного списка фильтров
  let activeCategories = Array.from(checkEls).filter(cb => cb.checked).map(cb => cb.value);
  let stockFilter = inStockEl.checked ? 'instock' : 'all-item';

  // Фильтрация товаров
  let filteredProducts = data.filter(product => {
    // Проверка по категориям
    let matchesCategories = activeCategories.every(cat => product.type.includes(cat));

    // Проверка по доступности
    let matchesStock = stockFilter === 'all-item' ||
      (stockFilter === 'instock' && Object.values(product.availability).some(count => count > 0));

    return matchesCategories && matchesStock;
  });

  // Обновление DOM
  let catalogListEl = document.getElementById('catalogList');
  catalogListEl.innerHTML = ''; // Очищаем старый список карточек

  // Рендеринг новых карточек
  filteredProducts.forEach(product => {
    let card = new ProductCard(product);
    let liEl = document.createElement('li');
    liEl.classList.add('catalog__item');
    card.appendTo(liEl);
    catalogListEl.appendChild(liEl);
  });
}

// Функция для сброса фильтров
function resetFilters(data) {
  // Сброс чекбоксов
  let checkEls = document.querySelectorAll('.custom-checkbox__field');
  checkEls.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Сброс радиокнопок
  let radioEls = document.querySelectorAll('.custom-radio__field');
  radioEls.forEach(radio => {
    if (radio.value === 'all-item') {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  });

  // Повторная фильтрация
  applyFilters(data);
}

// Обработчики событий
function registerHandlers(data) {
  let formEl = document.getElementById('filterForm');
  let checkEls = formEl.querySelectorAll('.custom-checkbox__field');
  let inStockEl = document.getElementById('instock');
  let allItemEl = document.getElementById('all-item');
  let resetEl = document.getElementById('filterResetBtn');

  // Обработчики чекбоксов
  checkEls.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      applyFilters(data);
    });
  });

  // Обработчики радиокнопок
  inStockEl.addEventListener('change', () => {
    applyFilters(data);
  });

  allItemEl.addEventListener('change', () => {
    applyFilters(data);
  });

  // Обработчик сброса
  resetEl.addEventListener('click', () => {
    resetFilters(data);
  });
}

// Регистрация обработчиков один раз
function initialize(data) {
  registerHandlers(data);
}

export {
  applyFilters,
  resetFilters,
  initialize,
};
