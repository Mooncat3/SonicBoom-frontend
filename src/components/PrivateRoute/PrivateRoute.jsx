import { Navigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";

export default function PrivateRoute({ element }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);
  useEffect(() => {
    fetch("https://sonic-boom.ru/api/check_auth/", {
      credentials: "include",
    }).then((response) => {
      if (response.status == 200) {
        setAuth(true);
      }
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (isAuth) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}
