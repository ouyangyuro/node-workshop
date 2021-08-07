const axios = require("axios");
const moment = require("moment");
// console.log(moment().format("YYYYMMDD"));
const fs = require("fs");

fs.readFile("crawler/stock.txt", "utf8", (err, data) => { //要先讀了檔案才能執行axios
    // console.log(data); //for check
    if (err) { //讀檔案失敗執行err
        console.error(err);
    }
    else {
        axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", { //讀檔案成功執行axios
            params: {
                response: "json",
                date: moment().format("YYYYMMDD"),
                stockNo: data,
            },
        })
            .then((response) => {
                console.log(response.data);
            });
    }
})