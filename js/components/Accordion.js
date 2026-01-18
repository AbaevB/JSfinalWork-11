// components/Accordion.js

export default function accordion() {
    let accordionEl = document.getElementById('faqAccordion');
    let accordionBtnEls = accordionEl.querySelectorAll('.accordion__btn');
    let accordionContentEls = accordionEl.querySelectorAll('.accordion__content');

    // Обработчик клика по кнопке
    accordionBtnEls.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            let targetContent = accordionContentEls[i];

            // Событие для активной кнопки
            if (btn.classList.contains('accordion__btn--active')) {
                targetContent.classList.remove('accordion__content--active');
                btn.classList.remove('accordion__btn--active');
            } else {

                accordionContentEls.forEach(content => {
                    content.classList.remove('accordion__content--active');
                });

                accordionBtnEls.forEach(otherBtn => {
                    otherBtn.classList.remove('accordion__btn--active');
                });


                targetContent.classList.add('accordion__content--active');

                btn.classList.add('accordion__btn--active');
            }
        });
    });
}
