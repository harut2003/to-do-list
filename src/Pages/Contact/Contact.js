import { useState } from "react";
import {
  Container,
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import SubmitModal from "./SubmitModal";
import styles from "./contact.module.css";
import request from "../../helpers/request";
const apiHost = process.env.REACT_APP_API_HOST;

export default function Contact() {
  const newContact = {
    name: "",
    email: "",
    message: "",
  };
  const [data, setData] = useState(newContact);
  const [errors, setError] = useState({
    name: null,
    email: null,
    message: null,
  });
  const [showPopUp, setPopUp] = useState(false);
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const changeInputValue = ({ target: { name, value } }) => {
    if (!value) {
      setError({ ...errors, [name]: "Field is required" });
    } else {
      setError({ ...errors, [name]: null });
    }

    if (name === "email" && value) {
      if (!re.test(value)) {
        setError({ ...errors, email: "Incorrect email" });
      } else {
        setError({ ...errors, email: null });
      }
    }
    setData({ ...data, [name]: value });
  };
  const sendData = () => {
    if (!Object.values(errors).every((field) => !field)) {
      return;
    }

    const dataKey = Object.keys(data);
    let wrongFields = {};
    dataKey.forEach((key) => {
      if (!data[key].trim()) {
        // console.log(errors);
        // setError({ ...errors, [key]: "Field is required" });
        wrongFields[key] = "Field is required";
      }
    });

    if (Object.keys(wrongFields).length > 0) {
      setError(wrongFields);
      return;
    }

    request(`${apiHost}/form`, "POST", data)
      .then(() => {
        setData(newContact);
        setPopUp(true);
        setTimeout(() => {
          setPopUp(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Form.Group className="mb-3 container-fix">
            <h1 className="text-center">Contact Us</h1>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3 mt-4"
            >
              <Form.Control
                className={errors.name && styles.invalid}
                value={data.name}
                onChange={changeInputValue}
                name="name"
                type="text"
                placeholder="Name"
              />
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                value={data.email}
                className={errors.email && styles.invalid}
                onChange={changeInputValue}
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Mesasage">
              <Form.Control
                value={data.message}
                className={errors.message && styles.invalid}
                onChange={changeInputValue}
                name="message"
                as="textarea"
                placeholder="Leave a mesasage here"
                style={{ height: "100px" }}
              />
              <Form.Text className="text-danger">{errors.message}</Form.Text>
            </FloatingLabel>
          </Form.Group>
          <div className="text-center">
            <Button className="w-25" onClick={sendData}>
              Send
            </Button>
          </div>

          {showPopUp && <SubmitModal />}
        </Col>
      </Row>
    </Container>
  );
}
