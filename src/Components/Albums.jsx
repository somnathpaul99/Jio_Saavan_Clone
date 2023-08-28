import { useEffect, useContext, useState, memo, useMemo } from "react";
import { AllSongAlbumContext } from "../App";
import NavBar from "./NavBar";
import Player from "./Player";
import "../Styles/Albums.css";
import { json } from "react-router-dom";

const OptimizedNavBar = memo(NavBar);
const OptimizedPlayer = memo(Player);

const AlbumCard = ({ song, onClick }) => {
  return (
    <div className="album-card" onClick={onClick}>
      <img className="album-card-img" src={song?.thumbnail} alt={song?.title} />
      <div className="album-card-title">{song?.title}</div>
    </div>
  );
};

function Albums() {
  const projectId = "dlzsedvtpspr";

  //Getting all satate and function from App file
  const { albumsId, setCurrentSong } = useContext(AllSongAlbumContext);
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("albumsId", albumsId);
  console.log("albumData", albumData);

  //fetching all data of albums by ID
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching new data

    // const albumId = localStorage.getItem("albumId");
    // console.log("fetchId", albumId);
    if (albumsId) {
      console.log("fetchIDcontext", albumsId);

      fetch(
        `https://academics.newtonschool.co/api/v1/music/album/${albumsId}`,
        {
          headers: {
            projectId: projectId,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response Data:", data);
          setAlbumData(data.data || []);
          localStorage.setItem("albumsDataStore", JSON.stringify(data.data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after API call completes
        });
    }
  }, [albumsId]);

  useEffect(() => {
    const albumData = localStorage.getItem("albumsDataStore");

    if (albumData) {
      console.log("From Local Storage", JSON.parse(albumData));
      setAlbumData(JSON.parse(albumData));
    }
  }, []);

  const memoizedAlbumData = useMemo(() => albumData, [albumData]);

  //showing Loading until getting data
  if (!albumData) {
    return <div className="loading">Loading...</div>;
  }

  // //if no data available on albums then showing this
  // if (!albumData.songs || !Array.isArray(albumData.songs)) {
  //   return <div>No songs available.</div>;
  // }

  if (!memoizedAlbumData?.songs || !Array.isArray(memoizedAlbumData?.songs)) {
    return <div>No songs available.</div>;
  }
  return (
    <>
      <div className="navBar-album">
        <OptimizedNavBar />
      </div>
      <div className="album-container">
        <div className="left-side-album">
          <div className="album-img-conatiner">
            <img className="album-img" src={albumData?.image} alt="" />
          </div>
          <div className="album-title-artist">
            <div className="album-title">{albumData?.title}</div>
            <div className="album-artist">
              {albumData &&
                Object.keys(albumData).length > 0 &&
                albumData?.artists &&
                albumData?.artists.length > 0 &&
                albumData?.artists?.map((artist, index) => (
                  <div key={index}>{artist?.name}</div>
                ))}
            </div>
          </div>
        </div>
        <div className="right-side-album">
          {albumData?.songs?.map((song, idx) => (
            <AlbumCard
              key={idx}
              onClick={() => {
                setCurrentSong(song);
              }}
              song={song}
            />
          ))}
        </div>
      </div>

      <div className="player-album">
        <OptimizedPlayer />
      </div>
    </>
  );
}

export default Albums;
