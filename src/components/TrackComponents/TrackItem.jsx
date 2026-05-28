import React from "react";
import classes from "./TrackItem.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TrackItem({ title, icon, id }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={classes.trackItem}>
      <Link to={`/track/${id}`}>
        <div className={classes.trackInfo}>
          <img src={icon} alt="Track" className={classes.trackIcon} />
          <p className={classes.trackTitle}>{title}</p>
        </div>
      </Link>
      <div className={classes.trackActions}>
        <button className={classes.playButton}>
          <i className="fas fa-play"></i> {/* Или используйте SVG иконку */}
        </button>
        <button className={classes.menuButton} onclick={() => setOpen(!isOpen)}>
          <i className="fas fa-ellipsis-v"></i> {/* Меню действий */}
        </button>
      </div>
    </div>
  );
}
