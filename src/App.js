import "./App.css";
import { Greeting } from "./Greeting";
import { Bye } from "./Greeting";
import Product from "./Product"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Greeting surname="Smith" />
        <Bye />
        <table className="products">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
          <Product name="banabas" price="1$" description="Fresh bananas from Ecuador" />
          <Product name="apple" price="2$" description="Apples from dsf" />
        </table>



      </header>
    </div>
  );
}

export default App;
