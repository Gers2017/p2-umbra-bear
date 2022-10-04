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

export interface Chat {
  meta: Meta;
  fields: Message;
}
