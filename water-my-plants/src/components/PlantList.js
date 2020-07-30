import React, { useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';

const initialPlant = {
    nickname: '',
    species: '',
    h2oFrequency:'',
    imageurl: ''
}

const PlantList = () => {
    const { plantList, setPlantList, setIsUpdated } = useContext(PlantContext)
    const [editing, setEditing] = useState(false)
    const [plantToEdit, setPlantToEdit] = useState(initialPlant)

    const editPlant = plant => {
        setEditing(true);
        setPlantToEdit(plant);
    };

    const saveEdit = e => {
        e.preventDefault();

        axiosWithAuth()
            .put(`/plants/plant/${plantToEdit.id}`, plantToEdit)
            .then(res => {
                setPlantToEdit(plantToEdit)
                setIsUpdated(true)
            })
            .catch(err => console.log(err))
    }

    const deletePlant = () => {
        axiosWithAuth()
            .delete(`plants/plant/${plantToEdit.id}`)
            .then(res => {
                const newArr = plantList.filter(f => f.id !== plantToEdit.id)
                setPlantList(newArr)
                setIsUpdated(true)
            })
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        setPlantToEdit({
            ...plantToEdit,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='plant-container'>
            <h3>My Plants</h3>
            <div className='plant-list'>
                {
                    (!plantList ? <div /> :
                        plantList.map(plant => (
                            <div key={plant.id} className='plant'>
                                <h4>{plant.nickname}</h4>
                                <p>{plant.species}</p>
                                <p>{plant.h2oFrequency}</p>
                                <img src={plant.imageurl} alt={plant.nickname} />
                                <br />
                                <br />
                                <button onClick={() => editPlant(plant)}>Edit</button>
                                <button onClick={() => deletePlant(plant)}>Delete</button>
                                <br />
                                <br />
                            </div>
                        ))
                    )
                }
            </div>
            {
                editing && (
                    <form onSubmit={saveEdit}>
                        <h3>Edit Plant</h3>
                        <label>Nickname:
                            <input
                                type='text'
                                name='nickname'
                                value={plantToEdit.nickname}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>Species:
                            <input
                                type='text'
                                name='species'
                                value={plantToEdit.species}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>h20 Frequency:
                            <input
                                type='text'
                                name='h2oFrequency'
                                value={plantToEdit.h2oFrequency}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>Image:
                            <input
                                type='text'
                                name='image'
                                value={plantToEdit.imageurl}
                                onChange={handleChange}
                            />
                        </label>
                        <button>Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </form>
                )
            }
        </div>
    )
}
export default PlantList;