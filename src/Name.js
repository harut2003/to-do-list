import { Component } from "react";

export default class Name extends Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }
    render() {
        return (
            this.name
        );
    }
}