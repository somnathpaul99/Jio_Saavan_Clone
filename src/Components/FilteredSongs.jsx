import NavBar from "./NavBar";
import Player from "./Player";
import SideBar from "./SideBar";
import { useContext } from "react";
import { AllSongAlbumContext } from "../App";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Styles/FilteredSongs.css";

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
    items: 8,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

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
  const { filteredSongs, setCurrentSong } = useContext(AllSongAlbumContext);
  const generateCarouselForSongs = (startIndex, endIndex) => (
    <Carousel responsive={responsive}>
      {filteredSongs.slice(startIndex, endIndex).map((song) => (
        <Card
          onClick={() => {
            setCurrentSong(song);
            setDuration("0:0");
          }}
          key={song._id}
          title={song.title}
          artist={
            (song.artist[0]?.name ? song.artist[0]?.name : "") +
            (song.artist[1]?.name ? ", " + song.artist[1]?.name : "")
          }
          thumbnail={song.thumbnail}
        />
      ))}
    </Carousel>
  );
  return (
    <div className="filter-container">
      <div>
        <NavBar />
      </div>
      <div>{/* <SideBar /> */}</div>
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
