import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import Navigation from "./components/navigation";
import Locales from "./locale/en.json";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

function App() {
    return (
        <React.Fragment>
            <Header title={Locales.appName}/>
            <Navigation/>
        </React.Fragment>
    );
}

ReactDOM.render(<App/>, document.getElementById("app-container"));

