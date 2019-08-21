import React from "react";
import Search from "./search";

export default function PanelHeader({ onSearch, onAdd }) {
    return (
        <div className="panel-header">
            <Search onSearch={onSearch} placeholder="Search by name..."/>
            <button onClick={onAdd} className="panel-button"><i className="fa fa-plus"></i>Create New</button>
        </div>
    );
}