import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import { _Routes } from "../Utils/Constants";
import Articles from "../Pages/Articles";
import Orders from "../Pages/Orders";

const Router: React.FC = () => {
  return <>
  <Routes>
    <Route path={_Routes.Home} element={<Home/>}/>
    <Route path={_Routes.Articles} element={<Articles/>}/>
    <Route path={_Routes.Orders} element={<Orders/>}/>
  </Routes>
  </>;
};

export default Router;
