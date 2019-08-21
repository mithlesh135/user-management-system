import React, {Component} from "react";
import AjaxHandler from "../utils/ajaxHandler";
import GroupListItem from "./groupListItem";
import PanelHeader from "./panelHeader";

export default class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };

        this.ajaxHandler = new AjaxHandler();
        this.onSearchGroup = this.onSearchGroup.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onClickGroup = this.onClickGroup.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(search) {
        this.ajaxHandler.getAll("groups", search).then(res => {
            this.setState({
                groups: res.data
            });
        }, err => {
            this.setState({
                err: "Failed to load groups"
            });
        });
    }

    onSearchGroup(name) {
        this.fetchData({ searchField: "name", value: name});
    }

    onAdd() {
        this.props.history.push("/addgroup");
    }

    onClickGroup(id) {
        this.props.history.push(`/addgroup/${id}`);
    }

    onDelete(event, id) {
        
        this.ajaxHandler.delete("groups", id).then(res => {
            this.fetchData();
        }).catch(err => {
            this.setState({
                err: `Failed to delete user ${id}`
            });
        });
    }

    
    render() {
        const {groups} = this.state;

        return (
        <React.Fragment>
            <PanelHeader onSearch={this.onSearchGroup} onAdd={this.onAdd}/>
            <div className="group-list">{groups.map(group => {
                return <GroupListItem onClick={this.onClickGroup} key={group.id} group={group} onDelete={this.onDelete}/>
            })}</div>
        </React.Fragment>
        );
    }
}