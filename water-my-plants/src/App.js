import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import About from './components/About';
// import MarketingPage from './MarketingPage';

// Utils
// import { PrivateRoute } from './utils/PrivateRoute';

import './App.css';

export default function App() {
  // authentication token associated with session, currently a
  // placeholder until we get the proper endpoints
  const [authToken, setAuthToken] = useState({});

  // universals set in main App: Container and type styling, routes to
  // individual page components.
  return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          {/* <Route exact path='/login' component={Login} /> */}
          {/* <Route exact path='/signup' component={SignUp} />
          <Route exact path='/about' component={About} />
          <Route exact path='/home' component={MarketingPage} /> */}
        </Switch>
      </div>
  );
}
