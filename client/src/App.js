import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.scss";

import store from "./store";
import Navbar from "./components/layout/navbar/Navbar";
import Landing from "./components/layout/landing/Landing";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Alert from "./components/layout/alert/Alert";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfile from "./components/profile-forms/editProfile/EditProfile";
import CreateProfile from "./components/profile-forms/createProfile/CreateProfile";
import AddProject from "./components/profile-forms/addProject/AddProject";
import AddEducation from "./components/profile-forms/addEducation/AddEducation";
import Profiles from "./components/profiles/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Alert />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/profiles" exact component={Profiles} />
        <Route path="/profile/:id" exact component={Profile} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/create-profile" exact component={CreateProfile} />
        <PrivateRoute path="/edit-profile" exact component={EditProfile} />
        <PrivateRoute path="/add-project" exact component={AddProject} />
        <PrivateRoute path="/add-education" exact component={AddEducation} />
        <PrivateRoute path="/posts" exact component={Posts} />
      </Switch>
    </div>
  );
};

export default App;
