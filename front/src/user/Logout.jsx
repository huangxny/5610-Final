import { useContext } from "react";
import UserContext from "./UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setEmail } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    fetch("/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setEmail("");
      navigate("/");
      window.location.reload();
    });
  }

  return (
    <a
      href="/"
      onClick={handleLogout}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleLogout();
        }
      }}
      tabIndex={1}
    >
      Logout
    </a>
  );
}

export default Logout;
