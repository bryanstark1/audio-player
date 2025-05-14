import { useEffect } from 'react';
import DurationSlider from './DurationSlider';
import Time from './Time';

import { BsPlayFill, BsPauseFill, BsRewindFill, BsFastForwardFill } from "react-icons/bs";


export default function AudioPlayer({ audioFile, song, setSong }) {

  const playPauseClick = () => {
    setSong(prev => {
      const updatedIsPlaying = !prev.isPlaying;
      if (updatedIsPlaying) {
        audioFile.play();
      } else {
        audioFile.pause();
      }
      return { ...prev, isPlaying: updatedIsPlaying };
    });
  };
  
  const fastForward = () => {
    console.log('fast forward');
  };

  const rewind = () => {
    console.log('rewind');
  };

  useEffect(() => {
    if (song?.currentTime >= song?.duration) {
      setSong(prev => ({ ...prev, isPlaying: false }));
    }
  }, [song?.currentTime, song?.duration]);
  

  return (
    <>
      <div id="audio-player">
        <h3>{song.prettyName}</h3>
        <div id='song-container'>
          <Time time={song.currentTime} duration={song.duration} type={'start'} />
          <DurationSlider audioFile={audioFile} song={song} setSong={setSong} duration={song.duration} currentTime={song.currentTime} />
          <Time time={song.currentTime} duration={song.duration} type={'end'} />
        </div>
        <div id="controls-container">
          <button id='rewind' onClick={rewind} aria-label="Rewind"><BsRewindFill /></button>
          <button id='play-pause' onClick={playPauseClick} disabled={song.duration === null} aria-label={song.isPlaying ? 'Pause' : 'Play'}>{song.isPlaying ? <BsPauseFill /> : <BsPlayFill />}</button>
          <button id='fast-forward' onClick={fastForward} aria-label="Fast Forward"><BsFastForwardFill /></button>
        </div>
      </div>
    </>
  );
};