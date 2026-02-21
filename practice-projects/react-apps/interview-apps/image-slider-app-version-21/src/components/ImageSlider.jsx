import { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { MdArrowForward } from 'react-icons/md';
import { BsCircleFill } from 'react-icons/bs';

import React from 'react';

function ImageSlider({ url }) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(null);

  async function getImages() {
    const response = await fetch(url);
    const data = await response.json();
    if (data) {
      setImages(data);
      setCurrent(0);
      console.log(images);
    }
  }

  useEffect(() => {
    getImages();
  }, [url]);

  function handlePrev() {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  }

  function handleNext() {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  }

  function handleCircle(index) {
    setCurrent(index);
  }

  return (
    <div className="container">
      <MdArrowBack size="50" className="icon arrow-left" onClick={handlePrev} />
      {images && images.length
        ? images.map((img, index) => {
            return (
              <img
                key={img.id}
                src={img.download_url}
                className={index === current ? '' : 'hide'}
              />
            );
          })
        : 'Not working'}
      <MdArrowForward
        size="50"
        className="icon arrow-right"
        onClick={handleNext}
      />
      {images &&
        images.length &&
        images.map((_, i) => (
          <BsCircleFill
            key={i}
            size="50"
            className={current === i ? 'circle circle-active' : 'circle'}
            onClick={() => handleCircle(i)}
          />
        ))}
    </div>
  );
}

export default ImageSlider;
