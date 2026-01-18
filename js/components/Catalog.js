// components/Catalog.js

import ProductCard from './ProductCard.js';
import fetchProducts from './FetchData.js';

export default async function catalog() {
    // Получаем данные о товарах
    let products = await fetchProducts();


    // Обновляем DOM
    let catalogListEl = document.getElementById('catalogList');
    catalogListEl.innerHTML = '';

    let cards = [];
    // Создание карточек
    products.forEach(product => {
        let card = new ProductCard(product);
        let liEl = document.createElement('li');
        liEl.classList.add('catalog__item');
        card.appendTo(liEl);
        cards.push(card);
        catalogListEl.appendChild(liEl);
    });

    console.log(cards);
    return cards;
}
