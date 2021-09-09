import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const stockURL = `http://localhost:3500/api/stock/`;

function Stock() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const stock = await axios.get(stockURL);
        // console.log(result.data); //for check
        setData(stock.data);
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <div className="container">
        <h1 className="text-center my-3">
          Hello! The stocks we have service are as follows.
        </h1>
        <div className="text-center d-flex flex-column align-items-center">
          {data.map((item, i) => (
            <div
              className="card border-info m-3"
              style={{ width: '800px' }}
              key={i}
            >
              <Link
                to={`/stock/${item.stock_id}`}
                className="text-decoration-none stock_hover"
              >
                <div className="card-header">股票代碼 {item.stock_id}</div>
                <div className="card-body text-info">
                  <h5 className="card-title">股票名: {item.stock_name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Stock;
