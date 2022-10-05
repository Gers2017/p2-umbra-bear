export type NextArgs = {
  logId: string;
  seqNum: string;
  backlink?: string;
  skiplink?: string;
};

export type Meta = {
  documentId: string;
  viewId: string;
};

export type Message = {
  username: string;
  text: string;
};

export interface ChatResponse {
  meta: Meta;
  fields: Message;
}

export interface Picture {
  blob: string;
  timestamp: string;
  messages: string[];
}

type PictureOmittedMessage = Omit<Picture, "messages">;
interface RelatedMessage extends PictureOmittedMessage {
  messages: ChatResponse[];
}

export interface PictureResponse {
  meta: Meta;
  fields: RelatedMessage;
}
