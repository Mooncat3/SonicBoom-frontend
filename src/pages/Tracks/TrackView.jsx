import { useState } from "react"; // Используем модули CSS для стилей
import { useParams, useNavigate } from "react-router-dom";
import track_pic from "../../assets/images/track_pic.png";
import track_bg from "../../assets/images/track_bg.png";
import plus_circle from "../../assets/images/Plus_circle.png";
import TrackCover from "../../components/TrackComponents/TrackCover";
import ControlPanel from "../../components/ControlPanel/ContolPanel";
import ContentBlock from "../../components/ContentBlock/ContentBlock";
import AlbumBlock from "../../components/AlbumBlock/AlbumBlock";
import album_cov1 from "../../assets/images/album_cov1.png";
import album_cov2 from "../../assets/images/album_cov2.png";
import { useEffect } from "react";
const BASE_URL = "https://sonic-boom.ru";
export default function TrackView({
  user,
  track_title = "Название трека",
  track_picture = track_pic,
  albumsData = [
    {
      id: 1,
      title: "Альбом 1",
      cover: album_cov1, // Замените на реальный путь
    },
    {
      id: 2,
      title: "Альбом 2",
      cover: album_cov2,
    },
    {
      id: 3,
      title: "Альбом 3",
      cover: album_cov1,
    },
    {
      id: 4,
      title: "Альбом 4",
      cover: album_cov1,
    },
    {
      id: 5,
      title: "Альбом 5",
      cover: album_cov2,
    },
    {
      id: 6,
      title: "Альбом 6",
      cover: album_cov1,
    },
  ],
  track_text = "Текст трека Текст трека Текст трека Текст трека Текст трека Текст трека Текст трека",
  descriptionContent = "Описание трека...",
}) {
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [albums, setAlbums] = useState([]);
  function getTrack() {
    const API_URL = `https://sonic-boom.ru/api/songs/${id}`;
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTrack(data); // Устанавливаем данные о треке
        const albumIds = data.album; // Массив ID альбомов

        const fetchPromises = albumIds.map((albumId) => {
          const API_URL2 = `https://sonic-boom.ru/api/albums/${albumId}`; // Предполагаем, что альбомы получаются через API `albums/${id}`
          return fetch(API_URL2, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }).then((response) => {
            if (!response.ok) {
              throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
          });
        });

        // Когда все альбомы получены
        Promise.all(fetchPromises)
          .then((albumsData) => {
            const parsedAlbums = albumsData.map((album) => ({
              id: album.id,
              title: album.title,
              cover: BASE_URL + album.picture,
              // Если нет изображения, используем изображение по умолчанию
            }));
            setAlbums(parsedAlbums);
            console.log(parsedAlbums); // Обновляем состояние для альбомов
          })
          .catch((error) => {
            console.error("Ошибка при обработке всех запросов:", error.message);
          });
      })
      .catch((error) => {
        console.error("Ошибка запроса (трек):", error.message);
      });
  }

  useEffect(() => {
    getTrack(); // Вызов функции для получения данных о треке и альбомах
  }, [id]); // Следим за изменением id

  const [activeTab, setActiveTab] = useState("Текст");
  const buttonLabels = ["Текст", "Описание", "Альбомы"];
  const redirect_path = "/track-add";
  return (
    <div>
      <TrackCover
        trackTitle={track.name}
        trackCover={BASE_URL + track.picture}
      />
      <ControlPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        buttonLabels={buttonLabels}
        Icon={plus_circle}
        redirectPath={redirect_path}
        user={user}
      />
      {activeTab === "Текст" && (
        <ContentBlock>
          <p>{track.text}</p>
        </ContentBlock>
      )}
      {activeTab === "Описание" && (
        <ContentBlock>
          <p>{track.description}</p>
        </ContentBlock>
      )}
      {activeTab === "Альбомы" && <AlbumBlock albums={albums} />}
    </div>
  );
}
