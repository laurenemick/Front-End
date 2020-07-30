import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';
import { UserContext } from '../contexts/UserContext';
import styled from "styled-components";

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
            <Form onSubmit={addPlant}>
                <Title>Add a Plant</Title>
                <br />
                <Label>Nickname:&nbsp;
                <Input
                    type='text'
                    name='nickname'
                    value={newPlant.nickname}
                    onChange={handleChange}
                />
                </Label>
                <br />
                <Label>Species:&nbsp;
                <Input
                    type='text'
                    name='species'
                    value={newPlant.species}
                    onChange={handleChange}
                />
                </Label>
                <br />
                <Label>h20 Frequency:&nbsp;
                <Input
                    type='text'
                    name='h2ofrequency'
                    value={newPlant.h2ofrequency}
                    onChange={handleChange}
                />
                </Label>
                <br />
                <Label>Image URL:&nbsp;
                <Input
                    type='text'
                    name='imageurl'
                    value={newPlant.imageurl}
                    onChange={handleChange}
                />
                </Label>
                <br />
                <Button>Save</Button>
            </Form>
            <br />
        </div>
    )
}

const Form = styled.form`
    margin: 5% 15%;
    padding: 5%;
    border: 1px solid rgba(var(--ca6,219,219,219),1);
    box-shadow: 0px 1px 6px -2px rgb(128, 127, 127);
    border-radius: 3px;
    text-align: center;
    font-family: 'Roboto', sans-serif;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 1.2rem;
`

const Label = styled.label`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Input = styled.input`
    padding: 1%;
    width: 70%;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
  color: white;
  background-color: green;
  padding: 1% 2%;
  border: 1px solid rgba(var(--ca6,219,219,219),1);
  border-radius: 3px;
  font-size: 1rem;
  &:hover {
    background-color: black;
  }
`;

export default AddPlant;
