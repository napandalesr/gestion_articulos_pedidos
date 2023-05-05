import React from "react";

import ArticlesForm from "../../Containers/ArticlesForm";
import ArticlesList from "../../Containers/ArticlesList";

export const Articles: React.FC = () => {
  return <section className="articulos p-3">
  <h2 className="p-3">Articulos</h2>
  <hr />
  <ArticlesForm/>
  <hr />
  <ArticlesList dataSource={[]}/>
  </section>;
};

export default Articles;
