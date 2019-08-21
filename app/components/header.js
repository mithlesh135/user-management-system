import React from "react";

export default function Headers( { title = "App Name", icon = "app/assets/placeholder.png" } ) {
    return (
        <div className="header">
            <img src={icon}></img>
            <label>{title}</label>
        </div>
    );
}