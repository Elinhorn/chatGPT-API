import { useEffect, useState } from "react";
import "./App.css";
import { openaitest } from "./services/openAi";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import ChatBubble from "./components/chatBubble";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRef } from "react";

function App() {
  const [textInput, setTextInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

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
    setTextInput("");

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
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-4 h-dvh w-dvw">
        <ScrollArea
          ref={chatWindowRef}
          className="flex flex-col w-full h-full gap-3 p-4 overflow-y-auto border"
        >
          {chatHistory.map((chat, index) => {
            if (chat.role !== "system")
              return <ChatBubble key={index} props={chat} />;
          })}
        </ScrollArea>
        <div className="flex w-full gap-3 ">
          <Input
            type="text"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.currentTarget.value);
            }}
          ></Input>

          <Button size={"xlg"} onClick={getAI}>
            send
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
