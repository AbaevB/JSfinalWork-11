// components/tooltips.js

// Функция для установки поведения тултипов
export default function setupTooltips() {

  // Пауза на 300 мс для уверенности, что элементы доступны
  setTimeout(() => {
    const tooltipContainers = document.querySelectorAll('.tooltip');


    if (tooltipContainers.length === 0) {
      return;
    }

    tooltipContainers.forEach(container => {

      const button = container.querySelector('.tooltip__btn');
      const content = container.querySelector('.tooltip__content');


      // Скрываем тултип по умолчанию
      content.style.display = 'none';

      // Добавляем обработчики событий
      button.addEventListener('mouseenter', () => {
        content.style.display = 'block';
      });

      button.addEventListener('mouseleave', () => {
        content.style.display = 'none';
      });
    });

  }, 300); // Пауза на 1 секунду
}