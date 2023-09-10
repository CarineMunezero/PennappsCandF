import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import planetGIF from "../assets/planet2.gif";
import satellite from "../assets/satellite.png";
import moon1 from "../assets/moon1.gif";
import moon2 from "../assets/moon2.gif";
import moon3 from "../assets/moon3.gif";
import shootingStar from "../assets/shooting-star.png";
import meteor from "../assets/meteor.gif";

import "../styles/planet.css";


const ShootingStar = () => {
  const [startPositionLeft, setStartPositionLeft] = useState(0);
  const [startPositionTop, setStartPositionTop] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartPositionLeft(getRandomPosition(0, window.innerWidth));
      setStartPositionTop(getRandomPosition(-100, window.innerHeight));
    }, 5000); // Change this interval value to control the frequency of shooting stars

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  return (
    <div
      className="shooting-star"
      style={{ left: startPositionLeft, top: startPositionTop }}
    >
      <img src={shootingStar} alt="Shooting Star" />
    </div>
  );
};

const Meteor = () => {
  return (
    <div className="meteor">
      <img src={meteor} alt="Meteor" />
    </div>
  );
};

function getRandomPosition(min, max) {
  return Math.random() * (max - min) + min;
}

function Planet() {
  const navigate = useNavigate();

  const goBack = (path) => {
    navigate(path);
  };
  const logout = () => {
    navigate("/");
  };
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(1); // Start with the first tab as active

  const textBoxRef = useRef(null);

  const toggleTextBox = () => {
    setIsTextBoxVisible(!isTextBoxVisible);
  };

  const handleOutsideClick = (event) => {
    if (textBoxRef.current && !textBoxRef.current.contains(event.target)) {
      setIsTextBoxVisible(false);
    }
  };

  useEffect(() => {
    if (isTextBoxVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isTextBoxVisible]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div id="container1">
      {/* Shooting Star */}
      <ShootingStar />
      {/* Meteor */}
      <Meteor />

      {/* Dropdown Menu */}
      <div className="dropdown-menu">
        {/* Button to toggle the dropdown */}
        <button className="next-button" onClick={toggleDropdown}>
          Menu
        </button>

        {/* The dropdown content */}
        {isDropdownVisible && (
          <div className="dropdown-content">
            <button onClick={() => goBack("/solarSystem")}>Back</button>
            <button onClick={logout}>Log Out</button>
          </div>
        )}
      </div>

      {/* Orbiting Object */}
      <div className="orbiting-object">
        <img src={satellite} alt="Satellite" />
      </div>
      {/* Main Planet*/}
      <a href="/lesson">
        <div id="main-image1">
          <div className="image-text-container">
            The Importance of Investing
          </div>
          <img src={planetGIF} alt="Galaxy GIF" />
        </div>
      </a>
      {/* Moons */}
      <a href="/quiz" className="moon-link">
        <div className="floating-planet1 top-moon">
          <div className="image-text11" onClick={handleOutsideClick}>
            Quiz 2: <br />
            Stock Market
          </div>
          <img src={moon1} alt="Galaxy GIF" />
        </div>
      </a>
      <a href="/quiz" className="moon-link">
        <div className="floating-planet1 left-moon">
          <div className="image-text22" onClick={handleOutsideClick}>
            Quiz 1: <br />
            Investment Basics
          </div>
          <img src={moon2} alt="Galaxy GIF" />
        </div>
      </a>
      <a href="/quiz" className="moon-link">
        <div className="floating-planet1 right-moon">
          <div className="image-text33" onClick={handleOutsideClick}>
            Quiz 3: <br />
            Lending and Loans
          </div>
          <img src={moon3} alt="Galaxy GIF" />
        </div>
      </a>
      {/* Button to display the text box */}
      <button className="next-button" onClick={toggleTextBox}>
        Overview 🛰️
      </button>
      {/* Text Box */}
      {isTextBoxVisible && (
        <div className="textbox" ref={textBoxRef}>
          {/* Tab buttons */}
          <div className="tab-buttons">
            <button
              className={activeTab === 1 ? "active-tab" : ""}
              onClick={() => handleTabClick(1)}
            >
              Bonds
            </button>
            <button
              className={activeTab === 2 ? "active-tab" : ""}
              onClick={() => handleTabClick(2)}
            >
              Inflation
            </button>
            <button
              className={activeTab === 3 ? "active-tab" : ""}
              onClick={() => handleTabClick(3)}
            >
              Commercial Real Estate
            </button>
            <button
              className={activeTab === 4 ? "active-tab" : ""}
              onClick={() => handleTabClick(4)}
            >
              Stocks
            </button>
          </div>

          {/* Tab contents */}
          <div className="tab-content">
            {activeTab === 1 && (
              <p>
                Bonds are loans made to corporations or governments. In return
                for your money, called principal, you’ll receive a fixed amount
                of interest per year, plus your money back once the bond
                expires. Because of this guarantee, bonds are the safest of the
                three investments. They have the lowest potential investment
                return in the long-run
              </p>
            )}
            {activeTab === 2 && (
              <p>
                Inflation is the idea that prices for goods and services rise
                over time.
              </p>
            )}
            {activeTab === 3 && (
              <p>
                This is property purchased to make money, generally by renting
                it out.
              </p>
            )}
            {activeTab === 4 && (
              <p>
                Stocks represent a piece of ownership in a company, like Apple
                or Google. People buy and sell little pieces of these companies,
                called shares, in places called stock exchanges. When your
                investment does well, the share price goes up and you make
                money. When your investment does poorly, the share price goes
                down and you lose money. These fluctuations can make stocks
                risky.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Planet;
