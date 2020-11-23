import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';
import { UserContext } from '../contexts/UserContext';
import TextField from "@material-ui/core/TextField/TextField"
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from '@material-ui/core/Button/Button'

const initialPlant = {
    nickname: '',
    species: '',
    h2ofrequency:'',
    imageurl: ''
}

const AddPlant = () => {
    const { isUpdated, getPlants, setIsUpdated } = useContext(PlantContext)
    const { userInfo } = useContext(UserContext)
    const [newPlant, setNewPlant] = useState(initialPlant)

    const addPlant = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/plants/plant', {
                plantid: userInfo.id,
                nickname: newPlant.nickname,
                species: newPlant.species,
                h2ofrequency: newPlant.h2ofrequency,
                imageurl: newPlant.imageurl
            })
            .then(res => {
                console.log(res.data)
                getPlants()
                setIsUpdated(true)
                setNewPlant(initialPlant)
            })
            .catch(err => console.log(err.message));
    };

    const handleChange = e => {
        setNewPlant({
            ...newPlant,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        getPlants();
    }, [isUpdated]) 

    return (
        <div className='new-plant' style={{width:"60%"}}>
            <form>
                <Card style={{marginTop:"100px", padding:"4%"}}>
                    <CardHeader title = "Add a Plant"/>
                    <CardContent>
                        <TextField
                            label = "Nickname"
                            type='text'
                            name='nickname'
                            fullWidth
                            variant="outlined"
                            value={newPlant.nickname}
                            onChange={handleChange}
                            style={{paddingBottom:"2%"}}
                        />
                        <TextField
                            label = "Species"
                            type='text'
                            name='species'
                            fullWidth
                            variant="outlined"
                            value={newPlant.species}
                            onChange={handleChange}
                            style={{paddingBottom:"2%"}}
                        />
                        <TextField
                            label = "h20 Frequency"
                            type='text'
                            name='h2ofrequency'
                            fullWidth
                            variant="outlined"
                            value={newPlant.h2ofrequency}
                            onChange={handleChange}
                            style={{paddingBottom:"2%"}}
                        />
                        <TextField
                            label = "ImageUrl"
                            type='text'
                            name='imageurl'
                            fullWidth
                            variant="outlined"
                            value={newPlant.imageurl}
                            onChange={handleChange}
                        />
                    </CardContent>
                    <CardActions>
                        <Button onClick={addPlant}>Save</Button>
                    </CardActions>
                </Card>
            </form>
            <br />
        </div>
    )
}

export default AddPlant;
