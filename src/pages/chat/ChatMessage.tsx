import { Message } from "../../typdefs";

export function ChatMessage({ message }: { message: Message }) {
  const { text, username } = message;

  return (
    <div className="chat_message">
      <h3>{username}</h3>
      <p>{text}</p>
    </div>
  );
}
