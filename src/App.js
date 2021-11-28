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
import Spinner from "./components/spinner/Spinner";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getTasks } from "./store/actions";
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
let isFirst = true;
function App({
  isLoading,
  successMessage,
  errorMessage,
  searchingParams,
  getTasks,
}) {
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

  useEffect(() => {
    if (!isFirst) {
      getTasks(searchingParams);
    }
    isFirst = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchingParams]);

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
      {isLoading && <Spinner />}
      <ToastContainer />
    </BrowserRouter>
  );
}
const mapStateToProps = ({
  isLoading,
  successMessage,
  errorMessage,
  searchingParams,
}) => ({
  isLoading,
  successMessage,
  errorMessage,
  searchingParams,
});

const mapDispatchToProps = {
  getTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
