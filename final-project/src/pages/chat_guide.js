import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

function OpenAIComponent() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lesson, setlessongpt] = useState(['Investing', 'Budgeting',  'Saving']);
  const fetchData = async (message) => {
    const configuration = new Configuration({
      apiKey: "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", // Note: Ensure this is kept secure!
    });
    const openai = new OpenAIApi(configuration);

    try {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Have a friendly personality.Using only 2 sentences, select one lesson from the list: ${List} . Start your answer with the chosen lesson's name and craft a persuasive argument for our client to consider taking that lesson.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.86,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const aiResponse = res.data.choices[0]?.message?.content;

      // Add the user's message and the AI's response to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "User", text: message },
        { sender: "OpenAI", text: aiResponse },
      ]);

      // Clear the input field
      setUserMessage("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={() => fetchData(userMessage)}>Submit</button>
    </div>
  );
}

export default OpenAIComponent;
