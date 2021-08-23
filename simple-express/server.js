const express = require("express");
const connection = require("./utils/db");

// 利用 express 建立了一個 express application
let app = express();

//cors的問題解法
const cors = require("cors");
app.use(cors());

//使用一個"中間件"(middleware)
app.use((req, res, next) => { //重整網頁有請求才會觸發
  let current = new Date();
  console.log(`有人來訪問了 at ${current.toISOString()}`);
  console.log("i am first middleware");
  next();
});

app.use((req, res, next) => { //重整網頁有請求才會觸發
  console.log("i am second middleware");
  next();
});

//HTTP Method: get, post, put, patch, delete
app.get("/", function (requset, response, next) { //重整網頁有請求才會觸發
  response.send("Hello Home");
});

app.get("/about", function (requset, response, next) { //重整網頁有請求才會觸發
  response.send("Hello about");
});

app.get("/stock", async function (requset, response, next) { 
  //建立 /stock 路由，可以取出我們網站有服務的股票清單
  let dbResults = await connection.queryAsync("SELECT * FROM stock"); // 等資料庫查詢資料
  response.json(dbResults);
});

app.get("/stock/:stockCode", async function (requset, response, next) { 
  //取得 stockCode 這個股票代碼的股價資料
  let dbResults = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id = ?",
    [requset.params.stockCode]
  ); // 等資料庫查詢資料
  if(dbResults.length < 1){
    response.send("股票代碼不在服務範圍內  或 資料庫沒有此股票代碼的資料");
  }
  response.json(dbResults);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.listen(3000, () => {
  console.log("star web server");
});
