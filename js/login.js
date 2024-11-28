API.callWithToken()
  .get('/auth/me')
  .then((res) => {
    window.location.href = 'index.html';
  });

const elAuthForm = document.getElementById('auth-form');
const elFormMessage = document.getElementById('formMessage');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');

elAuthForm.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(123);

  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);

  API.call()
    .post('/auth/login', data)
    .then(function (response) {
      localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
      window.location.href = 'index.html';
    })
    .catch(function (error) {
      elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">Thông tin đăng nhập không đúng, vui lòng thử lại</div>`;
      elEmail.value = '';
      elPassword.value = '';
      console.log(error);
    });
});

const passField = document.querySelector('.input-password');
const showBtn = document.querySelector('.icon-password');
showBtn.onclick = () => {
  if (passField.type === 'password') {
    passField.type = 'text';
    showBtn.classList.remove('hide-btn');
  } else {
    passField.type = 'password';
    showBtn.classList.add('hide-btn');
  }
};
