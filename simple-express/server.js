const express = require("express");
const connection = require("./utils/db");
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
app.get("/", function (requset, response, next) {
  //重整網頁有請求才會觸發
  response.send("Hello Home");
});

app.get("/about", function (requset, response, next) {
  //重整網頁有請求才會觸發
  console.log("hello next is true about");
  let isLOgin = true;
  if (isLOgin) {
    next();
  } else {
    next({
      code: "110001", //回傳給前端讓他知道錯誤部分，自己定義 message 給用戶看
      status: 500,
      message: "test error message",
    });
  }
});

app.get("/about", function (requset, response, next) {
  //重整網頁有請求才會觸發
  response.send("Hello about");
});

//===引用 stock 進來 star===//
let stockRouter = require("./routers/stock");
app.use("/stock",stockRouter); //只要是 "/stock" 開頭就進來找
//===引用 stock 進來 end===//

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).json({ message: err.message });
});

app.listen(3500, () => {
  console.log("star web server");
});
