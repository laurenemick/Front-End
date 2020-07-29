import React, { useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { UserContext } from '../contexts/UserContext';

const initialUser = {
    username: '',
    email: '',
    password:'',
    phone: ''
}

const UpdateUser = () => {
    const { userInfo, setUserInfo, setIsUpdated } = useContext(UserContext)
    const [editing, setEditing] = useState(false)
    const [user, setUser] = useState(initialUser)

    const editUser = user => {
        setEditing(true);
        setUser(user);
    };

    const saveEdit = e => {
        e.preventDefault();

        axiosWithAuth()
            .put(`users/user/${user.id}`, user)
            .then(res => {
                setUser(user)
                setIsUpdated(true)
            })
            .catch(err => console.log(err.message));
    }
    
    const deleteUser = () => {
        axiosWithAuth()
            .delete(`users/user/${user.id}`)
            .then(res => {
                const newArr = userInfo.filter(f => f.id !== user.id)
                setUserInfo(newArr)
                setIsUpdated(true)
            })
            .catch(err => console.log(err.message));
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='user-container'>
            <h3>Profile</h3>
            <div className='user-info'>
                {
                    userInfo.map(user => (
                        <div key={user.id} className='user'>
                            <h4>{user.username}</h4>
                            <p>{user.password}</p>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <button onClick={() => editUser(user)}>Edit</button>
                            <button onClick={() => deleteUser(user)}>Delete</button>
                        </div>
                    ))
                }
            </div>
            {
                editing && (
                    <form onSubmit={saveEdit}>
                        <h3>Edit Profile</h3>
                        <label>Username:
                            <input
                                type='text'
                                name='username'
                                value={user.username}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>Password:
                            <input
                                type='password'
                                name='password'
                                value={user.password}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <label>Email:
                            <input
                                type='text'
                                name='email'
                                value={user.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>Phone:
                            <input
                                type='text'
                                name='phone'
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <button>Save</button>
                        <button onClick={() => setEditing(false)}>Cancel</button>
                    </form>
                )
            }
        </div>
    )
}
export default UpdateUser;
