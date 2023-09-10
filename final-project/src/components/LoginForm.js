// LoginCard.js
import React, { useState } from "react";
import "../styles/LoginCard.css";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const goBack = (path) => {


    // Wait for 2 seconds to match the animation duration
      navigate(path);
    };

  return (
    <div className="login-card">
      <div className="tabs">
        <div
          className={activeTab === "login" ? "tab active" : "tab"}
          onClick={() => setActiveTab("login")}
        >
          Login
        </div>
        <div
          className={activeTab === "signin" ? "tab active" : "tab"}
          onClick={() => setActiveTab("signin")}
        >
          Sign In
        </div>
      </div>

      <div className="title">Welcome to Cash Ed!</div>
      {activeTab === "login" ? (
        <div>
          <div className="content">
            <input type="text" placeholder="Username" />
            <br/>
            <input type="password" placeholder="Password" />
          </div>
          <button className="skip-btn" onClick={() => goBack("/home")}>
            Login
          </button>
        </div>
      ) : (
        <div>
          <div className="content">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
          </div>
          <button className="skip-btn" onClick={() => goBack("/home")}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
