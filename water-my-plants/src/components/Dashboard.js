import React, { useState, useEffect } from 'react';
import { axiosWithAuth} from '../utils/axiosWithAuth';

import PlantList from './PlantList';
import AddPlant from './AddPlant';
import UpdateUser from './UpdateUser';

import { UserContext } from '../contexts/UserContext';
import { PlantContext } from '../contexts/PlantContext';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState([])
    const [plantList, setPlantList] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)

    const getUserInfo = () => {
        return axiosWithAuth()
            .get('/users/myinfo')
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => console.log(err.message));
    }

    const getPlants = () => {
        return axiosWithAuth()
            .get('/plants/plants')
            .then(res => {
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
            <PlantContext.Provider value = {{ isUpdated, getPlants, plantList, setPlantList, setIsUpdated }}>
                <div className="dashboard">
                    <UpdateUser />
                    <AddPlant />
                </div>
                <PlantList />
            </PlantContext.Provider>
        </UserContext.Provider>
    )
}
export default Dashboard;
