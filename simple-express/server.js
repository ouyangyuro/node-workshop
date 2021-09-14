const express = require("express");
const connection = require("./utils/db");
const path = require('path');
// const bcrypt = require('bcrypt'); //加密密碼套件
// const { body, validationResult } = require('express-validator'); //驗證套件
// const registerRule = [
// body("email").isEmail().withMessage("Email 請填寫正確格式"),
// body("password").isLength({min: 6}).withMessage("密碼長度至少６"),
// ];

// 利用 express 建立了一個 express application
let app = express();

//cors的問題解法
const cors = require("cors");
app.use(cors());

//使用中間件，才能讀到body資料
app.use(express.urlencoded({extended: true}));
//使用中間件，解析json的資料
app.use(express.json());

// 為了處理 multipart/form-data 需要用到其他中間件
const multer = require("multer");
// const { BADRESP } = require("dns");
// 通常是為了上傳，所以需要告訴他上傳的檔案存在哪裡
// 通常我們存在硬碟 => diskStorage
// const storage = multer.diskStorage({
//   // 設定儲存的目的地
//   destination: function (req, file, cb) {
//     // "/public/uploads"
//     cb(null, path.join(__dirname, "..", "public", "uploads"));
//   },
//=======================================================

// test star
app.use(express.static(path.join(__dirname, "react")));
// static 使靜態資源: html, css, js, images,..
// 透過 static 來部署 react 的話，他只幫忙到回覆 index.html
// test end

//使用一個"中間件"(middleware)
app.use((req, res, next) => {
  //重整網頁有請求才會觸發
  let current = new Date();
  console.log(`有人來訪問了 at ${current.toISOString()}`);
  console.log("i am first middleware");
  next(); //不呼叫不會前往下一個,但他不知道下一個是誰
});

app.use((req, res, next) => {
  //重整網頁有請求才會觸發
  console.log("i am second middleware");
  next();
});

//HTTP Method: get, post, put, patch, delete
app.get("/api", function (requset, response, next) {
  //重整網頁有請求才會觸發
  response.send("Hello Home");
});

app.get("/api/about", function (requset, response, next) {
  //重整網頁有請求才會觸發
  console.log("hello next is true about");
  let isLogin = true;
  if (isLogin) {
    next(); //正確去下一個路由
  } else {
    next({ //next 中間有參數，就等於通知 express 這裡有錯誤
      code: "110001", //回傳給前端讓他知道錯誤部分，自己定義 message 給用戶看
      status: 401,
      message: "test error message:please log in",
    });
  }
});

app.get("/api/about", function (requset, response, next) {
  //重整網頁有請求才會觸發
  response.send("Hello about");
});

//===引用 stock 進來 star===//
let stockRouter = require("./routers/stock");
app.use("/api/stock",stockRouter); //只要是 "/api/stock" 開頭就進來找
//===引用 stock 進來 end===//

//=== auth star ===//
app.post("/api/auth/signup",(req, res, next) => {
  console.log("req.body"); //for check
  // console.log(req.body); //for check
  console.log("email",req.body.email); //for check
  console.log("email[0]",req.body[0]); //for check
  console.log("req.email",req.email); //for check
  res.json({});
});
//=== auth end ===//

//====== error message star ======//
app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).json({ message: err.message });
});
//====== error message end ======//

app.listen(3500, () => {
  console.log("star web server");
});
