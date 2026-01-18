// js/components/Burger.js
export default function burger() {
    let burgerBtnEl = document.getElementById('burgerBtn');
    let mainMenuEl = document.getElementById('mainMenu');
    let closeBtnEl = document.getElementById('closeMenuBtn');
    let mainMenuLinks = document.querySelectorAll('.main-menu__link');


    // Обработчик открытия меню
    burgerBtnEl.addEventListener('click', () => {
        mainMenuEl.classList.add('main-menu--active');
        disableScroll(); // Заблокируем скроллинг
    });

    // Обработчик закрытия меню
    closeBtnEl.addEventListener('click', () => {
        mainMenuEl.classList.remove('main-menu--active');
        enableScroll(); // Разблокируем скроллинг
    });

    // Закрытие меню при клике на ссылку
    mainMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainMenuEl.classList.remove('main-menu--active');
            enableScroll(); // Разблокируем скроллинг
        });
    });

    // Заблокировать скроллинг
    function disableScroll() {
        document.body.style.overflowY = 'hidden';
    }

    // Разрешить скроллинг
    function enableScroll() {
        document.body.style.overflowY = 'auto';
    }
}
