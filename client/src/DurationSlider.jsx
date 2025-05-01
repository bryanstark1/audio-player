import {useEffect, useRef, useState} from 'react';


export default function DurationSlider({ song, setSong, duration, currentTime }) {
  const [timeChange, setTimeChange] = useState(null);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    sliderRef.current.style.width = `${(parseInt(currentTime) / parseInt(duration)) * 100}%`;
  }, [currentTime]);

  const handleDrag = (e) => {
    // Hotfix for dragging outside of the slider
    if (e.screenX === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const newProgress = x / rect.width;
    console.log(newProgress)

    setTimeChange(newProgress);
  };

  useEffect(() => {
    if (timeChange) {
      const newTime = duration * timeChange;
      song.file.currentTime = newTime;
      setSong((prevState) => ({
        ...prevState,
        currentTime: newTime,
      }));
    };
  }, [timeChange]);

  return (
    <>
      <div id="duration-slider-container" ref={containerRef}>
        <div id="duration-slider" ref={sliderRef}>
          {currentTime > 0 ? <div id='slider-bubble' draggable onDrag={(e) => handleDrag(e)}></div> : ''}
        </div>
      </div>
    </>
  );
};