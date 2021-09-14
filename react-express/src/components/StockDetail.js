import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom'; //可以獲取history,location,match,來使用
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { stockURL } from '../utils/config';
import { spinner } from '../utils/spinner'; //bootstrap spinner

function StockDetail(props) {
  const { stockId, currentPage } = useParams();
  const [detail, setDetail] = useState([1]); //default "1" cause it's wont't into getLong function at star.
  const [isLoading, setIsLoading] = useState(true); //緩衝畫面不會閃一下
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1); //紀錄我現在在第幾頁
  const [totalPage, setTotalPage] = useState(); //總共有幾頁

  useEffect(() => {
    // 先開起載入指示器 star
    setIsLoading(true);
    // 先開起載入指示器 end

    async function detailData() {
      try {
        const stockDetail = await axios.get(
          stockURL + stockId + ` ?page=${page}`
        );
        // console.log(stockDetail.data.result); //for check
        setDetail(stockDetail.data.result);
        setTotalPage(stockDetail.data.pageInfo.pages);
      } catch (e) {
        console.log(e);
      }
    }
    detailData();

    // 0.7秒後關閉指示器 star
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
    // 0.7秒後關閉指示器 end
  }, [page]); //FIXME:瀏覽器按上一頁時，網址有換但內容沒有

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Toolbar with button groups"
          style={{
            display: 'inline-block',
            backgroundColor: page === i ? '#00d1b2' : '',
          }}
          key={i}
          onClick={(e) => {
            // console.log('push', `/stock/${stockId}/${i}`); //for check
            props.history.push(`/stock/${stockId}/${i}`, { page: i });
            setPage(i);
          }}
        >
          <div className="btn-group m-1" role="group" aria-label="First group">
            <button type="button" className="btn btn-primary">
              {i}
            </button>
          </div>
        </div>
      );
    }
    // console.log('pages getPages', pages); //for check
    return pages;
  };

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
      <div className="row justify-content-center">{getPages()}</div>
      {isLoading
        ? spinner
        : detail.map((item, i) => (
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
      {isLoading ? '' : getData()}
    </>
  );
}

export default withRouter(StockDetail);
