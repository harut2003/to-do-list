import { InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { setFilters } from "../store/actions";
function Search({ setFilters, searchingParams }) {
  return (
    <div>
      <InputGroup>
        <FormControl
          value={searchingParams.search}
          onChange={(e) => setFilters("search", e.target.value)}
          placeholder="Search"
        />
      </InputGroup>
    </div>
  );
}

const mapStateToProps = ({ searchingParams }) => ({ searchingParams });

const mapDispatchToProps = {
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
