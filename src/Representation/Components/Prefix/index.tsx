import React from "react";
import { LenguageController } from "../../../App/Controller/LenguageController/lenguage.controller";
import { _lenguage } from "../../Redux/Actions/lenguageAction";
import { useDispatch } from "react-redux";

import "./styles.scss";

export const Prefix: React.FC = () => {
  const dispatch = useDispatch();

  const spanish = async (): Promise<void> => {
    const languajeController = new LenguageController();
    dispatch(_lenguage((await languajeController.getSpanish()).data));
  };

  const english = async (): Promise<void> => {
    const languajeController = new LenguageController();
    dispatch(_lenguage((await languajeController.getEnglish()).data));
  };

  return <>
  <div className="btn-group" role="group" aria-label="Basic example">
    <button className="btn btn-info" onClick={spanish}>Español</button>
    <button className="btn btn-info" onClick={english}>Ingles</button>
  </div></>;
};

export default Prefix;
