import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.GPT_ACCESS_KEY,
});
const openai = new OpenAIApi(configuration);

export const fetchGPT = async (prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `In the same language as the input text, generate topic tags separated by commas for the following text: "${prompt}"`,
    max_tokens: 60,
    n: 1,
    stop: null,
    temperature: 0.7,
  });

  const tagsText = response.data.choices[0].text.trim();
  const tagsArray = tagsText.split(",").map((tag) => tag.trim());

  return tagsArray;
};
