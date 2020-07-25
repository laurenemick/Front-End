import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

/* 
Style Here:
Background Image = Giant Fancy Button
Import the NavBar
Check SignUp Route
*/


function App() {
  return (
    <div className="App">

      <CssBaseline />
      <Container style = {{maxWidth:"md"}}>
        <Typography component="div" style={{display: 'flex', justifyContent: 'center', backgroundColor: '#cfe8fc', height: '100vh', opacity: '80%' }} >
        <Button style = {{color:"#210124", maxHeight: '2.5rem', alignSelf: 'center' }}>
          Sign Up
        </Button>
        </Typography>
      </Container>
      
    </div>
  );
}

export default App;
