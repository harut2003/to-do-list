import { Navbar, Container, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { clearFilters } from "../../store/actions";
import styles from "./header.module.css";

function Header({ clearFilters, isAuthenticated }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink
            className={styles.selected}
            to="/home"
            onClick={() => clearFilters()}
          >
            ToDo List
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ms-3 d-flex align-items-lg-center">
            {isAuthenticated && (
              <NavLink
                className={({ isActive }) =>
                  `me-3 ${styles.navlink} ` + (isActive ? styles.selected : "")
                }
                to="/home"
                onClick={() => clearFilters()}
              >
                Home
              </NavLink>
            )}
            {!isAuthenticated && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `me-3 ${styles.navlink} ` +
                    (isActive ? styles.selected : "")
                  }
                  to="/sign-in"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `me-3 ${styles.navlink} ` +
                    (isActive ? styles.selected : "")
                  }
                  to="/sign-up"
                >
                  Register
                </NavLink>
              </>
            )}
            <NavLink
              className={({ isActive }) =>
                `me-3 ${styles.navlink} ` + (isActive ? styles.selected : "")
              }
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `me-3 ${styles.navlink} ` + (isActive ? styles.selected : "")
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </Nav>
          <Nav className="d-flex align-items-lg-center">
            {isAuthenticated && (
              <Link to="/sign-in" className={`me-3 ${styles.selected} `}>
                Log out{" "}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = ({ isAuthenticated }) => ({ isAuthenticated });

const mapDispatchToProps = {
  clearFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
