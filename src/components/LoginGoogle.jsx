import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { userLoginGoogle } from "../api/auth";
import useUserStore from "../stores/userStore";

const LoginGoogle = () => {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);

      const res = await userLoginGoogle(token);
      console.log("res google", res)
      console.log("decode", decoded);
      console.log("res", res);

      login(res);

      if (res.data.payload.role === "USER") {
        navigate("/");
      } else {
        navigate("/admin");
      }

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="m-auto w-full border rounded-lg">
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
