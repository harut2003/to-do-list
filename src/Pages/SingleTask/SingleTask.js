import { Card, Container, Button } from "react-bootstrap";
import { formatDate } from "../../helpers/utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../../components/EditTaskModal";
import { getTask, deleteTask } from "../../store/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
function SingleTask({ getTask, task, deleteTask }) {
  let [state, setState] = useState({
    showModal: false,
  });
  let params = useParams();
  console.log(params);
  const id = params.taskId;
  const { showModal } = state;
  useEffect(() => {
    getTask(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let navigate = useNavigate();
  const deleteItem = () => {
    deleteTask(task._id, "single", navigate);
  };

  // const editTask = (task) => {
  //   setState({ task, showModal: false });
  // };
  const toggleEditModal = () => {
    setState({ ...state, showModal: !showModal });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          {task && (
            <>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description} </Card.Text>
              <Card.Text>{formatDate(task.date)}</Card.Text>
              <Button variant="warning" onClick={toggleEditModal}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="danger" onClick={deleteItem} className="ms-3">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      {showModal && (
        <EditTaskModal task={task} from="single" onClose={toggleEditModal} />
      )}
    </Container>
  );
}

const mupStateToProps = ({ singleTask }) => ({
  task: singleTask,
});

const mupDispatchToProps = {
  getTask,
  deleteTask,
};

export default connect(mupStateToProps, mupDispatchToProps)(SingleTask);
