import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Toast from "../../Components/Toast";
import { _Routes } from "../../Utils/Constants";

interface props {
  dataSource: data[]
  removeArticle: (id: number) => Promise<void>
}

interface data {
  id: string
  reference: string
  name: string
  price_tax_free: string
}

export const ArticlesList: React.FC<props> = ({ dataSource, removeArticle }) => {
  const [showToast, setShowToast] = React.useState(false);
  const [idArticleToRemove, setIdArticleToRemove] = React.useState<number>(0);
  const { lenguage } = useSelector((state: any) => state.lenguageReducer);
  const hideToast = (): void => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    setShowToast(false);
  };
  return <>
  {
    showToast && <Toast hideToast={hideToast} execute={async () => {
      await removeArticle(idArticleToRemove);
      hideToast();
    }}/>
  }
  <table className="table table-striped">
  <thead>
    <tr>
      {
        lenguage !== undefined
          ? <>
        {
          lenguage[1].pages[1].articles.table.columns.map((item: string) => <th scope="col">{item}</th>)
        }
        </>
          : <>
        <th scope="col">Referencia</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio sin impuesto</th>
          <th scope="col">Acción</th>
        </>
      }
    </tr>
  </thead>
  <tbody>
    {
      dataSource.map(item =>
      <tr key={item.id}>
        <td scope="row">{item.reference}</td>
        <td>{item.name}</td>
        <td>{item.price_tax_free}</td>
        <td>
          <Link to={`/${_Routes.Articles}/${item.id}`} className="btn"><FontAwesomeIcon icon={faEdit} style={{ margin: '0 2px' }}/><span>{lenguage !== undefined ? lenguage[1].pages[1].articles.table.button.edit : "Editar"}</span></Link>
          <Link to={'#'} className="btn btn-danger" onClick={() => { setShowToast(true); setIdArticleToRemove(parseInt(item.id)); }}><FontAwesomeIcon icon={faTrash} style={{ margin: '0 2px' }}/><span>{lenguage !== undefined ? lenguage[1].pages[1].articles.table.button.delete : "Eliminar"}</span></Link>
        </td>
      </tr>)
    }
  </tbody>
</table>
  </>;
};

export default ArticlesList;
