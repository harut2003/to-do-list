import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { passwordValid } from "../helpers/Regexp";
import { changeUserPassword } from "../store/actions";

function ChangePassword({ hide }) {
  const defaultPasswords = {
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  };
  const defaultErrors = {
    newPwd: null,
    confirmPwd: null,
    oldPwd: null,
  };
  const [passwords, setPasswords] = useState(defaultPasswords);
  const [errors, setErrors] = useState(defaultErrors);
  const dispatch = useDispatch();
  const cancel = () => {
    setPasswords(defaultPasswords);
    hide();
  };

  const changePasswords = ({ target: { name, value } }) => {
    setPasswords({ ...passwords, [name]: value });
    if (!value) {
      setErrors({ ...errors, [name]: "Field is required" });
      return;
    } else {
      setErrors({ ...errors, [name]: null });
    }
    if (name === "newPwd") {
      if (!passwordValid.test(value)) {
        setErrors({ ...errors, newPwd: "Min 8 characters, at least a number" });
      } else {
        setErrors({ ...errors, newPwd: null });
      }
    }
    if (name === "confirmPwd") {
      if (value !== passwords.newPwd) {
        setErrors({ ...errors, confirmPwd: "Passwords didn't match" });
      } else {
        setErrors({ ...errors, confirmPwd: null });
      }
    }
  };

  const submitChanges = () => {
    if (!Object.values(errors).every((field) => !field)) {
      return;
    }

    const dataKey = Object.keys(passwords);
    let wrongFields = {};
    dataKey.forEach((key) => {
      if (!passwords[key].trim()) {
        wrongFields[key] = "Field is required";
      }
    });

    if (Object.keys(wrongFields).length > 0) {
      setErrors(wrongFields);
      return;
    }

    const sendingPasswords = {
      oldPassword: passwords.oldPwd,
      newPassword: passwords.newPwd,
      confirmNewPassword: passwords.confirmPwd,
    };
    dispatch(changeUserPassword(sendingPasswords, hide));
  };

  return (
    <Modal size="lg" centered show={true} onHide={cancel} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off" method="post" action="">
          <input
            autoComplete="false"
            name="hidden"
            type="text"
            className="d-none"
          ></input>
          <Form.Label>Old Password</Form.Label>

          <Form.Control
            type="password"
            autoComplete="new-password"
            name="oldPwd"
            value={passwords.oldPwd}
            onChange={changePasswords}
          />
          <Form.Text className="text-danger mb-3">{errors.oldPwd}</Form.Text>
          <br />
          <Form.Label>New Password</Form.Label>

          <Form.Control
            type="password"
            name="newPwd"
            value={passwords.newPwd}
            onChange={changePasswords}
          />
          <Form.Text className="text-danger mb-3">{errors.newPwd}</Form.Text>
          <br />
          <Form.Label>Confirm Password</Form.Label>

          <Form.Control
            name="confirmPwd"
            type="password"
            value={passwords.confirmPwd}
            onChange={changePasswords}
          />
          <Form.Text className="text-danger">{errors.confirmPwd}</Form.Text>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => cancel()}>
          Close
        </Button>
        <Button variant="primary" onClick={submitChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;
