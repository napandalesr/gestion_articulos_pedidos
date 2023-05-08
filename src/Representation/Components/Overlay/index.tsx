import React from "react";

import "./styles.scss";

interface props {
  hideToast: () => void
}

export const Overlay: React.FC<props> = ({ hideToast }) => {
  React.useEffect(() => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
  }, []);
  return <div className="overlay" onClick={hideToast}></div>;
};

export default Overlay;
