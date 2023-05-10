import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Pages/Home";
import { _Routes } from "../Utils/Constants";
import Articles from "../Pages/Articles";
import Orders from "../Pages/Orders";
import { useDispatch } from "react-redux";
import { LenguageController } from "../../App/Controller/LenguageController/lenguage.controller";
import { _lenguage } from "../Redux/Actions/lenguageAction";

const Router: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    void setLenguage();
  }, []);

  const setLenguage = async (): Promise<void> => {
    let lenguage: string | null = "es";
    const languajeController = new LenguageController();
    if (localStorage.getItem('lenguage') !== null) {
      console.log(localStorage.getItem('lenguage'));
      lenguage = localStorage.getItem('lenguage');
      if (lenguage === "es") {
        dispatch(_lenguage((await languajeController.getSpanish()).data));
      } else {
        dispatch(_lenguage((await languajeController.getEnglish()).data));
      }
    } else {
      dispatch(_lenguage((await languajeController.getSpanish()).data));
    }
  };

  void setLenguage();
  return <>
  <Routes>
    <Route path={_Routes.Home} element={<Home/>}/>
    <Route path={_Routes.Articles + "/:idParams?"} element={<Articles/>}/>
    <Route path={_Routes.Orders + "/:idParams?"} element={<Orders/>}/>
  </Routes>
  </>;
};

export default Router;
