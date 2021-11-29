import { Navbar, Container, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearFilters } from "../../store/actions";
import styles from "./header.module.css";

function Header({ clearFilters }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto align-items-center">
          <NavLink
            className={({ isActive }) =>
              `me-3 ${styles.navlink} ` + (isActive ? styles.selected : "")
            }
            to="/home"
            onClick={() => clearFilters()}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `me-3 ${styles.navlink} ` + (isActive ? styles.selected : "")
            }
            onClick={() => clearFilters()}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `me-3 ${styles.navlink} ` + (isActive ? styles.selected : "")
            }
            onClick={() => clearFilters()}
            to="/contact"
          >
            Contact
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

const mapDispatchToProps = {
  clearFilters,
};

export default connect(null, mapDispatchToProps)(Header);
