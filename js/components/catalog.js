// js/components/catalog.js

import ProductCard from "./ProsuctCard.js";

// Функция для загрузки данных
async function fetchProducts() {
    try {
        let response = await fetch("./data/data.json");
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        let data = await response.json();
        return data;
    } catch (err) {
        console.error("Ошибка при получении данных:", err.message);
        return [];
    }
}

// Экспорт функции для рендеринга каталога
export default async function catalog() {
    let catalogEl = document.getElementById("catalogList");


    // Загрузка данных и создание карточек
    let productsData = await fetchProducts();

    // Рендеринг карточек
    productsData.forEach((product) => {
        let card = new ProductCard(product);
        let liEl = document.createElement("li");
        liEl.classList.add("catalog__item");
        card.appendTo(liEl);
        catalogEl.appendChild(liEl);
    });
}