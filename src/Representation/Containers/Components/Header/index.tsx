import React from "react";

import "./styles.scss";
import { Link } from "react-router-dom";
import { _Routes } from "../../../Utils/Constants";

export const Header: React.FC = () => {
  const [active, setActive] = React.useState("home");

  React.useEffect(() => {
    location.pathname.includes('home') && activeItem("home");
    location.pathname.includes('articles') && activeItem("articles");
    location.pathname.includes('orders') && activeItem("orders");
  }, []);
  const activeItem = (item: string): void => {
    setActive(item);
  };
  return <header>
  <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd" }} >
    <div className="container-fluid">
      <Link className="navbar-brand" to={_Routes.Home} onClick={() => { activeItem("home"); }}>Menú</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <li className={`nav-item ${active === "home" ? "active" : ""}`}>
            <Link className="nav-link " to={_Routes.Home} onClick={() => { activeItem("home"); }}>Inicio</Link>
            <span className="line"></span>
          </li>
          <li className={`nav-item ${active === "articles" ? "active" : ""}`}>
            <Link className="nav-link" to={_Routes.Articles} onClick={() => { activeItem("articles"); }}>Artículos</Link>
            <span className="line"></span>
          </li>
          <li className={`nav-item ${active === "orders" ? "active" : ""}`}>
            <Link className="nav-link" to={_Routes.Orders} onClick={() => { activeItem("orders"); }}>Pedidos</Link>
            <span className="line"></span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </header>;
};

export default Header;
