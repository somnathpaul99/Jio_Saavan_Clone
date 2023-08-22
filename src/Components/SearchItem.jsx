import NavBar from "./NavBar";
import Player from "./Player";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllSongAlbumContext } from "../App";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Styles/SearchItem.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 9,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 9,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 9,
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

function SearchItem() {
  const { search, searchItem, setCurrentSong } =
    useContext(AllSongAlbumContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!search) {
      navigate("/");
    }
  }, [search]);

  const generateCarouselForSongs = (startIndex, endIndex) => (
    <Carousel responsive={responsive}>
      {searchItem.slice(startIndex, endIndex).map((song) => (
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
    <>
      <div>
        <NavBar />
      </div>
      <div className="search-card-container">
        <div className="new-release search-heading">Search Items</div>
        <div className="search-card"> {generateCarouselForSongs(0, 10)}</div>
        <div className="search-card"> {generateCarouselForSongs(10, 20)}</div>
        <div className="search-card"> {generateCarouselForSongs(20, 30)}</div>
        <div className="search-card"> {generateCarouselForSongs(30, 40)}</div>
        <div className="search-card"> {generateCarouselForSongs(40, 50)}</div>
        <div className="search-card"> {generateCarouselForSongs(50, 60)}</div>
        <div className="search-card"> {generateCarouselForSongs(60, 70)}</div>
        <div className="search-card"> {generateCarouselForSongs(70, 80)}</div>
        <div className="search-card"> {generateCarouselForSongs(80, 90)}</div>
        <div className="search-card"> {generateCarouselForSongs(90, 100)}</div>
      </div>
      <div>
        <Player />
      </div>
    </>
  );
}

export default SearchItem;