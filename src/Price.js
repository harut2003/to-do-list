import { Component } from "react";

export default class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            currency: 'dram'
        };
    }
    changeCurrency = () => {
        let { price, currency } = this.state;
        if (price.includes('$')) {
            price = parseFloat(price) * 500 + '֏';
            currency = 'dollar';
        }
        else {
            price = parseFloat(price) / 500 + '$';
            currency = 'dram';
        }
        this.setState({
            currency: currency,
            price: price
        });
    };
    render() {
        let { price, currency } = this.state;
        return (
            <td>{price} <button onClick={this.changeCurrency}>Change to {currency}</button></td>
        );
    }

}