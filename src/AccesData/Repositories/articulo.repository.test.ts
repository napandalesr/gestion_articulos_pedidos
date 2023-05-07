import { urlBase } from './../../Config/HttpClient';
import { setupServer } from 'msw/node';
import { rest } from "msw";
import { ArticleRepository } from './articulo.repository';

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

test("endpoit para obtener todos los artículos", async () => {
  const articleRepository = new ArticleRepository();
  const response: any = await articleRepository.getAll();
  expect(response.status).toBe(200);
  expect(response.data).toHaveLength(2);
  expect(response.data[0].reference).toBe("123");
  expect(response.data[0].name).toBe("Articulo 1");
  expect(response.data[0].price_tax_free).toBe("2000");
  expect(response.data[0].tax).toBe("19");
  expect(response.data[0].description).toBe("Descripción");
});

test("endpoint para guardar un artículo", async () => {
  const data = {
    reference: "123",
    name: "Articulo 1",
    price_tax_free: "2000",
    tax: "19",
    description: "Descripción"
  };
  const articleRepository = new ArticleRepository();
  const response: any = await articleRepository.post(data);
  expect(response.data).toEqual(data);
});
