import { type ArticleModel, type IArticleResponse } from "../Repositories/articulo.model";

export interface ArticlePorts {
  getAll: () => Promise<IArticleResponse>
  post: (articleModel: ArticleModel) => Promise<IArticleResponse>
}
