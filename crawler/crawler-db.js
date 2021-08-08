const axios = require("axios");
const moment = require("moment");
// console.log(moment().format("YYYYMMDD"));
const fs = require("fs");
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error("資料庫連不上");
    }
});
connection.end();
// function readStock() {
//     return new Promise((res, rej) => { //等Promise物件read file後在執行下面的axios

//         fs.readFile("crawler/stock.txt", "utf8", (err, data) => { //非同步 //把判斷對錯放Promise物件裡
//             // console.log(data);
//             if (err) {
//                 // rej(console.log("rej", err)); //for check
//                 rej(err);
//             }
//             else {
//                 // res(console.log("res", data)); //for check
//                 res(data.trim());
//             }
//         })
//     });
// }

// function querStock(getStockNo) {
//     return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", { //等上面await執行完才會執行
//         params: {
//             response: "json",
//             date: moment().format("YYYYMMDD"),
//             stockNo: getStockNo,
//         },
//     })
// }

// async function getData() {
//     try {
//         let getStockNo = await readStock();
//         let getData = await querStock(getStockNo);
//         console.log(getData.data.title);
//     }
//     catch (err) {
//         console.error(err);
//     }
//     finally {
//         // 不關閉連線，認為程式一直在執行
//         connection.end();
//     }
// }
// getData();
