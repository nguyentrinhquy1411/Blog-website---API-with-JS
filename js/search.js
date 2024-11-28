// const elArticles = document.getElementById('articles');
// const elCategoryTitle = document.getElementById('categoryTitle');
// const elPagination = document.getElementById('myPagination');
const elArticlesRecentNews = document.getElementById('articlesRecentNews');

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get('keyword');

let currentPage = parseInt(urlParams.get('page'));
if (isNaN(currentPage)) currentPage = 1;

getArticles(currentPage);

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
// trang
elPagination.addEventListener('click', function (e) {
  const el = e.target;

  if (el.classList.contains('page-link')) {
    currentPage = parseInt(el.innerText);
    getArticles(currentPage);
    addOrUpdateUrlParameter('page', currentPage);
  }
  if (el.classList.contains('page-link-prev')) {
    currentPage--;
    getArticles(currentPage);
    addOrUpdateUrlParameter('page', currentPage);
  }

  if (el.classList.contains('page-link-next')) {
    currentPage++;
    getArticles(currentPage);
    addOrUpdateUrlParameter('page', currentPage);
  }
});

//
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
    .get(`articles/search?q=${keyword}&limit=10&page=${page}`)
    .then((res) => {
      const articles = res.data.data;
      let categoryName = '';
      const totalPages = res.data.meta.last_page;
      const total = res.data.meta.total;

      let html = '';
      articles.forEach((item) => {
        const regex = new RegExp(keyword, 'gi');
        const title = item.title.replace(regex, (match) => `<mark>${match}</mark>`);
        const thumb = item.thumb;
        const publish_Date = dayjs(item.publish_date).fromNow();
        const publish_DateFormat = dayjs(item.publish_date).format('YYYY-MM-DD');
        const description = item.description.replace(regex, (match) => `<mark>${match}</mark>`);
        categoryName = item.category.name;

        html += /* html */ `
                <div class="weekly-post-item weekly-post-four">
                    <div class="weekly-post-thumb">
                    <a href="blog-details.html?id=${item.id}"><img src="${thumb}" alt="${title}" /></a>
                    </div>
                    <div class="weekly-post-content">
                    <a href="blog-details.html?id=${item.id}" class="post-tag">${categoryName}</a>
                    <h2 class="post-title">
                        <a href="blog-details.html?id=${item.id}">${title}
                        </a>
                        <i class="fa fa-heart icon-like ms-2 fs-4" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i>
                    </h2>
                    <div class="blog-post-meta">
                      <ul class="list-wrap">                     
                          <li><i class="flaticon-history"></i>${publish_DateFormat}</li>
                          <li><i class="flaticon-calendar"></i>${publish_Date}</li>
                      </ul>
                    </div>
                    <p> ${description} </p>
                    <div class="view-all-btn">
                        <a href="blog-details.html?id=${item.id}" class="link-btn">Read More
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
      elCategoryTitle.innerText = `Tìm thấy ${total} bài viết với từ khóa "${keyword}"`;
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

  if (currentPage <= 3) {
    endPage = Math.min(5, total);
  }

  if (currentPage > total - 2) {
    startPage = Math.max(total - 4, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const active = i === currentPage ? 'active' : '';
    html += /*html*/ `<li class="page-item ${active}"><a class="page-link" href="#">${i}</a></li>`;
  }
  const disabledNext = currentPage === endPage ? 'pointer-events-none' : '';

  html += /*html*/ `<li class="page-item ${disabledNext} page-link "><a class="page-link-next" href="#">></a></li>`;

  elPagination.innerHTML = html;
}

//Minh
let htmlPostWrap =''
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
          <td class="btn-boder"><h5 class="boder-glod">Giá Coin</h5></td>
          <td class="btn-boder"><h5 class="boder-glod">Giá vàng hiện tại</h5></td>
          <td class="btn-boder"><h5 class="boder-glod">Giá vàng trong 24H</h5></td>
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
var myHeaders = new Headers();
myHeaders.append('x-access-token', 'goldapi-34z4usm1qfg14x-io');
myHeaders.append('Content-Type', 'application/json');

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

fetch('https://www.goldapi.io/api/XAU/USD', requestOptions)
  .then((response) => response.text())
  .then((result) => { 
    const thumb = JSON.parse(result);
    console.log(thumb);
  
    htmlPostWrap += /* html */ `
    <table border="1"  cellspacing="0" class="mb-5" style="width: 100%">
      <!-- Dòng 1 -->
      <tr class="btn-boder">
          <td class="btn-boder" style="width: 30%"><h5 class="boder-glod">Giá Vàng</h5></td>
          <td class="btn-boder " style="width: 100%"><h5 class="boder-glod">Giá vàng hiện tại</h5></td>
      </tr>
      <!-- Dòng 2 -->
      <tr class="btn-boder">
          <td class="btn-boder" style="width: 30%"><h5 class="boder-glod-names">Giá vàng</h5></td>
          <td class="btn-boder" style="width: 100%"><span class="boder-values">${thumb.price}</span> <span></span></td>
      </tr>
    </table>`;
    elArticlesRecentNews.innerHTML = htmlPostWrap;})
  .catch((error) => console.log('error', error));

API.call()
  .get(`/articles?limit=4&page=1`)
  .then((res) => {
    const article = res.data.data;

    let htmlCategories = '';

    article.forEach((item, index) => {
      htmlCategories += /* html */ `
        <li class="mb-5">
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

      elArticlesRecentNews.innerHTML = htmlCategories;
    });
  });

