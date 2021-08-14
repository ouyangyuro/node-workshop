const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises"); //用 fs 的 promises 版本
const connection = require("./utils/db");
const { processStockDay } = require("./utils/TWSEData");

// 準備連線
connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});

async function getData() {
  try {
    //====== star 讀檔案中的代碼 ======//
    let getStockNo = await fs.readFile("stock.txt", "utf8"); //等read file
    console.log("getStockNo", getStockNo);
    //====== end 讀檔案中的代碼 ======//

    //====== star 資料庫查資料 ======//
    let dbResults = await connection.queryAsync(
      "SELECT * FROM stock WHERE stock_id = ?",
      [getStockNo]
    ); // 等資料庫查詢資料
    console.log("dbResults", dbResults); //for check
    if (dbResults.length === 0) {
      throw "此股票代碼不存在於資料庫";
    } else {
      console.info("資料庫有查到資料");
    }
    //====== end 資料庫查資料 ======//

    //====== star 去證交所查資料 ======//
    let getData = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: getStockNo,
        },
      }
    ); //等axios執行到證交所爬資料
    // console.log("getData", getData.data); //for check
    const twseData = getData.data;
    if (twseData.stat !== "OK") {
      throw "證交所資料錯誤！";
    }
    let DataItem = processStockDay(getStockNo, twseData.data);//不能再用else包起來了,否則外面讀不到DataItem
    // console.log("DataItem",DataItem); //for check
    //====== end 去證交所查資料 ======//

    //====== star 塞資料進資料庫 ======//
    let insertData = await connection.queryAsync(
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [DataItem],
      );
    console.log("insertData", insertData); //for check 塞進資料庫的結果
    //====== end 塞資料進資料庫 ======//
  } catch (err) {
    console.error("err",err);
  } finally {
    // 不關閉連線，認為程式一直在執行
    connection.end();
  }
}
getData();
