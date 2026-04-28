import { Container, Row, Col, Accordion } from "react-bootstrap";
import { Nav } from "react-bootstrap";

import backgroundStyles from "../css/backgroundColer.module.scss";
import { Link } from "react-router-dom";
import fontStyles from "../css/font.module.scss";

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
                <Nav.Link as={Link} to="/" className={fontStyles.linkColor}>
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/bunnylist"
                  className={fontStyles.linkColor}
                >
                  BunnyList
                </Nav.Link>
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
                        <Nav.Link
                          as={Link}
                          to="/funfacts"
                          className={fontStyles.linkColor}
                        >
                          All
                        </Nav.Link>
                        <hr />
                        <Nav.Link
                          as={Link}
                          to="/funfacts/Diet"
                          className={fontStyles.linkColor}
                        >
                          Diet
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/funfacts/Sleep"
                          className={fontStyles.linkColor}
                        >
                          Sleep
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/funfacts/Toilet"
                          className={fontStyles.linkColor}
                        >
                          Toilet
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/funfacts/Behavior"
                          className={fontStyles.linkColor}
                        >
                          Behavior
                        </Nav.Link>
                        <Nav.Link
                          as={Link}
                          to="/funfacts/Breeding"
                          className={fontStyles.linkColor}
                        >
                          Breeding
                        </Nav.Link>
                      </Nav>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <Nav.Link
                  as={Link}
                  to="/settings"
                  className={fontStyles.linkColor}
                >
                  Settings
                </Nav.Link>
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
