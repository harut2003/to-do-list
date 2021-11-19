import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto align-items-center">
          <NavLink
            className={({ isActive }) =>
              "me-3 " + (isActive ? styles.selected : "")
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "me-3 " + (isActive ? styles.selected : "")
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              "me-3 " + (isActive ? styles.selected : "")
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
