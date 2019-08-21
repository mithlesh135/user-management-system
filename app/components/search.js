import React, {Component} from "react";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state.search);
    }

    onChange(event) {
        event.preventDefault();

        this.setState({
            search: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input 
                onChange={this.onChange}
                value={this.state.search} 
                className="search" type="text" 
                placeholder={this.props.placeholder}>
                </input>
                <i className="fa fa-search"></i>
            </form>
        );
    }
}