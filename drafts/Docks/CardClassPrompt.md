# Вопрос по созданию класса  в JavaScript

В моем проекте имеется js класс для карточки товара, создающий карточку на основе тега <template>, имеющего такую разметку.
    
    ```html
    <template id="productCardTemplate">
                <div class="product-card">
                <div class="product-card__visual">
                  <img class="product-card__img" src="images/item-1.png" height="436" width="290"
                       alt="Изображение товара">
                  <div class="product-card__more">
                    <a href="#" class="product-card__link btn btn--icon">
                      <span class="btn__text">В корзину</span>
                      <svg width="24" height="24" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-basket"></use>
                      </svg>
                    </a>
                    <a href="#" class="product-card__link btn btn--secondary">
                      <span class="btn__text">Подробнее</span>
                    </a>
                  </div>
                </div>
                <div class="product-card__info">
                  <h2 class="product-card__title">Потолочная люстра Ornella A4059PL-4AB (Artelamp)</h2>
                  <span class="product-card__old">
                  <span class="product-card__old-number">15 300</span>
                  <span class="product-card__old-add">₽</span>
                </span>
                  <span class="product-card__price">
                  <span class="product-card__price-number">11 540</span>
                  <span class="product-card__price-add">₽</span>
                </span>
                  <div class="product-card__tooltip tooltip">
                    <button class="tooltip__btn" aria-label="Показать подсказку">
                      <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                        <use xlink:href="images/sprite.svg#icon-i"></use>
                      </svg>
                    </button>
                    <div class="tooltip__content">
                      <span class="tooltip__text">Наличие товара по городам:</span>
                      <ul class="tooltip__list">
                        <li class="tooltip__item">
                          <span class="tooltip__text">Москва: <span class="tooltip__count">454</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Оренбург: <span class="tooltip__count">381</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">15</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              </template>
    
    ```
    
 Код js класса выглядит так
    
    ```js
    
    // src/components/ProductCard.js
import { addToBasket } from './basket.js'; // Импортируем функцию addToBasket
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
    addToBasketButton.addEventListener('click', () => {
      this.addToBasket();
    });
  }

  addToBasket() {
    // Передаем объект товара в корзину
    addToBasket(this.data);
  }

  appendTo(parentNode) {
    parentNode.appendChild(this.cardElement);
  }
}
    ```
  
## Что нужно сделать
    
    Для создания карточки товара другого типа на основе имеющегося класса ProductCard создать класс ProductCardDay, использующий другой template, но сохраняющий весь функционал родительского класса ProductCard
    
    Класс должен использовать вот этот шаблон template:
    
    ```html
    <template id="productCardDayTemplate">
              <div class="product-card product-card--small">
              <div class="product-card__visual">
                <img class="product-card__img" src="images/item-7.png" height="344" width="290"
                     alt="Изображение товара">
                <div class="product-card__more">
                  <a href="#" class="product-card__link btn btn--icon">
                    <span class="btn__text">В корзину</span>
                    <svg width="24" height="24" aria-hidden="true">
                      <use xlink:href="images/sprite.svg#icon-basket"></use>
                    </svg>
                  </a>
                  <a href="#" class="product-card__link btn btn--secondary">
                    <span class="btn__text">Подробнее</span>
                  </a>
                </div>
              </div>
              <div class="product-card__info">
                <h2 class="product-card__title">Потолочная люстра Ornella A4059PL-4AB (Artelamp)</h2>
                <span class="product-card__old">
                  <span class="product-card__old-number">15 300</span>
                  <span class="product-card__old-add">₽</span>
                </span>
                <span class="product-card__price">
                  <span class="product-card__price-number">11 540</span>
                  <span class="product-card__price-add">₽</span>
                </span>
                <div class="product-card__tooltip tooltip">
                  <button class="tooltip__btn" aria-label="Показать подсказку">
                    <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                      <use xlink:href="images/sprite.svg#icon-i"></use>
                    </svg>
                  </button>
                  <div class="tooltip__content">
                    <span class="tooltip__text">Наличие товара по городам:</span>
                    <ul class="tooltip__list">
                      <li class="tooltip__item">
                        <span class="tooltip__text">Москва: <span class="tooltip__count">454</span></span>
                      </li>
                      <li class="tooltip__item">
                        <span class="tooltip__text">Оренбург: <span class="tooltip__count">381</span></span>
                      </li>
                      <li class="tooltip__item">
                        <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">15</span></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            </template>
    
    ```