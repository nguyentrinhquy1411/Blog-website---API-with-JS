API.callWithToken()
  .get('/auth/me')
  .then((res) => {
    window.location.href = 'index.html';
  });

const elAuthForm = document.getElementById('auth-form');
const elFormMessage = document.getElementById('formMessage');
const elName = document.getElementById('name');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');
const elPhone = document.getElementById('phone');
const elAddress = document.getElementById('address');

elAuthForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('123');

  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);

  API.call()
    .post('/users/register', data)
    .then(function (responseRegister) {
      const dataLogin = { email: data.email, password: data.password };
      API.call()
        .post('/auth/login', dataLogin)
        .then(function (responseLogin) {
          localStorage.setItem(ACCESS_TOKEN, responseLogin.data.access_token);
          window.location.href = 'index.html';
        });
    })
    .catch(function (err) {
      const errors = err.response.data.errors;
      showFormErrorsMessageRegister(errors, elFormMessage);
    });
});
