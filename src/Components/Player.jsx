import "../Styles/Player.css";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { AiTwotoneSound } from "react-icons/ai";
import { MdOutlineOpenInFull } from "react-icons/md";

function Player() {
  return (
    <div className="player">
      <div className="player-icons-parent">
        <div>
          <img
            className="player-img"
            src="https://newton-project-resume-backend.s3.amazonaws.com/thumbnail/64cf909147ae38c3e33a1a30.jpg"
            alt=""
          />
        </div>
        <div className="player-icons">
          <div className="player-icon">
            <IoPlaySkipBack />
          </div>
          <div className="player-icon">
            <IoPlay />
          </div>
          <div className="player-icon">
            <IoPlaySkipForward />
          </div>
        </div>
        <div className="player-icons">
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
