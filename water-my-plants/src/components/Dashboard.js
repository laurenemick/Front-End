import React, { useState, useEffect } from 'react';
import { axiosWithAuth} from '../utils/axiosWithAuth';
import { Route } from 'react-router-dom';
// import data from '../data';

import PlantList from './PlantList';
import AddPlant from './AddPlant';
import UpdateUser from './UpdateUser';

import { UserContext } from '../contexts/UserContext';
import { PlantContext } from '../contexts/PlantContext';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState([])
    const [plantList, setPlantList] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    // const [plantList, setPlantList] = useState(data)

    const getUserInfo = () => {
        return axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                console.log(res)
                setUserInfo(res)
            })
            .catch(err => console.log(err.message));
    }

    const getPlants = () => {
        return axiosWithAuth()
            .get('/plants/plants')
            .then(res => {
                console.log(res)
                setPlantList(res.data)
                setIsUpdated(false)
            })
            .catch(err => console.log(err.message));
    }

    useEffect(() => {
        getUserInfo();
    }, [isUpdated]) 

    useEffect(() => {
        getPlants();
    }, [isUpdated]) 

    return (
        <UserContext.Provider value = {{ userInfo, setUserInfo, setIsUpdated }}>
            <PlantContext.Provider value = {{ getPlants, plantList, setPlantList, setIsUpdated }}>
                <Route>
                    <UpdateUser />
                </Route>
                <Route>
                    <AddPlant/>
                </Route>
                <Route>
                    <PlantList />
                </Route>
            </PlantContext.Provider>
        </UserContext.Provider>
    )
}
export default Dashboard;
