import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <Row className="text-center py-3">
        <Col>
          <footer>Copyright &copy; ProShop</footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
