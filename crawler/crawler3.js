const axios = require("axios");
const moment = require("moment");
// console.log(moment().format("YYYYMMDD"));
const fs = require("fs");

async function getData() {

    try {

        let getStockNo = await new Promise((res, rej) => { //等Promise物件read file後在執行下面的axios

            fs.readFile("crawler/stock.txt", "utf8", (err, data) => { //非同步 //把判斷對錯放Promise物件裡
                // console.log(data);
                if (err) {
                    // rej(console.log("rej", err)); //for check
                    rej(err);
                }
                else {
                    // res(console.log("res", data)); //for check
                    res(data);
                }
            })

        });
        // console.log(getStockNo); //for check


        axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", { //等上面await執行完才會執行
            params: {
                response: "json",
                date: moment().format("YYYYMMDD"),
                stockNo: getStockNo,
            },
        })
            .then((response) => {
                console.log(response.data);
            });

    }
    catch (err) {
        console.error(err);
    }
}
getData();
