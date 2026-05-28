import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./AlbumView.module.css";
import track_pic from "../../assets/images/track_pic.png";
import track_bg from "../../assets/images/track_bg.png";
import TrackItem from "../../components/TrackComponents/TrackItem";
import ControlPanel from "../../components/ControlPanel/ContolPanel";
import plus_circle from "../../assets/images/Plus_circle.png";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import Loading from "../../components/Loading/Loading";
import MainButton from "../../components/Header/MainButton/MainButton";
import TrackCover from "../../components/TrackComponents/TrackCover";

const BASE_URL = "https://sonic-boom.ru";

const API = (url) => {
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((response) => {
      let json = null;
      if (response.ok) {
        let json = response.json();
        if (typeof json === "object" && json !== null) return json;
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }
      return json;
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
    });
};

export default function AlbumView({ user }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Треки");
  const [artist, setArtist] = useState({});
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (true) {
      API(`https://sonic-boom.ru/api/albums/${id}/songs/?format=json`).then(
        (data) => setSongs(data ? data : [])
      );
      API(`https://sonic-boom.ru/api/albums/${id}/?format=json`).then((data) =>
        setAlbum(data ? data : {})
      );
    }
  }, []);
  useEffect(() => {
    API(`https://sonic-boom.ru/api/artists/${album.artist}/?format=json`).then(
      (data) => setArtist(data ? data : {})
    );
    setIsLoading(false);
  }, [album]);

  const buttonLabels = ["Треки", "Описание", "Исполнитель"];
  const buttonConfig = {
    Редактировать: {
      type: "Link",
      path: `/album-edit/${id}`,
    },
    Удалить: {
      type: "WindowOnDeleteFunc",
      title: "Вы уверены что хотите удалить альбом?",
      func: () => {
        fetch(`https://sonic-boom.ru/api/albums/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              navigate("/");
              // setPlaylists(playlistsList.filter((p) => p.id != currentPlaylist));
              // ShowModal();
              // setCurrentPlaylist(null);
            } else {
              console.log(response.status);
            }
          })
          .then((response) => response.json())
          .then((resp_data) => console.log(resp_data))
          .catch((error) => console.log(error));
      },
    },
  };

  // Функция для рендеринга контента на основе активной вкладки
  const renderTabContent = () => {
    switch (activeTab) {
      case "Треки":
        return (
          <ContentBlock>
            {songs.length === 0 ? (
              <p>Нет треков</p>
            ) : (
              songs.map((track, index) => (
                <TrackItem
                  key={track.id}
                  icon={BASE_URL + track.picture}
                  title={track.name}
                  user={user}
                  id={track.id}
                />
              ))
            )}
          </ContentBlock>
        );
      case "Описание":
        return (
          <ContentBlock>
            <p>{album.description}</p>
          </ContentBlock>
        );
      case "Исполнитель":
        return (
          <ContentBlock>
            <Link to={`/artist/${artist.id}`}>
              <p>{artist.name}</p>
            </Link>
          </ContentBlock>
        );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes["app"]}>
      <main className={classes["main-content"]}>
        <TrackCover
          trackTitle={album.title}
          trackCover={BASE_URL + album.picture}
        ></TrackCover>
        {/* Tabs */}
        <ControlPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          buttonLabels={buttonLabels}
          Icon={plus_circle}
          user={user}
          buttonConfig={buttonConfig}
        ></ControlPanel>

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
}
