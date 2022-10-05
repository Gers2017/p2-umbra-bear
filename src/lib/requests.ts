import { GraphQLClient, gql, RequestDocument } from "graphql-request";
import {
  encodeOperation,
  generateHash,
  KeyPair,
  OperationFields,
  signAndEncodeEntry,
} from "p2panda-js";

import { ENDPOINT, CHAT_SCHEMA_ID, PICTURE_SCHEMA_ID } from "./constants";
import type {
  ChatResponse,
  Message,
  NextArgs,
  Picture,
  PictureResponse,
} from "../typdefs";

const gqlClient = new GraphQLClient(ENDPOINT);

const LOCAL_STORAGE_KEY = "PRIVATE_KEY";
const getPrivateKey = () => localStorage.getItem(LOCAL_STORAGE_KEY);
const setPrivateKey = (privateKey: string) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, privateKey);

function getKeyPair(): KeyPair {
  const privateKey = getPrivateKey();
  if (privateKey) {
    return new KeyPair(privateKey);
  }

  const keyPair = new KeyPair();
  setPrivateKey(keyPair.privateKey());
  return keyPair;
}

export async function gqlRequest(query: RequestDocument, variables?: object) {
  try {
    return await gqlClient.request(query, variables);
  } catch (e) {
    console.error(e);

    window.alert(
      "Error: Could not connect to node.\n\n- Did you start the node at port `2020`?\n- Did you deploy the schemas (via `npm run schema`) and changed the schema ids in `./src/constants.ts`?"
    );
  }
}

async function nextArgs(publicKey: string, viewId?: string): Promise<NextArgs> {
  const query = gql`
    query NextArgs($publicKey: String!, $viewId: String) {
      nextArgs(publicKey: $publicKey, viewId: $viewId) {
        logId
        seqNum
        backlink
        skiplink
      }
    }
  `;

  const result = await gqlRequest(query, {
    publicKey,
    viewId,
  });

  return result.nextArgs;
}

export async function publish(
  entry: string,
  operation: string
): Promise<NextArgs> {
  const query = gql`
    mutation Publish($entry: String!, $operation: String!) {
      publish(entry: $entry, operation: $operation) {
        logId
        seqNum
        backlink
        skiplink
      }
    }
  `;

  const result = await gqlRequest(query, {
    entry,
    operation,
  });

  return result.publish;
}

export async function createMessage(message: Message) {
  const keyPair = getKeyPair();
  const args = await nextArgs(keyPair.publicKey());

  console.log({
    pub: keyPair.publicKey(),
    priv: keyPair.privateKey(),
  });

  const operation = encodeOperation({
    action: "create",
    schemaId: CHAT_SCHEMA_ID,
    fields: message,
  });

  const entry = signAndEncodeEntry(
    {
      ...args,
      operation,
    },
    keyPair
  );

  await publish(entry, operation);
  return generateHash(entry);
}

export async function createPicture(picture: Picture) {
  const keyPair = getKeyPair();
  const args = await nextArgs(keyPair.publicKey());

  const { blob, timestamp, messages } = picture;
  const fields = new OperationFields({
    blob,
    timestamp,
  });

  fields.insert("messages", "relation_list", messages);

  console.log("OP FIELDS:", fields);

  const operation = encodeOperation({
    schemaId: PICTURE_SCHEMA_ID,
    fields,
  });

  const entry = signAndEncodeEntry(
    {
      ...args,
      operation,
    },
    keyPair
  );

  await publish(entry, operation);
  return generateHash(entry);
}

export async function getAllChats() {
  const query = gql`query AllChats {
    chats: all_${CHAT_SCHEMA_ID} {
      meta {
        documentId
        viewId
      }
      fields {
        username
        text
      }
    }
  }`;
  const res = (await gqlRequest(query)) as { chats: ChatResponse[] };
  return res.chats;
}

export async function getAllPictures() {
  const query = gql`query AllPictures {
    pictures: all_${PICTURE_SCHEMA_ID} {
      meta {
        documentId
        viewId
      }
      fields {
        blob
        timestamp
        messages {
          meta {
            documentId
            viewId
          }
          fields {
            username
            text
          }
        }
      }
    }
  }`;
  const res = (await gqlRequest(query)) as { pictures: PictureResponse[] };
  return res.pictures;
}
