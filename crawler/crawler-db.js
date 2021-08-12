const axios = require("axios");
const moment = require("moment");
// console.log(moment().format("YYYYMMDD"));
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

// console.log({ // check .env 裡帶入的資料
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// 透過dotenv設定連線資料，以免資料外洩
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 準備連線
connection.connect((err) => {
    if (err) {
        console.error("資料庫連不上");
    }
});

//====== star 讀檔案中的代碼 ======//
function readStock() {
    return new Promise((res, rej) => {

        fs.readFile("stock.txt", "utf8", (err, data) => { //非同步 //把判斷對錯放Promise物件裡
            // console.log(data);
            if (err) {
                // rej(console.log("rej", err)); //for check
                rej(err);
            }
            else {
                // res(console.log("res", data)); //for check
                res(data.trim());
            }
        })
    });
}
//====== end 讀檔案中的代碼 ======//

//====== star 去證交所查資料 ======//
function queryStock(getStockNo) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: getStockNo,
        },
    })
}
//====== end 去證交所資料 ======//

//====== star 資料庫查資料 ======//
function querySqlStockNo(StockNo) {
    return new Promise((res, rej) => {
        connection.query(
            "SELECT * FROM stock WHERE stock_id = ?",
            [StockNo],
            function (error, results, fields) {
                if (error) {
                    // 錯誤處理
                    rej(error);
                }
                else {
                    res(results); //回傳資料庫裡的stock id & name
                }
            }
        );
    });
}
//====== end 資料庫查資料 ======//

//====== star 塞資料進資料庫 ======//
function insertSqlData(DataItem){
    return new Promise((res, rej) => {
        connection.query(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
            [DataItem],
            function (error, results, fields) {
                if (error) {
                    // 錯誤處理
                    rej(error);
                }
                else {
                    res(results);
                }
            }
        );
    });

}
//====== end 塞資料進資料庫 ======//

async function getData() {
    try {
        let getStockNo = await readStock(); //等Promise物件read file

        //===
        let dbResults = await querySqlStockNo(getStockNo); // 等資料庫查詢資料
        // console.log("dbres",dbResults); //for check
        if (dbResults.length === 0) {
            throw "此股票代碼不存在於資料庫";
        }
        else {
            console.info("資料庫有查到資料");
        }
        //===

        let getData = await queryStock(getStockNo); //等axios執行到證交所爬資料
        // console.log(getData.data); //for check
        const twseData = getData.data;
        if (twseData.stat !== 'OK'){
            throw "證交所資料錯誤！"
        }
        else{
            let DataItem = twseData.data.map((item) => {
                // console.log("item",item); //for check
                item = item.map((val)=>{
                    // console.log("val",val); //for check
                    //=== star 處理千位符 ===//
                    return val.replace(/,/g, "");
                    //=== end 處理千位符 ===//
                })
                // console.log("item",item); //for check

                //=== star 處理日期: 民國年轉西元年 ===//
                item[0] = parseInt(item[0].replace(/\//g, "")) + 19110000;
                // console.log("item0",item[0]); //for check
                // console.log("item",item); //for check
                //=== end 處理日期: 民國年轉西元年 ===//

                //=== star 處理 + - ===//
                item[7] = parseInt(item[7]);
                // console.log("item7",item[7]); //for check
                // console.log("item",item); //for check
                //=== end 處理 + - ===//

                //=== star 把 stock_id 放進來資料裡的第一位 ===//
                item.unshift(getStockNo);
                // console.log("item",item); //for check
                //=== end 把 stock_id 放進來資料裡的第一位 ===//

                return item; //將處裡好的資料回傳

            })
            // console.log("DataItem",DataItem); //for check
            //  DataItem[
            //   '股碼',  '日期', '成交股數', '成交金額', '開盤價', '最高價', '最低價', '收盤價', '漲跌價差','成交筆數'
            // ]

            let insertData = await insertSqlData(DataItem);
            console.log("insertData",insertData); //for check 塞進資料庫的結果

            // let foreachDataItem = twseData.data.forEach((item) => {
            //     console.log("foreach",item);
            // })
            // console.log("mapInEachDataItem",mapDataItem); //for check
            // console.log("foreachInEachDataItem",foreachDataItem); //for check
        }
        // console.log("mapOutEachDataItem",mapDataItem); //for check
        // console.log("foreachInEachDataItem",foreachDataItem); //for check

    }
    catch (err) {
        console.error(err);
    }
    finally {
        // 不關閉連線，認為程式一直在執行
        connection.end();
    }
}
getData();
