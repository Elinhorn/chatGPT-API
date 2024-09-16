type ChatCompletionRole = "system" | "user" | "assistant" | "tool" | "function";

export interface chatType {
  role: ChatCompletionRole;
  content: string | null;
}
