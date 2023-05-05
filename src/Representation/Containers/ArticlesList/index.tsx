import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

interface props {
  dataSource: data[]
}

interface data {
  reference: string
  name: string
  priceTaxFree: string
}

export const ArticlesList: React.FC<props> = ({ dataSource }) => {
  return <>
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
        <td>{item.priceTaxFree}</td>
        <td>
          <Link to={'#'} className="btn"><FontAwesomeIcon icon={faEdit} style={{ margin: '0 2px' }}/><span>Editar</span></Link>
          <Link to={'#'} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} style={{ margin: '0 2px' }}/><span>Eliminar</span></Link>
        </td>
      </tr>)
    }
  </tbody>
</table>
  </>;
};

export default ArticlesList;
