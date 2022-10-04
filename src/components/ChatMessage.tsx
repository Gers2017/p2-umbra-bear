import { Chat } from "src/typdefs";

export function ChatMessage({ chat }: { chat: Chat }) {
  const { text, username } = chat.fields;

  return (
    <div className="chat_message">
      <h3>{username}</h3>
      <p>{text}</p>
    </div>
  );
}
