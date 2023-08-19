import React from "react";
import "../Styles/NavBar.css";
import { BsChevronDown } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

function NavBar() {
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
          <div>
            <div>Music Languages</div>
            <div className="languages">hindi</div>
          </div>
          <div className="lang-icon">
            {" "}
            <BsChevronDown />
          </div>
        </div>

        <div className="logIn hov">Log In</div>

        <div className="signOut hov">Sign Out</div>
      </div>
    </div>
  );
}

export default NavBar;
