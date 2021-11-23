// import { Greeting } from "./Greeting";
// import { Bye } from "./Greeting";
// import Product from "./Product";
import ToDo from "./components/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import NotFound from "./Pages/NotFound/NotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import SingleTask from "./Pages/SingleTask/SingleTask";
import "./stylesheets/App.css";
import { Component } from "react";
class App extends Component {
  state = {
    clickedTask: null,
  };
  getClickedTask = (clickedTask) => {
    this.setState({
      clickedTask,
    });
  };
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path={"/"} element={<Navigate replace to="/home" />} />
          <Route exact path={"/home"} element={<ToDo />} />
          <Route exact path={"/task/:taskId"} element={<SingleTask />} />
          <Route exact path={"/about"} element={<About />} />
          <Route exact path={"/Contact"} element={<Contact />} />
          <Route exact path={"/404"} element={<NotFound />} />

          <Route exact path={"*"} element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
