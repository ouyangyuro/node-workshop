import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Signup(props) {
  // console.log(props);
  const { auth, setAuth } = props;
  return (
    <>
      <main>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <div className="content-all">
              <div className="text-center">
                <h1 className="h2 title">註冊會員</h1>
              </div>
              <div className="signUp d-flex justify-content-center pt-5">
                {/* form star */}
                <form>
                  <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-7 mb-3 account">
                      <label htmlFor="inputEmail2">Email 帳號</label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail2"
                        placeholder="請輸入您的email"
                      />
                    </div>
                    <div className="form-group col-7 mb-3">
                      <label htmlFor="inputPassword4">設定密碼</label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="請輸入您的密碼"
                      />
                    </div>
                    <div className="form-group col-7">
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword5"
                        placeholder="請再次輸入您的密碼"
                      />
                    </div>
                  </div>
                  {/* <!-- button --> */}
                  <div className="button-container text-right my-5">
                    <Link
                      className="btn btn-next btn btn-primary mr-3"
                      to="/login"
                      onClick={() => {
                        setAuth(false);
                        //出現訊息
                        alert('let login');
                        //跳回首頁
                        props.history.push('/login');
                      }}
                    >
                      完成
                    </Link>
                  </div>
                </form>
                {/* form end */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default withRouter(Signup);
