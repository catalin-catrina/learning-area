import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    // object containing <clientId> and <credential> which is a jwt token
    // console.log(response);

    const decoded = jwtDecode(response.credential);
    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, picture, sub } = decoded;

    // forming the object with the fields specified in the sanity user schema
    // also added _type to tell sanity what type of document we're creating
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          src={shareVideo}
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
              onSuccess={responseGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            ></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
