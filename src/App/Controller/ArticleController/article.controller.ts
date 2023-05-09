import { ArticleRepository } from '../../../AccesData/Repositories/ArticleRepository/articulo.repository';
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

  async getId (id: number): Promise<ArticleDtoResponse> {
    const articleAdapter = new ArticleAdapter(new ArticleRepository());
    return await articleAdapter.getId(id);
  }

  async remove (id: number): Promise<ArticleDtoResponse> {
    const articleAdapter = new ArticleAdapter(new ArticleRepository());
    return await articleAdapter.remove(id);
  }

  async update (id: number, dataSource: ArticlerDto): Promise<ArticleDtoResponse> {
    const articleAdapter = new ArticleAdapter(new ArticleRepository());
    return await articleAdapter.update(id, dataSource);
  }
}
