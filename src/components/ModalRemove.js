import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteSelectedTasks } from "../store/actions";
function ModalRemove({
  show,
  hideFunction,
  count,
  deleteSelectedTasks,
  selectedTasks,
}) {
  return (
    <Modal show={show} onHide={hideFunction} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Are you sure to remove {count} task{count > 1 ? "s" : ""}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideFunction}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => deleteSelectedTasks(selectedTasks, hideFunction)}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
ModalRemove.propTypes = {
  show: PropTypes.bool.isRequired,
  hideFunction: PropTypes.func.isRequired,
};
const mapStateToProps = ({ selectedTasks }) => {
  return { selectedTasks };
};
const mapDispatchToProps = {
  deleteSelectedTasks,
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalRemove);
