import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

//====== below components star ======//
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Stock from './components/Stock';
import StockDetail from './components/StockDetail';
import Test1 from './components/Test1';
import Test2 from './components/Test2';
//====== above components end ======//

function App() {
  const [auth, setAuth] = useState(false); //會員登入狀況

  return (
    <Router>
      <>
        <Navbar auth={auth} setAuth={setAuth} />

        <Switch>
          <Route path="/login">
            <Login auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/signup">
            <Signup auth={auth} setAuth={setAuth} />
          </Route>
          <Route path="/stock/:stockId/:currentPage?">
            {/* ?代表沒給參數也沒關係 */}
            <StockDetail />
          </Route>

          {/* test star */}
          <Route exact path="/test1">
            <Test1 />
          </Route>
          <Route exact path="/test2">
            <Test2 />
          </Route>
          {/* test end */}

          <Route exact path="/">
            <Stock />
          </Route>
        </Switch>

        <Footer />
      </>
    </Router>
  );
}

export default App;
