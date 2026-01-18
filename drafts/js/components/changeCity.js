// components/changeCity.js
export default function ChangeCity() {
  let citySelectBtn = document.querySelector('.location__city');
  let sublist = document.querySelector('.location__sublist');
  let cityItems = document.querySelectorAll('.location__sublink');

  // Состояние видимости списка
  let isOpen = false;

  // Обработчик кликов на кнопку выбора города
  citySelectBtn.addEventListener('click', () => {
    if (isOpen) {
      hideSublist();
    } else {
      showSublist();
    }
  });

  // Обработчик кликов на выбор города из списка
  cityItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      selectCity(event.target.textContent.trim());
    });
  });

  // Обновление выбранного города
  function selectCity(cityName) {
    citySelectBtn.querySelector('.location__city-name').textContent = cityName;
    hideSublist();
  }

  // Открытие списка городов
  function showSublist() {
    sublist.style.transform = 'translateY(0)';
    sublist.style.opacity = '1';
    sublist.style.pointerEvents = 'auto';
    isOpen = true;
  }

  // Скрытие списка городов
  function hideSublist() {
    sublist.style.transform = 'translateY(-20px)'; // Смещение вверх
    sublist.style.opacity = '0';
    sublist.style.pointerEvents = 'none';
    isOpen = false;
  }
}