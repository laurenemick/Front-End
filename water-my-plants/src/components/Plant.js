import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
	root: {
	  maxWidth: '345px',
	  backgroundColor: 'white',
	  maxHeight: '600px',
	},
	media: {
	  height: 0,
	  paddingTop: "56.25%" // 16:9
	},
	expand: {
	  transform: "rotate(0deg)",
	  marginLeft: "auto",
	  transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest
	  })
	},
	expandOpen: {
	  transform: "rotate(180deg)"
	}
  }));

const Plant = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	  };

	return (
		<Card className={classes.root} variant = "outlined">
      <CardHeader
        title={plant.nickname}//plants.nickname
        subheader={plant.species} //plants.species?
      />
	  <CardMedia
        className={classes.media}
        image={plant.image} //plants.img
      />
		<CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {plant.h2ofrequency}
        </Typography>
      </CardContent>
	  <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
		<Typography paragraph>Care Instructions:</Typography>
          <Typography paragraph>{plant.h2oFrequency}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
			
            
	
export default Plant;