import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

import backgroundStyles from "../css/backgroundColer.module.scss";
import fontStyles from "../css/font.module.scss";
import buttonStyles from "../css/button.module.scss";

type Props = {
  children?: React.ReactNode;
};

export const HeaderLayoutSimple = ({ children }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* 幅はlg以上、タイトルのみ */}
      <Navbar className={`d-none d-lg-block ${backgroundStyles.LightGreen}`}>
        <Container>
          <Navbar.Brand as={Link} to="/" className={fontStyles.linkColor}>
            BunnyApp
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* 幅はlg以下、ハンバーガーメニュー付き */}
      <Navbar
        expand="lg"
        className={`d-lg-none ${backgroundStyles.LightGreen}`}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className={fontStyles.linkColor}>
            BunnyApp
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={`${backgroundStyles.DarkGreen} ${buttonStyles.toggleBtn}`}
            onClick={() => setShow(true)}
          />
          <Navbar.Offcanvas
            id="basic-navbar-nav"
            className={backgroundStyles.LightGreen}
            show={show}
            onHide={() => setShow(false)}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={fontStyles.linkColor}
                  onClick={() => setShow(false)}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/bunnylist"
                  className={fontStyles.linkColor}
                  onClick={() => setShow(false)}
                >
                  BunnyList
                </Nav.Link>
                <NavDropdown title="FunFacts" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to="/funfacts"
                    className={fontStyles.linkColor}
                    onClick={() => setShow(false)}
                  >
                    All
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/funfacts/Diet"
                    className={fontStyles.linkColor}
                    onClick={() => setShow(false)}
                  >
                    Diet
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/funfacts/Sleep"
                    className={fontStyles.linkColor}
                    onClick={() => setShow(false)}
                  >
                    Sleep
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/funfacts/Toilet"
                    className={fontStyles.linkColor}
                    onClick={() => setShow(false)}
                  >
                    Toilet
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/funfacts/Behavior"
                    className={fontStyles.linkColor}
                    onClick={() => setShow(false)}
                  >
                    Behavior
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/funfacts/Breeding"
                    className={fontStyles.linkColor}
                    onClick={() => setShow(false)}
                  >
                    Breeding
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  to="/settings"
                  className={fontStyles.linkColor}
                  onClick={() => setShow(false)}
                >
                  Settings
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};
