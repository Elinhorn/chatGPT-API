import { Card } from "./ui/card";

export default function ChatBubble({ props }) {
  return (
    <Card className={props.role === "user" ? "self-end" : "self-start"}>
      {props.content}
    </Card>
  );
}
