import OpenAI from "openai";

export const openaitest = new OpenAI({
  apiKey: import.meta.env.VITE_SECRET_KEY,
  dangerouslyAllowBrowser: true,
});
