import { useState } from "react";
import React from "react";
import memesData from "../memesData.js";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    memeImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemeImages, setAllMemeImages] = useState(memesData);

  function getMemeImage() {
    const memesArray = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    setMeme((oldMeme) => {
      return {
        ...oldMeme,
        memeImage: memesArray[randomNumber].url,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <input type="text" placeholder="Top text" className="form--input" />
        <input type="text" placeholder="Bottom text" className="form--input" />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="image-container">
        <img
          src={meme.memeImage}
          style={{ maxWidth: "100%", marginTop: "20px" }}
          alt="meme"
        />
      </div>
    </main>
  );
}
