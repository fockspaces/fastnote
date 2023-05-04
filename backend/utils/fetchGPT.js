import { Configuration, OpenAIApi } from "openai";

export const fetchGPT = async (prompt) => {
  const max_tokens = 150;

  const configuration = new Configuration({
    apiKey: process.env.GPT_ACCESS_KEY,
    basePath: "https://api.pawan.krd/v1",
  });

  console.log({
    apiKey: process.env.GPT_ACCESS_KEY,
    basePath: "https://api.pawan.krd/v1",
    prompt,
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
    console.error("Error fetching GPT response:", error.message);
  }
};
