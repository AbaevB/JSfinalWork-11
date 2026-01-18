//js/components/mainMenu.js   
export default function mainMenu() {
    let mainMenuEl = document.getElementById('mainMenu');
    let catalogBtnEl = document.getElementById('catalogBtn');
    let mainMenuCloseEl = document.getElementById('mainMenuClose');

    if (!catalogBtnEl || !mainMenuEl || !mainMenuCloseEl) {
    console.error('One or more elements are missing.');
    return;
  }

    catalogBtnEl.addEventListener('click', () => {
        mainMenuEl.classList.toggle('main-menu--active');
    });
    mainMenuCloseEl.addEventListener('click', () => {
        mainMenuEl.classList.remove('main-menu--active');
    })
};