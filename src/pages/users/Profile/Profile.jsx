import UserAvatar from "../../../components/users/UserAvatar/UserAvatar";
import ProfileCard from "../../../components/users/ProfileCard/ProfileCard";
import FormButton from "../../../components/Form/FormButton/FormButton";
import Loading from "../../../components/Loading/Loading";
import classes from "./Profile.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const username = "Никнейм";
const email = "test@gmail.com";
const login = "Логин";

export default function Profile() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://sonic-boom.ru/api/users/profile/", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response_data) => {
        setData(response_data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ProfileCard>
        <div className={classes.about_user}>
          <div className={classes.info}>
            <p>{data.username}</p>
            <p>{data.email}</p>
            <p>{data.login}</p>
          </div>
          <UserAvatar />
        </div>
        <div className={classes.actions}>
          <Link to="/edit-profile">
            <FormButton title="Редактировать профиль" />
          </Link>
          <Link to="/change-password">
            <FormButton title="Сменить пароль" />
          </Link>
        </div>
      </ProfileCard>
    </>
  );
}
