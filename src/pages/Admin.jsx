import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const hdlLogout = () => {
    localStorage.clear();
    navigate(0);
  };
  return (
    <>
      <p>Admin page</p>
      <button className="btn btn-primary" onClick={hdlLogout}>
        Logout
      </button>
    </>
  );
}

export default Admin;
