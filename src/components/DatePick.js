import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { formatDate } from "../helpers/utils";
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
    //    console.log(new Date(formatDate(value.toISOString())));
    setFilters(name, value ? formatDate(value.toISOString()) : value);
  };
  return (
    <div>
      {dateOptions.map((option, index) => (
        <div key={index}>
          {option.label}
          <DatePicker
            selected={
              searchingParams[option.value]
                ? new Date(searchingParams[option.value])
                : ""
            }
            onChange={(value) => handleChangeDate(value, option.value)}
          />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({ searchingParams }) => ({ searchingParams });

const mapDispatchToProps = {
  setFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePick);
