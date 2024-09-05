import { useState } from "react";
import "./App.css";
import { openaitest } from "./services/openAi";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import ChatBubble from "./components/chatBubble";

function App() {
  const [textInput, setTextInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const getAI = async () => {
    let tempChat = [];

    if (chatHistory.length === 0) {
      tempChat = [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: textInput,
        },
      ];
    } else {
      tempChat = [
        ...chatHistory,
        {
          role: "user",
          content: textInput,
        },
      ];
    }

    setChatHistory(tempChat);

    const completion = await openaitest.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: tempChat,
    });

    const updatedChat = [
      ...tempChat,
      {
        role: "assistant",
        content: completion.choices[0].message.content,
      },
    ];

    setChatHistory(updatedChat);

    setTextInput("");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-3 p-4 bg-slate-500 w-96 h-96">
          {chatHistory.map((chat, index) => {
            if (chat.role !== "system")
              return (
                //TODO: stylea allt snyggt
                //TODO: fixa scroll
                //TODO: gör chatrutan till komponent
                //TODO: max width på chatbubblorna
                <ChatBubble key={index} props={chat} />
              );
          })}
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
