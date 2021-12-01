// import { Greeting } from "./Greeting";
// import { Bye } from "./Greeting";
// import Product from "./Product";
import ToDo from "./components/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import NotFound from "./Pages/NotFound/NotFound";
import { Routes, Navigate, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SingleTask from "./Pages/SingleTask/SingleTask";
import "./stylesheets/App.css";
import Spinner from "./components/spinner/Spinner";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CustomRouter from "./helpers/CustomRouter";
import history from "./helpers/history";
import AuthRoute from "./components/AuthRoute";

//import { history } from "./helpers/history";
const notifOptions = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
function App({ isLoading, successMessage, errorMessage, isAuthenticated }) {
  //let [searchParams, setSearchParams] = useSearchParams();
  //console.log(searchParams);
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, notifOptions);
    }
    if (errorMessage) {
      toast.error(errorMessage, notifOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMessage, errorMessage]);

  // useEffect(() => {

  // }, [searchingParams]);
  console.log();
  return (
    <CustomRouter history={history}>
      <Header />
      <Routes>
        <Route exact path="/" element={<AuthRoute type="private" />}>
          <Route exact path={"/"} element={<Navigate replace to={"/home"} />} />
        </Route>

        <Route exact path="/home" element={<AuthRoute type="private" />}>
          <Route exact path={"/home"} element={<ToDo />} />
        </Route>
        <Route
          exact
          path="/task/:taskId"
          element={<AuthRoute type="private" />}
        >
          <Route exact path={"/task/:taskId"} element={<SingleTask />} />
        </Route>

        <Route exact path={"/about"} element={<About />} />
        <Route exact path={"/Contact"} element={<Contact />} />

        <Route exact path="/sign-in" element={<AuthRoute type="public" />}>
          <Route exact path={"/sign-in"} element={<Login />} />
        </Route>

        <Route exact path="/sign-up" element={<AuthRoute type="public" />}>
          <Route exact path={"/sign-up"} element={<Register />} />
        </Route>

        <Route exact path={"/404"} element={<NotFound />} />

        <Route exact path={"*"} element={<NotFound />} />
      </Routes>
      {isLoading && <Spinner />}
      <ToastContainer />
    </CustomRouter>
  );
}
const mapStateToProps = ({
  isLoading,
  successMessage,
  errorMessage,
  isAuthenticated,
}) => ({
  isLoading,
  successMessage,
  errorMessage,
  isAuthenticated,
});

export default connect(mapStateToProps, null)(App);
