// LessonPage.js

import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import "../styles/Lesson.css";
import React, { useState, useEffect } from "react";
import Transition from "../components/Transition.js";
import "../styles/Transition.css";
import astroPlan from "../assets/astro-on-planet.png";

function LessonPage() {
  const [isTranscriptVisible, setTranscriptVisibility] = useState(false);
  const [showTransition, setShowTransition] = useState(true);

  const navigate = useNavigate();

  const goBack = (path) => {
    navigate(path);
  };

  const handleTranscriptClick = () => {
    setTranscriptVisibility(!isTranscriptVisible);
  };

  const handleNextButtonClick = () => {
    // setTimeout(() => goBack("/planet"), 2000);
  };

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(transitionTimeout);
    };
  }, []);

  return (
    <div id="container">
      {/* Add the Transition component */}
      {showTransition && <Transition />}
      <button className="next-button" onClick={() => goBack("/planet")}>
        ← Go Back
      </button>{" "}
      <button className="next-button" onClick={() => goBack("/planet")}>
        Finish
      </button>
      <div>
        ( ) : (
        <div className="center-align">
          <div className="Row">
            <h1>Lesson #1: The Importance of Investing</h1>
          </div>

          <div className="Row1">
            <div className="Video">
              <YouTube
                videoId="x7msE3tx8QI"
                opts={{ width: "100%", height: "400px" }}
              />
              {/* Add the bottom content with the planet and astronaut images */}
              <div className="bottom-content">
                <img src={astroPlan} alt="Planet" />
              </div>
            </div>
          </div>

          <div className="center-text">
            <div className="transcript-text" onClick={handleTranscriptClick}>
              {isTranscriptVisible ? (
                <p>
                  Meet Bob. Bob just graduated from college and got his first
                  job at Corporate Co. After a month of hard work, Bob has just
                  received his first paycheck. He’s very excited. Bob plans to
                  spend 50% of that on rent and utilities, and another 30% of it
                  on food and fun activities, like going to the movies. As for
                  the last 20%, Bob wants to do something with it, maybe even
                  invest it, but isn’t sure where to start.So, Bob decides to
                  deposit it into a bank account. Bob thinks this is a safe
                  plan. After all, the bank will actually pay him a small amount
                  of money each year, called interest, just for keeping his
                  money at the bank. This sounds great, there’s just one
                  problem. Bob may actually be losing money. Bob is
                  flabbergasted. How can that be? Well, it comes down to
                  something called inflation. Inflation is simply the idea that
                  prices for goods and services rise over time. Why inflation
                  occurs is beyond the scope of this video, but your
                  grandparents are cranky for a reason: in the 1950’s you could
                  actually buy a loaf of bread for 12 cents and a new house for
                  $10,000. Inflation in the U.S. is targeted to around 2% a
                  year. This is bad for Bob. That’s because even though the bank
                  may pay Bob 1% for his deposit, prices have actually increased
                  by 2%. So what should Bob do? Well, in order to actually make
                  money, Bob needs to invest in something that will beat
                  inflation. Generally speaking, only three things do: Bonds,
                  Commercial Real Estate, and Stocks. Let’s start with bonds.
                  Bonds are loans made to corporations or governments. In return
                  for your money, called principal, you’ll receive a fixed
                  amount of interest per year, plus your money back once the
                  bond expires. Because of this guarantee, bonds are the safest
                  of the three investments, though this safety comes with a
                  cost: they have the lowest potential investment return in the
                  long-run. Next we have commercial real estate. This is
                  property purchased to make money, generally by renting it out.
                  While this is quite difficult for the average investor to do
                  on his own, Bob could instead easily invest in a REIT, which
                  is a professionally managed real estate portfolio. Finally, we
                  have stocks. Stocks are simple: they represent a piece of
                  ownership in a company, like Apple or Google. People buy and
                  sell little pieces of these companies, called shares, in
                  places called stock exchanges. When Bob buys a share of say,
                  Apple, he becomes a partial owner. When Apple does well, the
                  share price goes up and Bob makes money. When Apple does
                  poorly, the share price goes down and Bob loses money. These
                  fluctuations can make stocks risky. However, fortunately for
                  Bob, stocks in the United States return on average about 9% a
                  year, including both share price appreciation and dividends,
                  which are cash payments made to each shareholder when the
                  company does well. Thus, if Bob invests the remaining 20% of
                  his paycheck, say $100, he can beat inflation by almost 7%
                  each year! But that’s not all! Here comes the real magic. The
                  next year, Bob will not only earn another 9% on his initial
                  $100 investment, called principal, but also an additional 9%
                  on the $9 dollars in profit from the previous year .Earning
                  money on both your principal and profit is called compounding,
                  and its magic is undeniable. Start investing early enough, and
                  your portfolio will be like a snowball rolling down a hill,
                  outstripping even those who put in much more, but start later.
                  Hopefully you and Bow now understand why it’s important to
                  invest your money. Be sure to watch our next video, which
                  teaches you how to actually invest, and be sure to check out
                  our website, where you find can more educational material and
                  great investment solutions.
                </p>
              ) : (
                <p>Click here to view the transcript for the video!</p>
              )}
            </div>
          </div>
        </div>
        )
      </div>
    </div>
  );
}

export default LessonPage;
