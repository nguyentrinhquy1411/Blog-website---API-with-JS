class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html */ `
      <!-- preloader -->
      <div id="preloader">
      <div class="loader-inner">
          <div id="loader">
              <h2 id="bg-loader">zaira<span>.</span></h2>
              <h2 id="fg-loader">zaira<span>.</span></h2>
          </div>
      </div>
  </div>
  <!-- preloader-end -->

  <!-- Dark/Light-toggle -->
  <div class="darkmode-trigger">
      <label class="modeSwitch">
          <input type="checkbox">
          <span class="icon"></span>
      </label>
  </div>
  <!-- Dark/Light-toggle-end -->

  <!-- Scroll-top -->
  <button class="scroll-top scroll-to-target" data-target="html">
      <i class="fas fa-angle-up"></i>
  </button>
  <!-- Scroll-top-end-->

  <!-- header-area -->
  <header class="header-style-three">
      <div id="header-fixed-height"></div>
        <div class="header-top-wrap-two d-none">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4">
                        <div class="header-top-left">
                            <div class="offcanvas-toggle">
                                <a href="javascript:void(0)" class="menu-tigger-two">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </a>
                            </div>
                            <div class="header-top-social">
                                <ul class="list-wrap">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="header-top-right">
                            <div class="header-search-wrap header-search-wrap-two">
                                <form action="#" id="formSearch" >
                                    <input type="text" placeholder="Tìm kiếm . . ." id="inputSearch">
                                    <button type="submit"><i class="flaticon-search"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <div id="sticky-header" class="menu-area menu-style-three">
          <div class="container">
              <div class="row">
                  <div class="col-12">
                      <div class="menu-wrap">
                          <nav class="menu-nav">
                              <div class="logo">
                                  <a href="index.html"><img class="round-logo" src="./imge/qym-high-resolution-logo.png" alt=""></a>
                              </div>
                              <div class="logo d-none">
                                  <a href="index.html"><img class="round-logo" src="./imge/qym-high-resolution-logo.png" alt=""></a>
                              </div>
                              <div class="navbar-wrap main-menu d-none d-lg-flex">
                                  <ul class="navigation">
                                      <li class="index"><a href="index.html">Trang Chủ</a>
                                      <li class="video"><a href="video.html">Video</a>
                                      <li class="menu-item-has-children categories"><a href="category.html?id=1">Danh Mục</a>
                                            <ul class="sub-menu" id="categories"></ul>   
                                      </li>
                                      <li class="favorite"><a class="nav-link" href="favorite.html"><i class="fa-solid fa-heart"></i><span class="text-danger" id="total-liked"></span></a></li>
                                      <li class="favorite-video"><a class="nav-link" href="favoriteVideo.html"><i class="fa-solid fa-video"></i><span class="text-danger" id="total-liked-video"></span></a></li>
                                  </ul>
                              </div>
                               <div class="header-top-right">
                          <div >
                                <div class="header-search-wrap">
                                <form action="#" id="formSearchMenu" >
                                    <input type="text" placeholder="Tìm kiếm . . ." id="inputSearchMenu">
                                    <button type="submit"><i class="flaticon-search"></i></button>
                                </form>
                                </div>
                          </div>
                      </div>
                              <div class="header-action d-none d-md-block">
                                  <ul class="list-wrap" id="mainMenu">
                                      <li class="header-sine-in">
                                          <a href="login.html"><i class="flaticon-user"></i>Đăng Nhập</a>
                                      </li>
                                  </ul>
                              </div>
                              <div class="mobile-nav-toggler"><i class="fas fa-bars"></i></div>
                          </nav>
                      </div>

                      <!-- Mobile Menu  -->
                      <div class="mobile-menu">
                          <nav class="menu-box">
                              <div class="close-btn"><i class="fas fa-times"></i></div>
                              <div class="nav-logo">
                                  <a href="index.html"><img class="round-logo" src="../imge/qym-high-resolution-logo.png" alt="Logo"></a>
                              </div>
                              <div class="nav-logo d-none">
                                  <a href="index.html"><img class="round-logo" src="../imge/qym-high-resolution-logo.png" alt="Logo"></a>
                              </div>
                              <div class="mobile-search">
                                  <form action="#" id="formSearchMobile">
                                      <input type="text" placeholder="Search here..." id="inputSearchMobile">
                                      <button type="submit"><i class="flaticon-search"></i></button>
                                  </form>
                              </div>
                              <div class="menu-outer">
                                  <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-->
                              </div>
                              <div class="social-links">
                                  <ul class="clearfix list-wrap">
                                      <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                      <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                      <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                      <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                      <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                  </ul>
                              </div>
                          </nav>
                      </div>
                      <div class="menu-backdrop"></div>
                      <!-- End Mobile Menu -->

                  </div>
              </div>
          </div>
      </div>

      <!-- offCanvas-area -->
      <div class="offCanvas-wrap">
          <div class="offCanvas-body">
              <div class="offCanvas-toggle">
                  <span></span>
                  <span></span>
              </div>
              <div class="offCanvas-content">
                  <div class="offCanvas-logo logo">
                      <a href="index.html" class="logo-dark"><img src="assets/img/logo/logo.png" alt="Logo"></a>
                      <a href="index.html" class="logo-light"><img src="assets/img/logo/w_logo.png" alt="Logo"></a>
                  </div>
                  <p>The argument in favor of using filler text goes something like this: If you use any real content in the Consulting Process anytime you reach.</p>
                  <ul class="offCanvas-instagram list-wrap">
                      <li><a href="assets/img/blog/hr_post01.jpg" class="popup-image"><img src="assets/img/blog/hr_post01.jpg" alt="img"></a></li>
                      <li><a href="assets/img/blog/hr_post02.jpg" class="popup-image"><img src="assets/img/blog/hr_post02.jpg" alt="img"></a></li>
                      <li><a href="assets/img/blog/hr_post03.jpg" class="popup-image"><img src="assets/img/blog/hr_post03.jpg" alt="img"></a></li>
                      <li><a href="assets/img/blog/hr_post04.jpg" class="popup-image"><img src="assets/img/blog/hr_post04.jpg" alt="img"></a></li>
                      <li><a href="assets/img/blog/hr_post05.jpg" class="popup-image"><img src="assets/img/blog/hr_post05.jpg" alt="img"></a></li>
                      <li><a href="assets/img/blog/hr_post06.jpg" class="popup-image"><img src="assets/img/blog/hr_post06.jpg" alt="img"></a></li>
                  </ul>
              </div>
              <div class="offCanvas-contact">
                  <h4 class="title">Get In Touch</h4>
                  <ul class="offCanvas-contact-list list-wrap">
                      <li><i class="fas fa-envelope-open"></i><a href="mailto:info@webmail.com">info@webmail.com</a></li>
                      <li><i class="fas fa-phone"></i><a href="tel:88899988877">888 999 888 77</a></li>
                      <li><i class="fas fa-map-marker-alt"></i> 12/A, New Booston, NYC</li>
                  </ul>
                  <ul class="offCanvas-social list-wrap">
                      <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                      <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                      <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="offCanvas-overlay"></div>
      <!-- offCanvas-area-end -->
  </header>
  <!-- header-area-end -->`;
  }
}

customElements.define('x-header', Header);
