import React, { useState } from 'react';
import { Container, Button } from '@mui/material';
import { FaHome } from 'react-icons/fa';
import { ResultInterface } from './ResultInt';
import './Result.css';

const ResultPage: React.FC<ResultInterface> = ({ setCurrPage, apiResponse }) => {
  const sections = extractSections(apiResponse);
  const [activeSection, setActiveSection] = useState<string>('Overview');

  return (
    <div className="result-page">
      <Container>
        <h2 className="result-title">Your Career Report</h2>
        <p className="result-subtitle">Explore your personalized career</p>
        <div className="result-buttons">
          {Object.keys(sections).map((section) => (
            <button
              key={section}
              className={`result-button ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>
        <div className="result-content">
          <p>{sections[activeSection]}</p>
        </div>
        <Button
          variant="contained"
          startIcon={<FaHome />}
          onClick={() => setCurrPage(0)}
          className="result-page-home-button"
        >
          Go to Home
        </Button>
      </Container>
    </div>
  );
};

const extractSections = (apiResponse: string) => {
  try {
    const jsonStart = apiResponse.indexOf('{');
    const jsonEnd = apiResponse.lastIndexOf('}') + 1;
    const jsonString = apiResponse.substring(jsonStart, jsonEnd);
    const data = JSON.parse(jsonString) as Record<string, any>;

    const flattenedData: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(data)) {
      if (value && typeof value === 'object') {
        if ('text' in value && typeof value.text === 'string') {
          flattenedData[key] = value.text;
        } else {
          flattenedData[key] = JSON.stringify(value);
        }
      } else if (typeof value === 'string') {
        flattenedData[key] = value;
      } else {
        flattenedData[key] = String(value);
      }
    }

    return flattenedData;
  } catch (error) {
    console.error('Failed to parse API response:', error);
    return {
      Overview: 'Please answer the question first.',
      Personality: 'Please answer the question first.',
      Consulting: 'Please answer the question first.',
      'Data Analysis': 'Please answer the question first.',
      'Non-profit': 'Please answer the question first.',
    };
  }
};

export default ResultPage;

