import { ArticleRepository } from '../../../AccesData/Repositories/articulo.repository';
import { ArticleAdapter } from '../../Adapter/article.adapter';
import { type ArticlerDto, type ArticleDtoResponse } from './article.dto';

export class ArticleController {
  async post (data: ArticlerDto): Promise<ArticleDtoResponse> {
    const articleAdapter = new ArticleAdapter(new ArticleRepository());
    return await articleAdapter.post(data);
  }

  async getAll (): Promise<ArticleDtoResponse> {
    const articleAdapter = new ArticleAdapter(new ArticleRepository());
    return await articleAdapter.getAll();
  }
}
