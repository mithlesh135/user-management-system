import React, {Component} from "react";

export default class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            value: [],
            data: []
        };

        this.toggle = this.toggle.bind(this);
        this.onSelectValue = this.onSelectValue.bind(this);
    }

    getListData() {
        const {mapping : {value}, selected, data} = this.props;
        
        let result = [...data];
        selected.forEach(element => {
            result  = result.filter(item => element !== item[value]);
        });
        return result;
    }

    getResolvedValues() {
        const {mapping : {value}, selected, data} = this.props;

        return selected.map(element => data.find(item =>  element === item[value]));
    }

    componentDidUpdate(oldProps) {
        const {data, selected} = this.props;

        if(data.length !== oldProps.data.length || selected.length !== oldProps.selected.length) {
            this.setState(prevState => {
                return { data: this.getListData(), value: this.getResolvedValues() }
            });
        }
    }

    toggle() {
        if(event.target.nodeName !== "DIV" && !event.target.classList.contains("fa-sort-down")) {
            return;
        }
        this.setState(prevState => {
            return {
                collapsed: !prevState.collapsed
            }
        });
    }

    collapse() {
        this.setState({ collapsed: true });
    }

    remove(event, group) {
        const {mapping: {value}} = this.props;
        this.setState({
            data: [...this.state.data, this.state.value.find(element => element[value] === group)],
            value: this.state.value.filter(element => element[value] !== group),
        });
        setTimeout(() =>  this.props.onSelect(this.state.value.map(item => item[value])));
    }

    onSelectValue(listItem) {
        const {mapping: {value}} = this.props;

        this.setState(prevState => {
            return {
                data: this.state.data.filter(element => element[value] !== listItem[value]),
                value: [...prevState.value, listItem]
            }
        });
        this.collapse();
        setTimeout(() =>  this.props.onSelect(this.state.value.map(item => item[value])));
    }

    render() {
        let {mapping: {value, display}} = this.props;
        
        return(
            <div className="multi-select">
                <i onClick={this.toggle} className="fa fa-sort-down"></i>
                <div onClick={this.toggle}>{
                    this.state.value.map(item => {
                        return (<span 
                            key={item && item[value]}>
                                {item && item[display]}
                                <i onClick={() => this.remove(event, item[value])}
                                className="fa fa-times">
                                </i>
                        </span>)
                    })
                }</div>
                <ul className={this.state.collapsed && "hide" || ""}>
                    {
                        this.state.data.map(item => {
                            return (
                                <li  
                                key={item[value]}
                                onClick={()=> this.onSelectValue(item)}>
                                    {item[display]}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}