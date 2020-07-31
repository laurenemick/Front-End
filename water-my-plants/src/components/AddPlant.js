import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';
import { UserContext } from '../contexts/UserContext';
// import styled from "styled-components";
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
    const { isUpdated, getPlants, plantList, setPlantList, setIsUpdated } = useContext(PlantContext)
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
        <div className='new-plant'>
            <form onSubmit={addPlant}>
                <Card>
                <CardContent>
                <CardHeader title = "Add a Plant"/>
                
                <TextField
                label = "Nickname"
                    type='text'
                    name='nickname'
                    value={newPlant.nickname}
                    onChange={handleChange}
                />
                
                <br />
                
                <TextField
                label = "Species"
                    type='text'
                    name='species'
                    value={newPlant.species}
                    onChange={handleChange}
                />
                
                <br />
                
                <TextField
                label = "h20 Frequency"
                    type='text'
                    name='h2ofrequency'
                    value={newPlant.h2ofrequency}
                    onChange={handleChange}
                />
                
                <br />
                
                <TextField
                label = "ImageUrl"
                    type='text'
                    name='imageurl'
                    value={newPlant.imageurl}
                    onChange={handleChange}
                />
                </CardContent>
                <CardActions>
                <Button>Save</Button>
                </CardActions>
                </Card>
            </form>
            <br />
        </div>
    )
}

// const Form = styled.form`
//     margin: 5% 15%;
//     padding: 5%;
//     border: 1px solid rgba(var(--ca6,219,219,219),1);
//     box-shadow: 0px 1px 6px -2px rgb(128, 127, 127);
//     border-radius: 3px;
//     text-align: center;
//     font-family: 'Roboto', sans-serif;
// `;

// const Title = styled.div`
//     font-weight: bold;
//     font-size: 1.2rem;
// `

// const Label = styled.label`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// `

// const TextField
// label = "Nickname" = styled.TextField
// label = "Nickname"
//     padding: 1%;
//     width: 70%;
//     display: flex;
//     justify-content: space-between;
// `;

// const Button = styled.button`
//   color: white;
//   background-color: green;
//   padding: 1% 2%;
//   border: 1px solid rgba(var(--ca6,219,219,219),1);
//   border-radius: 3px;
//   font-size: 1rem;
//   &:hover {
//     background-color: black;
//   }
;

export default AddPlant;
