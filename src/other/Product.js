import { Component } from "react";
import Price from "./Price";
import Name from "./Name";
import Description from "./Description";

export default class Product extends Component {


    render() {
        const { name, price, description } = this.props;
        return (
            <tr>
                <Name name={name} />
                <Price price={price} />
                <Description description={description} />
            </tr>



        );
    }
}