import React from "react";
import pic from "../assets/my-pic.jpg";

function Info() {
  return (
    <div className="info">
      <div className="info__container">
        <div className="info__container__image">
          <img src={pic} alt="photo" />
        </div>
        <div className="info__container__details">
          <h1>Catalin Catrina</h1>
          <h3>Frontend Developer</h3>
          <p>my website.com</p>
        </div>
        <div className="info__container__contact-me">
          <button className="btn btn-primary">
            <i className="fa-solid fa-envelope"></i>Email
          </button>
          <button className="btn btn-secondary">
            <i className="fa-brands fa-linkedin-in"></i>Linkedin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;
