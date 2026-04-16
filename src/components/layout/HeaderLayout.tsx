import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

import backgroundStyles from "../css/backgroundColer.module.scss";
import buttonStyles from "../css/button.module.scss";

type Props = {
  children?: React.ReactNode;
};

export const HeaderLayout = ({ children }: Props) => {
  return (
    <>
      {/* 幅はlg以上、タイトルのみ */}
      <Navbar className={`d-none d-lg-block ${backgroundStyles.LightGreen}`}>
        <Container>
          <Navbar.Brand href="/">BunnyApp</Navbar.Brand>
        </Container>
      </Navbar>

      {/* 幅はlg以下、ハンバーガーメニュー付き */}
      <Navbar
        expand="lg"
        className={`d-lg-none ${backgroundStyles.LightGreen}`}
      >
        <Container>
          <Navbar.Brand href="/">BunnyApp</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={`${backgroundStyles.DarkGreen} ${buttonStyles.toggleBtn}`}
          />
          <Navbar.Offcanvas
            id="basic-navbar-nav"
            className={backgroundStyles.LightGreen}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/bunnylist">BunnyList</Nav.Link>
                <NavDropdown title="FunFacts" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/funfacts">All</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/funfacts/Diet">
                    Diet
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/funfacts/Sleep">
                    Sleep
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/funfacts/Toilet">
                    Toilet
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/funfacts/Behavior">
                    Behavior
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/funfacts/Breeding">
                    Breeding
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/settings">Settings</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};
