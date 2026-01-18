// components/ProductCard.js

export default class ProductCard {
  constructor(data) {
    this.data = data;
    this.createCard();
  }

  createCard() {
    // Контейнер всей карточки
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Блок визуализации (изображение и кнопки)
    const visualBlock = document.createElement('div');
    visualBlock.classList.add('product-card__visual');

    // Изображение товара
    const image = document.createElement('img');
    image.src = this.data.image;
    image.alt = 'Изображение товара';
    image.classList.add('product-card__img');
    visualBlock.append(image);

    // Кнопки "В корзину" и "Подробнее"
    const actions = document.createElement('div');
    actions.classList.add('product-card__more');

    const cartButton = this.createCartButton();
    const detailsButton = this.createDetailsButton();

    actions.append(cartButton, detailsButton);
    visualBlock.append(actions);

    // Информация о продукте
    const infoBlock = document.createElement('div');
    infoBlock.classList.add('product-card__info');

    // Заголовок
    const title = document.createElement('h2');
    title.classList.add('product-card__title');
    title.textContent = this.data.name;
    infoBlock.append(title);

    // Цена товара (текущая и старая, если есть)
    const prices = this.createPrices();
    infoBlock.append(prices);

    // Block for tooltip with availability information
    const tooltip = this.createToolTip();
    infoBlock.append(tooltip);

    // Собираем все блоки вместе
    productCard.append(visualBlock, infoBlock);
    this.cardElement = productCard;
  }

  createCartButton() {
    const a = document.createElement('a');
    a.href = '#';
    a.classList.add('product-card__link', 'btn', 'btn--icon');

    const span = document.createElement('span');
    span.classList.add('btn__text');
    span.textContent = 'В корзину';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', 'images/sprite.svg#icon-basket');
    svg.append(use);

    a.append(span, svg);
    return a;
  }

  createDetailsButton() {
    const a = document.createElement('a');
    a.href = '#';
    a.classList.add('product-card__link', 'btn', 'btn--secondary');

    const span = document.createElement('span');
    span.classList.add('btn__text');
    span.textContent = 'Подробнее';

    a.append(span);
    return a;
  }

  createPrices() {
    const wrapper = document.createElement('div');

    // Текущая цена
    const currentPrice = document.createElement('span');
    currentPrice.classList.add('product-card__price');

    const currentNumber = document.createElement('span');
    currentNumber.classList.add('product-card__price-number');
    currentNumber.textContent = this.data.price.new.toLocaleString('ru-RU');

    const currentCurrency = document.createElement('span');
    currentCurrency.classList.add('product-card__price-add');
    currentCurrency.textContent = '₽';

    currentPrice.append(currentNumber, currentCurrency);

    // Старая цена (если есть)
    if (this.data.price.old > 0) {
      const oldPrice = document.createElement('span');
      oldPrice.classList.add('product-card__old');

      const oldNumber = document.createElement('span');
      oldNumber.classList.add('product-card__old-number');
      oldNumber.textContent = this.data.price.old.toLocaleString('ru-RU');

      const oldCurrency = document.createElement('span');
      oldCurrency.classList.add('product-card__old-add');
      oldCurrency.textContent = '₽';

      oldPrice.append(oldNumber, oldCurrency);
      wrapper.append(oldPrice);
    }

    wrapper.append(currentPrice);
    return wrapper;
  }

  createToolTip() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('product-card__tooltip', 'tooltip');

    // Кнопка тултипа
    const tooltipButton = document.createElement('button');
    tooltipButton.classList.add('tooltip__btn');
    tooltipButton.setAttribute('aria-label', 'Показать подсказку');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '5');
    svg.setAttribute('height', '10');
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', 'images/sprite.svg#icon-i');
    svg.append(use);

    tooltipButton.append(svg);

    // Содержание тултипа
    const content = document.createElement('div');
    content.classList.add('tooltip__content');

    const header = document.createElement('span');
    header.classList.add('tooltip__text');
    header.textContent = 'Наличие товара по городам:';

    const list = document.createElement('ul');
    list.classList.add('tooltip__list');

    // Объекты городов и их доступность
    const cities = [
      { key: 'moscow', label: 'Москва' },
      { key: 'orenburg', label: 'Оренбург' },
      { key: 'saintPetersburg', label: 'Санкт-Петербург' },
    ];

    cities.forEach(city => {
      const quantity = this.data.availability[city.key] || 0;

      const item = document.createElement('li');
      item.classList.add('tooltip__item');

      const text = document.createElement('span');
      text.classList.add('tooltip__text');
      text.textContent = `${city.label}: ${quantity}`;

      item.append(text);
      list.append(item);
    });

    content.append(header, list);
    tooltip.append(tooltipButton, content);

    return tooltip;
  }

  appendTo(parentNode) {
    parentNode.appendChild(this.cardElement);
  }
}