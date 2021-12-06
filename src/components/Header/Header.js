import { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logOut } from "../../helpers/auth";
import { clearFilters, getUser } from "../../store/actions";
import Settings from "../Settings";
import styles from "./header.module.css";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state);
  useEffect(() => {
    isAuthenticated && dispatch(getUser());
  }, [isAuthenticated, dispatch]);

  const [settingsModal, setSettingsModal] = useState(false);

  return (
    <>
      <Navbar
        className={styles.navbar}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand>
            <NavLink
              className={styles.selected}
              to="/home"
              onClick={() => dispatch(clearFilters())}
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
                    `me-3 ${styles.navlink} ` +
                    (isActive ? styles.selected : "")
                  }
                  to="/home"
                  onClick={() => dispatch(clearFilters())}
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
              {user && (
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={`${user.name} ${user.surname}`}
                  menuVariant="dark"
                >
                  <NavDropdown.Item
                    onClick={() => setSettingsModal(!settingsModal)}
                  >
                    User settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <div className="d-flex">
                    <Link
                      onClick={logOut}
                      to="/sign-in"
                      className={styles.sign_out}
                    >
                      Log out{" "}
                    </Link>
                  </div>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {settingsModal && <Settings hideModal={setSettingsModal} />}
    </>
  );
}

export default Header;
