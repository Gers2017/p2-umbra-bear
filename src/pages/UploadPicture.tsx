import { ChangeEvent, useState } from "react";
import { createPicture } from "../lib";
import { Picture } from "../typdefs";
import { ChatMessage } from "./chat/ChatMessage";
import { useChatFeed } from "./chat/useChadFeed";
import { useNavigate } from "react-router-dom";

export function UploadPicture() {
  const [blob, setBlob] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const { loading, chatFeed } = useChatFeed();
  const navigate = useNavigate();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    let newMessages = [...messages];

    if (messages.includes(value)) {
      newMessages = newMessages.filter((m) => m !== value);
    } else {
      newMessages.push(value);
    }

    setMessages(newMessages);
  }

  function onUpload(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    if (!files || !files[0]) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setBlob(() => e.target?.result as unknown as string);
    });

    reader.readAsDataURL(files[0]);
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const picture: Picture = {
      blob,
      messages,
      timestamp: Date.now().toString(),
    };

    console.log("PICTURE:", picture);

    await createPicture(picture);
    const isOk = window.confirm("Created a new picture! Go to pictures?");
    if (isOk) {
      navigate("/pictures");
    }
  }

  const disabled = !blob || messages.length === 0;

  return (
    <>
      <h2>Upload Picture</h2>
      <form className="list" onSubmit={onSubmit}>
        <fieldset>
          <label htmlFor="blob">Image</label>
          <input type="file" name="blob" id="blob" onChange={onUpload} />
        </fieldset>
        <button type="submit" disabled={disabled}>
          Done!
        </button>
      </form>
      {/* Show all messages */}
      <br />
      <ul className="list">
        {loading && <h3>Please wait. Loading messages...</h3>}
        {!loading &&
          chatFeed.map(({ meta: { documentId }, fields }) => {
            const checked = messages.includes(documentId);

            return (
              <li
                key={documentId}
                className={`chat_selector ${checked && "checked"}`}
              >
                <input
                  type="checkbox"
                  name="chats[]"
                  id={documentId}
                  value={documentId}
                  checked={checked}
                  onChange={onChange}
                />
                <ChatMessage message={fields} />
              </li>
            );
          })}
      </ul>
    </>
  );
}
