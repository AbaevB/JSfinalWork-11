// components/FormValidation.js


export default function formValidation() {
  let form = document.getElementById('questionsForm');
  let validate = new JustValidate(form, {
    errorLabelStyle: {
      color: '#9be198',
    },
    validateBeforeSubmitting: true,
  });

  validate.addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите имя!',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно содержать не менее 3 символов!',
    }
  ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите почту!',
      },
      {
        rule: 'email',
        errorMessage: 'Почта введена неверно!',
      }
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Вы не согласились с условиями!',
      },
    ]

    );
  console.log(validate);
    return validate;

}


