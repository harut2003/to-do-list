import { Component } from "react";

export default class Description extends Component {
    render() {
        return (
            <td>{this.props.description}</td>
        );
    }
}