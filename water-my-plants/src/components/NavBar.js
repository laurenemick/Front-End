import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


/*
Style Here:
Check Home and Login Routes
*/

function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="#16302B"
            aria-controls="simple-menu" 
            aria-haspopup="true" 
            onClick={handleClick}
          >
            

              <MenuIcon />
            
          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><a href = "https://awesome-galileo-1b6080.netlify.app/" style={{ textDecoration: "none" }}>Home</a></MenuItem>
        <MenuItem onClick={handleClose}><Link to ="/registration"style={{ textDecoration: "none" }}>Sign Up</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/login" style={{ textDecoration: "none" }}>Log In</Link></MenuItem>
        <MenuItem onClick={handleClose}><a href = "https://awesome-galileo-1b6080.netlify.app/marketing.html" style={{ textDecoration: "none" }}>Marketing</a></MenuItem>
      </Menu>






          <Typography variant="h6" className={classes.title}></Typography>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button color="#16302B" id = "loginBtn">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
