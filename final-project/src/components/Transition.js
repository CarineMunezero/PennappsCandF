import React, { useState, useEffect } from "react";
import Yee from "../assets/output_updated.gif";

const Transition = () => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, []);

  return showTransition ? (
    <div className="transition-container">
      <img src={Yee} alt="Transition Gif" className="transition-gif" />
    </div>
  ) : null;
};

export default Transition;
