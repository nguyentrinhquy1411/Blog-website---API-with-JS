class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html */ `
      <footer>
      <div class="footer-area">
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-7">
                <div class="footer-widget">
                  <div class="logo fw-logo">
                      <a href="index.html"><img class="round-logo" src="./imge/qym-high-resolution-logo.png" alt=""></a>
                  </div>
                  <div class="footer-content">
                    <p>
                      Browned butter and brown sugar caramelly goodness, crispy edges thick and soft centers and melty
                      little puddles of chocolate.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-5 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">Company</h4>
                  <div class="footer-link-wrap">
                    <ul class="list-wrap">
                      <li><a href="about.html">About Us</a></li>
                      <li><a href="contact.html">The Test Kitchen</a></li>
                      <li><a href="contact.html">Podcast</a></li>
                      <li><a href="contact.html">Events</a></li>
                      <li><a href="contact.html">Jobs</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">Get Help</h4>
                  <div class="footer-link-wrap">
                    <ul class="list-wrap">
                      <li><a href="contact.html">Contact & Faq</a></li>
                      <li><a href="contact.html">Oders & Returns</a></li>
                      <li><a href="contact.html">Gift Cards</a></li>
                      <li><a href="contact.html">Register</a></li>
                      <li><a href="contact.html">Catalog</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">Explore</h4>
                  <div class="footer-link-wrap">
                    <ul class="list-wrap">
                      <li><a href="contact.html">The Shop</a></li>
                      <li><a href="contact.html">Recipes</a></li>
                      <li><a href="contact.html">Food</a></li>
                      <li><a href="contact.html">Travel</a></li>
                      <li><a href="contact.html">Hotline</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-4 col-sm-6">
                <div class="footer-widget">
                  <h4 class="fw-title">Follow us On</h4>
                  <div class="footer-link-wrap">
                    <ul class="list-wrap">
                      <li><a href="#">facebook</a></li>
                      <li><a href="#">Twitter</a></li>
                      <li><a href="#">Instagram</a></li>
                      <li><a href="#">Youtube</a></li>
                      <li><a href="#">Pinterest</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>`;
  }
}

customElements.define('x-footer', Footer);
