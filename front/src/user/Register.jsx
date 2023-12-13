import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext.jsx";
import "../style/user/Login-Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [regError, setRegError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setRegError(true);
      return;
    }

    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        await user.setEmail(data.email);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRegError(false);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setRegError(true);
      });
  }

  return (
    <form action="" onSubmit={(e) => handleSubmit(e)}>
      {regError && <div>Register failed. Email already used or passwords do not match.</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show Password
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
