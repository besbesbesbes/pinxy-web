import { useNavigate } from "react-router-dom";
import Posts from "./components/Posts";

function App() {
  const navigate = useNavigate();
  const hdlLogout = () => {
    localStorage.clear();
    navigate(0);
  };
  return (
    <>
      <p>App user</p>
      <button className="btn btn-primary" onClick={hdlLogout}>
        Logout
      </button>
      <Posts />
    </>
  );
}

export default App;
