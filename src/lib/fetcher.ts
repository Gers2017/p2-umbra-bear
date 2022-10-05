import { useEffect, useState } from "react";

// type Maybe<T> = T | null;

export function useFetcher<T>(init: T, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>(init);
  const [loading, setLoading] = useState(true);

  async function fetchAndSetChatFeed() {
    setLoading(true);
    const result = await fetcher();
    setData(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchAndSetChatFeed().catch((e) => console.error(e));
  }, []);

  return { loading, data, setData };
}
