import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import MainFeed from "./MainFeed";
import Player from "./Player";
import "../Styles/JioSaavan.css";

function JioSaavan() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="sideBar-feed">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="feed">
          <MainFeed />
        </div>
      </div>
      <div>
        <Player />
      </div>
    </>
  );
}

export default JioSaavan;
