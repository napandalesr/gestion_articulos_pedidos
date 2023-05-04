import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import { _Routes } from "../Utils/Constants";

const Router: React.FC = () => {
  return <>
  <Routes>
    <Route path={_Routes.Home} element={<Home/>}/>
  </Routes>
  </>;
};

export default Router;
