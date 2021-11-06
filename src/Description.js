import { Component } from "react";

export default class Description extends Component {
    constructor(props) {
        super(props);
        this.description = props.description;
    }
    render() {
        return (
            this.description
        );
    }
}