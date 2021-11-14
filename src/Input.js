import { Component } from "react";
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import idGenerator from "./idGenerator";

class Input extends Component {
    state = {
        title: ""
    };
    changeInput = (e) => {
        this.setState({
            title: e.target.value
        });
    };
    handleSubmit = () => {

        const newTask = {
            _id: idGenerator(),
            title: this.state.title,
        };
        this.props.value(newTask);
        this.setState({
            title: ""
        });
    };
    render() {
        return (
            <InputGroup>
                <FormControl
                    placeholder="Task's name"
                    aria-label="Task's name"
                    aria-describedby="basic-addon2"
                    onChange={this.changeInput}
                    value={this.state.title}
                    onKeyUp={(e) => e.key === "Enter" ? this.addText() : false}
                />
                <Button onClick={this.handleSubmit} variant="outline-secondary" id="button-addon2">
                    Add task
                </Button>
            </InputGroup>
        )
    }
}
export default Input;