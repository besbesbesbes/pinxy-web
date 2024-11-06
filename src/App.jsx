import { useNavigate } from "react-router-dom";
import Posts from "./components/Posts";
import Modal from "./components/Modal";

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
      <Modal />
      <Posts />
    </>
  );
}

export default App;
