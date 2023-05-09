import { type ArticlePorts } from "../../AccesData/Ports/article.port";
import { type ArticlerDto, type ArticleDtoResponse } from "../Controller/ArticleController/article.dto";

export class ArticleAdapter {
  constructor (private readonly articlePort: ArticlePorts) {}
  async getAll (): Promise<ArticleDtoResponse> {
    return await this.articlePort.getAll();
  }

  async post (articlerDto: ArticlerDto): Promise<ArticleDtoResponse> {
    return await this.articlePort.post(articlerDto);
  }

  async getId (id: number): Promise<ArticleDtoResponse> {
    return await this.articlePort.getId(id);
  }

  async remove (id: number): Promise<ArticleDtoResponse> {
    return await this.articlePort.remove(id);
  }

  async update (id: number, dataSource: ArticlerDto): Promise<ArticleDtoResponse> {
    return await this.articlePort.update(id, dataSource);
  }
}
