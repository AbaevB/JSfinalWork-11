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
    this.itemEl.dataset.productId = this.product.basketId; // Добавляем basketId

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
      this.onRemoveCallback(this.product.basketId); // Передаем basketId
    }
  }

  element() {
    return this.itemEl;
  }
}
