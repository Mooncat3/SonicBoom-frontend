import HeaderClasses from "../../Header/Header.module.css";
import classes from "./PlaylistItem.module.css";
import dots from "../../../assets/images/threeDots.png";
import DropdownMenu from "../../DropdownMenu/DropdownMenu";
import MainButton from "../../Header/MainButton/MainButton";
import { Link } from "react-router-dom";
import { useState } from "react";

const BASE_URL = "https://sonic-boom.ru";

export default function PlaylistItem({
  playlist,
  setCurrentPlaylist,
  setIsOpenModal,
}) {
  const [isOpenNav, setIsOpenNav] = useState(false);

  function showModalOnDelete() {
    setCurrentPlaylist(playlist.id);
    setIsOpenModal();
  }

  const edit_url = "/playlist-edit/" + playlist.id;
  const view_url = "/playlist/" + playlist.id;

  return (
    <div>
      <div className={classes.item}>
        <MainButton to={view_url} title={playlist.title}>
          <div className={classes.picture}>
            <img src={BASE_URL + playlist.picture} />
          </div>
        </MainButton>
        <div className={classes.bottom}>
          <span className={classes.title}>{playlist.title}</span>
          <button
            className={classes.actions_button}
            onClick={() => setIsOpenNav((isOpenNav) => !isOpenNav)}
          >
            <img style={{ width: "5px" }} src={dots} alt="action" />
          </button>
        </div>
      </div>
      <div className={classes["bars-container"]}>
        <DropdownMenu
          isOpen={isOpenNav}
          setIsOpen={setIsOpenNav}
          className={HeaderClasses["header-dropdown-menu"]}
        >
          {
            <>
              <MainButton to={edit_url}>Изменить</MainButton>
              <MainButton onClick={showModalOnDelete}>Удалить</MainButton>
            </>
          }
        </DropdownMenu>
      </div>
    </div>
  );
}
