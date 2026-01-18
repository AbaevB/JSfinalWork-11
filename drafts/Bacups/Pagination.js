// components/Pagination.js

export default class Pagination {
  constructor(totalPages, onPageChange, id) {
    this.totalPages = totalPages;
    this.currentPage = 1;
    this.onPageChange = onPageChange;
    this.template = document.getElementById('paginationTemplate');
    this.element = null;
    this.id = id; // Уникальный id для экземпляра

    this.create();
  }

  create() {
    let clone = this.template.content.cloneNode(true);
    this.element = clone.querySelector('.catalog__pagination');
    this.element.id = this.id; // Устанавливаем уникальный id

    for (let i = 1; i <= this.totalPages; i++) {
      let li = document.createElement('li');
      li.classList.add('catalog__pagination-item');

      let pageLink = document.createElement('button');
      pageLink.classList.add('catalog__pagination-link');
      pageLink.textContent = i;
      pageLink.addEventListener('click', () => {
        this.onPageChange(i);
      });
      li.appendChild(pageLink);
      this.element.appendChild(li);
    }
  }

  element() {
    return this.element;
  }

  update(currentPage) {
    this.currentPage = currentPage;
    let links = this.element.querySelectorAll('.catalog__pagination-link');
    links.forEach(link => {
      if (link.textContent === currentPage.toString()) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
