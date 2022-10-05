import { getAllPictures, useFetcher } from "../../lib";

export function usePictureFeed() {
  const { loading, data, setData } = useFetcher([], async () => {
    return await getAllPictures();
  });

  return {
    loading,
    pictureFeed: data,
    setPictureFeed: setData,
  };
}
