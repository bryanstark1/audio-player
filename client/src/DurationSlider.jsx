import { useEffect, useRef, useState } from 'react';

export default function DurationSlider({ song, setSong, duration, currentTime }) {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Update slider position based on current time
  useEffect(() => {
    if (sliderRef.current && duration > 0) {
      sliderRef.current.style.width = `${(currentTime / duration) * 100}%`;
    }
  }, [currentTime, duration]);

  // Handle mouse down event to start dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle mouse move event during dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const newProgress = x / rect.width;

    // Update the slider width in real-time as user drags
    sliderRef.current.style.width = `${newProgress * 100}%`;

    // Update the playback time in real-time
    const newTime = duration * newProgress;
    song.file.currentTime = newTime;
    setSong((prevState) => ({
      ...prevState,
      currentTime: newTime,
    }));
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
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
      <div
        id="duration-slider-container"
        ref={containerRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove} // Handle dragging during mouse move
        onMouseUp={handleMouseUp} // Handle mouse up event
        onMouseLeave={handleMouseUp} // Handle mouse leave event (in case the mouse leaves the area)
      >
        <div id="duration-slider" ref={sliderRef}>
          {currentTime > 0 && (
            <div
              id="slider-bubble"
              onMouseDown={handleMouseDown} // Handle the mouse down event for dragging
              style={{ cursor: 'pointer' }} // Optionally add a pointer cursor
            ></div>
          )}
        </div>
      </div>
    </>
  );
}
