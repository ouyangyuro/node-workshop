// TWSEDataProcessor
function processStockDay(getStockNo, rawData) {
    // twseData.data
    return rawData.map((item) => {
      // console.log("item",item); //for check
      item = item.map((val) => {
        // console.log("val",val); //for check
        //=== star 處理千位符 ===//
        return val.replace(/,/g, "");
        //=== end 處理千位符 ===//
      });
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
    });
  }
  
  module.exports = {
    processStockDay,
  };