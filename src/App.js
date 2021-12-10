import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import CustomerList from "./Components/CustomerList";
import RoleList from "./Components/RoleList";
import EmployeeList from "./Components/EmployeeList";
import CategoryList from "./Components/CategoryList";
import FlavourList from "./Components/FlavourList";
import ShapeList from "./Components/ShapeList";
import Order from "./Components/Order";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/customerlist">
          <CustomerList></CustomerList>
        </Route>
        <Route path="/rolelist">
          <RoleList></RoleList>
        </Route>
        <Route path="/employeelist">
          <EmployeeList></EmployeeList>
        </Route>
        <Route path="/categorylist">
          <CategoryList></CategoryList>
        </Route>
        <Route path="/flavourlist">
          <FlavourList></FlavourList>
        </Route>
        <Route path="/ShapeList">
          <ShapeList></ShapeList>
        </Route>
        <Route path="/order">
          <Order></Order>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
