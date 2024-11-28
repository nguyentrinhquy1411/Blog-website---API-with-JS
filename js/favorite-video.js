document.querySelector('title').innerText = `NewsBlog | ${'Video yêu thích'}`;
const elArticlesRecentNews = document.getElementById('articlesRecentNews');
let htmlPostWrap = '';

if (LIKED_VIDEO.length === 0) {
  document.getElementById('title-favourite-video').innerText = 'Hãy thêm video yêu thích của bạn!!';
}

LIKED_VIDEO.forEach((articleId) => {
  fetch(`https://apiforlearning.zendvn.com/api/videos/${articleId}`)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      const thumb = JSON.parse(res.thumbnail);
      const liked = LIKED_VIDEO.includes(articleId.id) ? 'liked' : '';

      const content = /* html */ `
      <div class="weekly-post-item weekly-post-four article-item-liked">
      <div class="weekly-post-thumb">
          <a href="blog-details-video.html?id=${res.id}"><img src="${thumb.maxres.url}" alt="" type="with=${
        thumb.high.with
      }px height=${thumb.high.height}px"></a>
      </div>
      <div class="weekly-post-content">
          <h2 class="post-title"><a href="blog-details-video.html?id=${res.id}">${res.title}</a></h2>
          <div class="blog-post-meta">
              <ul class="list-wrap">
                  <li><i class="flaticon-calendar"></i>${dayjs(res.updated_at).format('YYYY-MM-DD')}</li>
                  <li><i class="flaticon-history"></i>${dayjs(res.updated_at).fromNow()}</li>
              </ul>
          </div>
          <div class="view-all-btn">
              <a href="blog-details-video.html?id=${res.id}" class="link-btn">Xem thêm 
                  <span class="svg-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" fill="none">
                          <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                          <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="currentColor" />
                      </svg>
                  </span>
              </a>
              <i class="fa fa-heart icon-like-video liked remove-liked ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${
        res.id
      }"  data-title="${res.title}"></i>
          </div>
      </div>
  </div>`;
      elArticles.innerHTML += content;
    });
});

//Minh
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
        <h2 class="hot-post-thumb ">
          THỜI TIẾT HÔM NAY
        </h2>

          <div class="hot-post-item">
              <h4 class="hot-post-thumb "> THỜI TIẾT HÔM NAY </h4>
              <div class="hot-post-content">
                  <div class="blog-post-meta">
                     <h6 class="post-title fs-3">${article.name}</h6>
                  </div>
                  <h5 class="post-tag fs-5">${item.main}</h5>
                  <h6 class="post-title fs-3">${parseInt(article.main.temp_min - 273.15)}°C</h6>
                  <h5 class="post-title">${item.description}</h5>
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
