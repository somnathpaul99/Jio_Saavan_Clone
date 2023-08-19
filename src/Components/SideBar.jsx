import "../Styles/SideBar.css";
import { GoHistory } from "react-icons/go";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { RiAlbumLine } from "react-icons/ri";
import { MdPodcasts } from "react-icons/md";
import { LiaMicrophoneAltSolid } from "react-icons/lia";

function SideBar() {
  return (
    <div className="sideBar">
      <div className="aside-heading">BROWSE</div>
      <div className="aside-tag">New Releases</div>
      <div className="aside-tag">Top Charts</div>
      <div className="aside-tag">Top Playlists</div>
      <div className="aside-tag">Podcasts</div>
      <div className="aside-tag">Top Artists</div>
      <div className="aside-tag">Radio</div>

      <div className="aside-heading library">LIBRARY</div>
      <div className="aside-tag">
        <GoHistory /> History
      </div>
      <div className="aside-tag">
        <IoMusicalNoteOutline /> Songs
      </div>
      <div className="aside-tag">
        <RiAlbumLine />
        Albums
      </div>
      <div className="aside-tag">
        <MdPodcasts />
        Podcasts
      </div>
      <div className="aside-tag">
        <LiaMicrophoneAltSolid />
        Artists
      </div>
    </div>
  );
}

export default SideBar;
