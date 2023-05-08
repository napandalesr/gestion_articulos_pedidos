import React from "react";
import { render, screen } from "@testing-library/react";

import ArticlesList from ".";
import { BrowserRouter } from "react-router-dom";

interface data {
  id: string
  reference: string
  name: string
  price_tax_free: string
}

const dataSource: data[] = [
  {
    id: "1",
    reference: "123",
    name: "Articulo 1",
    price_tax_free: "2000"
  }
];

const removeArticle = async (id: number): Promise<void> => {
  await new Promise<void>(resolve => setTimeout(() => {
    resolve();
  }, 200));
};

describe("Se renderiza el componente ArticlesList", () => {
  test("Renderizar tabla y agregar una fila", () => {
    render(<BrowserRouter><ArticlesList dataSource={dataSource} removeArticle={removeArticle}/></BrowserRouter>);
    const Table = screen.getByRole("table");
    expect(Table).toHaveAttribute(
      'class',
      'table table-striped'
    );
    const ColumnReference = screen.getByRole('columnheader', { name: /referencia/i });
    expect(ColumnReference).toBeInTheDocument();
    const ColumnName = screen.getByRole('columnheader', { name: /nombre/i });
    expect(ColumnName).toBeInTheDocument();
    const ColumPrice = screen.getByRole('columnheader', { name: /precio sin impuesto/i });
    expect(ColumPrice).toBeInTheDocument();
    const ColumnAction = screen.getByRole('columnheader', { name: /acción/i });
    expect(ColumnAction).toBeInTheDocument();
    const CellReference = screen.getByRole('cell', { name: "123" });
    expect(CellReference).toBeInTheDocument();
    const CellArticle = screen.getByRole('cell', { name: /articulo 1/i });
    expect(CellArticle).toBeInTheDocument();
    const CellPriceTaxFree = screen.getByRole('cell', { name: "2000" });
    expect(CellPriceTaxFree).toBeInTheDocument();
    const textEdit = screen.getByText(/editar/i);
    expect(textEdit).toBeInTheDocument();
    const textDelete = screen.getByText(/eliminar/i);
    expect(textDelete).toBeInTheDocument();
  });
});
