import React from 'react';
//====== below img import start ======//
import logoPng from '../img/logo.png';
//====== above img import end ======//

function Footer() {
  return (
    <>
      {/* <!-- =========footer star========= --> */}
      <footer className="footer">
        <div className="footer_box">
          <div className="d-flex justify-content-center">
            <div className="footer_head">
              <a className="nav-font" href="#/">
                路線地圖
              </a>
            </div>
            <div className="footer_head">
              <a className="nav-font" href="#/">
                推薦攻略
              </a>
            </div>
            <a href="#/" className="footer_logo">
              <img src={logoPng} alt="footer_logo" />
            </a>
            <div className="footer_head">
              <a className="nav-font" href="#/">
                購物商城
              </a>
            </div>
            <div className="footer_head_last">
              <a className="nav-font_footerLast" href="#/">
                建議穿搭
              </a>
            </div>
          </div>

          <div className="footer_line"></div>

          <div className="d-flex justify-content-center">
            <div className="footer_info">聯絡資訊</div>
            <div className="footer_info">參考資訊</div>
          </div>
        </div>

        <div className="footer_copy d-flex justify-content-center">
          &copy;Copyright, Inc. 2021. MFEE17-第五組專題
        </div>
      </footer>
      {/* <!-- =========footer end========= --> */}
    </>
  );
}

export default Footer;
