import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import track_pic from "../../../assets/images/track_pic.png";
import track_bg from "../../../assets/images/track_bg.png";
import plus_circle from "../../../assets/images/Plus_circle.png";
import TrackCover from "../../../components/TrackComponents/TrackCover";
import TrackItem from "../../../components/TrackComponents/TrackItem";
import ControlPanel from "../../../components/ControlPanel/ContolPanel";
import ContentBlock from "../../../components/ContentBlock/ContentBlock";
import AlbumBlock from "../../../components/AlbumBlock/AlbumBlock";

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

export default function ArtistView({ user }) {
  const { id } = useParams();

  const [artist, setArtist] = useState({});
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [activeTab, setActiveTab] = useState("Треки");

  useEffect(() => {
    if (true) {
      API(`https://sonic-boom.ru/api/artists/${id}/albums/?format=json`).then(
        (data) => {
          const parsed_albums = data.map((album) => ({
            id: album.id,
            title: album.title,
            cover: BASE_URL + album.picture,
            // Если нет изображения, используем изображение по умолчанию
          }));

          setAlbums(parsed_albums);
        }
      );
      API(`https://sonic-boom.ru/api/artists/${id}/tracks/?format=json`).then(
        (data) => setSongs(data ? data : [])
      );
      API(`https://sonic-boom.ru/api/artists/${id}/?format=json`).then((data) =>
        setArtist(data ? data : {})
      );
    }
  }, []);

  const buttonLabels = ["Треки", "Альбомы", "Биография"];
  const buttonConfig = {
    Редактировать: {
      type: "Link",
      path: `/artist-edit/${id}`,
    },
    Удалить: {
      type: "WindowOnDeleteFunc",
      title: "Вы уверены что хотите удалить артиста?",
      func: () => {
        fetch(`https://sonic-boom.ru/api/artists/${id}`, {
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

  const redirect_path = "/artist-add";
  return (
    <div>
      <TrackCover
        trackTitle={artist.name}
        trackCover={BASE_URL + artist.picture}
      ></TrackCover>
      <ControlPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonLabels={buttonLabels}
        Icon={plus_circle}
        user={user}
        buttonConfig={buttonConfig}
      />
      {activeTab === "Треки" && (
        <ContentBlock>
          {!songs || songs.length === 0 ? (
            <p>Нет треков</p>
          ) : songs.map ? (
            songs.map((track, index) => (
              <TrackItem
                key={track.id}
                icon={BASE_URL + track.picture}
                title={track.name}
                user={user}
                id={track.id}
              />
            ))
          ) : null}
        </ContentBlock>
      )}
      {activeTab === "Альбомы" && (
        <AlbumBlock albums={albums.map ? albums : []} />
      )}
      {activeTab === "Биография" && (
        <ContentBlock>
          <p>{artist.biography}</p>
        </ContentBlock>
      )}
    </div>
  );
}
