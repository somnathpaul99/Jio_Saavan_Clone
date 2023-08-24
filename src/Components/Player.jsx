import "../Styles/Player.css";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { AiTwotoneSound } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";
import { HiPause } from "react-icons/hi";
import { useState, useContext, useRef, useEffect } from "react";
import PlayingMusic from "./PlayingMusic";
import { AllSongAlbumContext } from "../App";
import CurrentPlayingSong from "./CurrentPlayingSong";

function Player() {
  const { currentSong, isPlaying, setIsPlaying, duration, setDuration } =
    useContext(AllSongAlbumContext);
  const [isOpenInFull, setIsOpenInFull] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [volume, setVolume] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }
    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _currentTime = Math.floor(audioPlayer?.current?.currentTime);

        setDuration(_duration);
        setCurrentTime(_currentTime);
      }, 100);
    }
  }, [volume, isPlaying]);

  const changePlayPause = () => {
    if (isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    changePlayPause();
  };

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return "00:00";
  }

  const halhleChangeTrack = (type) => {};

  const handleVolume = () => {
    setIsVolume(!isVolume);
  };

  const handleOpenInFull = () => {
    setIsOpenInFull(!isOpenInFull);
  };

  return (
    <>
      <audio src={currentSong.audio_url} ref={audioPlayer} />
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
            value={currentTime}
            max={duration}
            onChange={(e) => setCurrentTime(e.target.value)}
          />
        </div>
        <div className="player-icons-parent">
          <div className="player-img">
            {currentSong && Object.keys(currentSong).length > 0 && (
              <PlayingMusic />
            )}
          </div>
          <div className="player-icons">
            <div
              className="player-icon"
              onClick={() => halhleChangeTrack("prev")}
            >
              <IoPlaySkipBack />
            </div>
            <div className="player-icon" onClick={handlePlay}>
              {isPlaying ? <IoPlay /> : <HiPause />}
            </div>
            <div
              className="player-icon"
              onClick={() => halhleChangeTrack("next")}
            >
              <IoPlaySkipForward />
            </div>
          </div>
          <div className="player-icons">
            <div className="duration">
              {formatTime(currentTime)}
              {" / "}
              {formatTime(duration)}
            </div>
            <div className="player-icon volume">
              <input
                className={isVolume ? "volume-control" : "volume-control-none"}
                type="range"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                max={100}
              />
              <div onClick={handleVolume}>
                {" "}
                <AiTwotoneSound />
              </div>
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
