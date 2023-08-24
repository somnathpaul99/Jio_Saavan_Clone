import React, { useState, useContext, useEffect, useRef } from "react";
import "../Styles/NavBar.css";
import { BsChevronDown } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AllSongAlbumContext } from "../App";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//from MUI
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

//from MUI
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      // bgcolor: "#EF6262",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

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
    setIsLogIn,
    userName,
  } = useContext(AllSongAlbumContext);
  const [logToggle, setLogToggle] = useState(false);

  console.log("isLogIn", isLogIn);
  // console.log("isLogIn2", isLogIn);
  console.log("usernameagain", userName);

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

  const handleLogOut = () => {
    localStorage.clear();
    setIsLogIn(false);
    setLogToggle(!logToggle);
    navigate("/");
    toast.success("You are logged Out", {
      position: "top-center",
    });
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
          <GoSearch />
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
          <select
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

        <div className="avatar-container">
          {isLogIn ? ( // Checking if the user is logged in
            <div className="nav-avatar logIn">
              <div className="avatar">
                <Avatar {...(userName ? stringAvatar(userName) : {})} />
              </div>
              <div onClick={handleLogOut} className="log-out hov">
                Log Out
              </div>
            </div>
          ) : (
            <div className="nav-log-in">
              <div onClick={handleLogIn} className=" hov">
                Log In
              </div>
              <div onClick={handleSignOut} className="signOut hov">
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NavBar;
