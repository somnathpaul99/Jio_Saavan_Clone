import "../Styles/Player.css";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { AiTwotoneSound } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";
import { HiPause } from "react-icons/hi";
import { useState, useContext, useRef } from "react";
import PlayingMusic from "./PlayingMusic";
import { AllSongAlbumContext } from "../App";

function Player() {
  const { currentSong, isPlaying, setIsPlaying } =
    useContext(AllSongAlbumContext);
  // const [isPlaying, setIsPlaying] = useState(false);
  // console.log("currentSong ", currentSong);

  const progressBar = useRef();

  const handleProgress = () => {};

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      <div className="progressBarContainer">
        <input
          type="range"
          className="progressBar"
          ref={progressBar}
          onChange={handleProgress}
        />
      </div>
      <div className="player-icons-parent">
        <div className="player-img">
          {currentSong && Object.keys(currentSong).length > 0 && (
            <PlayingMusic />
          )}
        </div>
        <div className="player-icons">
          <div className="player-icon">
            <IoPlaySkipBack />
          </div>
          <div className="player-icon" onClick={handlePlay}>
            {isPlaying ? <HiPause /> : <IoPlay />}
          </div>
          <div className="player-icon">
            <IoPlaySkipForward />
          </div>
        </div>
        <div className="player-icons">
          <div className="duration">0.0/2.4</div>
          <div className="player-icon">
            <AiTwotoneSound />
          </div>
          <div className="player-icon">
            <MdOutlineOpenInFull />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
