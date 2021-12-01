import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router";

function AuthRoute({ type, isAuthenticated }) {
  if (type === "public" && isAuthenticated) {
    return <Navigate replace to="/home" />;
  }
  if (type === "private" && !isAuthenticated) {
    return <Navigate replace to="/sign-in" />;
  }
  return <Outlet />;
}

const mapStateToProps = ({ isAuthenticated }) => ({ isAuthenticated });

export default connect(mapStateToProps)(AuthRoute);
