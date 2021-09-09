import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const stockURL = `http://localhost:3500/api/stock/`;

function StockDetail() {
  const { stockId } = useParams();
  const [detail, setDetail] = useState([1]); //default "1" cause it's wont't into getLong function at star.

  useEffect(() => {
    async function fetchData() {
      try {
        const stockDetail = await axios.get(stockURL + stockId);
        // console.log(stockDetail.data.result); //for check
        setDetail(stockDetail.data.result);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  function getData() {
    if (detail.length <= 0) {
      //console.log('not found stock Detail'); //for check
      return (
        <div className="card m-3" style={{ width: '800px' }}>
          <div
            className="card-header text-danger h3"
            style={{ height: '100px' }}
          >
            {stockId} 此股票代碼目前無任何資料
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{ height: '80px' }}>
              日期：
            </li>
            <li className="list-group-item" style={{ height: '80px' }}>
              開盤價：
            </li>
            <li className="list-group-item" style={{ height: '80px' }}>
              最高價：
            </li>
            <li className="list-group-item" style={{ height: '80px' }}>
              最低價：
            </li>
          </ul>
        </div>
      );
    }
  }

  return (
    <>
      {/* {detail ? ( */}
      {detail.map((item, i) => (
        <div className="card m-3" style={{ width: '800px' }} key={i}>
          <div className="card-header">{item.stock_id}</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">日期：{item.date}</li>
            <li className="list-group-item">開盤價：{item.open_price}</li>
            <li className="list-group-item">最高價：{item.high_price}</li>
            <li className="list-group-item"> 最低價：{item.low_price}</li>
          </ul>
        </div>
      ))}
      {/* ) : (
      {getData()}
      )} */}
      {getData()}
    </>
  );
}

export default StockDetail;
