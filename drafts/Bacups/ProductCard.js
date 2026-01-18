// src/components/ProductCard.js

export default class ProductCard {
  constructor(data) {
    this.data = data;
    this.template = document.getElementById("productCardTemplate").content.cloneNode(true);
    this.cardElement = this.template.querySelector(".product-card");
    this.fillData();
  }

  fillData() {
    // Создание картинки
    this.cardElement.querySelector(".product-card__img").src = this.data.image;

    //  Создание названия
    this.cardElement.querySelector(".product-card__title").textContent = this.data.name;

    // Добавление старой цены
    let oldPriceEl = this.cardElement.querySelector(".product-card__old-number");
    if (this.data.price.old > 0) {
      oldPriceEl.textContent = this.data.price.old.toLocaleString("ru-RU");
    } else {
      oldPriceEl.parentElement.style.display = "none";
    }

    // Добавление новой цены
    this.cardElement.querySelector(".product-card__price-number").textContent =
      this.data.price.new.toLocaleString("ru-RU");

    // Добавление количества в разных городах
    let availability = this.data.availability;
    let counts = this.cardElement.querySelectorAll(".tooltip__count");
    counts.forEach((count, idx) => {
      count.textContent = availability[idx] || 0;
    });
  }

  appendTo(parentNode) {
    parentNode.appendChild(this.cardElement);
  }
}