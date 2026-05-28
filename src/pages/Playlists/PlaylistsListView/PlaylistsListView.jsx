import FormButton from "../../../components/Form/FormButton/FormButton";
import PlaylistItem from "../../../components/PlayListComponents/PlaylistItem/PlaylistItem";
import PlaylistList from "../../../components/PlayListComponents/PlaylistList/PlaylistList";
import classes from "./PlaylistsListView.module.css";
import albumCov1 from "../../../assets/images/album_cov1.png";
import albumCov2 from "../../../assets/images/album_cov2.png";
import Loading from "../../../components/Loading/Loading";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import ModalClasses from "../../../components/ModalWindow/ModalWindow.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MainButton from "../../../components/Header/MainButton/MainButton";
import HeaderClasses from "../../../components/Header/Header.module.css";
import ActionsBlock from "../../../components/ModalWindow/ActionsBlock/ActionsBlock";
import { useEffect } from "react";

export default function PlaylistsList(user) {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://sonic-boom.ru/api/playlists/", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        setPlaylists(response_data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.wrapper}>
      <h3>Плейлисты</h3>
      <Link to="/playlist-add">
        <FormButton title="Создать плейлист" style={{ width: "200px" }} />
      </Link>
      <PlaylistList playlists={playlists} />
    </div>
  );
}
