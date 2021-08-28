//here is stock router module
const express = require("express");
// router 就是一個在app底下的小app
const router = express.Router();
const connection = require("../utils/db");

//*===test看一下get 能不能是空值""還是一定要給首頁斜線，在跟小賴老師說===*//
//test result: can be ""
router.get("", async function (requset, response, next) {
  //建立 /stock 路由，可以取出我們網站有服務的股票清單
  let dbResults = await connection.queryAsync("SELECT * FROM stock"); // 等資料庫查詢資料
  response.json(dbResults);
});

router.get("/:stockCode", async function (requset, response, next) {
  let page = requset.query.page || 1; //目前頁碼,default page1
  const perPage = 5; //每頁資料有５筆

  //取得 stockCode 這個股票代碼的股價資料
  let count = await connection.queryAsync(
    "SELECT COUNT(*) AS total FROM stock_price WHERE stock_id = ?",
    [requset.params.stockCode]
  ); // 等資料庫查詢資料
  if (count.length < 1) {
    response.send("股票代碼不在服務範圍內  或 資料庫沒有此股票代碼的資料");
  }
  // console.log("count 資料有幾筆",count); //for check
  const total = count[0].total;
  // console.log("total",total); //for check
  const pages = Math.ceil(total / perPage); //無條件進位,算共需要幾個分頁
  //   console.log("pages", pages); //for check

  // 取得這一頁應該要有的資料
  // LIMIT: 要取幾筆資料（這一頁要幾筆資料）
  // OFFSET: 要跳過多少
  // page 1: 1-5  跳過 0 筆
  // page 2: 6-10 跳過前 5 筆

  let offset = (page - 1) * perPage;
  let result = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?",
    [requset.params.stockCode, perPage, offset]
  ); // 等資料庫查詢資料

  let pageInfo = {
    total, //共有幾筆
    perPage, //一頁有幾筆
    pages, //共有幾頁
    page, //目前在第幾頁(website add ?page=2來指定要看第幾頁)
  };

  response.json({pageInfo, result});
});

module.exports = router;
