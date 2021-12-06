import { useState } from "react";
import { Col, Container, FloatingLabel, Row, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/actions";
import stylesContact from "../Contact/contact.module.css";
import styles from "./login.module.css";
import { emailValid } from "../../helpers/Regexp";

function Login({ login }) {
  const newLogin = {
    email: "",
    password: "",
  };
  const [errors, setError] = useState({
    email: null,
    password: null,
  });
  const [data, setData] = useState(newLogin);
  const sendData = () => {
    if (!Object.values(errors).every((field) => !field)) {
      return;
    }

    const dataKey = Object.keys(data);
    let wrongFields = {};
    dataKey.forEach((key) => {
      if (!data[key].trim()) {
        wrongFields[key] = "Field is required";
      }
    });

    if (Object.keys(wrongFields).length > 0) {
      setError(wrongFields);
      return;
    }

    login(data);
  };

  const changeInputValue = ({ target: { name, value } }) => {
    if (!value) {
      setError({ ...errors, [name]: "Field is required" });
    } else {
      setError({ ...errors, [name]: null });
    }

    if (name === "email" && value) {
      if (!emailValid.test(value)) {
        setError({ ...errors, email: "Incorrect email" });
      } else {
        setError({ ...errors, email: null });
      }
    }
    setData({ ...data, [name]: value });
  };

  return (
    <div className={styles.container}>
      <Container>
        <Row className="justify-content-center">
          <Col xl={6} xs={12}>
            <div className="container-fix">
              <h3 className={styles.titles}>Sign In</h3>

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3 mt-3"
              >
                <Form.Control
                  value={data.email}
                  className={errors.email && stylesContact.invalid}
                  name="email"
                  type="email"
                  onChange={changeInputValue}
                  placeholder="name@example.com"
                />
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  value={data.password}
                  className={errors.password && stylesContact.invalid}
                  name="password"
                  onChange={changeInputValue}
                  type="password"
                  placeholder="password"
                  onKeyDown={(e) => e.key === "Enter" && sendData()}
                />
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              </FloatingLabel>

              <div className="form-group d-flex justify-content-between">
                <div className="custom-control custom-checkbox"></div>
                <p>
                  Dont have an account <Link to="/sign-up">sign up?</Link>
                </p>
              </div>

              <button
                onClick={sendData}
                className="btn btn-primary btn-block d-flex m-auto w-25 justify-content-center mt-3"
              >
                Submit
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(Login);
