import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  fetch("https://sonic-boom.ru/api/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => navigate("/login"))
    .catch((error) => alert(error));
}
