import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { timeZone } from "../helpers/utils";
import { setFilters } from "../store/actions";

const dateOptions = [
  {
    label: "Created after",
    value: "create_gte",
  },
  {
    label: "Created before",
    value: "create_lte",
  },
  {
    label: "Complition after",
    value: "complete_gte",
  },
  {
    label: "Complition before",
    value: "complete_lte",
  },
];
function DatePick({ setFilters, searchingParams }) {
  // const [dates, setDates] = useState({
  //   create_lte: null,
  //   create_gte: null,
  //   complete_lte: null,
  //   complete_gte: null,
  // });
  // const
  // useEffect(() => {
  //   setDates({
  //     ...dates,

  //     [name]: value,
  //   });
  // }, [searchingParams]);

  const handleChangeDate = (value, name) => {
    // setDates({
    //   ...dates,
    //   [name]: value,
    // });
    setFilters(name, value ? timeZone(value) : value);
  };
  return (
    <div>
      <Row className="d-flex mt-3 mb-3 justify-content-between">
        {dateOptions.map((option, index) => (
          <Col key={index} className="text-center" xs={12} sm={6} lg={3}>
            <DatePicker
              className="p-1 rounded border mb-2 justify-content-center w-100"
              placeholderText={option.label}
              selected={
                searchingParams[option.value]
                  ? new Date(searchingParams[option.value])
                  : ""
              }
              onChange={(value) => handleChangeDate(value, option.value)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

const mapStateToProps = ({ searchingParams }) => ({ searchingParams });

const mapDispatchToProps = {
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePick);
