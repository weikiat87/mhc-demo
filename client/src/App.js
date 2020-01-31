import React, { useState } from "react";
import "./App.css";
import LoginPage from "./views/LoginPage";
import AdminDashboardPage from "./views/AdminDashboardPage";
import AdminCreatePage from "./views/AdminCreatePage";
import VendorDashboardPage from "./views/VendorDashboardPage";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import PrivateRoute from './components/PrivateRoutes';

const App = () => {
  //user state for UserContext
  const [user, setUser] = useState(null)
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>  
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/admin" type="HRAdmin" component={AdminDashboardPage} />
          <PrivateRoute exact path="/admin/create" type="HRAdmin" component={AdminCreatePage} />
          <PrivateRoute exact path="/vendor" type="Vendor" component={VendorDashboardPage} />
          <Redirect to="/"></Redirect>
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default App;
