import { useState, useEffect, useRef } from 'react'
import './App.css'

import AudioPlayer from './AudioPlayer';


export default function App() {
  const audioFile = '/tame_impala.mp3';
  const audioRef = useRef(new Audio(audioFile));
  const [song, setSong] = useState({ 
    fileName: audioFile?.split('/').pop(),
    prettyName: audioFile?.split('/').pop().split('.').shift().replace('_', ' ').toUpperCase(),
    duration: null,
    currentTime: null,
    isPlaying: false
  });

  // SET song.duration
  useEffect(() => {
    const audio = audioRef?.current;
    
    // When the audio metadata is loaded, set the duration
    const handleLoadedMetadata = () => {
      setSong((prevState) => ({
        ...prevState,
        duration: audio?.duration,
        currentTime: 0
      }));
    };

    // Attach the event listener for when metadata is loaded
    audio?.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Cleanup the event listener when the component unmounts
    return () => {
      audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);


  // UPDATE song.currentTime
  useEffect(() => {
    const audio = audioRef?.current;

    // Set up an event listener to track currentTime during playback
    const handleTimeUpdate = () => {
      setSong((prevState) => ({
        ...prevState,
        currentTime: audio.currentTime, // Update currentTime while audio plays
      }));
    };

    // Attach event listener for when currentTime is changing
    audio?.addEventListener('timeupdate', handleTimeUpdate);

    // Cleanup event listener on component unmount
    return () => {
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioRef?.current]);

  

  return (
    <>
      <main id='audio-player-container'>
        <AudioPlayer audioFile={audioRef?.current} song={song} setSong={setSong} />
      </main>
    </>
  )
};