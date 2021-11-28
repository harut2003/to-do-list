import { connect } from "react-redux";

function Decrement(props) {
  return <button onClick={props.decrement}>Decrement</button>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    decrement: () => {
      dispatch({ type: "DECREMENT" });
    },
  };
};

export default connect(null, mapDispatchToProps)(Decrement);
