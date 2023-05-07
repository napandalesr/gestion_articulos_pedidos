export interface IArticleResponse {
  status: number
  data: ArticleModel[] | ArticleModel
}

export interface ArticleModel {
  reference: string
  name: string
  price_tax_free: string
  tax: string
  description: string
}
