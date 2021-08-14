const axios = require("axios");
const moment = require("moment");
// console.log(moment().format("YYYYMMDD"));
const fs = require("fs");

new Promise((res, rej) => { //Promise並不會把非同步變同步,只是換樣貌比較好看了而已

    fs.readFile("crawler/stock.txt", "utf8", (err, data) => { //非同步 //把判斷對錯放Promise物件裡
        // console.log(data);
        if (err) {
            // rej(console.log("rej",err)); //for check
            rej(err);
        }
        else {
            // res(console.log("res",data)); //for check
            res(data);
        }
    })

})
    .then((data) => { //判斷對要執行的東西放這裡
        // console.log(data); //for check
        return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", { //add return make promise chain
            params: {
                response: "json",
                date: moment().format("YYYYMMDD"),
                stockNo: data,
            },
        })
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((err) => { //判斷錯要執行的東西放這裡
        console.error(err);
    });

