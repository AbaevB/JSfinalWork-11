# Улучшение функционала корзины

## Добавление идентификатора для элемента корзины

У меня имеется два компонента для функционала корзины онлайн-магазина - `basket.js`, управляющий логикой корзины:

```js
// components/basket.js

import BasketItem from './BasketItem.js';

function basketToggle() {
  let basketBtnEl = document.getElementById('basketBtn');
  let basketEl = document.getElementById('basket');

  basketBtnEl.addEventListener('click', () => {
    basketEl.classList.toggle('basket--active');
  });
}

// Список товаров в корзине
let basketItems = [];

// Функционал добавления товара в корзину
function addToBasket(product) {
  let basketListEl = document.getElementById('basketList');

  // Создание элемента корзины
  let basketItem = new BasketItem(product, removeFromBasket); // Передаём функцию удаления

  //  Добавление карточки товра в список корзины
  basketListEl.appendChild(basketItem.element());

  basketItems.push(product);

  // Скрытие/отоброажение блока empty-block и кнопки оформления заказа
  let emptyBlockEl = document.querySelector('.basket__empty-block');
  let linkEl = document.querySelector('.basket__link');
  emptyBlockEl.classList.add('visually-hidden');
  linkEl.classList.remove('visually-hidden');

  // Обновленеие счётчика товаров
  updateBasketCounter();

  // Добаление корзины в localStorage
  saveToStorage();
}

// Обновление счётчика товаров
function updateBasketCounter() {
  let basketBtnCountEl = document.getElementById('basketBtnCount');
  let basketListEl = document.querySelector('.basket__list');
  let itemsCount = basketListEl.children.length;
  basketBtnCountEl.textContent = itemsCount;
}

// Удаление товара из корзины
function removeFromBasket(productId) {
  let basketListEl = document.getElementById('basketList');

  // Удаление товара из DOM
  let itemToRemove = basketListEl.querySelector(`[data-product-id="${productId}"]`);
  if (itemToRemove) {
    itemToRemove.remove();
  }

  // Удаление товара из массива
  basketItems = basketItems.filter(item => item.id !== productId);

  // Отображение блока empty-block и скрытие кнопки оформления заказа если корзина пуста
  if (basketItems.length === 0) {
    let emptyBlockEl = document.querySelector('.basket__empty-block');
    let linkEl = document.querySelector('.basket__link');
    emptyBlockEl.classList.remove('visually-hidden');
    linkEl.classList.add('visually-hidden');
  }

  // Обновление счётчика товаров
  updateBasketCounter();


  saveToStorage();
}


function saveToStorage() {
  localStorage.setItem('basket', JSON.stringify(basketItems));
}

// Загрузка корзины из localStorage
function loadFromStorage() {
  let storedBasket = localStorage.getItem('basket');
  if (storedBasket) {
    basketItems = JSON.parse(storedBasket);
    renderBasket();
  }
}

// Отрисовка корзины
function renderBasket() {
  let basketListEl = document.getElementById('basketList');
  basketListEl.innerHTML = '';

  basketItems.forEach(product => {
    let basketItem = new BasketItem(product, removeFromBasket); // Передаём функцию удаления
    basketListEl.appendChild(basketItem.element());
  });

  // Обновление счётчика товаров
  updateBasketCounter();

  // Сктие/отоброажение блока empty-block и кнопки оформления заказа
  let emptyBlockEl = document.querySelector('.basket__empty-block');
  let linkEl = document.querySelector('.basket__link');
  if (basketItems.length === 0) {
    emptyBlockEl.classList.remove('visually-hidden');
    linkEl.classList.add('visually-hidden');
  } else {
    emptyBlockEl.classList.add('visually-hidden');
    linkEl.classList.remove('visually-hidden');
  }
}

// Загрузка корзины при старте
loadFromStorage();

export {
  basketToggle,
  addToBasket,
  removeFromBasket,
};
```


 и класс элемента корзины `BasketItem.js`

 ```js
// components/BasketItem.js

export default class BasketItem {
  constructor(product, onRemoveCallback) {
    this.product = product;
    this.template = document.getElementById('basketItemTemplate');
    this.itemEl = null;
    this.onRemoveCallback = onRemoveCallback; // Прием коллбека для удаления товара

    this.create();
  }

  create() {
    let clone = this.template.content.cloneNode(true);
    this.itemEl = clone.querySelector('.basket__item');
    this.itemEl.dataset.productId = this.product.id;

    // Заполнение данных
    this.itemEl.querySelector('.basket__img img').src = this.product.image;
    this.itemEl.querySelector('.basket__name').textContent = this.product.name;
    this.itemEl.querySelector('.basket__price').textContent = `${this.product.price.new.toLocaleString('ru-RU')} руб.`;

    // Удаление товара из корзины
    let closeButton = this.itemEl.querySelector('.basket__item-close');
    closeButton.addEventListener('click', () => {
      this.onRemove();
    });
  }

  onRemove() {
    // Удаление элемента из DOM
    this.itemEl.remove();

    if (typeof this.onRemoveCallback === 'function') {
      this.onRemoveCallback(this.product.id);
    }
  }

  element() {
    return this.itemEl;
  }
}
 ```
Мне нужно доработать класс `BasketItem` и функции `addToBasket` и `removeFromBasket` чтобы при добавлении нового элемента в корзину, ему присваивался data-атрибут, с сгенерированным 6-значным id. Удаление товара из корзины  должно осуществляться по этому id, а не по id товара, как это реализовано сейчас.