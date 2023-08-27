import { useEffect, useContext, useState } from "react";
import { AllSongAlbumContext } from "../App";
import NavBar from "./NavBar";
import Player from "./Player";
import "../Styles/Albums.css";

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
  const [newAlbumId, setNewAlbumId] = useState("");

  //fetching all data of albums by ID
  useEffect(() => {
    setLoading(true); // Set loading to true before fetching new data

    const albumId = localStorage.getItem("albumId");

    if (albumId) {
      setNewAlbumId(albumId);
    }

    fetch(
      `https://academics.newtonschool.co/api/v1/music/album/${
        albumId || newAlbumId
      }`,
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call completes
      });
  }, []);

  //showing Loading until getting data
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  //if no data available on albums then showing this
  if (!albumData.songs || !Array.isArray(albumData.songs)) {
    return <div>No songs available.</div>;
  }
  return (
    <>
      <div className="navBar-album">
        <NavBar />
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
        <Player />
      </div>
    </>
  );
}

export default Albums;
