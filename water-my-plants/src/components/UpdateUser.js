import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { UserContext } from "../contexts/UserContext";
import TextField from "@material-ui/core/TextField/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "345px",
    backgroundColor: "white",
    maxHeight: "600px",
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

const UpdateUser = () => {
  const { userInfo, setUserInfo, setIsUpdated } = useContext(UserContext);
  console.log(userInfo);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    id: userInfo.id,
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.password,
    phone: userInfo.phone,
  });

  const editUser = (user) => {
    setEditing(true);
    setUser({ ...user, password: "" });
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`users/user/${user.id}`, user)
      .then((res) => {
        setUserInfo(user);
        setIsUpdated(true);
      })
      .catch((err) => console.log(err.message));
  };

  const deleteUser = (user) => {
    axiosWithAuth()
      .delete(`users/user/${userInfo.id}`)
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
      <Card>
        <CardHeader title="Profile" />
        <div className="user-info">
          <CardContent>
            <h4>{userInfo.username}</h4>
            <p>{userInfo.email}</p>
            <p>{userInfo.phone}</p>
          </CardContent>
          <CardActions>
            <Button onClick={() => editUser(userInfo)}>Edit</Button>
            <Button onClick={() => deleteUser(userInfo)}>Delete</Button>
          </CardActions>
        </div>
      </Card>
      {editing && (
        <form onSubmit={saveEdit}>
          <Card>
            <CardContent>
              <h3>Edit Profile</h3>
              {/* <label>Username:
                            <TextField
                            label = "Password"
                                type='text'
                                name='username'
                                value={user.username}
                                onChange={handleChange}
                            />
                        </label> */}
              <br />

              <TextField
                label="Password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />

              <br />

              <TextField
                label="email"
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
              />

              <TextField
                label="phone"
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
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
