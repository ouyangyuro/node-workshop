const axios = require("axios");
const moment = require("moment");
// console.log(moment().format("YYYYMMDD"));
const fs = require("fs");

fs.readFile("crawler/stock.txt", "utf8", (err, data) => {
    // console.log(data);
    if(err){
        console.error(err);
    }
    else{
        axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
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