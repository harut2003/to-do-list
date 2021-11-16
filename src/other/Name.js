import { Component } from "react";

export default class Name extends Component {
    render() {
        return (
            <td>{this.props.name}</td>
        );
    }
}