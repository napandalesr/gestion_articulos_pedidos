import { type ArticleModel, type IArticleResponse } from "../Repositories/articulo.model";

export interface ArticlePorts {
  getAll: () => Promise<IArticleResponse>
  post: (articleModel: ArticleModel) => Promise<IArticleResponse>
  getId: (id: number) => Promise<IArticleResponse>
  remove: (id: number) => Promise<IArticleResponse>
  update: (id: number, dataSource: ArticleModel) => Promise<IArticleResponse>
}
