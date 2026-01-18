// components/ModalWindow.js

export default class ModalWindow {
  constructor(options = {}) {
    this.options = {
      title: options.title || 'Благодарим за обращение!', // Параметры по умолчанию
      text: options.text || 'Мы получили вашу заявку и свяжемся с вами в ближайшее время.',
      iconPath: options.iconPath || 'images/sprite.svg#icon-check-circle'
    };

    this.modalEl = this.createModal();
  }

  createModal() {
    let template = document.getElementById('messageTemplate');
    let clone = template.content.cloneNode(true);

    // Замена текста заголовка
    let title = clone.querySelector('.message__title');
    title.textContent = this.options.title;

    // Замена текста параграфа
    let paragraph = clone.querySelector('.message__text');
    paragraph.textContent = this.options.text;

    // Замена иконки
    let iconUse = clone.querySelector('.message__icon use');
    iconUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.options.iconPath);

    // id модального окна
    let modal = clone.querySelector('.message');
    modal.id = 'message';

    return modal;
  }

  show() {
    document.body.appendChild(this.modalEl);
    document.body.classList.add('no-scroll'); // Добавляем класс для блокировки скролла
    this.modalEl.style.display = 'block';

    // Обработчик закрытия окна
    let closeButton = this.modalEl.querySelector('.message__close');
    closeButton.addEventListener('click', () => {
      this.hide();
    });


  }

  hide() {
    this.modalEl.style.display = 'none';
    document.body.removeChild(this.modalEl);
    document.body.classList.remove('no-scroll'); // Удаляем класс для разблокировки скролла
  }
}

