const elTrendingPostsBig = document.getElementById('trendingPostsBig');
const elTrendingPostsSmall = document.getElementById('trendingPostsSmall');
const elEditorChoices = document.getElementById('editorChoice');
const elArticlesByCategories = document.getElementById('articlesByCategories');
const elPopularSidePosts = document.getElementById('popularSidePosts');
const elCategoryArticlesList = document.getElementById('CategoryArticlesList');
const elPostAreaList = document.getElementById('postAreaList');
const elArticleAside = document.getElementById('articleAside');

//============================================RENDER ARTICLES TRENDING=======================================

API.call()
  .get('articles/popular?limit=4')
  .then(function (response) {
    const data = response.data.data;
    const id = response.data.data[0].id;
    const firstData = response.data.data[0];
    const publishDate = dayjs(firstData.publish_date).fromNow();
    const publish_DateFormat = dayjs(firstData.publish_date).format('YYYY-MM-DD');

    const liked = LIKED_POSTS.includes(id) ? 'liked' : '';

    let htmlTrendingPosts = /*html */ `
    <div class="banner-post-thumb-two">
        <a href="blog-details.html?id=${firstData.id}"><img src="${firstData.thumb}" alt="" /></a>
        </div>
        <div class="banner-post-content-two">
        <a href="category.html?id=${firstData.category.id}" class="post-tag">${firstData.category.name}</a>
        <h2 class="post-title bold-underline">
            <a href="blog-details.html?id=${firstData.id}"
            >${firstData.title}
            </a>
            <i class="fa fa-heart icon-like ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${firstData.id}"  data-title="${firstData.title}"></i>
        </h2>
        <div class="blog-post-meta white-blog-meta">
            <ul class="list-wrap">
            <li><i class="flaticon-user"></i><a href="author.html">${firstData.author}</a></li>
            <li><i class="flaticon-calendar"></i>${publishDate}</li>
            </ul>
        </div>
    </div>`;
    elTrendingPostsBig.innerHTML = htmlTrendingPosts;
    htmlTrendingPosts = '';
    data.map((item, index) => {
      if (index > 0) htmlTrendingPosts += renderArticlesTrending(item, index);
    });
    elTrendingPostsSmall.innerHTML = htmlTrendingPosts;
  });
// ===========================================EDITOR CHOICE=========================================
// API.call()
//   .get('articles?limit=4')
//   .then(function (response) {
//     const data = response.data.data;

//     let html = '';
//     data.map((item, index) => {
//       html += renderArticlesEditorChoice(item, index);
//     });
//     elEditorChoices.innerHTML = html;
//   });

//===========================================RENDER ARTICLES BY ITS CATEGORY 1==============================
API.call()
  .get('categories_news/articles?limit_cate=3&limit=4')
  .then(function (response) {
    const data = response.data.data;
    let html = '';

    data.map((item, index) => {
      const categoryName = item.name;
      const categoryId = item.id;
      const articles = item.articles;
      let wrapper = index % 2 === 0 ? 'recent-post-wrap' : 'recent-post-wrap';
      html += /*html */ `
      <div class="${wrapper}">
          ${renderCategoryArticlesTitle(categoryName, item)}

          ${renderCategoryArticles(articles, categoryName, index, item, categoryId)}
      <!-- End .row -->
      </div>
          
  `;
    });

    elArticlesByCategories.innerHTML = html;
  });

//================================RENDER ARTICLES BY ITS CATEGORY 2==========================
API.call()
  .get(`articles?limit=4&page=1`)
  .then(function (response) {
    const data = response.data.data;

    let html = '';

    data.map((item, index) => {
      const categoryName = item.category.name;

      html += /*html */ `
          ${renderCategoryArticlesType2(categoryName, index, item)}`;
    });

    elCategoryArticlesList.innerHTML = html;
  });

//===========================================RENDER ARTICLES SIDE==============================
API.call()
  .get('articles/popular?limit=11')
  .then(function (response) {
    const data = response.data.data;

    let html = '';
    data.map((item, index) => {
      html += renderArticlesSide(item, index);
    });
    elPopularSidePosts.innerHTML = html;
  });

API.call()
  .get('categories_news/13/articles?limit=9')
  .then(function (response) {
    const data = response.data.data;
    lagrgeArticle = data[0];
    const publishDate = dayjs(lagrgeArticle.publish_date).fromNow();
    const liked = LIKED_POSTS.includes(lagrgeArticle.id) ? 'liked' : '';
    let html = /* html */ `
    <div class="sidebar-overlay-post">
      <div class="so-post-thumb">
        <a href="blog-details.html?id=${lagrgeArticle.id}"><img src="${lagrgeArticle.thumb}" alt="" /></a>
      </div>
      <div class="so-post-content">
        <h4 class="post-title">
          <a href="blog-details.html?id=${lagrgeArticle.id}">${lagrgeArticle.title}
          </a>
          <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${lagrgeArticle.id}"  data-title="${lagrgeArticle.title}"></i>
        </h4>
        <div class="blog-post-meta white-blog-meta">
          <ul class="list-wrap">
            <li><i class="flaticon-calendar"></i>${publishDate}</li>
          </ul>
        </div>
      </div>
    </div>`;
    data.map((item, index) => {
      if (index > 0) html += renderPopularAside(item, index);
    });
    elArticleAside.innerHTML = html;
  });
//===========================================RENDER post area==============================
// API.call()
//   .get('articles/popular?limit=4')
//   .then(function (response) {
//     const data = response.data.data;

//     let html = '';
//     data.map((item, index) => {
//       html += renderPostArea(item, index);
//     });
//     elPostAreaList.innerHTML = html;
//   });

function renderCategoryArticlesTitle(name, item) {
  return /*html */ `
  <div class="section-title-wrap mb-30">
    <div class="section-title">
      <h2 class="title">${name}</h2>
    </div>
    <div class="view-all-btn">
      <a href="category.html?id=${item.id}" class="link-btn"
        >Xem thêm
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
    <div class="section-title-line"></div>
  </div>`;
}

function renderCategoryArticles(articles, categoryName, idx, item, categoryId) {
  let htmlArticleBig = '';
  let htmlArticlesSmall = '';
  console.log(articles);
  articles.map((article, index) => {
    const publishDate = dayjs(article.publish_date).fromNow();
    const liked = LIKED_POSTS.includes(article.id) ? 'liked' : '';
    const thumb = article.thumb;
    const title = article.title;
    const author = article.author;
    const id = article.id;
    if (index < 1 && idx % 2 == 0) {
      htmlArticleBig += /*html */ `
      <div class="overlay-post-two">
        <div class="overlay-post-thumb">
          <a href="blog-details.html?id=${id}"><img src="${thumb}" alt="" class="w-100" class="img-ratio"/></a>
        </div>
        <div class="overlay-post-content">
          <h2 class="post-title">
            <a href="blog-details.html?id=${id}">${title}
            </a>
            <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${article.id}"  data-title="${article.title}"></i>
          </h2>
          <div class="blog-post-meta white-blog-meta">
            <ul class="list-wrap">
              <li><i class="flaticon-user"></i><a href="author.html">${author}</a></li>
              <li><i class="flaticon-calendar"></i>${publishDate}</li>
            </ul>
          </div>
        </div>`;
    } else if (index >= 1 && idx % 2 == 0) {
      htmlArticlesSmall += /*html*/ `
        <div class="horizontal-post-two">
          <div class="horizontal-post-thumb">
            <a href="blog-details.html?id=${id}"><img class="img-ratio" src="${thumb}" alt="" /></a>
          </div>
          <div class="horizontal-post-content">
             
            <h2 class="post-title">
              <a href="blog-details.html?id=${id}">${title}
              </a>
              <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${article.id}"  data-title="${article.title}"></i>
            </h2>
            <div class="blog-post-meta">
              <ul class="list-wrap">
                <li><i class="flaticon-calendar"></i>${publishDate}</li>
              </ul>
            </div>
          </div>
        </div>`;
    } else if (index < 1 && idx % 2 == 1) {
      htmlArticleBig += /*html */ `
       <div class="trending-post">
          <div class="trending-post-thumb">
            <a href="blog-details.html?id=${id}"><img src="${thumb}" alt="" class="img-ratio"/></a>
          </div>
          <div class="trending-post-content">
            <h2 class="post-title bold-underline">
              <a href="blog-details.html?id=${id}">${article.title}</a>
              <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${article.id}"  data-title="${article.title}"></i>
            </h2>
            <div class="blog-post-meta">
              <ul class="list-wrap">
                <li><i class="flaticon-user"></i><a href="author.html">${author}</a></li>
                <li><i class="flaticon-history"></i>${publishDate}</li>
              </ul>
            </div>
            <p>
              ${article.description}
            </p>
            <div class="view-all-btn">
              <a href="blog-details.html?id=${id}" class="link-btn"
                >Xem thêm
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
    } else if (index >= 1 && idx % 2 == 1) {
      htmlArticlesSmall += /*html */ `
      <div class="col-lg-4 col-md-6">
        <div class="trending-post-two">
          <div class="trending-post-thumb-two">
            <a href="blog-details.html?id=${id}"><img src="${thumb}" alt="" class="img-ratio"/></a>
          </div>
          <div class="trending-post-content-two">
            <h2 class="post-title"><a href="blog-details.html?id=${id}">${article.title}</a>
            <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${article.id}"  data-title="${article.title}"></i>
            </h2>
            
            <div class="blog-post-meta">
              <ul class="list-wrap">
                <li><i class="flaticon-user"></i><a href="author.html">${author}</a></li>
                <li><i class="flaticon-calendar"></i>${publishDate}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
    }
  });
  let rowClass = idx % 4 === 2 ? '' : 'flex-row-reverse';
  let rowJustify = idx % 2 === 0 ? '' : 'justify-content-center';
  let htmlType = '';
  if (idx % 2 == 0) {
    htmlType = `
    <div class="col-54">
      ${htmlArticleBig}    
    </div>

    </div>

    <div class="col-46">
      ${htmlArticlesSmall}
    </div>
    `;
  } else {
    htmlType = `
    <div class="col-lg-12">
      ${htmlArticleBig}    
    </div>

      ${htmlArticlesSmall}
    `;
  }
  return /*html*/ `
  <div class="row ${rowClass} ${rowJustify}">
    ${htmlType}
  </div>
    `;
}

function renderArticlesEditorChoice(item, index) {
  const publishDate = dayjs(item.publish_date).fromNow();
  const liked = LIKED_POSTS.includes(item.id) ? 'liked' : '';
  return /*html */ `
  <div class="col-lg-4">
    <div class="editor-post-item">
      <div class="editor-post-thumb">
        <a href="blog-details.html?id=${item.id}"><img src="${item.thumb}" alt="" /></a>
      </div>
      <div class="editor-post-content">
        <a href="category.html?id=${item.category.id}" class="post-tag-two">${item.category.name}</a>
        <h2 class="post-title"><a href="blog-details.html?id=${item.id}">${item.title}
        </a>
        <i class="fa fa-heart icon-like ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i></h2>
        <div class="blog-post-meta">
          <ul class="list-wrap">
            <li><i class="flaticon-calendar"></i>${publishDate}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
}

function renderArticlesTrending(item, index) {
  const publishDate = dayjs(item.publish_date).fromNow();
  const liked = LIKED_POSTS.includes(item.id) ? 'liked' : '';

  return /*html */ `
  <div class="banner-post-two small-post">
  <div class="banner-post-thumb-two">
    <a href="blog-details.html?id=${item.id}"><img src="${item.thumb}" alt="" /></a>
  </div>
  <div class="banner-post-content-two">
    <a href="category.html?id=${item.category.id}" class="post-tag">${item.category.name}</a>
    <h2 class="post-title">
      <a href="blog-details.html?id=${item.id}">${item.title}
      </a>
      <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i>
    </h2>
    <div class="blog-post-meta white-blog-meta">
      <ul class="list-wrap">
        <li><i class="flaticon-calendar"></i>${publishDate}</li>
      </ul>
    </div>
  </div>
</div>`;
}

function renderPostArea(item, index) {
  const publishDate = dayjs(item.publish_date).fromNow();
  const liked = LIKED_POSTS.includes(item.id) ? 'liked' : '';
  return /*html */ `
  <div class="col-lg-3">
  <div class="overlay-post-three">
    <div class="overlay-post-thumb-three">
      <a href="blog-details.html?id=${item.id}"><img src="${item.thumb}" alt="" /></a>
    </div>
    <div class="overlay-post-content-three">
      <a href="category.html?id=${item.category.id}" class="post-tag">${item.category.name}</a>
      <h2 class="post-title bold-underline">
        <a href="blog-details.html?id=${item.id}">${item.title}
        </a>
        <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i>
      </h2>
      <div class="blog-post-meta white-blog-meta">
        <ul class="list-wrap">
          <li><i class="flaticon-user"></i><a href="author.html">${item.author}</a></li>
          <li><i class="flaticon-calendar"></i>${publishDate}</li>
        </ul>
      </div>
    </div>
  </div>
</div>`;
}
function renderArticlesSide(item, index) {
  const publishDate = dayjs(item.publish_date).fromNow();
  const liked = LIKED_POSTS.includes(item.id) ? 'liked' : '';
  return /*html */ `
  <div class="popular-post">
    
    <div class="content">
      <a href="category.html?id=${item.category.id}" class="post-tag-two">${item.category.name}</a>
      <h2 class="post-title"><a href="blog-details.html?id=${item.id}">${item.title}
      </a>
      <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i></h2>
      <div class="blog-post-meta">
        <ul class="list-wrap">
          <li><i class="flaticon-calendar"></i>${publishDate}</li>
        </ul>
      </div>
    </div>
  </div>`;
}

function renderCategoryArticlesType2(categoryName, idx, item) {
  const publishDate = dayjs(item.publish_date).fromNow();
  const thumb = item.thumb;
  const title = item.title;
  const id = item.id;
  const description = item.description;
  const liked = LIKED_POSTS.includes(item.id) ? 'liked' : '';
  return /*html */ `
    <div class="weekly-post-item weekly-post-two">
    <div class="weekly-post-thumb">
      <a href="blog-details.html?id=${id}"><img src="${thumb}" alt="" class="img-ratio"/></a>
    </div>
    <div class="weekly-post-content">
      <a href="category.html?id=${item.category.id}" class="post-tag">${categoryName}</a>
      <h2 class="post-title">
        <a href="blog-details.html?id=${id}">${title}
        </a>
        <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i>
      </h2>
      <div class="blog-post-meta">
        <ul class="list-wrap">
          <li><i class="flaticon-calendar"></i>${publishDate}</li>
        </ul>
      </div>
      <p>
      ${description}
      </p>
      <div class="view-all-btn">
        <a href="blog-details.html?id=${id}" class="link-btn"
          >Xem thêm
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
}

function renderPopularAside(item, index) {
  const publishDate = dayjs(item.publish_date).fromNow();
  const liked = LIKED_POSTS.includes(item.id) ? 'liked' : '';
  return /*html */ `
  <div class="popular-post">
    <div class="content">
      <h2 class="post-title"><a href="blog-details.html?id=${item.id}">${item.title}
      </a>
      <i class="fa fa-heart icon-like  ms-2 fs-4 ${liked}" aria-hidden="true" data-id="${item.id}"  data-title="${item.title}"></i></h2>
      <div class="blog-post-meta">
        <ul class="list-wrap">
          <li><i class="flaticon-calendar"></i>${publishDate}</li>
        </ul>
      </div>
    </div>
  </div>`;
}
