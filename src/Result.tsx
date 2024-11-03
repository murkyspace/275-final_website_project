import React from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { ResultInterface } from './ResultInt';

const ResultPage: React.FC<ResultInterface> = ({ setCurrPage, basicApiResponse, detailedApiResponse }) => {
  return (
    <Container className="mt-4">
      <h2>Results Page</h2>
      <Row>
        <Col md={6}>
          <h4>Basic Results</h4>
          {basicApiResponse ? (
            <Alert variant="success" className="mt-3" style={{ whiteSpace: 'pre-wrap' }}>
              {basicApiResponse}
            </Alert>
          ) : (
            <Alert variant="warning" className="mt-3">
              No Basic response available. Please complete the Basic quiz first.
            </Alert>
          )}
        </Col>
        <Col md={6}>
          <h4>Detailed Results</h4>
          {detailedApiResponse ? (
            <Alert variant="info" className="mt-3" style={{ whiteSpace: 'pre-wrap' }}>
              {detailedApiResponse}
            </Alert>
          ) : (
            <Alert variant="warning" className="mt-3">
              No Detailed response available. Please complete the Detailed quiz first.
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="primary" onClick={() => setCurrPage(0)}>
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default ResultPage;
