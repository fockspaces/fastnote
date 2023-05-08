import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

export const fetchGPT = async (prompt, access_token) => {
  const max_tokens = 150;

  try {
    const response = await fetchServer(prompt, access_token);
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 429) {
      console.log("Error: 429 Too Many Requests, not calling OpenAI.");
      return;
    }
    const configuration = new Configuration({
      apiKey: process.env.GPT_ACCESS_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens,
        n: 1,
        stop: null,
        temperature: 1, // Adjust the temperature as needed (e.g., 0.5 for more focused, 0.8 for more creative).
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching GPT response:", error);
    }
  }
};

const fetchServer = async (prompt, access_token) => {
  try {
    const response = await axios.post(
      process.env.GPT_HOST + "/api/summary",
      { prompt },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`, // Replace with the correct access token variable.
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching GPT response from server:", error.message);
    throw error;
  }
};
