import React from "react";

import ArticlesForm from "../../Containers/ArticlesForm";
import ArticlesList from "../../Containers/ArticlesList";
import { ArticleController } from "../../../App/Controller/ArticleController/article.controller";

export const Articles: React.FC = () => {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const SaveArticle = async (dataSource: any): Promise<boolean> => {
    try {
      const articleController = new ArticleController();
      const response: any = await articleController.post(dataSource);
      // eslint-disable-next-line @typescript-eslint/prefer-includes
      if ([200, 201, 202, 203, 204].indexOf(response.status) > -1) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
      return true;
    } catch (err) {
      console.log(err);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      return false;
    };
  };
  return <section className="articulos p-3">
  <h2 className="p-3">Articulos</h2>
  <hr />
  <ArticlesForm SaveData={SaveArticle} success={success} errors={error}/>
  <hr />
  <ArticlesList dataSource={[]}/>
  </section>;
};

export default Articles;
