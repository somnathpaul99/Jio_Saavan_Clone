import { useState, useContext, useRef, useEffect } from "react";
import "../Styles/PlayingMusic.css";
import { AllSongAlbumContext } from "../App";

function PlayingMusic() {
  const { currentSong, isPlaying, setIsPlaying, duration, setDuration } =
    useContext(AllSongAlbumContext);
  console.log("CurrentsongPlaying", currentSong);

  if (!currentSong) {
    return null;
  }

  // const [duration, setDuration] = useState(0);
  // console.log("duration", duration);

  const audioPlayer = useRef();

  useEffect(() => {
    changePlayPause();
    findDuration();
  }, [isPlaying]);

  const changePlayPause = () => {
    // setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  const findDuration = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
  };

  return (
    <>
      <audio src={currentSong.audio_url} ref={audioPlayer} />
      <div className="playing-container">
        <div>
          <img
            className="img-playing-song"
            src={currentSong.thumbnail}
            alt="player image"
          />
        </div>
        <div>
          <div className="playing-title">{currentSong.title}</div>
          <div className="playing-artist">
            {(currentSong.artist[0]?.name ? currentSong.artist[0]?.name : "") +
              (currentSong.artist[1]?.name
                ? ", " + currentSong.artist[1]?.name
                : "")}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayingMusic;
