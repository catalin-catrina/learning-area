import React, { useState, useEffect } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';

function ImageSlider({ url, limit, page }) {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [error, setError] = useState(null);

  const fetchImages = async url => {
    try {
      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setImages(data, () => {
          setCurrentImage(images[currentSlideIndex].download_url);
        });
      }
    } catch (e) {
      setError(e);
    }
  };

  const handlePrev = () => {
    setDirection('prev');
  };

  const handleNext = () => {
    setDirection('next');
  };

  useEffect(() => {
    if (direction === 'prev') {
      if (currentSlideIndex === 0) {
        setCurrentSlideIndex(images.length - 1);
      } else {
        setCurrentSlideIndex(prev => prev - 1);
      }
    } else if (direction === 'next') {
      if (currentSlideIndex === images.length - 1) {
        setCurrentSlideIndex(0);
      } else {
        setCurrentSlideIndex(prev => prev + 1);
      }
    }

    setDirection(null); // Reset direction
  }, [images.length, direction, currentSlideIndex]);

  useEffect(() => {
    if (url) fetchImages(url);
  }, [url]);

  useEffect(() => {
    if (images.length) setCurrentImage(images[currentSlideIndex].download_url);
  }, [images, currentSlideIndex]);

  return (
    <>
      <div style={{ width: '50%' }}>
        <img src={currentImage} alt="image" style={{ maxWidth: '100%' }} />
      </div>
      <CiCircleChevLeft onClick={handlePrev} size="60" />
      <CiCircleChevRight onClick={handleNext} size="60" />
    </>
  );
}

export default ImageSlider;
