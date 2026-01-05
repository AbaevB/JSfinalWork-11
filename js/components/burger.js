// js/components/burger.js
export default function burger() {
    let burgerBtnEl = document.getElementById('burgerBtn');
    let mainMenuEl = document.getElementById('mainMenu');
    let closeBtnEl = document.getElementById('closeMenuBtn');
    let mainMenuLinks = document.querySelectorAll('.main-menu__link');


    // Обработчик открытия меню
    burgerBtnEl.addEventListener('click', () => {
        mainMenuEl.classList.add('main-menu--active');
        disableScroll(); // Блокирует скролл
    });

    // Обработчик закрытия меню
    closeBtnEl.addEventListener('click', () => {
        mainMenuEl.classList.remove('main-menu--active');
        enableScroll(); // Разблокирует скролл
    });

    // Закрытие меню при клике на ссылку
    mainMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainMenuEl.classList.remove('main-menu--active');
            enableScroll(); // Разблокиру скроллинг
        });
    });

    // Заблокировать скролл
    function disableScroll() {
        document.body.style.overflowY = 'hidden';
    }

    // Разрешить скролл
    function enableScroll() {
        document.body.style.overflowY = 'auto';
    }
}