// components/QuestionsForm.js

import ModalWindow from './ModalWindow.js';
import formValidation from './FormValidation.js';

export default function questionsForm() {
    let form = document.getElementById('questionsForm');

    // Получаем объект validate из formValidation
    let validate = formValidation();

    // Обработка успешной отправки формы
    validate.onSuccess(async (event) => {

        // Сбор данных формы
        let formData = new FormData(form);

        let data = Object.fromEntries(formData);
        let jsonData = JSON.stringify(data);

        // Вывод данных консоль
        console.log('Отправляемые данные:');
        console.log(data)

        try {
            // Отправка данных на сервер
            let response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (response.ok) {
                // Вывод ответа сервера в консоль
                let responseData = await response.json();
                console.log('Ответ сервера:', responseData);

                // Модальное окно успеха
                let successModal = new ModalWindow();
                successModal.show();
                form.reset(); // Сбрасываем форму
            } else {
                // Модальное окно ошибки
                let errorModal = new ModalWindow({
                    title: 'Не удалось отправить обращение',
                    text: 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — обратитесь в службу поддержки.',
                    iconPath: 'images/sprite.svg#icon-warning'
                });
                errorModal.show();
            }
        } catch (error) {
            // Модальное окно ошибки
            let errorModal = new ModalWindow({
                title: 'Не удалось отправить обращение',
                text: 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — обратитесь в службу поддержки.',
                iconPath: 'images/sprite.svg#icon-warning'
            });
            errorModal.show();
        }
    });
}
