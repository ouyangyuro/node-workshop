import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

//====== below icon star ======//
import { Cart } from 'react-bootstrap-icons';
import { BsSearch } from 'react-icons/bs';
//====== below icon end ======//

//====== below img import start ======//
import logoPng from '../img/logo.png';
//====== above img import end ======//

function Navbar(props) {
  const { auth, setAuth } = props;
  return (
    <>
      <header className="header sticky-top">
        {/* to home */}
        <Link to="/" className="logo_top">
          <img src={logoPng} alt="logo_top" />
        </Link>
        <div className="btns">
          <a href="#/" className="search_button h4">
            <BsSearch size={24} />
          </a>
          <a href="#/" className="shopping_button h4">
            <Cart size={24} />
          </a>
          {/* to Sign In */}
          {auth ? (
            <Link
              to="/"
              onClick={() => {
                setAuth(false);
                //出現訊息
                alert('you are out');
                //跳回首頁
                props.history.push('/');
              }}
              className="sign_button"
            >
              Log Out
            </Link>
          ) : (
            <Link to="/login" className="sign_button">
              Log In
            </Link>
          )}
        </div>
        {/* <!-- =========nav star========= --> */}
        <nav className="nav">
          <ul className="list-unstyled d-flex">
            <li>
              <Link className="nav-font" to="/">
                股票首頁
              </Link>
            </li>
            <li>
              <a className="nav-font" href="#/">
                關於
              </a>
            </li>
            <li>
              <Link className="nav-font" to="/">
                股票首頁
              </Link>
            </li>
            <li>
              <Link className="nav-font" to="/test1">
                test1
              </Link>
            </li>
            <li>
              <Link className="nav-font" to="/test2">
                test2
              </Link>
            </li>
          </ul>
        </nav>

        <div className="btn_nav">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        {/* <!-- =========nav end========= --> */}
      </header>
    </>
  );
}

export default withRouter(Navbar);
