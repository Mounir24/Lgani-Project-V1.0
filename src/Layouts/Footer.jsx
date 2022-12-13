import React from "react";
// IMPORT ASSETS (LOGO - ...)
import Logo from "../Assets/ajidq-logo.png";

function Footer() {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="footer_wrapper">
          <div className="footer_body">
            <div className="ftr_logo_bx">
              <img src={Logo} alt="Propings" />
            </div>
            <h3 className="ftr_slogan text-center">
              Qr Code Tag Locator Lgani service <br />
              helps lost people & pets
            </h3>
          </div>
          <div className="footer_tail">
            {/*--- SOCIAL MEDIA LINKS ---*/}
            <div>
              <span className="ftr_label">Social Media</span>
              <ul className="ftr_social_media p-0">
                <li className="ftr_item">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i class="bx bxl-facebook"></i>
                  </a>
                </li>
                <li className="ftr_item">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i class="bx bxl-instagram"></i>
                  </a>
                </li>
                <li className="ftr_item">
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i class="bx bxl-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/*--- COPYRIGHTs  ---*/}
            <div className="ftr_cpoyright_wrapper">
              <p className="copyright_content_desc">
                {new Date().getFullYear()} - All rights reserved by
                <span className="brand_name"> Lgani</span>
              </p>
            </div>
            {/*--- SUPPORT ACTION VIA EMAIL  ---*/}
            <div className="ftr_support_action">
              <span className="ftr_label">Support</span>
              <a href="mailto:contact@lgani.com">contact@lgani.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
