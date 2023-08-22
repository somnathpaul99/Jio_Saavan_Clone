import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from "react";
import { AllSongAlbumContext } from "../App";
import "../Styles/MainFeed.css";
import { useNavigate } from "react-router-dom";

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

const Card = ({ title, artist, thumbnail, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={thumbnail} alt={title} />
      <div className="card-title">{title}</div>
      <div className="card-artist">{artist}</div>
    </div>
  );
};

function MainFeed() {
  const { songs, albums, setCurrentSong, setDuration, setAlbumsId } =
    useContext(AllSongAlbumContext);
  const navigate = useNavigate();

  const handleAlbumID = (id) => {
    navigate("/albums");
  };

  const generateCarouselForSongs = (startIndex, endIndex) => (
    <Carousel
      // swipeable={false}
      // draggable={false}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={2000}
      slidesToSlide={1}
    >
      {songs.slice(startIndex, endIndex).map((song) => (
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

  const generateCarouselForAlbums = (startIndex, endIndex) => {
    return (
      <Carousel responsive={responsive}>
        {albums.slice(startIndex, endIndex).map((album) => (
          <Card
            onClick={() => {
              handleAlbumID(album._id), setAlbumsId(album._id);
            }}
            key={album._id}
            title={album.title}
            artist={
              (album.artists[0]?.name ? album.artists[0]?.name : "") +
              (album.artists[1]?.name ? ", " + album.artists[1]?.name : "")
            }
            thumbnail={album.image}
          />
        ))}
      </Carousel>
    );
  };

  return (
    <div className="main-feed">
      <div className="trending ">Trending Now</div>
      {generateCarouselForSongs(0, 15)}
      {generateCarouselForSongs(15, 30)}

      <div className="new-release">Top Charts</div>
      {generateCarouselForAlbums(0, 5)}
      {generateCarouselForAlbums(5, 9)}

      <div className="new-release">New Releases</div>
      {generateCarouselForSongs(30, 45)}
      {generateCarouselForSongs(45, 60)}

      <div className="new-release">Albums</div>
      {generateCarouselForAlbums(9, 24)}
      {generateCarouselForAlbums(24, 39)}
      {generateCarouselForAlbums(39, 54)}
      {generateCarouselForAlbums(54, 69)}

      <div className="new-release">Trending Podcasts</div>
      {generateCarouselForSongs(60, 75)}
      {generateCarouselForSongs(75, 90)}
      {generateCarouselForSongs(90, 100)}

      <div className="new-release">Top Playlists </div>
      {generateCarouselForAlbums(69, 84)}
      {generateCarouselForAlbums(84, 100)}
    </div>
  );
}

export default MainFeed;
