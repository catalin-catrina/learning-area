import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

function Login() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, aud, picture } = decoded;
    const doc = {
      _id: aud,
      _type: "user",
      userName: name,
      image: picture,
    };

    // create new document
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          className="w-full h-full object-cover"
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="pill"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
