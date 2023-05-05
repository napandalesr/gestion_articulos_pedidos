import React from "react";
import { render, screen } from "@testing-library/react";

import ArticlesForm from ".";

const setup = (): any => {
  render(<ArticlesForm/>);
  const fieldReference = screen.getByLabelText(/referencia/i);
  const fieldName = screen.getByLabelText(/nombre/i);
  const fieldPriceTaxFree = screen.getByLabelText(/precio sin impuesto/i);
  const fieldTax = screen.getByLabelText(/impuesto aplicable/i);
  const fieldDescription = screen.getByLabelText("Descripción");
  const buttonSave = screen.getByRole("button", { name: /crear artículo/i });
  return {
    fieldReference,
    fieldName,
    fieldPriceTaxFree,
    fieldTax,
    fieldDescription,
    buttonSave
  };
};

describe("Renderizado del componente ArticleForm", () => {
  test("Mostrar los campos Referencia, Nombre, Precio sin impuesto, Impuesto aplicable y descripción", () => {
    const { fieldReference, fieldName, fieldPriceTaxFree, fieldTax, fieldDescription } = setup();
    expect(fieldReference).toBeInTheDocument();
    expect(fieldName).toBeInTheDocument();
    expect(fieldPriceTaxFree).toBeInTheDocument();
    expect(fieldTax).toBeInTheDocument();
    expect(fieldDescription).toBeInTheDocument();
  });

  test("Renderizar botón guardar", () => {
    const { buttonSave } = setup();
    expect(buttonSave).toBeInTheDocument();
  });
});
