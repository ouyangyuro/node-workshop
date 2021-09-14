import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { authURL } from '../utils/config';

function Signup(props) {
  // console.log(props);
  const { auth, setAuth } = props;

  //====== 存欄位值 ======//
  const [fields, setFields] = useState({
    email: 'test@123.com',
    password: '12345',
    confirmPassword: '12345',
    // photo: '',
  });

  //====== input onChange ======//
  const handleFieldChange = (e) => {
    const updatedValue = e.target.value;
    //=== 在拷貝的新物件上處理 ===//
    const updatedFields = {
      //=== 從原本的狀態物件拷貝 ===//
      ...fields,
      //=== 用新輸入的屬性與原物件作合併 ===//
      [e.target.name]: updatedValue, //es6新語法:物件合併後面蓋掉前面
    };
    //=== 設定回原狀態物件 ===//
    setFields(updatedFields);
  };

  //====== 接表單輸入的資料(Form) ======//
  const handleSumbmit = async (e) => {
    //=== 記住你輸入時的值,submit時不會清空 ===//
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      // console.log('formData:', formData); //for check
      // console.log('email:', formData.get('email')); //for check
      // console.log('password:', formData.get('password')); //for check
      // console.log('confirmPassword:', formData.get('confirmPassword')); //for check
      // console.log('photo:', formData.get('photo')); //for check
      let response = await axios.post(authURL + 'signup', formData); //NEXT: 送到伺服器去
      console.log('signup formData response', response); //for check
    } catch (e) {
      // 可以透過 e.response 拿到 axios 的 response
      console.error(e.response);
      // 前端: 如何 UX 很好地顯示這個錯誤訊息
      //   alert(e.response.data.message);
    }
  };

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
                <form onSubmit={handleSumbmit}>
                  <div className="form-row d-flex justify-content-center">
                    <div className="form-group col-7 mb-3 account">
                      <label htmlFor="email">Email 帳號</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="請輸入您的email"
                        value={fields.email}
                        onChange={handleFieldChange} //"input"有變動的時候,欄位值跟著變動
                      />
                    </div>
                    <div className="form-group col-7 mb-3">
                      <label htmlFor="password">設定密碼</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="請輸入您的密碼"
                        value={fields.password}
                        onChange={handleFieldChange} //"input"有變動的時候,欄位值跟著變動
                      />
                    </div>
                    <div className="form-group col-7">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="請再次輸入您的密碼"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange} //"input"有變動的時候,欄位值跟著變動
                      />
                    </div>
                    <div className="form-group col-7 mb-3">
                      <label htmlFor="photo">選擇照片</label>
                      <input
                        type="file"
                        className="form-control"
                        // id="photo"
                        // name="photo"
                        placeholder="請選擇照片"
                        // value={fields.files}
                        // onChange={handleFieldChange} //"input"有變動的時候,欄位值跟著變動
                      />
                    </div>
                  </div>
                  {/* <!-- button --> */}
                  <button
                    className="btn btn-next btn btn-primary mr-3"
                    // onClick={() => {
                    //   setAuth(false);
                    //   //出現訊息
                    //   alert('let login');
                    //   //跳回首頁
                    //   props.history.push('/login');
                    // }}
                  >
                    完成
                  </button>
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
