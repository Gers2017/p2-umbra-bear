import { useNavigate } from "react-router-dom";
export default function Nav() {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/upload")}>Upload</button>
      <button onClick={() => navigate("/pictures")}>Pictures</button>
    </nav>
  );
}
