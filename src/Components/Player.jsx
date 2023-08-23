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
import CurrentPlayingSong from "./CurrentPlayingSong";
// import { audioPlayer } from "./PlayingMusic";

function Player() {
  const { currentSong, isPlaying, setIsPlaying, duration } =
    useContext(AllSongAlbumContext);
  const [currentTime, setCurrenttime] = useState(0);
  const [isOpenInFull, setIsOpenInFull] = useState(false);
  console.log("OpenISFull", isOpenInFull);
  // const [isPlaying, setIsPlaying] = useState(false);
  // console.log("currentSong ", currentSong);

  const progressBar = useRef();

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const handleProgress = () => {
    // audioPlayer.current.currentTime = progressBar.current.value;
    // changeCurrentTime();
  };

  // const changeCurrentTime = () => {
  //   progressBar.current.style.setProperty(
  //     "--played-width",
  //     `${(progressBar.current.value / duration) * 100}%`
  //   );

  //   setCurrenttime(progressBar.current.value);
  // };

  const handleOpenInFull = () => {
    setIsOpenInFull(!isOpenInFull);
  };

  return (
    <>
      {currentSong && Object.keys(currentSong).length > 0 && (
        <div
          className={
            isOpenInFull ? "big-screen-playing" : "big-screen-playing-down"
          }
        >
          <CurrentPlayingSong
            isPlaying={isPlaying}
            currentSong={currentSong}
            setIsPlaying={setIsPlaying}
          />
        </div>
      )}

      <div className="player">
        <div className="progressBarContainer">
          <input
            type="range"
            className="progressBar"
            ref={progressBar}
            onChange={handleProgress}
            defaultValue="0"
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
            <div className="duration">
              {calculateTime(currentTime)}
              {" / "}
              {duration && !isNaN(duration) && calculateTime(duration)
                ? duration && !isNaN(duration) && calculateTime(duration)
                : "00:00"}
            </div>
            <div className="player-icon">
              <AiTwotoneSound />
            </div>
            <div className="player-icon" onClick={handleOpenInFull}>
              <MdOutlineOpenInFull />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
