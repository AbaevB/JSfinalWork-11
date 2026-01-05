// js/components/changeLocation.js

export default function changeLocation() {
    let currentLocationEl = document.getElementById('currentLocationText');
    console.log(currentLocationEl);
    let changeLocationBtnEl = document.getElementById('changeLocationBtn');
    console.log(changeLocationBtnEl);
    let locationListEl = document.getElementById('locationList');
    console.log(locationListEl);
    let locationBtns = document.querySelectorAll('.location__sublink');
    console.log(locationBtns);

    changeLocationBtnEl.addEventListener('click', () => {
        // появление и скрытие списка городов
        changeLocationBtnEl.classList.toggle('location__city--active');
    })
}