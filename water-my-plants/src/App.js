import React from 'react';
import NavBar from './components/NavBar'
import {Link, Route, Switch} from 'react-router-dom'
import SignUp from './components/SignUp'
import BigButton from './components/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
/* 
Style Here:
Check SignUp Route
*/


function App() {
  return (
    <div className="App">
      <NavBar />
      <CssBaseline />
      <Switch>

      <Container style = {{maxWidth:"md"}}>
        <Typography component="div" style={{display: 'flex', justifyContent: 'center', backgroundColor: '#cfe8fc', height: '100vh', opacity: '80%' }} >

      <Route exact path = "/"><BigButton /></Route>


      <Route path = "/registration">
        <SignUp />
      </Route>
      <Route path = "login"></Route>
      </Typography>
      </Container>
</Switch>
      
    </div>
  );
}

export default App;
