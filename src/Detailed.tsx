import React, { useState } from 'react'; 
import './Detailed.css';
import { DetailedInterface } from './DetailedInt';

function DetailedPage({ setCurrPage }: DetailedInterface) {

  const [answers, setAnswers] = useState({
    tasksEnjoyed: '',
    coreValues: '',
    skills: '',
    industries: '',
    careerGoals: '',
    successDefinition: '',
    workLifeBalance: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted answers: ', answers);
    setCurrPage(3); 
  };

  return (
    <div className="detailed-page">
<<<<<<< HEAD
      <h1>Additional Questions</h1>
=======
      <h1>Detail Questions</h1>
>>>>>>> 4ab228455a2fa14a4568cddb26ce19ca5a28fcb9
      <form onSubmit={handleSubmit}>
        <div className="question-block">
          <label>
            What tasks and/or activities have you enjoyed most in the past at work or school?
          </label>
          <input
            type="text"
            name="tasksEnjoyed"
            value={answers.tasksEnjoyed}
            onChange={handleChange}
            className="response-box"
          />
        </div>

        <div className="question-block">
          <label>
            How do you want your career to reflect and support your core values?
          </label>
          <input
            type="text"
            name="coreValues"
            value={answers.coreValues}
            onChange={handleChange}
            className="response-box"
          />
        </div>

        <div className="question-block">
          <label>
            What key skills and talents do you have?
          </label>
          <input
            type="text"
            name="skills"
            value={answers.skills}
            onChange={handleChange}
            className="response-box"
          />
        </div>

        <div className="question-block">
          <label>
            What industries, fields or topics interest you most?
          </label>
          <input
            type="text"
            name="industries"
            value={answers.industries}
            onChange={handleChange}
            className="response-box"
          />
        </div>

        <div className="question-block">
          <label>
            What do you hope to achieve in your career?
          </label>
          <input
            type="text"
            name="careerGoals"
            value={answers.careerGoals}
            onChange={handleChange}
            className="response-box"
          />
        </div>

        <div className="question-block">
          <label>
            How do you define success?
          </label>
          <input
            type="text"
            name="successDefinition"
            value={answers.successDefinition}
            onChange={handleChange}
            className="response-box"
          />
        </div>

        <div className="question-block">
          <label>
            How do you want to allocate your time and energy in your work-life balance?
          </label>
          <input
            type="text"
            name="workLifeBalance"
            value={answers.workLifeBalance}
            onChange={handleChange}
            className="response-box"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DetailedPage;
