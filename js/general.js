const BASE_URL = 'https://apiforlearning.codethanhthuongthua.asia/api/v2/';

const API = {
  call: function () {
    return axios.create({
      baseURL: 'https://apiforlearning.codethanhthuongthua.asia/api/v2/',
    });
  },
  callWithToken: function (token) {
    if (!token) token = localStorage.getItem('ACCESS_TOKEN');

    return axios.create({
      baseURL: 'https://apiforlearning.codethanhthuongthua.asia/api/v2/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('vi');
const elCategories = document.getElementById('categories');
const elInputSearch = document.getElementById('inputSearch');
const elInputSearchMenu = document.getElementById('inputSearchMenu');
const elInputSearchMobile = document.getElementById('inputSearchMobile');

const elFormSearch = document.getElementById('formSearch');
const elFormSearchMenu = document.getElementById('formSearchMenu');
const elFormSearchMobile = document.getElementById('formSearchMobile');

const elCategoryTitle = document.getElementById('categoryTitle');
// const elArticlesCategory = document.getElementById('like-video');
const elArticlesCategory = document.getElementById('articlesCategory');
const elArticles = document.getElementById('articles');
const elPagination = document.getElementById('myPagination');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//render hot category
API.call()
  .get('articles?limit=4&page=4')
  .then((res) => {
    const articles = res.data.data;

    let html = '';
    articles.forEach((item) => {
      html += /*html*/ `   
      <li>
          <a href="blog-details.html?id=${item.id}" data-background="${item.thumb}" style="background-image: url(${item.thumb});">
          <span class="post-tag post-tag-three">${item.category.name}</span>
          <span class="right-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
              <path
                  d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z"
                  fill="currentcolor"
              ></path>
              <path
                  d="M1.72308 16L0 14.2769L11.8154 2.46154H1.23077V0H16V14.7692H13.5385V4.18462L1.72308 16Z"
                  fill="currentcolor"
              ></path>
              </svg>
          </span>
          </a>
      </li>`;
    });
    elArticlesCategory.innerHTML = html;
  });

//search( header)
elFormSearch.addEventListener('submit', function (e) {
  e.preventDefault();
  const keyword = elInputSearch.value.trim();

  if (keyword) {
    window.location.href = `search.html?keyword=${keyword}`;
  } else {
    alert('Vui lòng nhập từ khóa cần tìm');
    elInputSearch.value = '';
  }
});

//search Menu
elFormSearchMenu.addEventListener('submit', function (e) {
  e.preventDefault();
  const keyword = elInputSearchMenu.value.trim();

  if (keyword) {
    window.location.href = `search.html?keyword=${keyword}`;
  } else {
    alert('Vui lòng nhập từ khóa cần tìm');
    elInputSearchMenu.value = '';
  }
});

//search( header mobile)
elFormSearchMobile.addEventListener('submit', function (e) {
  e.preventDefault();

  const keyword = elInputSearchMobile.value.trim();

  if (keyword) {
    window.location.href = `search.html?keyword=${keyword}`;
  } else {
    alert('Vui lòng nhập từ khóa cần tìm');
    elInputSearch.value = '';
  }
});

// danh mục
API.call()
  .get(`categories_news?limit=100`)
  .then((res) => {
    const articles = res.data.data;

    let html = '';
    articles.forEach((item) => {
      html += /*html*/ `  
       <li class="category" ><a href="category.html?id=${item.id}">${item.name}</a></li>
      `;
      elCategories.innerHTML = html;
    });

    let htmlMobile = '';
    articles.forEach((item) => {
      htmlMobile += `
            <li class="category"><a href="category.html?id=${item.id}">${item.name}</a></li>
          `;
    });
    document.querySelector('.mobile-menu #categories').innerHTML = htmlMobile;
  });

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const token = localStorage.getItem(ACCESS_TOKEN);

let LIKED_POSTS = JSON.parse(localStorage.getItem('LIKED_POSTS')) || [];
let recentPostsIdString = LIKED_POSTS.toString();

let LIKED_VIDEO = JSON.parse(localStorage.getItem('LIKED_VIDEO')) || [];

let recentVideoIdString = LIKED_VIDEO.toString();

const pathName = window.location.pathname;
const pageName = pathName.split('/').pop();

if (pageName === 'index.html') {
  document.querySelector('.index').classList.add('active');
}
if (pageName === 'author.html') {
  document.querySelector('.features').classList.add('active');
}
if (pageName === 'about.html') {
  document.querySelector('.features').classList.add('active');
  document.querySelector('.about').classList.add('active');
}
if (pageName === 'author.html') {
  document.querySelector('.author').classList.add('active');
}
if (pageName === 'contact.html') {
  document.querySelector('.contact').classList.add('active');
}
if (pageName === 'category.html') {
  document.querySelector('.categories').classList.add('active');
}
if (pageName === 'favoriteVideo.html') {
  document.querySelector('.favorite-video').classList.add('active');
}
if (pageName === 'favorite.html') {
  document.querySelector('.favorite').classList.add('active');
}
if (pageName === 'video.html') {
  document.querySelector('.video').classList.add('active');
}

function showFormErrorsMessage(errors, el) {
  let errString = '';

  for (const property in errors) {
    errString += /* html */ `<li>${errors[property]}</li>`;
  }

  el.innerHTML = /* html */ `
  <div class="alert alert-danger" role="alert">
    ${errors}
  </div>`;
}

//thong bao
function showToastMessage(message) {
  Toastify({
    text: message,
    duration: 3000,
  }).showToast();
}

//like
document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('icon-like')) {
    const id = parseInt(el.dataset.id);
    const title = el.dataset.title;
    if (LIKED_POSTS.includes(id)) {
      el.classList.remove('liked');
      LIKED_POSTS = LIKED_POSTS.filter((articleId) => articleId != id);
      if (el.classList.contains('remove-liked')) {
        el.closest('.article-item-liked').remove();
      }
      showToast(`Đã bỏ yêu thích bài viết "${title}"`, 'linear-gradient(to right, #e63946, #d62828)');
    } else {
      el.classList.add('liked');
      LIKED_POSTS.push(id);
      showToast(`Đã yêu thích bài viết "${title}"`);
    }
    localStorage.setItem('LIKED_POSTS', JSON.stringify(LIKED_POSTS));
    document.getElementById('total-liked').innerText = `(${LIKED_POSTS.length})`;
  }
  document.querySelector('.mobile-menu  #total-liked').innerText = ` (${LIKED_POSTS.length})`;

  if (el.id == 'btn-logout') {
    fetch(`${BASE_URL}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//like video
document.addEventListener('click', (e) => {
  const el = e.target;

  if (el.classList.contains('icon-like-video')) {
    const id = parseInt(el.dataset.id);
    const title = el.dataset.title;
    if (LIKED_VIDEO.includes(id)) {
      el.classList.remove('liked');
      LIKED_VIDEO = LIKED_VIDEO.filter((articleId) => articleId != id);
      if (el.classList.contains('remove-liked')) {
        el.closest('.article-item-liked').remove();
      }
      showToast(`Đã bỏ yêu thích bài viết "${title}"`, 'linear-gradient(to right, #e63946, #d62828)');
    } else {
      el.classList.add('liked');
      LIKED_VIDEO.push(id);
      showToast(`Đã yêu thích bài viết "${title}"`);
    }
    localStorage.setItem('LIKED_VIDEO', JSON.stringify(LIKED_VIDEO));
    document.getElementById('total-liked-video').innerText = `(${LIKED_VIDEO.length})`;
  }
  document.querySelector('.mobile-menu #total-liked-video').innerText = ` (${LIKED_VIDEO.length})`;

  if (el.id == 'btn-logout') {
    fetch(`${BASE_URL}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function showToast(message, style = '') {
  Toastify({
    text: message,
    duration: 1750,

    style: {
      background: style,
    },
    close: true,

    stopOnFocus: false,
  }).showToast();
}

function showFormErrorsMessageRegister(errors, el) {
  let errString = '';

  for (const property in errors) {
    errString += /* html */ `<li>${errors[property]}</li>`;
  }

  el.innerHTML = /* html */ `
  <div class="alert alert-danger" role="alert">
    <ul>${errString}</ul>
  </div>`;
}
