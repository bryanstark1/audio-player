import { useEffect, useRef } from 'react';

export default function DurationSlider({ song, setSong, duration, currentTime }) {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // Update slider position based on current time
  useEffect(() => {
    if (sliderRef.current && duration > 0) {
      sliderRef.current.style.width = `${(currentTime / duration) * 100}%`;
    }
  }, [currentTime, duration]); // Only update when currentTime or duration changes

  // Handle drag movement and update the slider in real time
  const handleDrag = (e) => {
    if (e.screenX !== 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const newProgress = x / rect.width;
  
      // Update the slider width in real-time as user drags
      sliderRef.current.style.width = `${newProgress * 100}%`;
  
      // setTimeChange(newProgress); // Update state for current playback position
      const newTime = duration * newProgress;
      song.file.currentTime = newTime;
      setSong((prevState) => ({
        ...prevState,
        currentTime: newTime,
      }));
    };
  };

  // Handle clicking on the slider to seek to a specific time
  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const newProgress = x / rect.width;

    // Seek to the clicked position
    const newTime = duration * newProgress;
    song.file.currentTime = newTime;

    setSong((prevState) => ({
      ...prevState,
      currentTime: newTime,
    }));

    // Update the slider width based on the clicked position
    sliderRef.current.style.width = `${newProgress * 100}%`;
  };

  return (
    <>
      <div id="duration-slider-container" ref={containerRef} onClick={handleClick}>
        <div id="duration-slider" ref={sliderRef}>
          {currentTime > 0 && 
            <div
              id="slider-bubble"
              draggable
              onDrag={(e) => handleDrag(e)} // Handle dragging of the bubble
            ></div>
          }
        </div>
      </div>
    </>
  );
}
