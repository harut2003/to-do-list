import { Component } from "react";

export default class Price extends Component {
    constructor(props) {
        super(props);
        this.price = props.price;
    }
    render() {
        return (
            this.price
        );
    }
}