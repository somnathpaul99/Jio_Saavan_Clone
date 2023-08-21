import "./App.css";
import JioSaavan from "./Components/JioSaavan";
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Albums from "./Components/Albums";
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
  console.log("AppFilteredSongs", filteredSongs);
  console.log("CurrentSong", currentSong);
  // console.log("albums", albums);
  console.log("songs", songs);
  // console.log("AlbumsIDApp", albumsId);

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
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JioSaavan />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/filter-songs" element={<FilteredSongs />} />
            {/* <Route path="*" element={<Errror />} /> */}
          </Routes>
        </BrowserRouter>
      </AllSongAlbumContext.Provider>
    </>
  );
}

export default App;
