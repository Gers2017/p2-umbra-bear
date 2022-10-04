import { Route, Routes } from "react-router-dom";
import { Feed } from "./pages";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />
    </Routes>
  );
}
