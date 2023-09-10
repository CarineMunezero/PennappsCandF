// Import the necessary modules for the Quiz component
import React, { useState, useEffect } from "react"; // React core and Hooks
import { useNavigate } from "react-router-dom";

import "../styles/Quiz.css"; // Import the CSS for the Quiz component
import { quiz } from "./quizQuestionsComponents"; // Import the quiz questions
import { startConfetti } from "../components/confetti"; // Import the confetti animation function
import Astro_sit from "../assets/Astro_sit.png";
import moon from "../assets/moon2x.png";
// Define the Quiz component

const Quiz = () => {
    const navigate = useNavigate();

    const goBack = (path) => {
      navigate(path);
    };
  // Use the useState hook to manage state variables in functional component
  // activeQuestion keeps track of the currently displayed question (index based)
  const [activeQuestion, setActiveQuestion] = useState(0);

  // selectedAnswer holds the user's answer choice for the current question
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // showResult will be used to determine when to show the quiz results
  const [showResult, setShowResult] = useState(false);

  // showRocket is a flag to determine whether to display a rocket image, on correct answer
  const [showRocket, setShowRocket] = useState(false);

  // selectedAnswerIndex holds the index of the user's chosen answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  // result object holds the user's score, and the count of correct and incorrect answers
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  // Extracting questions array from the imported quiz object
  const { questions } = quiz;

  // Destructuring properties from the current question object
  const { question, choices, correctAnswer, explanation } =
    questions[activeQuestion];

  // Boolean state variables to manage if an answer has been selected, whether the selected answer is correct,
  // and whether to display the explanation for an answer
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // onClickNext function handles the logic for proceeding to the next question or finishing the quiz
  const onClickNext = () => {
    // If it's not the last question, increment activeQuestion by 1
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      // If it's the last question, reset the activeQuestion and show the result
      setActiveQuestion(0);
      setShowResult(true);
    }

    // Reset states for the next question or for the result screen
    setSelectedAnswerIndex(null);
    setSelectedAnswer("");
    setAnswered(false);
    setIsCorrect(false);
    setShowRocket(false);
    setShowExplanation(false);
  };

  // resetQuiz function handles resetting the quiz to the initial state
  const resetQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setSelectedAnswerIndex(null);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setAnswered(false);
    setIsCorrect(false);
  };

  // Function to handle user's answer selection
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    setAnswered(true);
    setSelectedAnswer(answer);

    // Check if selected answer matches the correct answer
    if (answer === correctAnswer) {
      // If the answer is correct, set isCorrect to true and show the rocket
      setIsCorrect(true);
      setShowRocket(true);

      // Update the score and increment correct answers count
      setResult((prev) => ({
        ...prev,
        score: prev.score + 25,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      // If the answer is incorrect, set isCorrect to false, hide the rocket, and show the explanation
      setIsCorrect(false);
      setShowRocket(false);

      // Increment the wrong answers count
      setResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));

      // Show the explanation box
      setShowExplanation(true);
    }
  };

  // Find and update the correct answer's index
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    choices.indexOf(correctAnswer)
  );
  useEffect(() => {
    setCorrectAnswerIndex(choices.indexOf(correctAnswer));
  }, [activeQuestion, correctAnswer, choices]);

  // Function to add a leading zero to single digit numbers
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  // Initialize a list of stars for the background effect
  const numStars = 900;
  const stars = Array.from({ length: numStars }, (_, i) => i);

  // When shgit owResult changes to true, the confetti animation is started
  useEffect(() => {
    if (showResult) {
      startConfetti();
    }
  }, [showResult]);

  

  return (
    <div id="mainMage">
      \
      <div className="bottom-content11">
        <img src={moon} alt="Mooon" />
      </div>
      <img id="Astro_sit" src={Astro_sit} alt="Center" />
      <div className="main-container">
        <button className="next-button" onClick={() => goBack("/planet")}>
          Back
        </button>{" "}
        {/* Display a confetti animation on the canvas when the results are shown */}
        {showResult && <canvas id="confetti-canvas" />}
        {/* Launch the rocket image when a correct answer is selected */}
        <div className={`rocket ${showRocket ? "launch" : ""}`} />
        {isCorrect && (
          <img
            src="https://freesvg.org/img/ship-1414822.png"
            alt="rocket-ship"
            className={`rocket ${showRocket ? "launch" : ""}`}
          />
        )}
        <div className={`rocket ${showRocket ? "launch" : ""}`} />
        {isCorrect && (
          <img
            src="https://freesvg.org/img/ship-1414822.png"
            alt="rocket-ship"
            className={`rocket ${showRocket ? "launch" : ""}`}
          />
        )}
        {/* Generate and display stars in the background for the starry night effect */}
        <div className="stars-container">
          {stars.map((i) => (
            <div className="star" key={i} />
          ))}
        </div>
        {/* Main quiz container */}
        <div className="quiz-container">
          {/* Show the quiz questions unless the result should be shown */}
          {!showResult ? (
            <div>
              {/* Show the current question number and the total number of questions */}
              <div>
                <span className="active-question-no">
                  {addLeadingZero(activeQuestion + 1)}
                </span>
                <span className="total-question">
                  /{addLeadingZero(questions.length)}
                </span>
              </div>

              {/* Show the current question */}
              <h2>{question}</h2>

              {/* Display the current score */}
              <div>Current Score: {result.score}</div>

              {/* List of choices for the current question */}
              <ul className="choices-container">
                {choices.map((answer, index) => (
                  <div key={index} className="option-container">
                    {/* Display each choice as a list item, clickable only if an answer hasn't been selected */}
                    <li
                      onClick={() =>
                        !answered && onAnswerSelected(answer, index)
                      }
                      className={`${
                        // After an answer is selected, apply CSS classes based on whether it is correct or incorrect
                        answered
                          ? index === selectedAnswerIndex
                            ? isCorrect
                              ? "correct-answer"
                              : "incorrect-answer shake"
                            : index === correctAnswerIndex
                            ? "correct-answer"
                            : ""
                          : ""
                      }`}
                    >
                      {answer}
                    </li>

                    {/* Show the correct or incorrect icon next to the answer after one has been selected */}
                    {answered && (
                      <div className="answer-icon">
                        {index === correctAnswerIndex ? (
                          <span className="correct-icon">&#x2714;</span> // Correct answer icon
                        ) : (
                          index === selectedAnswerIndex && (
                            <span className="wrong-icon">&#x2716;</span> // Incorrect answer icon
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </ul>

              {/* Explanation box bubble */}
              {showExplanation && (
                <div className="explanation-box">
                  {isCorrect ? (
                    <span>Correct! </span>
                  ) : (
                    <span>Incorrect. </span>
                  )}
                  {isCorrect ? (
                    // If the selected answer is correct, just show the explanation
                    <span>{explanation}</span>
                  ) : (
                    // If the selected answer is incorrect, explain why the correct answer is correct
                    <span>
                      Here's why the correct answer is: <br /> <br />{" "}
                      <strong>{correctAnswer}</strong>
                      <br /> <br />
                      {explanation}
                    </span>
                  )}
                </div>
              )}

              {/* Next or Finish button */}
              <div className="flex-right">
                <button
                  onClick={onClickNext}
                  // Disable the button until an answer is selected
                  disabled={selectedAnswerIndex === null}
                >
                  {/* Label the button "Finish" if this is the last question, otherwise label it "Next" */}
                  {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          ) : (
            // When the results should be shown, display them
            <div className="result">
              <h3>Result</h3>
              <p>
                Total Question: <span>{questions.length}</span>
              </p>
              <p>
                Total Score: <span>{result.score}</span>
              </p>
              <p>
                Correct Answers: <span>{result.correctAnswers}</span>
              </p>
              <p>
                Wrong Question: <span>{result.wrongAnswers}</span>
              </p>
              {/* Button to reset the quiz */}
              {/* Changed to route back to planet page for sake of video, can
              delete afterwards*/}
              <a href="/planet">
                <button /*onClick={resetQuiz} > Reset Quiz*/>Exit</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
