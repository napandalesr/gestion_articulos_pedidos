export interface ArticleDtoResponse {
  status: number
  data: any
};

export interface ArticlerDto {
  id: number
  reference: string
  name: string
  price_tax_free: string
  tax: string
  description: string
}
