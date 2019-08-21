import React, {Component} from "react";
import Locales from "../locale/en.json";
import Validation from "../utils/validation";
import AjaxHandler from "../utils/ajaxHandler";
import MultiSelect from "./multiSelect";

export default class GroupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            users: [],
            allUsers: [],
            error: {
                name: false
            }
        };

        this.validation = new Validation();
        this.ajaxHandler = new AjaxHandler();
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectUser = this.onSelectUser.bind(this);
        
    }

    componentDidMount() {
        let promises = [];

        if(this.props.match.params.id) {
            promises.push(this.ajaxHandler.getAll(`groups/${this.props.match.params.id}`))
        }
        promises.push(this.ajaxHandler.getAll("users"));

        Promise.all(promises).then(res => {
            let formData = {};
            if(res.length === 2) {
                formData = Object.assign({}, res[0].data, {allUsers: res[1].data});
            } else {
                formData = Object.assign({}, {allUsers: res[0].data});
            }

            this.setState(formData);
        })
    }

    onChange(field, {target : {value}}) {
        this.setState(prevState => {
            return {
                [field]: value,
                error: Object.assign({}, prevState.error, this.validation.validate(field, value))
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        
        let error = this.validation.validate("name", this.state.name);

        if(error.name) {
            this.setState({error});
            return;
        }

        this.saveData();
    }

    onSelectUser(selected) {
        this.setState({users: selected});
    }

    saveData() {
        let data = Object.assign({}, this.state);
        
        delete data.error;
        delete data.allUsers;

        let promise;

        if(this.props.match.params.id) {
            promise = this.ajaxHandler.update(`groups/${this.props.match.params.id}`, data);
        } else {
            promise = this.ajaxHandler.create("groups", data);
            
        }

        promise.then(res => this.props.history.push("/groups"));
    }

    render() {
        const { form: { validation } } = Locales;

        return <div className="create-panel">
                <form onSubmit={this.onSubmit}>
                    <input 
                    value={this.state.name} 
                    onChange={() => this.onChange("name", event)} 
                    type="text" placeholder="Name *"/>
                    {this.state.error.name && <h6>{validation.name}</h6>}
                    <input 
                    value={this.state.description} 
                    onChange={() => this.onChange("description", event)}
                    type="text" 
                    placeholder="Description"/>
                    <MultiSelect
                         data = {this.state.allUsers}
                         selected = {[]}
                         mapping={
                            {
                                display: "name",
                                value: "id"
                            }
                        }
                        selected={this.state.users}
                        onSelect={this.onSelectUser}
                    />
                    <button>SAVE</button>
                 </form>
            </div>
    };
}