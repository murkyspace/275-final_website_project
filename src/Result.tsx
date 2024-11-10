import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ResultInterface } from './ResultInt';
import './Result.css';

const ResultPage: React.FC<ResultInterface> = ({ setCurrPage, basicApiResponse, detailedApiResponse }) => {
  return (
    <div className="result-page">
      <h2 className="result-title">Results Page</h2>
      <p className="result-subtitle">Please receive your career report</p>
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={5} className="result-box basic-result">
            <h4>Basic Results</h4>
            {basicApiResponse ? (
              <p className="result-content">{basicApiResponse}</p>
            ) : (
              <p className="result-placeholder">No Basic response available. Please complete the Basic quiz first.</p>
            )}
          </Col>
          <Col md={5} className="result-box detailed-result">
            <h4>Detailed Results</h4>
            {detailedApiResponse ? (
              <p className="result-content">{detailedApiResponse}</p>
            ) : (
              <p className="result-placeholder">No Detailed response available. Please complete the Detailed quiz first.</p>
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
    </div>
  );
};

export default ResultPage;

