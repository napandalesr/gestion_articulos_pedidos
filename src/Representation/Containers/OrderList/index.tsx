import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

import Toast from "../../Components/Toast";
import { _Routes } from "../../Utils/Constants";

interface props {
  dataSource: data[]
  removeOrder: (id: number) => Promise<void>
}

interface data {
  id: string
  price_total_tax_free: string
  price_total_tax: string
}

export const OrderList: React.FC<props> = ({ dataSource, removeOrder }) => {
  const [showToast, setShowToast] = React.useState(false);
  const [idOrderToRemove, setidOrderToRemove] = React.useState<number>(0);
  const hideToast = (): void => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    setShowToast(false);
  };
  return <>
  {
    showToast && <Toast hideToast={hideToast} execute={async () => {
      await removeOrder(idOrderToRemove);
      hideToast();
    }}/>
  }
  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Precio total con impuesto</th>
      <th scope="col">Precio total con impuesto</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
    {
      dataSource.map(item =>
      <tr key={item.id}>
        <td scope="row">{item.id}</td>
        <td>{item.price_total_tax_free}</td>
        <td>{item.price_total_tax}</td>
        <td>
          <Link to={`/${_Routes.Orders}/${item.id}`} className="btn"><FontAwesomeIcon icon={faEdit} style={{ margin: '0 2px' }}/><span>Editar</span></Link>
          <Link to={'#'} className="btn btn-danger" onClick={() => { setShowToast(true); setidOrderToRemove(parseInt(item.id)); }}><FontAwesomeIcon icon={faTrash} style={{ margin: '0 2px' }}/><span>Eliminar</span></Link>
        </td>
      </tr>)
    }
  </tbody>
</table>
  </>;
};

export default OrderList;
