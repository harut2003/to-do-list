import { Card, Container, Button } from "react-bootstrap";
import { formatDate } from "../../helpers/utils";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditTaskModal from "../../components/EditTaskModal";

function SingleTask() {
  let [state, setState] = useState({ task: null, showModal: false });
  let params = useParams();
  let navigate = useNavigate();
  const id = params.taskId;
  const { task, showModal } = state;
  useEffect(() => {
    fetch(`http://localhost:3001/task/${id}`)
      .then(async (res) => {
        const result = await res.json();
        if (res.status >= 400) {
          if (result.error) {
            throw result.error;
          } else {
            throw new Error("Something went wrong");
          }
        }
        setState({ ...state, task: result });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = () => {
    fetch(`http://localhost:3001/task/${task._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.status >= 400) {
          if (result.error) {
            throw result.error;
          } else {
            throw new Error("Something went wrong");
          }
        }

        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editTask = (task) => {
    setState({ task, showModal: false });
  };
  const toggleEditModal = () => {
    setState({ ...state, showModal: !showModal });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          {state.task && (
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
        <EditTaskModal
          task={task}
          addTask={editTask}
          onClose={toggleEditModal}
        />
      )}
    </Container>
  );
}
export default SingleTask;
