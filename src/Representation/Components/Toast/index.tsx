import React from "react";

import "./styles.scss";
import Overlay from "../Overlay";

interface props {
  hideToast: () => void
}

export const Toast: React.FC<props> = ({ hideToast }) => {
  return <>
  <Overlay hideToast={hideToast}/>
  <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-body">
      ¿Desea eliminar el artículo?
      <div className="mt-2 pt-2 border-top">
        <button type="button" className="btn btn-primary btn-sm">Si</button>
        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast" onClick={hideToast}>No</button>
      </div>
    </div>
  </div>
</>;
};

export default Toast;
