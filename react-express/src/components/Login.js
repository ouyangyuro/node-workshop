import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
//====== below img import start ======//
import logoPng from '../img/logo.png';
//====== above img import end ======//

function Login(props) {
  // console.log(props);
  const { auth, setAuth } = props;
  return (
    <>
      <div className="d-flex">
        <div className="w-50-l bg-pic p-3 position-relative">
          <div className="position-absolute logobox">
            <figure className="logo">
              <img src={logoPng} alt="logo" />
            </figure>
          </div>
        </div>
        <div className="w-50-l p-5 align-self-center">
          <form>
            <h2 className="text-center pb-5 title">會員登入</h2>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                帳號
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="請輸入您的email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                密碼
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="請輸入您的密碼"
              />
            </div>
            <div className="mb-3 text-center">
              <Link
                className="signUp-L"
                to="/"
                onClick={() => {
                  setAuth(true);
                  //出現訊息
                  alert('hello you are in');
                  //跳回首頁
                  props.history.push('/');
                }}
              >
                登入
              </Link>
              <span> or </span>
              <Link className="signUp-L" to="/signup">
                註冊會員
              </Link>
            </div>
            <hr />
          </form>
          <span>目前登入情況: {auth ? '登入中' : '未登入'}</span>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
