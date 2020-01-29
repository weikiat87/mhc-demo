import React, { useState } from "react";
import "./App.css";
import LoginPage from "./views/LoginPage";
import AdminDashboardPage from "./views/AdminDashboardPage";
import AdminCreatePage from "./views/AdminCreatePage";
import { Switch, Route } from "react-router-dom";
import VendorDashboardPage from "./views/VendorPage";
import PrivateRoute from './components/PrivateRoutes';
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [userToken, setUserToken] = useState(null)
  const setToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data))
    setUserToken(data);
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ userToken, setUserToken: setToken }}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/admin" component={AdminDashboardPage} />
          <PrivateRoute exact path="/admin/create" component={AdminCreatePage} />
          <PrivateRoute exact path="/vendor" component={VendorDashboardPage} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default App;
