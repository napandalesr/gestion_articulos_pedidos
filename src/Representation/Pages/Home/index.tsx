import React from "react";
import { useSelector } from "react-redux";

export const Home: React.FC = () => {
  const { lenguage } = useSelector((state: any) => state.lenguageReducer);
  React.useEffect(() => {
    if (lenguage !== undefined) {
      console.log("lenguage", lenguage[1].pages);
    }
  }, [lenguage]);
  return <>{
    lenguage !== undefined && <>{lenguage[1].pages[0].home}</>
  }</>;
};

export default Home;
