import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from "react";
import { AllSongAlbumContext } from "../App";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 7,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const Card = ({ title, artist, thumbnail }) => {
  return (
    <div className="card">
      <img className="card-img" src={thumbnail} alt={title} />
      <div className="card-title">{title}</div>
      <div className="card-artist">{artist}</div>
    </div>
  );
};

export function GenerateCarouselForSongs(startIndex, endIndex) {
  const { songs } = useContext(AllSongAlbumContext);
  return (
    <Carousel responsive={responsive}>
      {songs.slice(startIndex, endIndex).map((song) => (
        <Card
          key={song._id}
          title={song.title}
          artist={song.artist[0]?.name}
          thumbnail={song.thumbnail}
        />
      ))}
    </Carousel>
  );
}
