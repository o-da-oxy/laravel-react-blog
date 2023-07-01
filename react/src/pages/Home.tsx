import { Button, Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {useStateContext} from "../context/ContextProvider.tsx";

function Home() {
  const {token} = useStateContext();
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div className="welcome_page">
          <h1>Welcome to the Blog App!</h1>
          <p className="description">Read and create posts!</p>
          {token && (
            <LinkContainer to="/posts">
              <Button className="get-started-button">
                Get started! <i className="" />
              </Button>
            </LinkContainer>
          )}
          {!token && (
            <LinkContainer to="/login">
              <Button className="get-started-button">
                Get started! <i className="" />
              </Button>
            </LinkContainer>
          )}
        </div>
      </Col>
      <Col md={6} className="home_bg" />
    </Row>
  );
}

export default Home;
