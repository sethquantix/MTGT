import React, {Component} from 'react';
import Input from "Components/NewEvent/Input";

class UpdatableField extends Component {

    constructor(props) {
        super(props);
        this.state = { update: false, value: props.prop || "" };
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.prop, this.props.prop);
        if (prevProps.prop !== this.props.prop) {
            this.setState({value: this.props.prop || "", update: false });
        }
    }

    edit = e => {
        this.setState({value: e.target.value});
    };

    validate = () => {
        this.props.validate(this.state.value);
        this.setState({update: false, value: this.props.prop || ""});
    };

    cancel = () => {
        this.setState({update: false, value: this.props.prop || "" });
    };

    update = () => {
        this.setState({update: true, value: this.props.prop || ""});
    }

    render() {
        const {prop, propName, container } = this.props;

        const className = "updatable-container " + (container || "");
        return <div className={className}>
            <div className="updatable-name">{propName}</div>
            {this.state.update ?
                <React.Fragment>
                    <input className="updatable-input" value={this.state.value} onChange={this.edit}/>
                    <button className="updatable-cancel" onClick={this.cancel}>Cancel</button>
                    <button className="updatable-edit" onClick={this.validate}>Edit</button>
                </React.Fragment> :
                <React.Fragment>
                    {this.state.value && <div className="updatable-value">{prop}</div>}
                    <button className="updatable-edit" onClick={this.update}>Update...</button>
                </React.Fragment>
            }
        </div>;
    }
}

export default UpdatableField;
