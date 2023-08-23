import React, { useState, useContext, useEffect, useRef } from "react";
import "../Styles/NavBar.css";
import { BsChevronDown } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AllSongAlbumContext } from "../App";

function NavBar() {
  const {
    songs,
    setFilteredSongs,
    selectedMood,
    setSelectedMood,
    search,
    setSearch,
    searchItem,
    setSearchedItems,
    isLogIn,
  } = useContext(AllSongAlbumContext);

  console.log("isLogIn", isLogIn);

  const searchInputRef = useRef(null);

  const navigate = useNavigate();

  const [loginUser, setLoginUser] = useState([]);
  console.log("userName", loginUser);

  useEffect(() => {
    const storedLogin = localStorage.getItem("username");
    // console.log("Stored login data:", storedLogin);

    if (storedLogin) {
      setLoginUser(storedLogin);
    }
  }, []);

  useEffect(() => {
    searchInputRef.current.focus();
    if (!search) {
      // navigate("/");
      return;
    }

    const filteredItems = songs.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    // console.log(filteredItems);
    setSearchedItems(filteredItems);
    navigate("/search");
  }, [search]);

  const handleMoodChange = (event) => {
    const newMood = event.target.value;
    setSelectedMood(newMood);
    navigate("/filter-songs");
  };

  const handleNavLogo = () => {
    navigate("/");
  };

  const handleLogIn = () => {
    navigate("/log-in");
  };

  const handleSignOut = () => {
    navigate("/sign-out");
  };

  return (
    <div className="NavBar">
      <div className="leftNav">
        <div className="Saavan-logo" onClick={handleNavLogo}>
          <img className="logo" src="./logo.png" alt="Jio Saavan Logo" />
        </div>

        <div className="music hov">Music</div>

        <div className="podcasts hov">Podcasts</div>

        <div className="goPro hov">Go Pro</div>
      </div>

      <div className="searchBox">
        <div className="search-icon">
          {" "}
          {/* <button onClick={handleSearch}> */}
          <GoSearch />
          {/* </button> */}
        </div>

        <input
          type="text"
          value={search}
          ref={searchInputRef}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
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
            value={selectedMood}
            onChange={handleMoodChange}
            className="select-nav"
            // onClick={fetchSongsByMood}
          >
            <option value="" className="languages">
              Select Mood
            </option>
            <option value="sad">Sad</option>
            <option value="excited">Excited</option>
            <option value="romantic">Romantic</option>
          </select>
        </div>

        <div onClick={handleLogIn} className="logIn hov">
          Log In
        </div>

        <div onClick={handleSignOut} className="signOut hov">
          Sign Out
        </div>
        {/* <div>
  {loginUser.length === 0 ? (
    <div>
      <div onClick={handleLogIn} className="logIn hov">
        Log In
      </div>
      <div onClick={handleSignOut} className="signOut hov">
        Sign Out
      </div>
    </div>
  ) : (
    "Sp"
  )}
</div> */}
      </div>
    </div>
  );
}

export default NavBar;
