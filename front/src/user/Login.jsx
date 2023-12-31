import { useState, useContext } from "react";
import UserContext from "./UserContext.jsx";
import { useNavigate } from "react-router-dom";
import "../style/user/Login-Register.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        await user.setEmail(data.email);
        setEmail("");
        setPassword("");
        setLoginError(false);
        navigate("/");
        window.location.reload();
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  return (
    <form action="" onSubmit={(e) => handleLogin(e)}>
      {loginError && <div>Invalid email or password</div>}
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <button type="submit">login</button>
    </form>
  );
}

export default Login;
