import { useEffect, useState } from "react";
import "./App.css";
import { openaitest } from "./services/openAi";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import ChatBubble from "./components/chatBubble";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRef } from "react";
import MenuBar from "./components/menuBar";
import { ModeToggle } from "./components/mode-toggle";
import LoadingAnswer from "./components/loadingAnswer";
import { chatType } from "./types/dataTypes";

function App() {
  const [textInput, setTextInput] = useState("");
  const [chatHistory, setChatHistory] = useState<chatType[] | null>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const getAI = async () => {
    if (!textInput.trim()) {
      return;
    }

    let tempChat = [];

    if (chatHistory?.length === 0) {
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
    setLoadingAnswer(true);

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

    setLoadingAnswer(false);
    setChatHistory(updatedChat);
    console.log(updatedChat);
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      getAI();
    }
  };

  function handleSaveChat() {
    const chat = JSON.stringify(chatHistory);
    localStorage.setItem("chat", chat);
    console.log("saved");
  }

  function handleLoadChat() {
    const savedChat = localStorage.getItem("chat");
    if (savedChat) {
      const parsedChat = JSON.parse(savedChat);
      setChatHistory(parsedChat);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-4 mx-auto h-dvh max-w-[80%]">
        <header className="flex w-full ">
          <ModeToggle />
          <MenuBar />
          <Button onClick={handleSaveChat}>Save chat</Button>
          <Button onClick={handleLoadChat}>Load old chat</Button>
        </header>

        <ScrollArea
          ref={chatWindowRef}
          className="flex flex-col w-full h-full gap-3 p-4 overflow-y-auto border rounded-md"
        >
          {chatHistory?.map((chat, index) => {
            if (chat.role !== "system")
              return <ChatBubble key={index} props={chat} />;
          })}
          {loadingAnswer && <LoadingAnswer />}
        </ScrollArea>
        <div className="flex w-full gap-3 ">
          <Input
            type="text"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.currentTarget.value);
            }}
            onKeyDown={handleKeyDown}
          />

          <Button size={"xlg"} onClick={getAI}>
            send
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
