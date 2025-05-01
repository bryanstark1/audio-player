import { useEffect } from 'react';
import DurationSlider from './DurationSlider';

export default function AudioPlayer({ song, setSong }) {

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

  useEffect(() => {
    if (song.currentTime === song.duration) setSong({...song, isPlaying: false});
  }, [song.currentTime]);
  

  return (
    <>
      <div id="audio-player">
        {/* <input type="file" id='audio-file' />
        <label for="audio-file">Select Audio File</label> */}

        {song.file &&
          <>
            <h3>{song.prettyName}</h3>
            <DurationSlider song={song} setSong={setSong} duration={song.duration} currentTime={song.currentTime} />
            <h4>{parseInt(song.currentTime)} / {parseInt(song.duration)}</h4>
          </>
        }
        <button id='play-pause' onClick={playPauseClick}>{song.isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </>
  );
};