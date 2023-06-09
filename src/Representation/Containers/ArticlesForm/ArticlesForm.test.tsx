import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";

import ArticlesForm from ".";
import { urlBase } from "../../../Config/HttpClient";
import { Provider } from "react-redux";
import store from "../../Redux/store";

const server = setupServer(
  rest.post(`${urlBase}/articulos`, async (req, res, ctx) => {
    return await res(
      ctx.json(req.body),
      ctx.status(200));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

const SaveData = async (dataSource: any): Promise<boolean> => {
  return await new Promise(resolve => setTimeout(() => {
    resolve(true);
  }, 200));
};

const dataExample = {
  id: "1",
  reference: "123",
  name: "Articulo 1",
  price_tax_free: "2000",
  tax: "2",
  description: "Descripción"
};

const updateArticle = async (id: number, dataSource: any): Promise<void> => {
  await new Promise<void>(resolve => setTimeout(() => {
    resolve();
  }, 200));
};

const setup = (): any => {
  const { rerender } = render(<Provider store={store}>
    <ArticlesForm
    SaveData={SaveData}
    success={false}
    errors={false}
    textModal=""
    idParams={undefined}
    updateArticle={updateArticle}
    defaultValue={dataExample}/>
    </Provider>);
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
    buttonSave,
    rerender
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

describe("Funcionalidad del formulario de artículos", () => {
  test("Guardar artículo", async () => {
    const {
      fieldReference,
      fieldName,
      fieldPriceTaxFree,
      fieldTax,
      fieldDescription,
      rerender
    } = setup();
    expect(screen.queryByText("Artículo guardado correctamente")).not.toBeInTheDocument();
    expect(screen.queryByText("Ha ocurrido un error, intente de nuevo")).not.toBeInTheDocument();
    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    fireEvent.change(fieldReference, { target: { value: "123" } });
    fireEvent.change(fieldName, { target: { value: "Artículo" } });
    fireEvent.change(fieldPriceTaxFree, { target: { value: "60000" } });
    fireEvent.change(fieldTax, { target: { value: "19" } });
    fireEvent.change(fieldDescription, { target: { value: "Descripción" } });
    fireEvent.submit(screen.getByTestId("form"));
    expect(screen.queryByText("Cargando...")).toBeInTheDocument();
    rerender(<Provider store={store}>
      <ArticlesForm
      SaveData={SaveData}
      success={true}
      errors={false}
      textModal="Artículo guardado correctamente"
      idParams={undefined}
      updateArticle={updateArticle}
      defaultValue={dataExample}/>
      </Provider>);
    expect(await screen.findByText("Artículo guardado correctamente")).toBeInTheDocument();
    rerender(<Provider store={store}>
      <ArticlesForm
      SaveData={SaveData}
      success={false}
      errors={true}
      textModal="Ha ocurrido un error, intente de nuevo"
      idParams={undefined}
      updateArticle={updateArticle}
      defaultValue={dataExample}/>
      </Provider>);
    expect(screen.queryByText("Ha ocurrido un error, intente de nuevo")).toBeInTheDocument();
  });
});
