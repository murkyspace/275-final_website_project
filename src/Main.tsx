import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import App from './App'; 
import QuizPage from './QuizPage';
function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
}

export default Main;
