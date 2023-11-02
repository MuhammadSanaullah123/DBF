import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Navbar.module.css";
import navLogo from "../../Images/NavLogo.png";
import { Link } from "react-router-dom";

function DBFNavbar() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className={styles.navOuter}>
          <Container fluid className={styles.content}>
            <Navbar.Brand href="#">
              <img src={navLogo} className={styles.navLogo} alt="" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className={styles.togl}
            >
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
              <div className={styles.line3}></div>
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                ></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Link to="/" href="#action1" className={styles.navLinkss}>
                    Home
                  </Link>
                  <Link to="/feed" className={styles.navLinkss}>
                    Feed
                  </Link>
                  <Link to="/profiler/me" className={styles.navLinkss}>
                    Profile
                  </Link>
                  <Link to="/history" className={styles.navLinkss}>
                    History
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <div className={styles.searchArea}>
              <input
                type="text"
                className={styles.searchInout}
                placeholder="Search..."
              />
              <div className={styles.englishText}>English</div>
            </div>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default DBFNavbar;
