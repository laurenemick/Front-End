import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch"
  },
  cardroot: {
    minWidth: 275,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

}));
  
  export default function SignUp() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
         <Card className={classes.cardroot} variant="outlined">
          <h1>Log In</h1>
          <form>
          <CardContent>
        <div>
          
            
          <TextField
            id="outlined-full-width"
            label="Email"
            style={{ margin: 8 }}
            placeholder="iNeedWater@hydrate.com"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          </div>
        <div>
          <TextField
            id="margin-none"
            placeholder="********"
            className={classes.textField}
            helperText="Password"
          />
        </div>
        
        </CardContent>
        <CardActions><Button>Log In</Button></CardActions>
        </form>
        </Card>
      </div>
      
    );
  }
  