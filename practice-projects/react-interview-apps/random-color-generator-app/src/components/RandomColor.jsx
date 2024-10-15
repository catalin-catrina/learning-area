import React, { useState } from 'react';

function RandomColor() {
  const [color, setColor] = useState('#000000');
  const [type, setType] = useState('HEX');

  const generateColor = () => {
    let newColor = [];
    if (type === 'HEX') {
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

      setColor('#' + newColor.join(''));
      console.log(color);
    } else if (type === 'RGB') {
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * 256);
        newColor.push(random);
      }
      setColor('RGB(' + newColor.join(',') + ')');
    }
  };

  const handleType = colorType => {
    setType(colorType);
    generateColor();
  };

  return (
    <div
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
        <button onClick={() => handleType('HEX')}>Switch to Hex</button>
        <button onClick={() => handleType('RGB')}>Switch to RGB</button>
        <button onClick={generateColor}>Generate new color</button>
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '5%',
          fontSize: '2rem',
          color: '#fff',
        }}
      >
        <h1>{type} color</h1>
        <h1>{color}</h1>
      </div>
    </div>
  );
}

export default RandomColor;
