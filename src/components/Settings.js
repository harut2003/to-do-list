import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeUserData } from "../store/actions";
import ChangePassword from "./ChangePassword";

function Settings({ hideModal }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  const defaultData = {
    name: user.name,
    surname: user.surname,
  };
  const [userData, setUserData] = useState(defaultData);
  const [passwordModal, setPasswordModal] = useState(false);
  const changeValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const cancel = () => {
    setUserData(defaultData);
    hideModal();
  };
  const handleSubmitData = () => {
    if (
      userData.name === defaultData.name &&
      userData.surname === defaultData.surname
    ) {
      hideModal();
      return;
    }
    dispatch(changeUserData(userData, hideModal));
  };

  const openPasswordModal = () => {
    setPasswordModal(!passwordModal);
  };

  return (
    <>
      <Modal
        size="lg"
        centered
        show={!passwordModal}
        onHide={cancel}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="mb-3"
            required
            type="text"
            name="name"
            value={userData.name}
            onChange={changeValue}
          />
          <Form.Label>Surname</Form.Label>
          <Form.Control
            required
            type="text"
            name="surname"
            defaultValue={userData.surname}
            onChange={changeValue}
          />
          <hr />
          <Button variant="warning" onClick={openPasswordModal}>
            Change password
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => cancel()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {passwordModal && <ChangePassword hide={setPasswordModal} />}
    </>
  );
}

export default Settings;
