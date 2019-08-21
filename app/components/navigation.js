import React from "react";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import Users from "./users";
import Groups from "./groups";
import Locales from "../locale/en.json";
import UserForm from "./userForm";
import GroupFrom from "./groupForm";

export default function Navigation( {  } ) {
    return (<Router>
        <div className="navigation">
            <ul className="left-panel">
                <li>
                    <NavLink exact={true} to="/">
                        <i className="fa fa-user"></i>
                        {Locales.users}
                    </NavLink>
                </li>
                <li>
                    <NavLink exact={true} to="/groups">
                        <i className="fa fa-users"></i>
                        {Locales.groups}
                    </NavLink>
                </li>
            </ul>
            <div className="right-panel">
                <Switch>
                    <Route path="/" exact={true} component={Users}></Route>
                    <Route path="/groups" component={Groups}></Route>
                    <Route path="/adduser/:id" component={UserForm}></Route>
                    <Route path="/adduser" component={UserForm}></Route>
                    <Route path="/addgroup/:id" component={GroupFrom}></Route>
                    <Route path="/addgroup" component={GroupFrom}></Route>
                </Switch>
            </div>
        </div>
    </Router>);
}
