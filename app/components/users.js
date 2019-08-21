import React, { Component } from "react";
import AjaxHandler from "../utils/ajaxHandler";
import UserListItem from "./userListItem";
import PanelHeader from "./panelHeader";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.ajaxHandler = new AjaxHandler();
        this.state = {
            users: []
        };

        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onSearchUser = this.onSearchUser.bind(this);
        this.onAddUser = this.onAddUser.bind(this);
        this.onClickUser = this.onClickUser.bind(this);
    }

    componentDidMount() {
        this.fetchUserData();
    }

    onDeleteUser(event, userId) {
        event.stopPropagation();
        event.preventDefault();
        
        this.ajaxHandler.delete("users", userId).then(res => {
            this.fetchUserData();
        }).catch(err => {
            this.setState({
                err: `Failed to delete user ${userId}`
            });
        });
    }

    fetchUserData(search) {
        this.ajaxHandler.getAll("users", search).then(res => {
            this.setState({
                users: res.data,
                err: null
            });
        }, err => {
            this.setState({
                users: res.data,
                err: "Failed to load data"
            });
        });
    }

    onSearchUser(name) {
        this.fetchUserData({ searchField: "name", value: name});
    }

    onAddUser() {
        this.props.history.push("/adduser");
    }

    onClickUser(id) {
        this.props.history.push(`/adduser/${id}`);
    }

    render() {
        return (
            <React.Fragment>
                <PanelHeader onSearch={this.onSearchUser} onAdd={this.onAddUser}/>
                <div className="user-list">{
                    this.state.users.map( user =>  <UserListItem onClickUser={this.onClickUser} onDeleteUser={this.onDeleteUser} key={user.id} user={user}/>)
                }</div>
            </React.Fragment>
        );
    }
}