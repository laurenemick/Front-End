import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { UserContext } from "../contexts/UserContext";
// import UploadAvatar from "./UploadAvatar";

import TextField from "@material-ui/core/TextField/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography";

const UpdateUser = () => {
  const { userInfo, setUserInfo, setIsUpdated } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    id: userInfo.id,
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.password,
    phone: userInfo.phone,
    imageurl: userInfo.imageurl,
  });

  const editUser = (user) => {
    setEditing(true);
    setUser({ ...user, password: "" });
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/users/user/${user.id}`, user)
      .then((res) => {
        setUserInfo(user);
        setIsUpdated(true);
        setEditing(false)
      })
      .catch((err) => console.log(err.message));
  };

  const deleteUser = (user) => {
    axiosWithAuth()
      .delete(`/users/user/${userInfo.id}`)
      .then((res) => {
        const newArr = userInfo.filter((f) => f.id !== user.id);
        setUserInfo(newArr);
        setIsUpdated(true);
      })
      .catch((err) => console.log(err.message));
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="user-container">
      <Card className="profile">
        <CardHeader title="Profile" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt={userInfo.username} height="150px" width="150px" className="profile-img" />
          <CardContent>
            <Typography>{userInfo.username}</Typography>
            <Typography>{userInfo.email}</Typography>
            <Typography>{userInfo.phone}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => editUser(userInfo)}>Edit</Button>
            <Button onClick={() => deleteUser(userInfo)}>Delete</Button>
          </CardActions>
      </Card>
      {editing && (
        <form onSubmit={saveEdit}>
          <Card>
            <CardContent>
              <h3>Edit Profile</h3>
              {/* <UploadAvatar handleChange1={handleChange} img={user.imageurl} /> */}
              <TextField
                label="Image url"
                type="text"
                name="imageurl"
                value={user.imageurl}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                style={{paddingBottom:"2%"}}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                style={{paddingBottom:"2%"}}
              />
              <TextField
                label="email"
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                style={{paddingBottom:"2%"}}
              />
              <TextField
                label="phone"
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </CardContent>
            <CardActions>
              <br />
              <Button>Save</Button>
              <Button onClick={() => setEditing(false)}>Cancel</Button>
            </CardActions>
          </Card>
        </form>
      )}
    </div>
  );
};
export default UpdateUser;
