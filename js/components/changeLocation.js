// src/components/changeLocation.js

export default function changeLocation() {
  const currentLocationEl = document.getElementById('currentLocationText');
  const changeLocationBtnEl = document.getElementById('changeLocationBtn');
  const locationBtns = document.querySelectorAll('.location__sublink');

  // Обработчик открытия и закрытия меню
  changeLocationBtnEl.addEventListener('click', () => {
    changeLocationBtnEl.classList.toggle('location__city--active');
  });

  // Обработчик выбора города
  locationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newLocation = btn.textContent.trim();
      currentLocationEl.textContent = newLocation;
      changeLocationBtnEl.classList.remove('location__city--active');
    });
  });

  // Закрытие меню при клике вне области
  document.addEventListener('click', (event) => {
    if (!changeLocationBtnEl.contains(event.target)) {
      changeLocationBtnEl.classList.remove('location__city--active');
    }
  });
}