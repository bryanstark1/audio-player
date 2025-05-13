import { useEffect, useState } from "react";

export default function Time({ time, duration, type }) {
  const [durationToDisplay, setDurationToDisplay] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [timeType, setTimeType] = useState('duration');

  useEffect(() => {
    if (timeType === 'duration') {
      setDurationToDisplay(duration);
    } else {
      setDurationToDisplay(remainingTime);
    };
  }, [duration, remainingTime]);

  useEffect(() => {
    setRemainingTime(duration - time);
  }, [time]);

  const convertSeconds = (totalSeconds) => {
    if (isNaN(totalSeconds)) return '00:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleClick = () => {
    if (type === 'end') {
      if (timeType === 'duration') {
        setDurationToDisplay(remainingTime);
        setTimeType('time-remaining');
      } else {
        setDurationToDisplay(duration);
        setTimeType('duration');
      };
    };
  };
  

  return (
    <>
      <div className="time-container">
        <h4 className="time" onClick={handleClick}>{timeType === 'time-remaining' ? '-' : ''}{type === 'start' ? convertSeconds(parseInt(time)) : convertSeconds(parseInt(durationToDisplay))}</h4>
      </div>
    </>
  );
};