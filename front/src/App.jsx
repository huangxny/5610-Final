import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Register from "./user/Register.jsx";
import Login from "./user/Login.jsx";
import Logout from "./user/Logout.jsx";
import UserContext from "./user/UserContext.jsx";
import ProductDisplay from "./product/ProductDisplay.jsx";
import CartPage from "./Cart/CartPage.jsx";
import "./style/App.css";
import logo from "./assets/images/logo.png";
function App() {
  const [email, setEmail] = useState("");
  const [cart, setCart] = useState([]);
  const [is_cart, setIs_cart] = useState(false);

  useEffect(() => {
    fetch("/user", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        const data = await res.json();
        setEmail(data.user.email);
        setCart(data.user.cart);
      })
      .catch(() => {
        setEmail("");
      });
  }, []);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <div className="container">
          <div className="container_content">
            <div className="login_container">
              <div
                className="top"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={logo} height={40} alt="website logo" />
              </div>
              <div className="router_t">
                <Link to={"/login"} tabIndex={1}>
                  Login
                </Link>
                <Link to={"/register"} tabIndex={1}>
                  Register
                </Link>
                <Logout />
              </div>
              <div className="login_box">
                <div>
                  {!!email && <div>Logged in as {email}</div>}
                  {!email && <div>Not logged in</div>}
                </div>
                <Routes>
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/login"} element={<Login />} />
                </Routes>
              </div>
              <h3>
                Note: free server is running slow. Please give few seconds
                before content react to your action!
              </h3>
            </div>
            <div className="store_container">
              <div className="top">
                <h2>Welcome to Online Tire Shop</h2>
              </div>
              <div className="product">
                <ProductDisplay cart={cart} setCart={setCart} email={email} />
              </div>
            </div>
          </div>
          <div className="container_cart">
            <div className="top">
              <div
                onClick={() => {
                  setIs_cart(!is_cart);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") setIs_cart(!is_cart);
                }}
                tabIndex={1}
                role={"button"}
              >
                Cart
              </div>
            </div>
            {is_cart ? (
              <div className="CartPage_box">
                <CartPage cart={cart} setCart={setCart} email={email} />
                <button
                  onClick={() => {
                    setIs_cart(!is_cart);
                  }}
                  className="hideCart"
                >
                  Hide Cart
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
