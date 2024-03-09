import { useState, useEffect } from "react";
import React from "react";
import memesData from "../memesData.js";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    memeImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    // fetch("https://api.imgflip.com/get_memes")
    //   .then((res) => res.json())
    //   .then((data) => setAllMemes(data));

    const getMemes = async () => {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data);
    };

    getMemes();
  }, []);

  function getMemeImage() {
    const memesArray = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    setMeme((oldMeme) => {
      return {
        ...oldMeme,
        memeImage: memesArray[randomNumber].url,
      };
    });
  }

  function handleMemeTextChange(event) {
    const { value, name } = event.target;
    setMeme((oldMeme) => ({
      ...oldMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleMemeTextChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleMemeTextChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>

      <div className="meme">
        <img src={meme.memeImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
