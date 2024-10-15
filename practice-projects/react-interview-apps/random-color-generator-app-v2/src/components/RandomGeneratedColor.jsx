import { useState, useEffect } from 'react';
import styles from './RandomGeneratedColor.module.css';

function RandomGeneratedColor() {
  const [bckColor, setBckColor] = useState('#000000');
  const [colorType, setColorType] = useState('HEX');

  useEffect(() => {
    handleGenerateColor();
  }, [colorType]);

  const handleGenerateColor = () => {
    if (colorType === 'HEX') {
      const charactersArr = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
      ];
      const newColor = ['#'];

      for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * 16);
        newColor.push(charactersArr[random]);
      }

      setBckColor(newColor.join(''));
    } else {
      const newColor = ['r', 'g', 'b', '('];
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * 256);
        if (i === 2) {
          newColor.push(random);
        } else {
          newColor.push(random + ',');
        }
      }
      newColor.push(')');
      setBckColor(newColor.join(''));
    }
  };

  const switchToHEX = () => {
    setColorType('HEX');
    handleGenerateColor();
  };

  const switchToRGB = () => {
    setColorType('RGB');
    handleGenerateColor();
  };

  return (
    <div style={{ backgroundColor: bckColor, width: '100vw', height: '100vh' }}>
      <div className={styles.buttonsContainer}>
        <button onClick={() => handleGenerateColor()}>Generate Color</button>
        <button onClick={() => switchToHEX()}>Generate HEX Color</button>
        <button onClick={() => switchToRGB()}>Generate RGB Color</button>
      </div>
      <div className={styles.colorContainer}>{bckColor}</div>
    </div>
  );
}

export default RandomGeneratedColor;
