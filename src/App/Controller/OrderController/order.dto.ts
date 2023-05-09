export interface OrderDtoResponse {
  status: number
  data: OrderDto[] | OrderDto
}

export interface OrderDto {
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
