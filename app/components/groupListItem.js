import React from "react";

export default function GroupListItem({ group = {},  onClick, onDelete }) {
    const {users = []} = group;
    return (
        <div onClick={() => { onClick(group.id) }} className="group-list-item">
            <div className="group-icon"><i className="fa fa-users"></i></div>
            <div>
                <h5>@{group.id}</h5>
                <h5>{group.name}</h5>
            </div>
            <div className="delete-icon"><i onClick={(event) =>  {
                event.stopPropagation();
                !users.length && onDelete(event, group.id)
            }} disabled={users.length} className="fa fa-trash"></i></div>
        </div>
    );
}