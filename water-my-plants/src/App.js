import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import About from './components/About';
// import MarketingPage from './MarketingPage';

// Utils
// import { PrivateRoute } from './utils/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          {/* <Route exact path='/login' component={Login} /> */}
          {/* <Route exact path='/signup' component={SignUp} />
          <Route exact path='/about' component={About} />
          <Route exact path='/home' component={MarketingPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}
export default App;
