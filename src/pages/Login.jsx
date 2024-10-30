import React from "react";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const hdlLogin = (role) => {
    login(role);
    if (role === "ADMIN") {
      navigate("/admin");
    }
  };
  return (
    <div className="flex gap-5">
      <p className="text-2xl">Login</p>
      <button className="btn btn-primary" onClick={() => hdlLogin("USER")}>
        Fake login user
      </button>
      <button className="btn btn-primary" onClick={() => hdlLogin("ADMIN")}>
        Fake login admin
      </button>

      <button onClick={() => console.log(user)}>TEST</button>
    </div>
  );
}

export default Login;
