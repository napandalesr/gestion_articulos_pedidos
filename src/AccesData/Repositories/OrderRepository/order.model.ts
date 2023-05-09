export interface IOrderResponse {
  status: number
  data: OrderModel[] | OrderModel
}

export interface OrderModel {
  id?: number
  articles: Article[]
  price_total_tax_free: string
  price_total_tax: string
}

export interface Article {
  idArticle: number
  amount: number
  reference: string
}
