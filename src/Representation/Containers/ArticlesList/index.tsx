import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Toast from "../../Components/Toast";

interface props {
  dataSource: data[]
}

interface data {
  reference: string
  name: string
  price_tax_free: string
}

export const ArticlesList: React.FC<props> = ({ dataSource }) => {
  const [showToast, setShowToast] = React.useState(false);
  const hideToast = (): void => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    setShowToast(false);
  };
  return <>
  {
    showToast && <Toast hideToast={hideToast}/>
  }
  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Referencia</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio sin impuesto</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
    {
      dataSource.map(item =>
      <tr>
        <td scope="row">{item.reference}</td>
        <td>{item.name}</td>
        <td>{item.price_tax_free}</td>
        <td>
          <Link to={'#'} className="btn"><FontAwesomeIcon icon={faEdit} style={{ margin: '0 2px' }}/><span>Editar</span></Link>
          <Link to={'#'} className="btn btn-danger" onClick={() => { setShowToast(true); }}><FontAwesomeIcon icon={faTrash} style={{ margin: '0 2px' }}/><span>Eliminar</span></Link>
        </td>
      </tr>)
    }
  </tbody>
</table>
  </>;
};

export default ArticlesList;
