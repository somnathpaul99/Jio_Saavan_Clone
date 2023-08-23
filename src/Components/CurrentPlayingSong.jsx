import "../Styles/CurrentPlayingSong.css";

function CurrentPlayingSong({ isPlaying, currentSong, setIsPlaying }) {
  const handlePlaySong = () => {
    // console.log("click");
    if (isPlaying === false) {
      setIsPlaying(true);
      //   console.log("checking", isPlaying);
    }
  };
  return (
    <>
      <div className="current-box-container">
        <div className="upper-details">
          <div className="left-side-current">
            {" "}
            <img className="current-img" src={currentSong.thumbnail} alt="" />
          </div>
          <div className="right-side-current">
            <div className="current-heading">{currentSong.title}</div>
            <div className="rel-date">
              Released on {currentSong.dateOfRelease.slice(0, 10)}
            </div>
            <button onClick={handlePlaySong} className="play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="lower-details">
          <div className="singer-heading">Singers</div>
          <div className="singers">
            {currentSong &&
              Object.keys(currentSong).length > 0 &&
              currentSong.artist &&
              currentSong.artist.length > 0 &&
              currentSong.artist.map((singer, index) => (
                <div key={index}>{singer.name}</div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentPlayingSong;
