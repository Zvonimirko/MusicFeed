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
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
