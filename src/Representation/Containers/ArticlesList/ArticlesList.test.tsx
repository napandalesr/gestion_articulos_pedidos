import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ArticlesList from ".";
import { BrowserRouter } from "react-router-dom";

interface data {
  id: string
  reference: string
  name: string
  price_tax_free: string
}

let dataSource: data[] = [
  {
    id: "1",
    reference: "123",
    name: "Articulo 1",
    price_tax_free: "2000"
  },
  {
    id: "2",
    reference: "2",
    name: "Articulo 2",
    price_tax_free: "4000"
  }
];

const removeArticle = async (id: number): Promise<void> => {
  dataSource = dataSource.filter(item => item.id !== id.toString());
  await new Promise<void>(resolve => setTimeout(() => {
    resolve();
  }, 200));
};

const setup = (): any => {
  render(<BrowserRouter><ArticlesList dataSource={dataSource} removeArticle={removeArticle}/></BrowserRouter>);
  const Table = screen.getByRole("table");
  const ColumnReference = screen.getByRole('columnheader', { name: /referencia/i });
  const ColumnName = screen.getByRole('columnheader', { name: /nombre/i });
  const ColumPrice = screen.getByRole('columnheader', { name: /precio sin impuesto/i });
  const ColumnAction = screen.getByRole('columnheader', { name: /acción/i });
  const CellReference = screen.getByRole('cell', { name: "123" });
  const CellArticle = screen.getByRole('cell', { name: /articulo 1/i });
  const CellPriceTaxFree = screen.getByRole('cell', { name: "2000" });
  const textEdit = screen.getAllByText(/editar/i);
  const textDelete = screen.getAllByText(/eliminar/i);
  return {
    Table,
    ColumnReference,
    ColumnName,
    ColumPrice,
    ColumnAction,
    CellReference,
    CellArticle,
    CellPriceTaxFree,
    textEdit,
    textDelete
  };
};

describe("Se renderiza el componente ArticlesList", () => {
  test("Renderizar tabla y agregar una fila", () => {
    const {
      Table,
      ColumnReference,
      ColumnName,
      ColumPrice,
      ColumnAction,
      CellReference,
      CellArticle,
      CellPriceTaxFree,
      textEdit,
      textDelete
    } = setup();
    expect(Table).toHaveAttribute(
      'class',
      'table table-striped'
    );
    expect(ColumnReference).toBeInTheDocument();
    expect(ColumnName).toBeInTheDocument();
    expect(ColumPrice).toBeInTheDocument();
    expect(ColumnAction).toBeInTheDocument();
    expect(CellReference).toBeInTheDocument();
    expect(CellArticle).toBeInTheDocument();
    expect(CellPriceTaxFree).toBeInTheDocument();
    expect(textEdit[0]).toBeInTheDocument();
    expect(textDelete[0]).toBeInTheDocument();
  });
});

describe("Evento para eliminar un artículo de la tabla", () => {
  test("Eliminar un artículo", () => {
    const { textDelete } = setup();
    expect(dataSource).toHaveLength(2);
    fireEvent.click(textDelete[0]);
    fireEvent.click(screen.getByRole("button", { name: /si/i }));
    expect(dataSource).toHaveLength(1);
  });
});
