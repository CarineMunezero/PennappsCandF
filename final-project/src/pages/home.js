import "../styles/home.css";
import React, { useState, useEffect } from "react";
import Astro_Bck from "../assets/Astro_Bck.png";

import Transition from "../components/Transition.js";
import "../styles/Transition.css";

import { useNavigate } from "react-router-dom";
import solar1 from "../assets/solar1.png";
import solar2 from "../assets/solar2.png";
import solar3 from "../assets/solar3.png";
import solar4 from "../assets/solar4.png";

function HomePage() {
  const navigate = useNavigate();
  const goback = (route) => {
    navigate(route);
  };

  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, []);

  const [rotateClass, setRotateClass] = useState("");
  // const [tooltip, setTooltip] = useState({ message: "", show: false });
  const [tooltip, setTooltip] = useState({
    message: "",
    show: false,
    x: 0,
    y: 0,
  });

  const handleHover = (event) => {
    const hoveredElement = event.target.alt;
    console.log(`You hovered over ${hoveredElement}`);
    if (hoveredElement === "Image 1") {
      setTooltip({
        message: `Transport to your investment journey`,
        show: true,
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleHoverEnd = () => {
    setTooltip({ message: "", show: false });
  };

  useEffect(() => {
    if (tooltip.show) {
      const timer = setTimeout(() => {
        setTooltip({ message: "", show: false });
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [tooltip]);

  return (
    <div id="container">
      {/* Add the Transition component */}
      {showTransition && <Transition />}
      <button className="next-button" onClick={() => goback("/")}>
        Log Out
      </button>
      <div id="text">
        <h2>Choose a topic</h2>
      </div>

      <div id="mainMage">
        <img
          onClick={() => goback("/chat")}
          id="Astro_Bck"
          src={Astro_Bck}
          alt="Center"
          onMouseOver={handleHover}
          onMouseLeave={handleHoverEnd}
          // title="Click the astronaut for financial advice"
        />

        <div className="imageContain">
          <div
            key="image1"
            className={`curroundImage ${rotateClass}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverEnd}

            // title="Click the solar system to learn about investing"
          >
            <div className="imageRapper">
              <a href="/solarSystem">
                <img className="rotateMage" src={solar2} alt="Image 1" />
              </a>
              <div class="image-text" onclick="handleClick()">
                Investment
              </div>
            </div>
          </div>

          <div key="image2" className={`curroundImage ${rotateClass}`}>
            <div className="imageRapper">
              <img className="rotateMage" src={solar1} alt="Image 2" />
              <div className="image-text">Budget</div>
            </div>
          </div>
        </div>

        <div className="imageContain">
          <div key="image3" className={`curroundImage ${rotateClass}`}>
            <div className="imageRapper">
              <img className="rotateMage" src={solar3} alt="Image 3" />
              <div className="image-text">Income</div>
            </div>
          </div>

          <div key="image4" className={`curroundImage ${rotateClass}`}>
            <div className="imageRapper">
              <img className="rotateMage" src={solar4} alt="Image Universe" />
              <div className="image-text">Savings</div>
            </div>
          </div>
        </div>
      </div>
      {tooltip.show && (
        <div
          id="tooltip"
          className="tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.message}
        </div>
      )}
    </div>
  );
}
export default HomePage;
