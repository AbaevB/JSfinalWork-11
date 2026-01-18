// js/components/Slider.js
import ProductCardDay from "./ProductCardDay.js";
function slider(data) {
  let sliderEl = document.getElementById('dayProdustsSlider');
  let filteredData = data.filter(product => product.goodsOfDay);


  for (let i = 0; i < filteredData.length; i++) {
    let product = filteredData[i];
    let liEl = document.createElement('li');
    liEl.classList.add('day-products__item', 'swiper-slide');
    let cardEl = new ProductCardDay(product).appendTo(liEl);
    sliderEl.appendChild(liEl);
  }
  return sliderEl;

};

function sliderInit() {
  let swiperEl = document.getElementById('dayProductsSwiper');

  new Swiper(swiperEl, {
    navigation: {
      nextEl: '#sliderPrevBtn', // Стрелка вперед
      prevEl: '#sliderNextBtn'  // Стрелка назад
    },
    spaceBetween: 20,                 // Расстояние между слайдами
    slidesPerView: 4,                 // Количество видимых слайдов
    loop: true,                       // цикличность пролистывания
    autoplay: {
      delay: 3000                     // Авто-пролистывание каждые 3 секунды
    }
  })
}

export {
  slider,
  sliderInit,
}
