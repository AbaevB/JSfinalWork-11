import mainMenu from "./components/mainMenu.js";
import ChangeCity from "./components/changeCity.js";
// import ProductCard from "./components/ProductCard.js";
import createProductCards from "./components/createCards.js";
import updateFilterCounts from "./components/updateFiltersCount.js";
import setupTooltips from "./components/tooltips.js";
document.addEventListener('DOMContentLoaded', function() {
    mainMenu();
    ChangeCity();
    createProductCards();
    updateFilterCounts();
    setupTooltips();
});
