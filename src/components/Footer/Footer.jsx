import { Col, Container, Row } from "react-bootstrap";
import {
  faGithub,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className={styles.footer_dark}>
      <Container>
        <Row>
          <Col xs={12} className={`${styles.item} ${styles.social}`}>
            <a target="link" href="https://github.com/harut2003">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a target="link" href="https://www.facebook.com/harut.terteryan.10">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a target="link" href="https://www.instagram.com/harut_terteryan">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Col>
          <Col xs={12} className="justify-content-center d-flex mt-2">
            <Link className={styles.link} to="/home">
              Home
            </Link>
            <Link className={styles.link} to="/about">
              About
            </Link>
            <Link className={styles.link} to="/contact">
              Contact us
            </Link>
          </Col>
        </Row>
        <p className={styles.copyright}>
          Harut Terteryan © {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
    /* <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <a
              className={styles.icon}
              target="link"
              href="https://github.com/harut2003"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              className={styles.icon}
              target="link"
              href="https://www.facebook.com/harut.terteryan.10"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              className={styles.icon}
              target="link"
              href="https://www.instagram.com/harut_terteryan"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </Col>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col xs={12}>
            <Link className={styles.link} to="/home">
              Home
            </Link>
            <Link className={styles.link} to="/about">
              About
            </Link>
            <Link className={styles.link} to="/contact">
              Contact us
            </Link>
          </Col>
          <Col className="mt-2" xs={12}>
            <p>&copy; Harut Terteryan</p>
          </Col>
        </Row>
      </Container> </div>*/
  );
}

export default Footer;
