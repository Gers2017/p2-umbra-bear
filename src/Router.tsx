import { Route, Routes } from "react-router-dom";
import { Feed, Pictures, UploadPicture } from "./pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/upload" element={<UploadPicture />} />
      <Route path="/pictures" element={<Pictures />} />
    </Routes>
  );
}
