import { connect } from "react-redux";

function ShowCount({ count }) {
  return <h1>{count}</h1>;
}

function mapStateToProps({ count }) {
  return {
    count,
  };
}

export default connect(mapStateToProps)(ShowCount);
