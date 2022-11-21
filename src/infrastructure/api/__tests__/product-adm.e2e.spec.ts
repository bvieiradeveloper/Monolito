import { app, sequelize } from "../express";
import request from "supertest";
import Product from '../../../modules/invoice/domain/entity/product';

describe("E2E test for client adm", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    
    const productA = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        description: "Product 1 description",
        purchasePrice: 10,
        stock: 10,
        },
    );

    const productB = await request(app)
    .post("/product")
    .send({
      name: "Product 2",
      description: "Product 2 description",
      purchasePrice: 50,
      stock: 4,
      },
  );

  const responseA = await request(app).get(`/product/${productA.body.id}`).send()
  const responseB = await request(app).get(`/product/${productB.body.id}`).send()
  
  expect(productA.status).toBe(200);
  expect(productB.status).toBe(200);
  
  expect(responseA.body.productId).toEqual(productA.body.id);
  expect(responseA.body.stock).toEqual(10);
  expect(responseB.body.productId).toEqual(productB.body.id);
  expect(responseB.body.stock).toEqual(4);
  });
});