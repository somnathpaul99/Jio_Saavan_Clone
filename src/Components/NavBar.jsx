import React, { useState, useContext, useEffect, useRef } from "react";
import "../Styles/NavBar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AllSongAlbumContext } from "../App";
import Avatar from "@mui/material/Avatar";
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

//for going to that component which clicked from navBar
const scrollToSection = (ref) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

function NavBar() {
  //Getting all satate and function and ref from App file
  const {
    songs,
    selectedMood,
    setSelectedMood,
    search,
    setSearch,
    setSearchedItems,
    isLogIn,
    setIsLogIn,
    userName,
    topPlaylistsRef,
    podcastsRef,
  } = useContext(AllSongAlbumContext);

  const [logToggle, setLogToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginUser, setLoginUser] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  //checking if user name present in local storage then storing in loginUser
  useEffect(() => {
    const storedLogin = localStorage.getItem("username");
    if (storedLogin) {
      setLoginUser(storedLogin);
    }
  }, []);

  //for Searching
  useEffect(() => {
    //for focusing on Search box
    searchInputRef.current.focus();

    if (!search) {
      return;
    }

    //if any word enter on search box then store that word on state and going to /search route
    const filteredItems = songs.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedItems(filteredItems);
    navigate("/search");
  }, [search]);

  //if select any mood the store that mood on state and going to /filter-songs route
  const handleMoodChange = (event) => {
    const newMood = event.target.value;
    setSelectedMood(newMood);
    navigate("/filter-songs");
  };

  //if click on logo then going to main page
  const handleNavLogo = () => {
    navigate("/");
  };

  //if clicked on Log In the going to /log-in route
  const handleLogIn = () => {
    navigate("/log-in");
  };

  //if clicked on Sign Up the going to /sign-up route
  const handleSignUp = () => {
    navigate("/sign-up");
  };

  //if clicked on Log Out then delete all data from local storage and going to main page
  const handleLogOut = () => {
    localStorage.clear();
    setIsLogIn(false);
    setLogToggle(!logToggle);
    navigate("/");
    setMenuOpen(false);
    toast.success("You are logged Out", {
      position: "top-center",
    });
  };

  //for handle any dead links
  const handleClick = () => {
    navigate("/under-construction");
  };

  // navBar for mobile or tab
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  //showing search box for mobile
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      {" "}
      <div className="NavBar">
        <div className="leftNav">
          <div className="Saavan-logo" onClick={handleNavLogo}>
            <img className="logo" src="./logo.png" alt="Jio Saavan Logo" />
          </div>

          <div
            onClick={() => scrollToSection(topPlaylistsRef)}
            className="music hov no-tab"
          >
            Music
          </div>

          <div
            onClick={() => scrollToSection(podcastsRef)}
            className="podcasts hov no-tab"
          >
            Podcasts
          </div>

          <div onClick={handleClick} className="goPro hov no-tab">
            Go Pro
          </div>
        </div>
        <div className="show-mobile">
          <div onClick={handleShowSearch} className="search-icon show-mobile">
            {" "}
            <GoSearch />
          </div>

          <div
            className={`${
              showSearch ? " show-mobile search-for-mobile" : "mobile"
            }`}
          >
            <input
              type="text"
              id="searchInput"
              value={search}
              ref={searchInputRef}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>

        <div className="searchBox mobile">
          <div className="search-icon">
            {" "}
            <GoSearch />
          </div>

          <input
            type="text"
            id="searchInput"
            value={search}
            ref={searchInputRef}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>

        <div className="avatar tab">
          {isLogIn ? (
            <Avatar {...(userName ? stringAvatar(userName) : {})} />
          ) : (
            <div className="nav-log-in">
              <div onClick={handleLogIn} className=" hov">
                Log In
              </div>
              <div onClick={handleSignUp} className="signOut hov">
                Sign Up
              </div>
            </div>
          )}
        </div>

        <div onClick={handleMenuOpen} className="hamburger tab">
          <GiHamburgerMenu />
        </div>

        <div className="rightNav no-tab">
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

          <div className="avatar-container no-tab">
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
                <div onClick={handleSignUp} className="signOut hov">
                  Sign Up
                </div>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
      {/* This is for tab and mobile  */}
      <div className="tab">
        <div className={`${menuOpen ? " menu-open-container" : "no-tab"}`}>
          <div
            onClick={() => scrollToSection(topPlaylistsRef)}
            className=" hov "
          >
            Music
          </div>

          <div onClick={() => scrollToSection(podcastsRef)} className=" hov ">
            Podcasts
          </div>

          <div onClick={handleClick} className=" hov ">
            Go Pro
          </div>

          <div className="select-tab">
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
          {isLogIn ? (
            <div onClick={handleLogOut} className=" hov">
              Log Out
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default NavBar;
