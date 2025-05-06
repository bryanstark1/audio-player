import { useEffect, useRef, useState } from 'react';

export default function DurationSlider({ audioFile, song, setSong, duration, currentTime }) {
  const containerRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      setSliderWidth((currentTime / duration) * 100);
    }
  }, [currentTime, duration]);

  // Attach/Remove global event listeners
  useEffect(() => {
    // Attach mousemove and mouseup events to the window instead of the container
    // Allows dragging to continue regardless of the cursor leaving the container boundaries
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const newProgress = x / rect.width;

      setSliderWidth(`${newProgress * 100}%`);

      const newTime = duration * newProgress;
      audioFile.currentTime = newTime;
      setSong((prevState) => ({
        ...prevState,
        currentTime: newTime,
      }));
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration, song, setSong]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const newProgress = x / rect.width;

    const newTime = duration * newProgress;
    audioFile.currentTime = newTime;

    setSong((prevState) => ({
      ...prevState,
      currentTime: newTime,
    }));

    setSliderWidth(`${newProgress * 100}%`);
  };

  return (
    <div
      id="duration-slider-container"
      ref={containerRef}
      onClick={handleClick}
    >
      <div id="duration-slider" style={{ width: `${sliderWidth}%` }}>
        {duration > 0 && <div id="slider-bubble" onMouseDown={handleMouseDown}></div>}
      </div>
    </div>
  );
}
