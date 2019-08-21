import React, {Component} from "react";
import Locales from "../locale/en.json";
import MultiSelect from "./multiSelect";
import AjaxHandler from "../utils/ajaxHandler";
import Validation from "../utils/validation";

export default class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            phone: null,
            dob: null,
            groups: [],
            allGroups: [],
            error: {
                name: false,
                email: false,
                groups: false
            }
        }

        this.ajaxHandler = new AjaxHandler();
        this.validation = new Validation();

        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectGroup = this.onSelectGroup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let promises = [];

        if(this.props.match.params.id) {
            promises.push(this.ajaxHandler.getAll(`users/${this.props.match.params.id}`))
        }
        promises.push(this.ajaxHandler.getAll("groups"));

        Promise.all(promises).then(res => {
            let formData = {};
            if(res.length === 2) {
                formData = Object.assign({}, res[0].data, {allGroups: res[1].data});
            } else {
                formData = Object.assign({}, {allGroups: res[0].data});
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
        
        let validate = ["name", "email", "groups"];
        let error = {};

        validate.forEach(field => {
            error[field] = this.validation.validate(field, this.state[field])[field];
        });

        if(!this.validation.isUIValid(error)) { 
            this.setState({error});
            return 
        };
        this.saveData();
    }

    saveData() {
        let data = Object.assign({}, this.state);
        
        delete data.error
        delete data.allGroups

        let promise;

        if(this.props.match.params.id) {
            promise = this.ajaxHandler.update(`users/${this.props.match.params.id}`, data);
        } else {
            promise = this.ajaxHandler.create("users", data);
            
        }

        promise.then(res => this.props.history.push("/"));
    }

    onSelectGroup(selected) {
        this.setState(prevState => {
            return {
                groups: selected,
                error: Object.assign({}, prevState.error, this.validation.validate("groups", selected))
            }
        });
    }

    render() {
        const { form: { validation } } = Locales;

        return (
            <div className="create-panel">
                <form onSubmit={this.onSubmit}>
                    <input 
                    value={this.state.name} 
                    onChange={() => this.onChange("name", event)} 
                    type="text" placeholder="Name *"/>
                    {this.state.error.name && <h6>{validation.name}</h6>}
                    <input 
                    value={this.state.email} 
                    onChange={() => this.onChange("email", event)}
                    type="email" 
                    placeholder="Email *"/>
                    {this.state.error.email && <h6>{validation.email}</h6>}
                    <input 
                    type="phone" 
                    value={this.state.phone || ""} 
                    placeholder="Phone" 
                    onChange={() => this.onChange("phone", event)}/>
                    <input 
                    value={this.state.dob || ""} 
                    type="date" 
                    onChange={() => this.onChange("dob", event)}
                    placeholder="DOB"/>
                    <MultiSelect 
                    mapping={
                        {
                            display: "name",
                            value: "id"
                        }
                    }
                    data={this.state.allGroups}
                    selected={this.state.groups}
                    onSelect={this.onSelectGroup}/>
                    {this.state.error.groups && <h6>{validation.groups}</h6>}
                    <button>SAVE</button>
                 </form>
            </div>
        );
    }
    
}