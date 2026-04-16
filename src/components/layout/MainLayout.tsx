import { Container, Row, Col, Accordion } from "react-bootstrap";
import { Nav } from "react-bootstrap";

import backgroundStyles from "../css/backgroundColer.module.scss";

type Props = {
  children?: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Container fluid className="mt-3">
        <Row>
          {/* 左側ナビゲーション 幅３割 */}
          <Col
            lg={3}
            className={`pe-4 d-none d-lg-block ${backgroundStyles.LightGreen}`}
          >
            <Container>
              <Nav className="me-auto flex-column">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/bunnylist">BunnyList</Nav.Link>
                {/* <NavDropdown title="FunFacts" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/funfacts">
                    All
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">diet</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">sleep</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">toilet</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.5">
                    breeding
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>FunFacts</Accordion.Header>
                    <Accordion.Body>
                      <Nav className="me-auto flex-column">
                        <Nav.Link href="/funfacts">All</Nav.Link>
                        <hr />
                        <Nav.Link href="/funfacts/Diet">Diet</Nav.Link>
                        <Nav.Link href="/funfacts/Sleep">Sleep</Nav.Link>
                        <Nav.Link href="/funfacts/Toilet">Toilet</Nav.Link>
                        <Nav.Link href="/funfacts/Behavior">Behavior</Nav.Link>
                        <Nav.Link href="/funfacts/Breeding">Breeding</Nav.Link>
                      </Nav>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <Nav.Link href="/settings">Settings</Nav.Link>
              </Nav>
            </Container>
          </Col>

          {/* メインコンテンツ　幅９割 */}
          <Col lg={9}>{children}</Col>
        </Row>
      </Container>
    </>
  );
};
