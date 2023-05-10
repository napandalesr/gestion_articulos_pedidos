import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { _Routes } from "../../Utils/Constants";

import "./styles.scss";

export const Header: React.FC = () => {
  const [active, setActive] = React.useState("home");
  const { lenguage } = useSelector((state: any) => state.lenguageReducer);

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
      <Link className="navbar-brand" to={_Routes.Home} onClick={() => { activeItem("home"); }}>{
        lenguage !== undefined ? lenguage[0].header[0] : "Menú"
      }</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarScroll">
        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <li className={`nav-item ${active === "home" ? "active" : ""}`}>
            <Link className="nav-link " to={_Routes.Home} onClick={() => { activeItem("home"); }}>{
              lenguage !== undefined ? lenguage[0].header[1] : "Inicio"
            }</Link>
            <span className="line"></span>
          </li>
          <li className={`nav-item ${active === "articles" ? "active" : ""}`}>
            <Link className="nav-link" to={_Routes.Articles} onClick={() => { activeItem("articles"); }}>{
              lenguage !== undefined ? lenguage[0].header[2] : "Artículos"
            }</Link>
            <span className="line"></span>
          </li>
          <li className={`nav-item ${active === "orders" ? "active" : ""}`}>
            <Link className="nav-link" to={_Routes.Orders} onClick={() => { activeItem("orders"); }}>{
              lenguage !== undefined ? lenguage[0].header[3] : "Pedidos"
            }</Link>
            <span className="line"></span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </header>;
};

export default Header;
