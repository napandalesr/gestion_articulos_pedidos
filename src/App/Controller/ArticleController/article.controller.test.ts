import { setupServer } from 'msw/node';
import { rest } from "msw";

import { urlBase } from '../../../Config/HttpClient';
import { ArticleController } from './article.controller';

const server = setupServer(
  rest.get(`${urlBase}/articulos`, async (req, res, ctx) => {
    return await res(
      ctx.json([{
        reference: "123",
        name: "Articulo 1",
        price_tax_free: "2000",
        tax: "19",
        description: "Descripción"
      },
      {
        reference: "456",
        name: "Articulo 2",
        price_tax_free: "3000",
        tax: "16",
        description: "Descripción"
      }]),
      ctx.status(200));
  }),
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

test("endpoint para guardar un artículo", async () => {
  const data = {
    id: 22,
    reference: "123",
    name: "Articulo 1",
    price_tax_free: "2000",
    tax: "19",
    description: "Descripción"
  };
  const articleController = new ArticleController();
  const response: any = await articleController.post(data);
  expect(response.data).toEqual(data);
});
