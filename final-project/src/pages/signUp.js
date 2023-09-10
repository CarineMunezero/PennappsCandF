import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import "../styles/SignUpPage.css";
import FloatingSVG from "../components/floatingsvg";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  //Declaring my states
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const goBack = (path) => {
    // Wait for 2 seconds to match the animation duration
      navigate(path);
  };

  

  return (
    <div className="center-align">
      {showAnimation && <div className="circle-animation"></div>}
      <div className={showAnimation ? "hide-content" : ""}>
        <FloatingSVG size="400px" fillColor="#CCCCFF" />
        <LoginForm />
        <button className="skip-btn" onClick={() => goBack("/home")}>
          Guest Sign In
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
