import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { PlantContext } from "../contexts/PlantContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField/TextField"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button"
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const initialPlant = {
  plantid: 0,
  nickname: "",
  species: "",
  h2ofrequency: "",
  imageurl: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "8%",
    width: "600px",
    backgroundColor: "white",
    maxHeight: "800px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    }
  },
  headercard: {
    margin: "4% 0",
    background: "#081c15",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      margin: "15% 0 10%",
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  }
}));

const PlantList = () => {
  const { plantList, setPlantList, setIsUpdated } = useContext(PlantContext);
  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("")

  const editPlant = (plant, index) => {
    if (selectedIndex === index) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(index)
      setPlantToEdit(plant)
      setEditing(true)
    } 
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/plants/plant/${plantToEdit.plantid}`, plantToEdit)
      .then((res) => {
        setPlantToEdit(plantToEdit);
        setIsUpdated(true);
        setExpanded(false);
        setEditing(false);
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
    <div className="plants">
      <Card className={classes.headercard}>
        <h1 >My Plants</h1>
      </Card>
      <div className="plant-container">
        <div className="plant-list">
          {!plantList ? (
            <div />
          ) : (
            plantList.map((plant, index) => (
              <div>
                <Card className={classes.root} key={plant.plantid}>
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
                  <CardActions disableSpacing style={{background: "#081c15"}}>
                    <IconButton
                      style={{marginLeft: "auto", color:"white"}}
                      onClick={() => editPlant(plant, index)}
                    >
                      {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </CardActions>

                  {editing && ( //if editing is truthy, returns form
                    <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>
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
                                    name="imageurl"
                                    value={plantToEdit.imageurl}
                                    onChange={handleChange}
                                    />
                                  <br />
                                </CardContent>
                                <CardActions>
                                    <Button onClick={saveEdit}>Save</Button>
                                    <Button onClick={() => {setEditing(false); setSelectedIndex("")}}>Cancel</Button>
                                    <Button onClick={() => deletePlant(plant)}>Delete</Button>
                                </CardActions>
                              </Card>
                            </form> 
                        </Typography>
                      </CardContent>
                    </Collapse>
                  )}
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantList;
