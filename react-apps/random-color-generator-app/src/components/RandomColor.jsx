import React, { useState } from 'react';

function RandomColor() {
  const [color, setColor] = useState('#000000');

  const generateHex = () => {
    let newColor = [];
    for (let i = 0; i < 6; i++) {
      let random = Math.floor(Math.random() * 16);
      switch (random) {
        case 10:
          random = 'a';
          break;
        case 11:
          random = 'b';
          break;
        case 12:
          random = 'c';
          break;
        case 13:
          random = 'd';
          break;
        case 14:
          random = 'e';
          break;
        case 15:
          random = 'f';
          break;
      }

      newColor.push(random);
    }
    console.log(newColor);
  };

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        width: '100vw',
        background: color,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          paddingTop: '5%',
        }}
      >
        <button>Switch to Hex</button>
        <button>Switch to RGB</button>
        <button onClick={generateHex}>Generate new color</button>
      </div>
    </div>
  );
}

export default RandomColor;
