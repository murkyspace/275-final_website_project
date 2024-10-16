import React from 'react';
import ReactDOM from 'react-dom/client';
import {  Routes, Route, HashRouter } from "react-router-dom";
import Basic from './Basic';
import './index.css';

import reportWebVitals from './reportWebVitals';
/*
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="/" element={<App />}>
          <Route index element={<Basic />} />
          </Route>
      </Routes>
    </HashRouter>
  );
}
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
