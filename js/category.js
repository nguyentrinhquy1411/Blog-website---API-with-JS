// const elArticlesCategory = document.getElementById('articlesCategory');
const elArticlesRecentNews = document.getElementById('articlesRecentNews');
// const elArticles = document.getElementById('articles');
// const elCategoryTitle = document.getElementById('categoryTitle');
// const elPagination = document.getElementById('myPagination');

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

// let currentPage = parseInt(urlParams.get('page'));
// if (isNaN(currentPage)) currentPage = 1;
let currentPage = parseInt(urlParams.get('page'));
if (isNaN(currentPage)) currentPage = 1;

let htmlPostWrap = '';

// render blog
getArticles(currentPage);

// page
elPagination.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('page-link')) {
    const pageNumber = parseInt(el.innerText);
    if (!isNaN(pageNumber)) {
      currentPage = pageNumber;
      getArticles(currentPage);
      addOrUpdateUrlParameter('page', currentPage);
    }
  }

  if (el.classList.contains('page-link-prev')) {
    if (currentPage > 1) {
      // Prevent going below page 1
      currentPage--;
      getArticles(currentPage);
      addOrUpdateUrlParameter('page', currentPage);
    }
  }

  if (el.classList.contains('page-link-next')) {
    currentPage++;
    getArticles(currentPage);
    addOrUpdateUrlParameter('page', currentPage);
  }
});

function addOrUpdateUrlParameter(key, value) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set(key, value);
  const newUrl = window.location.pathname + '?' + urlParams.toString();
  history.pushState(null, '', newUrl);
  console.log(newUrl);
}

// Category
function getArticles(page = 1) {
  API.call()
    .get(`categories_news/${id}/articles?page=${page}&limit=5`)
    .then((res) => {
      const articles = res.data.data;
      let categoryName = '';
      const totalPages = res.data.meta.last_page;

      let html = '';
      articles.forEach((item) => {
        const liked = LIKED_POSTS.includes(item.id) ? 'liked' : '';
        const title = item.title;
        const thumb = item.thumb;
        const publish_Date = dayjs(item.publish_date).fromNow();
        const publish_DateFormat = dayjs(item.publish_date).format('YYYY-MM-DD');
        const description = item.description;
        categoryName = item.category.name;

        html += /* html */ `
            <div class="weekly-post-item weekly-post-four">
                <div class="weekly-post-thumb">
                <a href="blog-details.html?id=${item.id}"><img src="${thumb}" alt="${title}" /></a>
                </div>
                <div class="weekly-post-content">
                <h2 class="post-title">
                    <a href="blog-details.html?id=${item.id}">${title}
                    </a>
                    <i class="fa fa-heart icon-like ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i>
                </h2>
                <div class="blog-post-meta">
                  <ul class="list-wrap">                     
                      <li><i class="flaticon-history"></i>${publish_DateFormat}</li>
                      <li><i class="flaticon-calendar"></i>${publish_Date}</li>
                  </ul>
                </div>
                <p> ${description} </p>
                <div class="view-all-btn">
                    <a href="blog-details.html?id=${item.id}" class="link-btn">Đọc thêm
                    <span class="svg-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                        <path
                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                            fill="currentColor"
                        />
                        <path
                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                            fill="currentColor"
                        />
                        </svg>
                    </span>
                    </a>
                </div>
                </div>
            </div>`;
      });
      elArticles.innerHTML = html;
      elCategoryTitle.innerText = `${categoryName}`;
      renderPagination(totalPages);

      if (categoryName) {
        document.title = categoryName;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderPagination(total) {
  const disabledPrev = currentPage === 1 ? 'pointer-events-none' : '';

  let html = /*html*/ `<li class="page-item ${disabledPrev} page-link "><a class=" page-link-prev" href="#"> < </a></li>`;

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(total, currentPage + 2);
  console.log(currentPage);
  console.log('endPage', endPage);
  console.log('startPage', startPage);

  if (currentPage <= 3) {
    endPage = Math.min(8, total);
  }

  if (currentPage > total - 2) {
    startPage = Math.max(total - 7, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const active = i === currentPage ? 'active pointer-events-none' : '';
    html += /*html*/ `<li class="page-item ${active}"><a class="page-link" href="#">${i}</a></li>`;
  }
  const disabledNext = currentPage === endPage ? 'pointer-events-none' : '';

  html += /*html*/ `<li class="page-item ${disabledNext} page-link "><a class="page-link-next" href="#">></a></li>`;

  elPagination.innerHTML = html;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  console.log('Geolocation is not supported by this browser.');
}

function success(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  const key = '9cef6d64228184a0e4dd9dc212583d4a';
  apiThoitiet(latitude, longitude, key);
}

function error() {
  const latitude = '20.995050';
  const longitude = '105.849899';
  const key = '9cef6d64228184a0e4dd9dc212583d4a';
  apiThoitiet(latitude, longitude, key);
}

function apiThoitiet(lat, lon, keys) {
  API.call()
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keys}&lang=vi`)
    .then((res) => {
      const article = res.data;
      const articleWeather = res.data.weather;

      articleWeather.forEach((item) => {
        htmlPostWrap += /* html */ `
      <div class="hot-post-item">
        <h4 class="hot-post-thumb ">
          THỜI TIẾT HÔM NAY
        </h4>
        <div class="hot-post-content">
            <div class="blog-post-meta">
            <h6 class="post-title fs-3">${article.name}</h6>
            </div>
            <h5 class="post-tag fs-5">${item.main}</h5>
            <h5 class="post-title fs-3">
            ${parseInt(article.main.temp_min - 273.15)}°C
            </h5>
            <h4 class="post-title">
            ${item.description}
            </h4>
        </div>
      </div>`;
      });

      elArticlesRecentNews.innerHTML = htmlPostWrap;
    });
}

API.call()
  .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1`)
  .then((res) => {
    const article = res.data;
    console.log(article);

    htmlPostWrap += /* html */ `
    <table border="1"  cellspacing="0" class="mb-5">
      <tr class="btn-boder">
          <td class="btn-boder btn-boders"><h5 class="boder-glod">Giá Coin</h5></td>
          <td class="btn-boder btn-boders"><h5 class="boder-glod">Giá coin hiện tại</h5></td>
          <td class="btn-boder btn-boders"><h5 class="boder-glod">Giá coin trong 24H</h5></td>
      </tr>`;

    article.forEach((item) => {
      htmlPostWrap += /* html */ `
      <tr class="btn-boder">
        <td class="btn-boder"><h5 class="boder-glod-name">${item.name}</h5></td>
        <td class="btn-boder"><span class="boder-value">${item.current_price} USD</span></td>
        <td class="btn-boder"><span class="boder-value">${item.low_24h} USD</span></td>
      </tr>`;
    });
    htmlPostWrap += /* html */ `</table>`;

    elArticlesRecentNews.innerHTML = htmlPostWrap;
  });

API.call()
  .get(`https://apiforlearning.zendvn.com/api/get-gold`)
  .then((res) => {
    const article = res.data;
    console.log(res);

    htmlPostWrap += /* html */ `
  <table border="1"  cellspacing="0" class="mb-5">
    <tr class="btn-boder">
        <td class="btn-boder btn-boders"><h5 class="boder-glod">Giá vàng </h5></td>
        <td class="btn-boder btn-boders"><h5 class="boder-glod">Giá vàng hiện tại</h5></td>
        <td class="btn-boder btn-boders"><h5 class="boder-glod">Giá vàng trong 24H</h5></td>
    </tr>`;

    article.forEach((item) => {
      htmlPostWrap += /* html */ `
    <tr class="btn-boder">
      <td class="btn-boder"><h5 class="boder-glod-name">${item.type}</h5></td>
      <td class="btn-boder"><span class="boder-value">${item.sell} USD</span></td>
      <td class="btn-boder"><span class="boder-value">${item.buy} USD</span></td>
    </tr>`;
    });
    htmlPostWrap += /* html */ `</table>`;

    elArticlesRecentNews.innerHTML = htmlPostWrap;
  });
