import classes from "./PlaylistList.module.css";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import HeaderClasses from "../..//Header/Header.module.css";
import ModalWindow from "../../ModalWindow/ModalWindow";
import ModalClasses from "../../ModalWindow/ModalWindow.module.css";
import MainButton from "../../Header/MainButton/MainButton";
import ActionsBlock from "../../ModalWindow/ActionsBlock/ActionsBlock";
import { Link } from "react-router-dom";

import { useState } from "react";

export default function PlaylistList({ playlists }) {
  const [playlistsList, setPlaylists] = useState(playlists);
  const [isOpenModal, setIsOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const CurrentPlaylist = (playlistId) => setCurrentPlaylist(playlistId);
  const ShowModal = () => setIsOpen(!isOpenModal);

  function deletePlaylist() {
    console.log(currentPlaylist);
    if (currentPlaylist) {
      fetch(`https://sonic-boom.ru/api/playlists/${currentPlaylist}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200) {
            setPlaylists(playlistsList.filter((p) => p.id != currentPlaylist));
            ShowModal();
            setCurrentPlaylist(null);
          } else {
            alert(response.status);
          }
        })
        .then((response) => response.json())
        .then((resp_data) => console.log(resp_data))
        .catch((error) => console.log(error));
    }
  }

  if (playlistsList.length == 0) {
    return (
      <div style={{ margin: "20px" }}>
        <h3>Создайте свой первый плейлист</h3>
      </div>
    );
  }
  return (
    <>
      <div className={classes.list}>
        {playlistsList.map((playlist) => (
          <PlaylistItem
            playlist={playlist}
            key={playlist.id}
            setCurrentPlaylist={CurrentPlaylist}
            setIsOpenModal={ShowModal}
          />
        ))}
        <ModalWindow isOpen={isOpenModal} setIsOpen={setIsOpen}>
          <h3 style={{ textAlign: "center" }}>
            Вы уверены что хотите удалить плейлист?
          </h3>
          <ActionsBlock>
            <MainButton
              className={`${HeaderClasses["logout-btn"]} ${ModalClasses.danger_button}`}
              onClick={deletePlaylist}
            >
              Удалить
            </MainButton>
            <MainButton
              className={`${ModalClasses.white_button}`}
              onClick={ShowModal}
            >
              Отмена
            </MainButton>
          </ActionsBlock>
        </ModalWindow>
      </div>
    </>
  );
}
