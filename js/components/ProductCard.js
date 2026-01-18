// src/components/ProductCard.js
import { addToBasket } from './Basket.js'; // Импортируем функцию addToBasket
export default class ProductCard {
  constructor(data) {
    this.data = data;
    this.template = document.getElementById("productCardTemplate").content.cloneNode(true);
    this.cardElement = this.template.querySelector(".product-card");
    this.fillData();
    this.createToolTip();
    this.setupAddToBasket();
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

  createToolTip() {
    // Получение тултипа из шаблона
    let tooltip = this.cardElement.querySelector(".product-card__tooltip");

    let tooltipButton = tooltip.querySelector(".tooltip__btn");

    let content = tooltip.querySelector(".tooltip__content");

    //  Добавление данных в тултип
    let cities = [
      { key: "moscow", label: "Москва" },
      { key: "orenburg", label: "Оренбург" },
      { key: "saintPetersburg", label: "Санкт-Петербург" },
    ];

    let counts = content.querySelectorAll(".tooltip__count");
    counts.forEach((count, idx) => {
      count.textContent = this.data.availability[cities[idx].key] || 0;
    });

    // Обработчики событий для кнопки тултипа
    tooltipButton.addEventListener("mouseenter", () => {
      content.classList.add("tooltip__content--active");
    });

    tooltipButton.addEventListener("mouseleave", () => {
      content.classList.remove("tooltip__content--active");
    });
  }

  setupAddToBasket() {
    let addToBasketButton = this.cardElement.querySelector('.product-card__link.btn--icon');
    addToBasketButton.setAttribute('data-id', this.data.id);
    addToBasketButton.addEventListener('click', (event) => {
      event.preventDefault(); // Отменяем переход по ссылке
      this.addToBasket();
    });
  }

  addToBasket() {

    addToBasket(this.data);
  }

  appendTo(parentNode) {
    parentNode.appendChild(this.cardElement);
  }
}
