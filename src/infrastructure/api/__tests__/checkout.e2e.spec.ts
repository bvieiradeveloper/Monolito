import { app, sequelize } from "../express";
import request from "supertest";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
const mockDate = new Date(2000,1,1);
describe("E2E test for checkout", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(mockDate)
})
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });



  it("should checkout", async () => {
    const client = await request(app)
      .post("/client")
      .send({
        name: "Client 1",
        email: "xx@gmil.com",
        document: "0000",
        address: {
            street:  "My Street",
            number:  "132",
            complement:  "aaaaa",
            city:  "New York",
            state:  "Kingston",
            zipCode:  "12401",
        },
      });

      const productA = await request(app)
      .post("/product")
      .send({
        id :  "1",
        name: "Product 1",
        description: "Product",
        purchasePrice: 10,
        stock: 10,
        },
    );

    const productB = await request(app)
    .post("/product")
    .send({
      id :  "2",
      name: "Product 2",
      description: "Product",
      purchasePrice: 50,
      stock: 4,
      },
    );

    const order = await request(app)
    .post("/checkout")
    .send({
        clientId: client.body.id,
        products: [
            {
                productId: productA.body.id,
            },
            {
                productId: productB.body.id,
            },
        ],
      },
    );

  });
});