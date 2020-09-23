import React, { useState } from 'react';
import './App.scss';
import { Route, Redirect, Switch, BrowserRouter as Router } from "react-router-dom";
import Sidebar from './routes/Sidebar.js';
import Location from './routes/Location.js';
import LoanData from './routes/LoanData.js';
import EarthQuake from './routes/EarthQuake';
import {
  Link,
} from "react-router-dom";


function App() {
  const [navLinks] = useState([
    { url: '/stores', name: "stores Location" },
    { url: '/loan-data', name: 'Loan Data' },
    { url: '/earthquake', name: 'Earth Quake Graph' },
  ]);
  return (
    <div className="App">
      <Router>
        <header>
          <div className="wrapper">
            <h1 className="logo">Test<span>Logo</span></h1>
            <nav className="main-nav">
              <ul>
                {navLinks.map(({ url, name }) => (
                  <li key={url}>
                    <li><a href="javascript(0);"><i className="fa fa-home nav-icon"></i><Link to={url}>{name}</Link></a></li>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="menu-toggle">
              <div className="hamburger"></div>
            </div>

          </div>
        </header>
        <Sidebar />
        <Switch>
          <Route path={`/stores`} exact component={() => <Location />} />
          <Route path={`/loan-data`} exact component={() => <LoanData />} />
          <Route path={`/earthquake`} exact component={() => <EarthQuake />} />
          <Route path={`/`} component={() => <Location />} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
