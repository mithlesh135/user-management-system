import React from "react";

export default function UserListItem({ user, onDeleteUser, onClickUser }) {
    return (
        <div className="user-list-item" onClick={() => onClickUser(user.id)}>
            <div className="user-list-top"><i onClick={(event) => onDeleteUser(event, user.id)}className="fa fa-trash delete"></i></div>
            <img src={user.image || "app/assets/user.png"}/>
            <h5 className="name">{ user.name }</h5>
            <h5><i className="fa fa-at"></i>{ user.id }</h5>
            <h5><i className="fa fa-envelope"></i>{user.emailId}</h5>
            <h5><i className="fa fa-phone"></i>{user.phone}</h5>
        </div>
    );
}