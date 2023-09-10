import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/solarSystem.css";

import planet from "../assets/pinky.png";
import planet2 from "../assets/pngegg.png";
import planet3 from "../assets/fluff.png";
import planet4 from "../assets/pngwing.com.png";
import planet5 from "../assets/yee.png";

import Transition from "../components/Transition.js";
import "../styles/Transition.css";

const RotatingSolar = () => {
    const navigate = useNavigate();

    const goBack = (path) => {
      navigate(path);
    };
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [isPlanet1Clicked, setPlanet1Clicked] = useState(false);

  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, []);


  useEffect(() => {
    const rotationSpeed1 = 0.1;
    const rotationSpeed2 = 0.05;

    const updatePlanetsRotation = () => {
      const time = Date.now();
      setRotation1((time * rotationSpeed1) % 360);
      setRotation2((time * rotationSpeed2) % 360);
      requestAnimationFrame(updatePlanetsRotation);
    };

    updatePlanetsRotation();
  }, []);

  const handlePlanet1Click = () => {
    setPlanet1Clicked(true);
  };

  return (
    <div id="container">
      {/* Add the Transition component */}
      {showTransition && <Transition />}
      <button className="next-button" onClick={() => goBack("/home")}>
        Back
      </button>{" "}
      <div>
        <img
          className="sun"
          src="https://images.vexels.com/media/users/3/142045/isolated/preview/1c35f89ad2c7eaf0c53f74590f8274b8-sun-heat.png"
          alt="Sun"
          style={{ transform: `rotate(${rotation1}deg)` }}
        />
        <a href="/planet">
          <img
            className={`planet1 ${isPlanet1Clicked ? "glow" : ""}`}
            src={planet}
            alt="Planet"
            style={{ transform: `rotate(${rotation2}deg) translateX(150px)` }}
            onClick={handlePlanet1Click}
          />
        </a>

        <img
          className={`planet2 ${isPlanet1Clicked ? "glow" : ""}`}
          src={planet2}
          alt="Planet2"
          style={{ transform: `rotate(${rotation2}deg) translateX(150px)` }}
          onClick={handlePlanet1Click}
        />

        <img
          className={`planet3 ${isPlanet1Clicked ? "glow" : ""}`}
          src={planet3}
          alt="Planet3"
          style={{ transform: `rotate(${rotation2}deg) translateX(150px)` }}
          onClick={handlePlanet1Click}
        />

        <img
          className={`planet4 ${isPlanet1Clicked ? "glow" : ""}`}
          src={planet4}
          alt="Planet4"
          style={{ transform: `rotate(${rotation2}deg) translateX(150px)` }}
          onClick={handlePlanet1Click}
        />

        <img
          className={`planet5 ${isPlanet1Clicked ? "glow" : ""}`}
          src={planet5}
          alt="Planet5"
          style={{ transform: `rotate(${rotation2}deg) translateX(150px)` }}
          onClick={handlePlanet1Click}
        />
      </div>
    </div>
  );
};

export default RotatingSolar;
