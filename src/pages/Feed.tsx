import React, { ChangeEvent, FormEvent, useState } from "react";
import { createMessage } from "../lib/requests";
import { ChatResponse, Message } from "../typdefs";
import { useChatFeed, ChatMessage } from "./chat";

const DEFAULT_USERNAME = "Bob";

export const Feed: React.FC = () => {
  const [message, setMessage] = useState<Message>({
    username: DEFAULT_USERNAME,
    text: "",
  });

  const { chatFeed, setChatFeed, loading } = useChatFeed();

  const disabled =
    message.username.trim().length === 0 || message.text.trim().length === 0;

  function clearInput() {
    setMessage({ username: DEFAULT_USERNAME, text: "" });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const id = await createMessage(message);

      const chat: ChatResponse = {
        meta: { documentId: id, viewId: id },
        fields: message,
      };

      setChatFeed((prev) => [...prev, chat]);
      clearInput();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h1>Chats feed</h1>
      <form className="row" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          min={1}
          max={30}
          value={message.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          name="text"
          id="text"
          min={1}
          max={30}
          value={message.text}
          onChange={handleChange}
          placeholder="Text"
        />

        <button type="submit" disabled={disabled}>
          Send message
        </button>
      </form>

      <ul className="grid_list">
        {!loading ? (
          chatFeed.map((chat) => (
            <ChatMessage key={chat.meta.documentId} message={chat.fields} />
          ))
        ) : (
          <h3>Please wait. Loading messages...</h3>
        )}
      </ul>
    </>
  );
};
