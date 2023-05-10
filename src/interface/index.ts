export interface LenguageReponse {
  header?: string[]
  pages?: Page[]
}

export interface Page {
  home?: string
  articles?: Articles
  articles_id?: Articles
  pedidos?: Pedidos
}

export interface Articles {
  title: string
  inputs: Input[]
  button: Button[]
  table: Table
}

export interface Input {
  label: string
  type: string
}

export interface Button {
  text: string
  type: string
}

export interface Table {
  columns: string[]
}

export interface Pedidos {
  title: string
  inputs: Input[]
  button: Button[]
  table: Table
};
