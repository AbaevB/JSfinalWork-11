// components/basket.js

import BasketItem from './BasketItem.js';

// Функция для генерации уникального 6-значного ID
function generateUniqueId(existingIds) {
  let id;
  do {
    id = Math.floor(100000 + Math.random() * 900000).toString();
  } while (existingIds.has(id));
  return id;
}

function basketToggle() {
  let basketBtnEl = document.getElementById('basketBtn');
  let basketEl = document.getElementById('basket');

  basketBtnEl.addEventListener('click', () => {
    basketEl.classList.toggle('basket--active');
  });
}

// Массив товаров в корзине – хранится с новым `basketId`
let basketItems = [];

// Добавление товара в корзину
function addToBasket(product) {
  let basketListEl = document.getElementById('basketList');

  // Получим все текущие basketId, чтобы избежать дублей
  const existingIds = new Set(basketItems.map(item => item.basketId));
  const newId = generateUniqueId(existingIds);

  // Создаем копию товара и добавляем basketId
  let productWithId = { ...product, basketId: newId };
  basketItems.push(productWithId);

  // Создаем и добавляем компонент корзины
  let basketItem = new BasketItem(productWithId, removeFromBasket);
  basketListEl.appendChild(basketItem.element());

  // Обновляем отображение пустого блока и кнопки оформления
  let emptyBlockEl = document.querySelector('.basket__empty-block');
  let linkEl = document.querySelector('.basket__link');
  emptyBlockEl.classList.add('visually-hidden');
  linkEl.classList.remove('visually-hidden');

  // Обновляем счетчик
  updateBasketCounter();

  // Сохраняем в localStorage
  saveToStorage();
}

// Обновление количества товаров
function updateBasketCounter() {
  let basketBtnCountEl = document.getElementById('basketBtnCount');
  let basketListEl = document.querySelector('.basket__list');
  let itemsCount = basketListEl.children.length;
  basketBtnCountEl.textContent = itemsCount;
}



// Сохранение корзины в localStorage
function saveToStorage() {
  localStorage.setItem('basket', JSON.stringify(basketItems));
}

// Удаление товара из корзины по basketId
function removeFromBasket(basketId) {
  let basketListEl = document.getElementById('basketList');

  // Находим DOM-элемент по data-product-id
  let itemToRemove = basketListEl.querySelector(`[data-product-id="${basketId}"]`);
  if (itemToRemove) {
    itemToRemove.remove();
  }

  // Удаляем из массива по basketId
  basketItems = basketItems.filter(item => item.basketId !== basketId);

  // Если корзина пуста, показываем блок "пусто" и скрываем кнопку заказа
  if (basketItems.length === 0) {
    let emptyBlockEl = document.querySelector('.basket__empty-block');
    let linkEl = document.querySelector('.basket__link');
    emptyBlockEl.classList.remove('visually-hidden');
    linkEl.classList.add('visually-hidden');
    console.log('Корзина пуста после удаления:', emptyBlockEl.classList.contains('visually-hidden'), linkEl.classList.contains('visually-hidden'));
  } else {
    console.log('Корзина не пуста после удаления');
    console.log(basketItems.length);
    console.log('Содержимое корзины:', basketItems);
  }

  // Обновление счетчика
  updateBasketCounter();

  // Обновляем localStorage
  saveToStorage();
}

// Загрузка корзины из localStorage
function loadFromStorage() {
  let storedBasket = localStorage.getItem('basket');
  if (storedBasket) {
    basketItems = JSON.parse(storedBasket);
    renderBasket();
  } else {
    // Если корзина пуста при загрузке, показываем блок "пусто" и скрываем кнопку заказа
    let emptyBlockEl = document.querySelector('.basket__empty-block');
    let linkEl = document.querySelector('.basket__link');
    emptyBlockEl.classList.remove('visually-hidden');
    linkEl.classList.add('visually-hidden');
    console.log('Корзина пуста при загрузке:', emptyBlockEl.classList.contains('visually-hidden'), linkEl.classList.contains('visually-hidden'));
  }
}

// Отрисовка корзины при загрузке
function renderBasket() {
  let basketListEl = document.getElementById('basketList');
  basketListEl.innerHTML = '';

  basketItems.forEach(product => {
    let basketItem = new BasketItem(product, removeFromBasket);
    basketListEl.appendChild(basketItem.element());
  });

  // Обновление счетчика
  updateBasketCounter();

  // Показываем или скрываем блоки
  let emptyBlockEl = document.querySelector('.basket__empty-block');
  let linkEl = document.querySelector('.basket__link');
  if (basketItems.length === 0) {
    emptyBlockEl.classList.remove('visually-hidden');
    linkEl.classList.add('visually-hidden');
    console.log('Корзина пуста после отрисовки:', emptyBlockEl.classList.contains('visually-hidden'), linkEl.classList.contains('visually-hidden'));
  } else {
    emptyBlockEl.classList.add('visually-hidden');
    linkEl.classList.remove('visually-hidden');
    console.log('Корзина не пуста после отрисовки:', emptyBlockEl.classList.contains('visually-hidden'), linkEl.classList.contains('visibly-hidden'));
  }
}

// Загружаем корзину при старте
loadFromStorage();

export {
  basketToggle,
  addToBasket,
  removeFromBasket,
};
