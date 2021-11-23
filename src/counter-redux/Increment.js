import { connect } from "react-redux";

function Increment({ increment }) {
  return <button onClick={increment}>Increment</button>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch({ type: "INCREMENT" });
    },
  };
};

export default connect(null, mapDispatchToProps)(Increment);
