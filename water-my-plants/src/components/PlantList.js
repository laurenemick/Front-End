import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { PlantContext } from "../contexts/PlantContext";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField/TextField"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button/Button"

const initialPlant = {
  plantid: 0,
  nickname: "",
  species: "",
  h2ofrequency: "",
  imageurl: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10%',
    width: "345px",
    backgroundColor: "white",
    maxHeight: "800px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const PlantList = () => {
  const { plantList, setPlantList, setIsUpdated } = useContext(PlantContext);
  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const editPlant = (plant) => {
    plantList.map(p => { 
      if (p.id == plant.id) {
        setEditing(true);
        setPlantToEdit(plant);
        setExpanded(!expanded);
      }
    });
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/plants/plant/${plantToEdit.plantid}`, plantToEdit)
      .then((res) => {
        setPlantToEdit(plantToEdit);
        setIsUpdated(true);
      })
      .catch((err) => console.log(err));
  };

  const deletePlant = (plant) => {
    axiosWithAuth()
      .delete(`plants/plant/${plant.plantid}`)
      .then((res) => {
        const newArr = plantList.filter((f) => f.plantid !== plant.plantid);
        setPlantList(newArr);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setPlantToEdit({
      ...plantToEdit,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="plant-container">
      <h3>My Plants</h3>
      <div className="plant-list" styles = {{display: "flex", flexFlow: 'column wrap'}}>
        {!plantList ? (
          <div />
        ) : (
          plantList.map((plant) => (
            <div key={plant.plantid} className="plant">
              <Card className={classes.root}>
                <CardHeader
                  title={plant.nickname}
                  subheader={plant.species}
                />
                <CardMedia
                  className={classes.media}
                  image={plant.imageurl} 
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {plant.h2ofrequency}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={() => editPlant(plant)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>
                      {editing && ( //if editing is truthy, returns form
                        <form>
                          <Card>
                            <CardHeader title='Edit Plant' />
                                <CardContent>
                                    <TextField
                                      label = "nickname"
                                      type="text"
                                      name="nickname"
                                      value={plantToEdit.nickname}
                                      onChange={handleChange}
                                    />         
                                    <TextField
                                      label ="Species"
                                      type="text"
                                      name="species"
                                      value={plantToEdit.species}
                                      onChange={handleChange}
                                    />
                                    <br />
                                    <TextField
                                      label ="h20 Frequency"
                                      type="text"
                                      name="h2ofrequency"
                                      value={plantToEdit.h2ofrequency}
                                      onChange={handleChange}
                                    />
                                    <TextField
                                      label ="Image URL"
                                      type="text"
                                      name="image"
                                      value={plantToEdit.imageurl}
                                      onChange={handleChange}
                                    />
                                    <br />
                                </CardContent>
                                <CardActions>
                                    <Button onClick={saveEdit}>Save</Button>
                                    <Button onClick={() => setEditing(false)}>Cancel</Button>
                                    <Button onClick={() => deletePlant(plant)}>Delete</Button>
                                </CardActions>
                            </Card>
                        </form> 
                      )}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
              <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlantList;
