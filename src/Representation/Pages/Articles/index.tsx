import React from "react";

import ArticlesForm from "../../Containers/ArticlesForm";
import ArticlesList from "../../Containers/ArticlesList";
import { ArticleController } from "../../../App/Controller/ArticleController/article.controller";
import { useNavigate, useParams } from "react-router-dom";
import { _Routes } from "../../Utils/Constants";

export const Articles: React.FC = () => {
  const { idParams } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [defaultValue, setDefaulValue] = React.useState({
    id: "",
    reference: "",
    name: "",
    price_tax_free: "",
    tax: "",
    description: ""
  });
  const [textModal, setTextModal] = React.useState("");
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    void ListArticle().then((data) => {
      console.log(data);
    });
  }, []);
  React.useEffect(() => {
    if (idParams !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      void getIdArticle(parseInt(idParams)).then((data) => {
        console.log(data);
      });
    }
  }, [idParams]);
  const SaveArticle = async (dataSource: any): Promise<boolean> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.post(dataSource);
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        await ListArticle();
        setTextModal("Artículo guardado correctamente");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
      return true;
    } catch (err) {
      console.log(err);
      setTextModal("Ha ocurrido un error, intente de nuevo");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return false;
    };
  };

  const ListArticle = async (): Promise<void> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.getAll();
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateArticle = async (id: number, dataSource: any): Promise<void> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.update(id, dataSource);
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        await ListArticle();
        setSuccess(true);
        setTextModal("Artículo actualizado correctamente");
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
        setTimeout(() => {
          navigate("/" + _Routes.Articles);
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getIdArticle = async (id: number): Promise<void> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.getId(id);
      setDefaulValue(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeArticle = async (id: number): Promise<void> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.remove(id);
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        await ListArticle();
        setSuccess(true);
        setTextModal("Artículo eliminado correctamente");
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return <section className="articulos p-3">
  <h2 className="p-3">Articulos</h2>
  <hr />
  <ArticlesForm
    SaveData={SaveArticle}
    success={success}
    errors={error}
    textModal={textModal}
    idParams={idParams}
    updateArticle={updateArticle}
    defaultValue={defaultValue}/>
  <hr />
  <ArticlesList dataSource={data} removeArticle={removeArticle}/>
  </section>;
};

export default Articles;
