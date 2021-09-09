import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import axios from 'axios';
//====== below components star ======//
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Stock from './components/Stock';
import StockDetail from './components/StockDetail';
//====== above components end ======//

function App() {
  const [auth, setAuth] = useState(false);

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
          <Route path="/stock/:stockId">
            <StockDetail />
          </Route>
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
