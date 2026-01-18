// main.js

import fetchData from './components/FetchData.js';
import burger from "./components/Burger.js";
import changeLocation from "./components/ChangeLocation.js";
import * as basket from "./components/Basket.js";
import catalog from "./components/Catalog.js";
import updateFiltersCount from "./components/UpdateFiltersCount.js";
import * as applyFilters from "./components/ApplyFilters.js";
import sortingCards from "./components/SortingCards.js";
import accordion from './components/Accordion.js';
import * as slider from './components/Slider.js';
import  questionsForm from './components/QuestionsForm.js';



document.addEventListener('DOMContentLoaded', async () => {
  let data = await fetchData(); // Получаем данные один раз

  // Передаём данные компонентам
  burger();
  changeLocation();
  basket.basketToggle();
  catalog(data);
  updateFiltersCount(data);
  applyFilters.applyFilters(data);
  applyFilters.resetFilters(data);
  applyFilters.initialize(data);
  sortingCards(data);
  accordion();
  slider.slider(data);
  slider.sliderInit();
  questionsForm();

});
