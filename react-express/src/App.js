import React, { useState, useEffect } from 'react';
import axios from 'axios';

const stockURL = `http://localhost:3500/stock`;

function App() {
  const [data, setData] = useState([]);
  const [deltail, setDeltail] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(stockURL);
      const result1 = await axios.get(stockURL + '/2330');
      // console.log(result.data); //for check
      // console.log(result1.data[0]); //for check
      setData(result.data);
      setDeltail(result1.data[9]);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              {data.map((item) => (
                <th key={item.stock_id}>{item.stock_name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {data.map((item, i) => (
                <td key={i}>{item.stock_id}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>股票代碼：{deltail.stock_id}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>日期：{deltail.date}</td>
            </tr>
            <tr>
              <td>最高點：{deltail.high_price}</td>
            </tr>
            <tr>
              <td>最低點：{deltail.low_price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
