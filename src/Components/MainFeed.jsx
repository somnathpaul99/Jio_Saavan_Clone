import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import "../Styles/MainFeed.css";

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

function MainFeed() {
  const apiUrl = "https://academics.newtonschool.co/api/v1/music/song";
  const albumApiUrl = "https://academics.newtonschool.co/api/v1/music/album";
  const projectId = "dlzsedvtpspr";
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  console.log("albums", albums);
  console.log("songs", songs);

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

  const generateCarouselForSongs = (startIndex, endIndex) => (
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

  const generateCarouselForAlbums = (startIndex, endIndex) => {
    return (
      <Carousel responsive={responsive}>
        {albums.slice(startIndex, endIndex).map((album) => (
          <Card
            key={album._id}
            title={album.title}
            artist={album.artists[0]?.name}
            thumbnail={album.image}
          />
        ))}
      </Carousel>
    );
  };

  return (
    <div className="main-feed">
      <div className="trending">Trending Now</div>
      {generateCarouselForSongs(0, 15)}
      {generateCarouselForSongs(15, 30)}

      <div className="new-release">Top Charts</div>
      {generateCarouselForAlbums(0, 5)}
      {generateCarouselForAlbums(5, 9)}

      <div className="new-release">New Releases</div>
      {generateCarouselForSongs(30, 45)}
      {generateCarouselForSongs(45, 60)}
    </div>
  );
}

export default MainFeed;
