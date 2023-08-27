import NavBar from "./NavBar";
import Player from "./Player";
import { useContext, useState, useEffect } from "react";
import { AllSongAlbumContext } from "../App";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Styles/FilteredSongs.css";

//from multi-carousel library
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 9,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

//for all cards details
const Card = ({ title, artist, thumbnail, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={thumbnail} alt={title} />
      <div className="card-title">{title}</div>
      <div className="card-artist">{artist}</div>
    </div>
  );
};

function FilteredSongs() {
  const projectId = "dlzsedvtpspr";
  //getting state and function from App file
  const { setCurrentSong, selectedMood } = useContext(AllSongAlbumContext);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [mood, setMood] = useState(localStorage.getItem("mood"));
  const [loading, setLoading] = useState(true);

  //fetching data which is selected in navBar by mood option
  useEffect(() => {
    setLoading(true);

    fetch(
      `https://academics.newtonschool.co/api/v1/music/song?filter={"mood":"${
        selectedMood || mood
      }"}`,
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
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call completes
      });
  }, [selectedMood, mood, projectId]);

  //showing Loading until getting data
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  //creating this generateCarouselForSongs for showing card by choice like 10 to 20 card from Songs array
  const generateCarouselForSongs = (startIndex, endIndex) => {
    if (!filteredSongs || filteredSongs.length === 0) {
      return null;
    }

    return (
      <Carousel responsive={responsive}>
        {filteredSongs.slice(startIndex, endIndex).map((song) => (
          <Card
            onClick={() => {
              setCurrentSong(song);
            }}
            key={song?._id}
            title={song?.title}
            artist={
              (song?.artist[0]?.name ? song?.artist[0]?.name : "") +
              (song?.artist[1]?.name ? ", " + song?.artist[1]?.name : "")
            }
            thumbnail={song?.thumbnail}
          />
        ))}
      </Carousel>
    );
  };
  return (
    <div className="filter-container">
      <div>
        <NavBar />
      </div>
      <div>
        <div className="mod ">Music You Choose</div>
        <div className="mod-card">
          {generateCarouselForSongs(0, 15)}
          {generateCarouselForSongs(15, 30)}
          {generateCarouselForSongs(30, 45)}
          {generateCarouselForSongs(45, 60)}
          {generateCarouselForSongs(60, 75)}
          {generateCarouselForSongs(75, 90)}
          {generateCarouselForSongs(90, 100)}
        </div>
      </div>
      <div>
        <Player />
      </div>
    </div>
  );
}

export default FilteredSongs;
