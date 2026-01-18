// components/UpdateFiltersCount.js

import fetchProducts from './FetchData.js';

export default async function updateFiltersCount() {
  let products = await fetchProducts(); // Получаем данные один раз

  // Получаем форму фильтрации
  let formEl = document.getElementById('filterForm');
  let checkboxes = formEl.querySelectorAll('.custom-checkbox__field');

  // Расчёт количества товаров по категориям
  let categoryCountMap = {};

  products.forEach(product => {
    product.type.forEach(type => {
      categoryCountMap[type] = (categoryCountMap[type] || 0) + 1;
    });
  });

  // Обновление счетчиков в фильтрах
  checkboxes.forEach(checkbox => {
    let inputField = checkbox.closest('.custom-checkbox').querySelector('input');
    let typeValue = inputField.value;

    // Используем близкий родительский элемент для поиска счетчика
    let countSpan = checkbox.closest('.custom-checkbox').querySelector('.custom-checkbox__count');
    if (!countSpan) {
      console.error('Элемент счетчика не найден!', checkbox);
      return;
    }

    countSpan.textContent = categoryCountMap[typeValue] || 0;
  });
}
