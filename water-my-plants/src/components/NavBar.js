import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";

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

export default function NavBar() {
  const classes = useStyles(),
        [anchorEl, setAnchorEl] = React.useState(null),
        location = useLocation().pathname;

  console.log("Location", location);

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
        style={{ background: "#16302B", boxShadow: "none", height:'7vh'}}
      >
        <Toolbar >
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon style = {{color:'white'}}/>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <a
                href="https://water-me.netlify.app/index.html"
                style={{ textDecoration: "none" }}
              >
                Home
              </a>
            </MenuItem>
            { location === "/registration" ?
              <div/> :
              <MenuItem onClick={handleClose}>
                <Link to="/registration" style={{ textDecoration: "none" }}>
                  New user registration
                </Link>
              </MenuItem> }
            <MenuItem onClick={handleClose}>
              <a
                href="https://water-me.netlify.app/marketing.html"
                style={{ textDecoration: "none" }}
              >
                Marketing
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a
                href="https://water-me.netlify.app/about.html"
                style={{ textDecoration: "none" }}
              >
                About
              </a>
            </MenuItem>
          </Menu>
          <h1>Water Me</h1>

          <Typography variant="h6" className={classes.title}></Typography>
          { location === "/" ?
            <div>
              <Button>
                <AccountCircleIcon color="secondary" />
                <Link to="/logout"
                      style={{ textDecoration: "none", color:"white"  }}>
                  Logout
                </Link>
              </Button>
            </div> :
            <div>
              { location === "/login" ?
                <div/> :
                <Button>
                  <Link to="/login"
                        style={{ textDecoration: "none", color:"white"  }}>
                    Login
                  </Link>
                </Button> }
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

//  LocalWords:  AccountCircle
