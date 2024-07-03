import './App.css';
import React, { useState } from 'react';
import Landing from "./components/landing"
import Quiz from "./components/quiz"
import QuizAnswers from "./components/quizAnswers"


function App() {

  const [landingVisible,setLandingVisible] = useState(true);
  const [quizVisible,setQuizVisible] = useState(false);
  const [quizAnswersVisible,setQuizAnswersVisible] = useState(false);
  const [allData,setAllData] = useState([]);
  const [currentScore,setCurrentScore] = useState(0);
  const [quiz,setQuiz] = useState([]);
  const [correctArray,setCorrectArray] = useState([]);
  const [attemptedOption,setAttemptedOption] = useState([]);

  return (
    <div className="App">
        {landingVisible && 
          <Landing 
            setLandingVisible={setLandingVisible}
            setQuizVisible={setQuizVisible}
            setQuizAnswersVisible={setQuizAnswersVisible}
            landingVisible={landingVisible}
            quizVisible={quizVisible}
            quizAnswersVisible={quizAnswersVisible}
          />}
        {quizVisible && 
          <Quiz 
            setLandingVisible={setLandingVisible}
            setQuizVisible={setQuizVisible}
            setQuizAnswersVisible={setQuizAnswersVisible}
            allData={allData}
            setAllData={setAllData}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            quiz={quiz}
            setQuiz={setQuiz}
            correctArray={correctArray}
            setCorrectArray={setCorrectArray}
            attemptedOption={attemptedOption}
            setAttemptedOption={setAttemptedOption}
          />}
        {quizAnswersVisible && 
          <QuizAnswers 
            setLandingVisible={setLandingVisible}
            setQuizVisible={setQuizVisible}
            setQuizAnswersVisible={setQuizAnswersVisible}
            allData={allData}
            setAllData={setAllData}
            currentScore={currentScore}
            setCurrentScore={setCurrentScore}
            quiz={quiz}
            setQuiz={setQuiz}
            correctArray={correctArray}
            setCorrectArray={setCorrectArray}
            attemptedOption={attemptedOption}
            setAttemptedOption={setAttemptedOption}
          />}
    </div>
  );
}

export default App;
