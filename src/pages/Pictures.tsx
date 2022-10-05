import { ChatMessage } from "./chat";
import { usePictureFeed } from "./pictures/usePictureFeed";

export function Pictures() {
  const { loading, pictureFeed } = usePictureFeed();
  return (
    <>
      <ul>
        {!loading &&
          pictureFeed.length > 0 &&
          pictureFeed.map(({ meta: { documentId }, fields }) => (
            <li key={documentId}>
              <img
                src={`data:${fields.blob}`}
                alt={`Image from feed ${documentId}`}
                width={250}
              />
              <ul className="list">
                {fields.messages.map(({ meta, fields }) => (
                  <li key={`${documentId}_${meta.documentId}`}>
                    <ChatMessage message={fields} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}
