// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get('id'));

const elDetailsContent = document.getElementById('detailsContent');
const elDetailsVideo = document.getElementById('detailsVideo');
const elAuthorSection = document.getElementById('authorSection');
const elActive = document.querySelector('.active');
const elCommentContent = document.getElementById('commentContent');
const elCommentMessageReply = document.getElementById('commentMessageReply');
const elCommentForm = document.getElementById('commentForm');
const elListComment = document.getElementById('ListComment');
const elCancelReply = document.getElementById('cancelReply');
const elReplyEmail = document.getElementById('replyEmail');
const elTotalComment = document.getElementById('totalComment');
const elCommentNotice = document.getElementById('commentNotice');
const elSidebarCategories = document.getElementById('sidebarCategories');
const elHotPostWrap = document.getElementById('hotPostWrap');
let watched = JSON.parse(localStorage.getItem('watched')) || [];
let htmlPostWrap = '';
let videoClick = '';

API.callWithToken()
  .get('/auth/me')
  .then((res) => {
    email = res.data.data.email;
    elCommentForm.classList.remove('d-none');
    elCommentNotice.classList.add('d-none');
  })
  .catch((err) => {
    elCommentNotice.classList.remove('d-none');
    elCommentForm.classList.add('d-none');
  })
  .finally(function () {
    renderComments(commentByArticle);
  });

const COMMENTS = JSON.parse(localStorage.getItem('COMMENTS')) || [];
console.log(COMMENTS);

let commentByArticle = COMMENTS.filter((item) => item.articleId === id);
let level = 1;
let parentCommentId = null;

API.call()
  .get(`https://apiforlearning.zendvn.com/api/videos/${id}`)
  .then((res) => {
    const article = res.data;
    console.log(article);
    const statistics = JSON.parse(article.statistics);
    const thumb = JSON.parse(article.thumbnail);
    console.log(thumb);
    let htmlContent = '';
    let htmlAuthor = '';
    if (article.title) {
      document.title = article.title;
    }
    htmlContent = /* html */ `
    <div class="blog-details-content-top">
        <h2 class="title" id="articleTitle">${article.title}
        <i class="fa fa-heart icon-like-video ms-2 fs-4" aria-hidden="true" data-id="${article.id}"  data-title="${
      article.title
    }"></i></h2>
        <div class="bd-content-inner">
            <div class="blog-post-meta">
                <ul class="list-wrap">
                    <li><i class="flaticon-user"></i>view: ${statistics.viewCount}</li>
                    <li id="PublishDate"><i class="flaticon-calendar"></i>${dayjs(article.published_at).format(
                      'YYYY-MM-DD',
                    )}</li>
                    <li><i class="flaticon-chat"></i><a href="blog-details.html" id="CommentsNmuber">${
                      statistics.commentCount
                    }</a></li>
                    <li id="PublishDateTime"><i class="flaticon-history" ></i>${dayjs(
                      article.published_at,
                    ).fromNow()}</li>
                </ul>
            </div>
            <div class="blog-details-social">
                <ul class="list-wrap">
                    <li>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="blog-details-video">
        <img src="${thumb.maxres.url}" alt="">
        <a href="http://www.youtube.com/embed/fMY2FRPKcXE" class="paly-btn popup-video"><i class="fas fa-play"></i></a>
    </div>`;

    htmlAuthor += /* html */ `
    <div class="blog-avatar-info">
    <h4 class="name"><a href="author.html">${article.title}</a></h4>
    <p>${article.description}</p>
    </div>`;

    elActive.innerText = article.title;
    elDetailsContent.innerHTML = htmlContent;
    elAuthorSection.innerHTML = htmlAuthor;
  });

API.call()
  .get(`https://apiforlearning.zendvn.com/api/playlists/${id}/videos?offset=0&limit=200&sort_by=id&sort_dir=asc`)
  .then((res) => {
    const articles = res.data;
    let htmlRenderVd = '';
    articles.forEach((item) => {
      htmlRenderVd = /* html */ ` 
        <div class="weekly-post-item article-item-liked btn-detailsVideo my-1 btn-video" data-id="${item.id}">
            <div class="weekly-post-content my-0">
                <h2 class="post-title my-0"><a href="blog-details-video.html?id=${item.id}" class="clickDetailVdieo">${item.title}</a></h2>
            </div>
        </div>`;
      elDetailsVideo.innerHTML += htmlRenderVd;
    });
    // video đã xem
    const elBtnVideo = document.querySelectorAll('.btn-video');
    elBtnVideo.forEach((el) => {
      el.addEventListener('click', () => {
        if (!watched.includes(el.dataset.id)) {
          watched.push(el.dataset.id);
          localStorage.setItem('watched', JSON.stringify(watched));
        }
      });
      if (watched.includes(el.dataset.id)) {
        el.classList.add('bg-secondary');
      }
    });
  });

//binh luan video
elCommentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const content = elCommentContent.value.trim();

  if (content) {
    const newComment = {
      id: self.crypto.randomUUID(),
      email,
      content: level === 1 ? content : `<p class="text-danger">@${elReplyEmail.innerText}:</p> ${content}`,
      deteTime: dayjs().format('YYYY-MM-DD H:i:s'),
      articleId: id,
      likes: 0, // Bắt đầu với số lượt like = 0
      likedByUser: false // Trạng thái người dùng chưa like
    };
  
    if (parentCommentId) {
      const parentIdx = COMMENTS.findIndex((item) => item.id === parentCommentId);
      COMMENTS[parentIdx].childItems.push(newComment);
    } else {
      newComment.childItems = [];
      COMMENTS.unshift(newComment);
    }
    localStorage.setItem('COMMENTS', JSON.stringify(COMMENTS));
    commentByArticle = COMMENTS.filter((item) => item.articleId === id);
    renderComments(commentByArticle);
    elCommentContent.value = '';
    parentCommentId = null;
    elCommentMessageReply.classList.add('d-none');
  } else {
    alert('vui lòng nhập nội dung bình luận!');
  }
  parentCommentId = null;
  level = 1;
  elReplyEmail.innerText = '';
});

elListComment.addEventListener('click', function (e) {
  const el = e.target;

  // Xử lý sự kiện Like
  if (el.classList.contains('btn-like')) {
    const commentId = el.dataset.id;
    const commentIdx = COMMENTS.findIndex((item) => item.id === commentId);
    
    if (commentIdx !== -1) {
      // Nếu người dùng đã like, giảm số like
      if (COMMENTS[commentIdx].likedByUser) {
        COMMENTS[commentIdx].likes -= 1;
        COMMENTS[commentIdx].likedByUser = false;
      } else {
        // Nếu chưa like, tăng số like
        COMMENTS[commentIdx].likes += 1;
        COMMENTS[commentIdx].likedByUser = true;
      }
      
      // Cập nhật giao diện và lưu lại
      localStorage.setItem('COMMENTS', JSON.stringify(COMMENTS));
      renderComments(COMMENTS.filter((item) => item.articleId === id));
    }
  }

  // Xử lý sự kiện Reply
  if (el.classList.contains('btn-reply-comment')) {
    parentCommentId = el.dataset.parentId;
    level = parseInt(el.dataset.level);
    elReplyEmail.innerText = el.dataset.replyEmail;
    elCommentMessageReply.classList.remove('d-none');
  }
});

elCancelReply.addEventListener('click', function (e) {
  e.preventDefault();
  parentCommentId = null;
  level = 1;
  elReplyEmail.innerText = '';
  elCommentMessageReply.classList.add('d-none');
});

function renderComments(list) {
  let html = '';
  list.forEach((item) => {
    html += renderCommentItem(item, item.id, true);
  });
  elListComment.innerHTML = html;
  elTotalComment.innerText = `${list.length} bình luận`;
}

function renderCommentItem(data, parentId = null, isParent = true) {
  const level = isParent ? 1 : 2;

  const btnReply = email
    ? `<a href="#commentRespond" class="reply-btn btn-reply-comment" data-level="${level}" 
    data-reply-email="${data.email}" 
    data-parent-id="${parentId}">Trả lời</a>`
    : '';

  const dateTime = dayjs(data.dateTime).fromNow();
  const className = isParent ? 'list-wrap' : 'children';
  const numberAvatar = Math.floor(Math.random() * 6) + 1;

   // Chỉ hiển thị biểu tượng 👍 và số lượt like
  const btnLike = `<button class=" btn-likess ms-3"><i class="fa-solid fa-thumbs-up btn-like" data-id="${data.id}" data-liked="${data.likedByUser}"></i><span class="like-count ms-1">${data.likes}</span></button>`;

  let htmlChild = '';
  if (isParent && data.childItems.length > 0) {
    htmlChild += `<ul class="${className}">`;
    htmlChild += `<h6 class="comment-replies-title mb-4 text-muted text-uppercase" >
      ${data.childItems.length} replies </h6>`;
    data.childItems.forEach((itemChild) => {
      htmlChild += renderCommentItem(itemChild, parentId, false);
    });
    htmlChild += `</ul>`;
  }

  return /* html */ `
    <ul class="${className}"> 
      <li>
        <div class="comments-box">
          <div class="comments-avatar">
            <img src="./imge/person-${numberAvatar}.jpg" alt="img" />
          </div>
          <div class="comments-text">
            <div class="avatar-name">
              <h6 class="name">${data.email}</h6>
              <span class="date">${dateTime}</span>
            </div>
            <p>${data.content}</p>
            <div class="comment-actions">
              ${btnLike}
              ${btnReply}
            </div>
          </div>
        </div>
      </li>
      ${htmlChild}
    </ul>
  `;
}

function renderCommentChildItem(data) {
  const numberAvatar = Math.floor(Math.random() * 6) + 1;

  const btnReply = email
    ? `<a href="#commentRespond" class="reply-btn" data-level="${level}" 
      data-reply-email="${data.email}" 
      data-parent-id="${parentId}">Reply</a>`
    : '';

  const dateTime = dayjs(data.dateTime).fromNow();

  return /* html */ `
    <ul class="children">
    <li>
      <div class="comments-box">
        <div class="comments-avatar">
          <img src="./imge/person-${numberAvatar}.jpg" alt="img" />
        </div>
        <div class="comments-text">
          <div class="avatar-name">
            <h6 class="name">${data.email}</h6>
            <span class="date">${dateTime}</span>
          </div>
          <p>${data.content}</p>
          ${btnReply}
        </div>
      </div>
    </li>
  </ul>`;
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

      elHotPostWrap.innerHTML = htmlPostWrap;
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

    elHotPostWrap.innerHTML = htmlPostWrap;
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

  elHotPostWrap.innerHTML = htmlPostWrap;
  });

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

      elSidebarCategories.innerHTML = htmlCategories;
    });
  });
