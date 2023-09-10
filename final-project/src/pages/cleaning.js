const fetchData = async (openai, message, prompt) => {
  const prompt = `Given this ${prompt} define if this message makes sense for it ${message}. If it makes sense
  return 0, if it doesn't return 1`;

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
    console.log(aiResponse);
    // Clear the input field
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
