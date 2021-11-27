import { useEffect, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { setFilters } from "../store/actions";
// const statusOptions = [
//   {
//     label: "All",
//     value: "",
//   },
//   {
//     label: "Active",
//     value: "active",
//   },
//   {
//     label: "Done",
//     value: "done",
//   },
// ];
let isFirst = true;
let oneTime = true;
function Search({ setFilters, searchingParams }) {
  // const [status, setStatus] = useState({ value: "", label: "" });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchingParams.search && oneTime) {
      setSearchValue(searchingParams.search);
      oneTime = false;
    }
  }, [searchingParams]);

  useEffect(() => {
    if (!isFirst && searchingParams.search !== searchValue) {
      const timer = setTimeout(() => {
        setFilters("search", searchValue);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }

    isFirst = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div>
      <InputGroup>
        <FormControl
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
        />
        {/* <DropdownButton
          variant="outline-secondary"
          title={status.value ? status.label : "Status"}
          id="input-group-dropdown-1"
        >
          {statusOptions.map((option, index) => (
            <Dropdown.Item
              active={option.value === status.value}
              key={index}
              onClick={() => setStatus(option)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton> */}
      </InputGroup>
    </div>
  );
}

const mapStateToProps = ({ searchingParams }) => ({ searchingParams });

const mapDispatchToProps = {
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
