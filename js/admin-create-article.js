// access key: 3MHK_KoovsoBoHptbssrwMWXaGtkYQVwrf9ZJDKVwIM
// secret key: DlEuDBfg1FV528O7Y2siby2U6bTv8A-tfU-KsxQravQ

// https://api.unsplash.com/photos/random/?client_id=3MHK_KoovsoBoHptbssrwMWXaGtkYQVwrf9ZJDKVwIM&orientation=landscape
API.callWithToken()
  .get('/auth/me')
  .then((res) => {
    // todo
  })
  .catch((err) => {
    window.location.href = 'index.html';
  });

const elAuthForm = document.getElementById('auth-form');
const elFormMessage = document.getElementById('formMessage');
const elBtnRandomThumb = document.getElementById('btnRandomThumb');
const elThumb = document.getElementById('thumb');
const elThumbPreview = document.getElementById('thumbPreview');
const elContent = document.getElementById('content');
let editor;

ClassicEditor.create(document.querySelector('#content'))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.log();
  });

//
elAuthForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);

  API.callWithToken()
    .post('/articles/create', data)
    .then((res) => {
      elFormMessage.innerHTML = '';
      elAuthForm.reset();
      elThumbPreview.src = './assets/img/default.png';
      editor.setData('');
      showToastMessage('Thêm bài viết thành công!');
    })
    .catch((err) => {
      // const errors = err.response.data.errors;
      console.log(err);
      // showFormErrorsMessage(errors, elFormMessage);
    });
});

elBtnRandomThumb.addEventListener('click', () => {
  API.call()
    .get(
      'https://api.unsplash.com/photos/random/?client_id=3MHK_KoovsoBoHptbssrwMWXaGtkYQVwrf9ZJDKVwIM&orientation=landscape',
    )
    .then((res) => {
      const urlThumb = res.data.urls.regular;
      elThumb.value = urlThumb;
      elThumbPreview.src = urlThumb;
    });
});

elThumb.addEventListener('change', () => {
  if (elThumb.value) elThumbPreview.src = elThumb.value;
});
