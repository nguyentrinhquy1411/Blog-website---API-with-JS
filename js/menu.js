const elMainMenu = document.getElementById('mainMenu');
const favouriteArticles = document.getElementById('total-liked');
const favouriteVideos = document.getElementById('total-liked-video');

favouriteArticles.innerText = `(${LIKED_POSTS.length})`;
favouriteVideos.innerText = `(${LIKED_VIDEO.length})`;
API.callWithToken()
  .get('/auth/me')
  .then((resMe) => {
    const name = resMe.data.data.name;
    elMainMenu.innerHTML = /* html */ ` 
    <li class="header-sine-in dropdown">
    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="flaticon-user"></i>${name}
  </a>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a class="dropdown-item" href="profile.html">Thông tin</a></li>
            <li><a class="dropdown-item" href="admin-create-article.html">Thêm bài viết</a></li>
            <li><a class="dropdown-item" href="admin-list-article.html">Quản lý bài viết</a></li>
            <li><a class="dropdown-item" href="change-password.html">Đổi mật khẩu</a></li>
            <li class="dropdown-divider" style="
            padding-bottom: 0px;
            padding-top: 0px;"></li>
            <li><a class="dropdown-item d-flex" href="#" id="btnLogout">Đăng xuất<i class="fa-solid fa-right-from-bracket icon-custom"></i></a> </li>
        </ul>
    </li>`;
  })
  .catch((err) => {
    elMainMenu.innerHTML = /* html */ ` 
        <li class="header-sine-in">
            <a href="login.html"><i class="flaticon-user"></i>Đăng Nhập</a>
        </li>`;
  });

elMainMenu.addEventListener('click', function (e) {
  const el = e.target;

  if (el.id === 'btnLogout') {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = 'index.html';
  }
});
