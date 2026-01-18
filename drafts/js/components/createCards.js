// components/createCards.js
import ProductCard from "./ProductCard.js";

// Функция для получения данных из JSON
async function fetchProducts() {
  try {
    let response = await fetch("./data/data.json");
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Ошибка при получении данных:", err.message);
    return [];
  }
}

export default async function createProductCards() {
  let productsData = await fetchProducts();

  if (productsData.length === 0) {
    console.warn("Нет данных для построения карточек!");
    return;
  }

 
  let catalogContainer = document.querySelector(".catalog__list");

 // Цикл создания карточек
  productsData.forEach((product) => {
   
    let catalogItemEl = document.createElement("li");
    catalogItemEl.classList.add("catalog__item");

    let card = new ProductCard(product);

    catalogItemEl.appendChild(card.cardElement);

    catalogContainer.appendChild(catalogItemEl);
  });
}

export { fetchProducts };