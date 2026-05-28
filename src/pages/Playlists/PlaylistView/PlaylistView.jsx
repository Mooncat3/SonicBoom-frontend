import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "../../Albums/AlbumView.module.css";
import track_pic from "../../../assets/images/track_pic.png";
import track_bg from "../../../assets/images/track_bg.png";
import albumCov2 from "../../../assets/images/album_cov2.png";
import TrackItem from "../../../components/TrackComponents/TrackItem";
import TrackCover from "../../../components/TrackComponents/TrackCover";
import ControlPanel from "../../../components/ControlPanel/ContolPanel";
import plus_circle from "../../../assets/images/Plus_circle.png";
import ContentBlock from "../../../components/ContentBlock/ContentBlock";
import Loading from "../../../components/Loading/Loading";
import threeDots from "../../../assets/images/threeDots.png";
import { useEffect } from "react";

const BASE_URL = "https://sonic-boom.ru";

export default function PlaylistView({ user }) {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Треки");
  const [isOpenNav, setIsOpenNav] = useState(false);
  const navigate = useNavigate();

  const buttonConfig = {
    Редактировать: {
      type: "Link",
      path: `/playlist-edit/${id}`,
    },
    Удалить: {
      type: "WindowOnDeleteFunc",
      title: "Вы уверены что хотите удалить плейлист?",
      func: () => {
        fetch(`https://sonic-boom.ru/api/playlists/${id}`, {
          method: "DELETE",
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              navigate("/playlists");
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

  const buttonLabels = ["Треки"];
  // Данные о треках

  const playlistHeaderStyle = {
    backgroundImage: `url(${track_bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
    marginBottom: "20px",
    padding: "40px",
    borderRadius: "10px",
  };

  const [tracks, setTracks] = useState([]); // Начальное состояние — пустой массив

  function getTracks() {
    const API_URL = `https://sonic-boom.ru/api/playlists/${id}`;
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
        console.log("Ответ от сервера (playlists):", data);
        const trackIds = data.song; // Получаем id треков
        const fetchPromises = trackIds.map((trackId) => {
          const API_URL2 = `https://sonic-boom.ru/api/songs/${trackId}`;
          return fetch(API_URL2, {
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
            .then((trackData) => trackData); // Возвращаем данные трека
        });

        // Когда все треки получены
        Promise.all(fetchPromises)
          .then((tracksData) => {
            console.log("Данные для всех треков:", tracksData);
            // Преобразуем данные, если нужно, и обновляем состояние
            const parsedTracks = tracksData.map((track) => ({
              id: track.id,
              title: track.name,
              duration: track.duration || "4:00", // Примерная логика для длительности
              icon: BASE_URL + track.picture || track_pic, // Используем стандартное изображение, если нет
            }));
            setTracks(parsedTracks); // Обновляем состояние
          })
          .catch((error) => {
            console.error("Ошибка при обработке всех запросов:", error.message);
          });
      })
      .catch((error) => {
        console.error("Ошибка запроса (playlists):", error.message);
      });
  }
  useEffect(() => {
    getTracks();
    fetch(`https://sonic-boom.ru/api/playlists/${id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        // setId(response_data.id);
        setPlaylist(response_data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes["app"]}>
      <main className={classes["main-content"]}>
        {/* Track Header */}
        <TrackCover
          trackTitle={playlist.title}
          trackCover={BASE_URL + playlist.picture}
          trackBackground={BASE_URL + playlist.picture}
        />
        <ControlPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          buttonLabels={buttonLabels}
          Icon={threeDots}
          user={user}
          buttonConfig={buttonConfig}
        ></ControlPanel>
        <ContentBlock>
          {tracks.length === 0 ? (
            <p>Нет треков для отображения</p>
          ) : (
            tracks.map((track, index) => (
              <TrackItem
                key={index}
                icon={track.icon}
                title={track.title}
                id={track.id}
                duration={track.duration}
              />
            ))
          )}
        </ContentBlock>
      </main>
    </div>
  );
}
