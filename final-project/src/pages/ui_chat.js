// Importing the dependencies of react to use
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// Importing the styles of the chat page
import "../styles/ChatPage.css";
import Astro_Head from "../assets/Astro_head.png";
// Importing the dependencies of openai to use
import { Configuration, OpenAIApi } from "openai";

function ChatAI() {
  const [error, setError] = useState(0);
  // Initialize the messages state with the computer's message "
  const [messages, setMessages] = useState([
    { type: "computer", text: "What financial advice can I provide for you today?" },
  ]);
  // Creating a hook for the user input
  const [userInput, setUserInput] = useState("");

  //Ai configuration

  const lessons = ["Investing", "Budgeting", "Saving", "Retirement"];
  const profile = "International student";
  const prompt = `Have a friendly personality. Using only 2 sentences, select one lesson from the list: ${lessons.join(
    ", "
  )} . Start your answer with the chosen lesson's name and craft a persuasive argument for our client to consider taking that lesson. Recommend lessons that they don't mention in the prompt. Take in consideration that the user is a ${profile}`;
  // AI part
  //Checking the logic of the prompt
  const Logic = async (message1, prompt1) => {
    if (message1.trim() === "") {
      return "0";
    }
    const configuration = new Configuration({
      apiKey: "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", // Use environment variable for security
    });
    const openai = new OpenAIApi(configuration);
    const prompt = `Given this ${prompt1} define if this message makes sense for it ${message1}. Allow follow up questioins. If it makes sense
  return 1, if it doesn't return 0`;

    try {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: prompt,
          },
          {
            role: "user",
            content: message1,
          },
        ],
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const aiResponse = res.data.choices[0]?.message?.content;
      return aiResponse;
      // Clear the input field
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async (message, prompt) => {
    const configuration = new Configuration({
      apiKey: "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", // Use environment variable for security
    });
    const openai = new OpenAIApi(configuration);
    try {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: prompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const aiResponse = res.data.choices[0]?.message?.content;

      // Add the user's message and the AI's response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: message },
        { type: "computer", text: aiResponse },
      ]);

      // Clear the input field
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Logic to decied where to navigate
  const navigate = useNavigate();
  const handleNavigation = (lesson) => {
    if (lessons.includes(lesson)) {
      // navigate(`/${lesson.toLowerCase()}`); This section will be used when we have routes to all the different lessons
      navigate(`/lesson`);
    }
  };

  const goback = () => {
    navigate(`/home`);
  };

  // Use the useEffect hook to automatically scroll to the bottom of the chat container
  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setUserInput("");

    try {
      const result = await Logic(userInput, prompt);
      if (result.trim() !== "0") {
        await fetchData(userInput, prompt);
        setError(0);
      } else {
        setError(1);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "computer", text: "Please Enter a valid answer" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="row0">
        <button onClick={() => goback()}>Go back</button>
      </div>
      <div className="row1">
        <h1>AstroGuide</h1>
      </div>
      {/* Chatbox */}
      <div className="row">
        <div className="row-img">
          <img src={Astro_Head} alt="Atronaut"></img>
        </div>
        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <div className={`chat-bubble ${message.type}`}>
                {message.text}
              </div>
              {message.type === "computer" &&
                error === 0 &&
                index === messages.length - 1 &&
                index !== 0 && (
                  <div className="chat-bubble button-bubble">
                    <button
                      onClick={() =>
                        handleNavigation(
                          message.text.split(" ")[0].replace(/[^a-zA-Z]/g, "")
                        )
                      }
                    >
                      Go To{" "}
                      {message.text.split(" ")[0].replace(/[^a-zA-Z]/g, "")}{" "}
                      Lesson
                    </button>
                  </div>
                )}
            </React.Fragment>
          ))}
        </div>
        <div className="row-img1">
          <img src={Astro_Head} alt="Atronaut"></img>
        </div>
      </div>
      {/* Input for the user */}
      <div>
        <form className="chat-input" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatAI;
