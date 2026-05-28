import React from "react";
import classes from "./TrackCover.module.css";

const TrackCover = ({ trackTitle, trackCover }) => {
  return (
    <div className={classes["track-header"]}>
      <img src={trackCover} alt="Pic" className={classes["track-image-blur"]} />
      <img src={trackCover} alt="Pic" className={classes["track-image"]} />

      <h1 className={classes["track-title"]}>{trackTitle}</h1>
    </div>
  );
};

export default TrackCover;
