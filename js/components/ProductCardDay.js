// js/components/ProductCardDay.js
import ProductCard from './ProductCard.js';
import { addToBasket } from './Basket.js';

export default class ProductCardDay extends ProductCard {
  constructor(data) {
    super(data);
    // Переинициализация шаблона с другим ID
    this.template = document.getElementById("productCardDayTemplate").content.cloneNode(true);
    this.cardElement = this.template.querySelector(".product-card");
    this.fillData = super.fillData();
    this.createToolTip = super.createToolTip();
    this.setupAddToBasket = super.setupAddToBasket();

  }

  fillData() {
    // Если нужно что-то дополнительно или изменить
  }

  createToolTip() {
    // Если нужно что-то дополнительно или изменить
  }

  setupAddToBasket() {
    //Если нужно что-то дополнительно или изменить
  }

  appendTo(parentNode) {
    parentNode.prepend(this.cardElement);
  }
}
