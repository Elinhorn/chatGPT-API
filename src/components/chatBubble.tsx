import { Card } from "./ui/card";

export default function ChatBubble({ props }) {
  return (
    <Card
      className={
        (props.role === "user"
          ? "self-end bg-teal-400 "
          : "self-start bg-white ") + "max-w-[80%] p-2 border-0"
      }
    >
      {props.content}
    </Card>
  );
}
