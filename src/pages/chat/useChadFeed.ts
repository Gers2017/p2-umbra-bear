import { getAllChats, useFetcher } from "../../lib";

export function useChatFeed() {
  const { loading, data, setData } = useFetcher([], async () => {
    return await getAllChats();
  });
  return { loading, chatFeed: data, setChatFeed: setData };
}
