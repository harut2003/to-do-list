import { Card, Container, Button } from "react-bootstrap";
import { formatDate } from "../../helpers/utils";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faClock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../../components/EditTaskModal";
import { getTask, deleteTask, editTask } from "../../store/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
function SingleTask({ getTask, task, deleteTask, editTask }) {
  let [state, setState] = useState({
    showModal: false,
  });
  let params = useParams();
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
              {task.status === "active" ? (
                <Button
                  onClick={() =>
                    editTask({ status: "done", _id: task._id }, null, "single")
                  }
                  variant="warning"
                >
                  <FontAwesomeIcon icon={faClock} />
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    editTask(
                      { status: "active", _id: task._id },
                      null,
                      "single"
                    )
                  }
                  variant="success"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              )}
              <Button
                variant="warning"
                className="ms-3"
                onClick={toggleEditModal}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button variant="danger" onClick={deleteItem} className="ms-3">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
              <p className="mt-3 mb-1 text-muted">
                Created at: {formatDate(task.created_at, 16).replace("T", " ")}
              </p>
              {task.created_at !== task.updated_at && (
                <p className=" mb-0 text-muted">
                  Last change:{" "}
                  {formatDate(task.updated_at, 16).replace("T", " ")}
                </p>
              )}
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
  editTask,
};

export default connect(mupStateToProps, mupDispatchToProps)(SingleTask);
