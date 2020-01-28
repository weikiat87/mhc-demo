import React from "react";
import "./App.css";
import LoginPage from "./views/LoginPage";
import AdminDashboardPage from "./views/AdminDashboardPage";
import AdminCreatePage from "./views/AdminCreatePage";
import { Switch, Route } from "react-router-dom";
import VendorDashboardPage from "./views/VendorPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/admin" component={AdminDashboardPage} />
        <Route exact path="/admin/create" component={AdminCreatePage} />
        <Route exact path="/vendor" component={VendorDashboardPage} />
      </Switch>
    </div>
  );
};

export default App;
