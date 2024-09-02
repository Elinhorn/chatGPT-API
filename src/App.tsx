import { useState } from "react";
import "./App.css";
import { openaitest } from "./services/openAi";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [textInput, setTextInput] = useState("");
  const [aiOutput, setAiOutput] = useState<string | null>("");
  const [chatHistory, setChatHistory] = useState<[]>([]);

  const getAI = async () => {
    const completion = await openaitest.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: textInput,
        },
      ],
    });

    console.log(completion);
    setAiOutput(completion.choices[0].message.content);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-slate-500 w-96 h-96">
          <p>{aiOutput}</p>
        </div>
        <div className="flex">
          <Input
            type="text"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.currentTarget.value);
            }}
          ></Input>

          <Button onClick={getAI}>give me answer</Button>
        </div>
      </div>
    </>
  );
}

export default App;
