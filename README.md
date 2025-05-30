# audio-player

## To-Do
- Fast Forward & Rewind
- Volume Control – Slider or icon-based (mute/unmute)
- Playback Speed Control – Allow users to play at 0.5x, 1x, 1.5x, 2x speeds
- Loop Mode – Loop the track or a specific portion
- Shuffle (for playlists) – Randomize playback order.
- A-B Repeat – Let users loop a specific section of a track
- Add Upload capability
  - Drag & Drop
- Playlists?
- Style


## Key Features

### Slider
- Slider bubble position within slider container is determined by sliderWidth state - a percentage derived from the product of the song's current time and the total song duration
- Does not use onDrag attribute - Uses onMouseDown (& onMouseUp) instead to avoid issues related to adding draggable attribute to html element ("ghost" element floats with cursor on drag)
- onClick attribute on slider container sets off chain of functions:
  - Slider bubble jumps to cursor location in container
  - "Dragging" functionality begins
    - onMouseDown > onMouseMove > onMouseUp