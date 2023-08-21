import React, { useState, useContext } from "react";
import "../Styles/NavBar.css";
import { BsChevronDown } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AllSongAlbumContext } from "../App";

function NavBar() {
  const { setFilteredSongs } = useContext(AllSongAlbumContext);
  const [selectedMood, setSelectedMood] = useState("");
  const projectId = "dlzsedvtpspr";

  const navigate = useNavigate();

  const fetchSongsByMood = () => {
    if (selectedMood) {
      fetch(
        `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${selectedMood}"}`,
        {
          headers: {
            projectId: projectId,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("filteredData", data);
          setFilteredSongs(data.data);
        })
        .catch((error) => {
          console.error("Error fetching songs:", error);
        });
    }
  };

  const handleMoodChange = (event) => {
    const newMood = event.target.value;
    setSelectedMood(newMood);
    navigate("/filter-songs");
  };

  return (
    <div className="NavBar">
      <div className="leftNav">
        <div className="Saavan-logo">
          <img className="logo" src="./logo.png" alt="Jio Saavan Logo" />
        </div>

        <div className="music hov">Music</div>

        <div className="podcasts hov">Podcasts</div>

        <div className="goPro hov">Go Pro</div>
      </div>

      <div className="searchBox">
        <div className="search-icon">
          {" "}
          <GoSearch />
        </div>

        <input type="text" placeholder="Search" />
      </div>

      <div className="rightNav">
        <div className="language">
          {/* <div>
            <div>Music Languages</div>
            <div className="languages">hindi</div>
          </div>
          <div className="lang-icon">
            {" "}
            <BsChevronDown />
          </div> */}
          <select
            onClick={fetchSongsByMood}
            value={selectedMood}
            onChange={handleMoodChange}
            className="select-nav"
          >
            <option value="" className="languages">
              Select Mood
            </option>
            <option value="sad">Sad</option>
            <option value="excited">Excited</option>
            <option value="romantic">Romantic</option>
          </select>
        </div>

        <div className="logIn hov">Log In</div>

        <div className="signOut hov">Sign Out</div>
      </div>
    </div>
  );
}

export default NavBar;
