import React, { useState, useEffect } from "react";
import "./App.css";
// import Yee from "../assets/output-onlinegiftools.gif";
// Importing the pages

import Planet from "./pages/planet";
import SignUpPage from "./pages/signUp";
import Home from "./pages/home";
import Quiz from "./components/quizComponent";
import LessonPage from "./pages/lesson";
import ChatAI from "./pages/ui_chat";
import SolarSystem from "./components/solarSystem";
//import GifTransition from "./pages/gifTransition";
import Summary from "./pages/summary";

//
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SummaryPage from "./pages/summary";

const App = () => {
  const [interactionPoint, setInteractionPoint] = useState({
    x: null,
    y: null,
  });
  const [stars, setStars] = useState([]);
  const [comets, setComets] = useState([]);
  // function App() {
  //   return (
  //     <div className="App">
  //       <SolarSystemAnimation />
  //     </div>
  //   );
  // }
  useEffect(() => {
    const newStars = [...Array(200)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      size: 1 + Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  const handleMouseMove = (e) => {
    setInteractionPoint({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length) {
      const touch = e.touches[0];
      setInteractionPoint({
        x: touch.clientX,
        y: touch.clientY,
      });
    }
  };

  useEffect(() => {
    const newComets = [...Array(15)].map(() => ({
      x: Math.random() * 100 - 20, // Starts a bit off screen for seamless animation
      y: Math.random() * 100 - 20, // Starts a bit off screen for seamless animation
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 1 + Math.random() * 2,
    }));
    setComets(newComets);
  }, []);

  const calculateStarOffset = (star) => {
    if (interactionPoint.x === null || interactionPoint.y === null)
      return { x: 0, y: 0 };

    const dx = (star.x / 100) * window.innerWidth - interactionPoint.x;
    const dy = (star.y / 100) * window.innerHeight - interactionPoint.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxOffset = 20;

    return {
      x: ((-dx / distance) * maxOffset) / (distance / 100),
      y: ((-dy / distance) * maxOffset) / (distance / 100),
    };
  };

  return (
    <div
      className="app-container"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="stars-background">
        {stars.map((star, idx) => {
          const offset = calculateStarOffset(star);
          return (
            <div
              key={idx}
              className="star"
              style={{
                top: `calc(${star.y}vh + ${offset.y}px)`,
                left: `calc(${star.x}vw + ${offset.x}px)`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            ></div>
          );
        })}
        {comets.map((comet, idx) => {
          return (
            <div
              key={"comet" + idx}
              className="comet"
              style={{
                top: `${comet.y}vh`,
                left: `${comet.x}vw`,
                animationDelay: `${comet.delay}s`,
                animationDuration: `${comet.duration}s`,
                width: `${comet.size}px`,
                height: `${comet.size * 5}px`,
              }}
            ></div>
          );
        })}
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/solarSystem" element={<SolarSystem />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/chat" element={<ChatAI />} />
          <Route path="/planet" element={<Planet />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
