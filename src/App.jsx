import "./App.css";
import JioSaavan from "./Components/JioSaavan";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Albums from "./Components/Albums";
import Login from "./Components/Login";
import SignOut from "./Components/SignOut";
import SearchItem from "./Components/SearchItem";
import FilteredSongs from "./Components/FilteredSongs";

export const AllSongAlbumContext = createContext();

function App() {
  const apiUrl = "https://academics.newtonschool.co/api/v1/music/song";
  const albumApiUrl = "https://academics.newtonschool.co/api/v1/music/album";
  const projectId = "dlzsedvtpspr";

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [albumsId, setAlbumsId] = useState("");
  const [currentSong, setCurrentSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [search, setSearch] = useState("");
  const [searchItem, setSearchedItems] = useState([]);
  const [isLogIn, setIsLogIn] = useState(false);
  const [userName, setUserName] = useState("");
  // console.log("AppFilteredSongs", filteredSongs);
  // console.log("CurrentSong", currentSong);
  // console.log("albums", albums);
  // console.log("songs", songs);
  // console.log("AlbumsIDApp", albumsId);
  console.log("islogInApp", isLogIn);

  useEffect(() => {
    const storedLogin = localStorage.getItem("login");

    if (storedLogin) {
      setIsLogIn(storedLogin);
    }
  }, []);

  useEffect(() => {
    const storedLogin = localStorage.getItem("username");

    if (storedLogin) {
      setUserName(storedLogin);
    }
  }, []);

  useEffect(() => {
    fetchData1();
  }, []);

  useEffect(() => {
    fetchData2();
  }, []);

  const fetchData1 = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          projectId: projectId,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setSongs(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await fetch(albumApiUrl, {
        headers: {
          projectId: projectId,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setAlbums(jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <AllSongAlbumContext.Provider
        value={{
          songs,
          setSongs,
          albums,
          setAlbums,
          currentSong,
          setCurrentSong,
          isPlaying,
          setIsPlaying,
          duration,
          setDuration,
          albumsId,
          setAlbumsId,
          filteredSongs,
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
          setUserName,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JioSaavan />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/filter-songs" element={<FilteredSongs />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-out" element={<SignOut />} />
            <Route path="/search" element={<SearchItem />} />
            {/* <Route
              path="/current-song-playing"
              element={<CurrentPlayingSong />}
            /> */}
            {/* <Route path="*" element={<Errror />} /> */}
          </Routes>
        </BrowserRouter>
      </AllSongAlbumContext.Provider>
    </>
  );
}

export default App;
