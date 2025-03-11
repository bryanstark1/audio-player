import { useState, useEffect } from 'react'
import './App.css'

import audioFile from '../../../../../Desktop/tame_impala.mp3';

export default function App() {
  const [song, setSong] = useState({ 
    file: new Audio(audioFile),
    fileName: audioFile.split('/').pop(),
    prettyName: audioFile.split('/').pop().split('.').shift().replace('_', ' ').toUpperCase(),
    duration: null,
    currentTime: null,
    isPlaying: false
  });

  const playPauseClick = () => {
    if (song) {
      setSong({...song, isPlaying: !song.isPlaying});
      if (song.isPlaying) {
        song.file.pause();
      } else {
        song.file.play();
      };
    };
  };

  // SET song.duration
  useEffect(() => {
    const audio = song.file;
    
    // When the audio metadata is loaded, set the duration
    const handleLoadedMetadata = () => {
      setSong({...song, duration: audio.duration, currentTime: 0});
    };

    // Attach the event listener for when metadata is loaded
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Cleanup the event listener when the component unmounts
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [song.file]);

  

  return (
    <>
      {/* <input type="file" id='audio-file' />
      <label for="audio-file">Select Audio File</label> */}

      {song.file &&
        <>
          <h3>{song.prettyName}</h3>
          <h4>{song.currentTime}/{song.duration}</h4>
        </>
      }
      <button id='play-pause' onClick={playPauseClick}>{song.isPlaying ? 'Pause' : 'Play'}</button>
    </>
  )
};