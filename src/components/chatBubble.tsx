import { useColor } from "@/context/color-provider";
import { Card } from "./ui/card";
import { chatType } from "@/types/dataTypes";

interface CBProps {
  props: chatType;
}

export default function ChatBubble({ props }: CBProps) {
  const { color } = useColor();

  return (
    <Card
      className={
        (props.role === "user"
          ? "self-end " + color + " text-black "
          : "self-start bg-slate-100 dark:text-black ") +
        "max-w-[80%] p-2 border-0"
      }
    >
      {props.content}
    </Card>
  );
}
