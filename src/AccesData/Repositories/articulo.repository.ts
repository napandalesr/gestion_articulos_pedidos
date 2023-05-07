import { Config, httpClient, urlBase } from "../../Config/HttpClient";
import { type ArticlePorts } from "../Ports/article.port";
import { type ArticleModel, type IArticleResponse } from "./articulo.model";

export class ArticleRepository implements ArticlePorts {
  async getAll (): Promise<IArticleResponse> {
    return await httpClient().get(`${urlBase}/articulos`, Config);
  }

  async post (data: ArticleModel): Promise<IArticleResponse> {
    return await httpClient().post(`${urlBase}/articulos`, data, Config);
  }
}
