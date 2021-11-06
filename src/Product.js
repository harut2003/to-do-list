import { Component } from "react";
import Price from "./Price";
import Name from "./Name";
import Description from "./Description";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.price = props.price;
        this.description = props.description;
    }

    render() {
        return (
            <tr>
                <td><Name name={this.name} /></td>
                <td><Price price={this.price} /></td>
                <td><Description description={this.description} /></td>
            </tr>



        );
    }
}