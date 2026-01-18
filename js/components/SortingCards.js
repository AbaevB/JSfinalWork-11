// components/SortingCards.js

import ProductCard from './ProductCard.js';
import fetchProducts from './FetchData.js';

export default async function sortingCards() {
  let sortingEl = document.getElementById('sorting');

  // Обработчик изменения селекта
  sortingEl.addEventListener('change', async () => {
    let sortOption = sortingEl.value;

    // Получение данных о товарах из JSON
    let products = await fetchProducts();

    // Сортировка товаров
    let sortedProducts = sortProducts(products, sortOption);

    // Обновление DOM
    let catalogListEl = document.getElementById('catalogList');
    catalogListEl.innerHTML = ''; // Очистка контейнера с карточками (шаблон вынесен для безопасности в body)

    // Отрисовка отсортированных карточек
    sortedProducts.forEach(product => {
      let card = new ProductCard(product);
      let liEl = document.createElement('li');
      liEl.classList.add('catalog__item');
      card.appendTo(liEl);
      catalogListEl.appendChild(liEl);
    });
  });

  // Функция для сортировки товаров
  function sortProducts(products, option) {
    switch (option) {
      case 'price-min': // Сначала дешевые
        return [...products].sort((a, b) => a.price.new - b.price.new);
      case 'price-max': // Сначала дорогие
        return [...products].sort((a, b) => b.price.new - a.price.new);
      case 'rating-max': // Сначала популярные
        return [...products].sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }
}
