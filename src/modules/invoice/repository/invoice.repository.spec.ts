import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice";
import Product from "../domain/entity/product";
import Address from "../domain/value-object/address.value-object";
import { InvoiceModel } from "./invoice.model";

import InvoiceRepository from "./invoice.repository";
import { ProductModel } from "./product.model";



const productOne = new Product({
    id : new Id("1"),
    name: "Product 1",
    price: 500
});

const productTwo = new Product({
    id : new Id("2"),
    name: "Product 2",
    price: 750
});

const address = new Address({
    street: "street 1",
    number: "123",
    complement: "Next to drugstore",
    city: "City 1",
    state: "SO",
    zipCode: "123654987"
});

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "1234567890",
    address: address,
    items: [productOne,productTwo]
});


describe("Order repository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([
        InvoiceModel,
        ProductModel,
      ]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a invoice", async () => {
        const invoiceRepository = new InvoiceRepository();

        await invoiceRepository.generate(invoice);

        const result = await InvoiceModel.findOne({
          where: {id: "1"},
          include: ["items"],
        });

        expect(result.toJSON()).toStrictEqual({
          id: "1",
          name: "Invoice 1",
          document: "1234567890",
          street: "street 1",
          number: "123",
          complement: "Next to drugstore",
          city: "City 1",
          state: "SO",
          zipCode: "123654987",
          items: [
            {
              invoice_id: "1",
              id : productOne.id.id,
              name: "Product 1",
              price: 500,
              createdAt : productOne.createdAt,
              updatedAt: productOne.updatedAt
            },
            {
              invoice_id: "1",
              id : productTwo.id.id,
              name: "Product 2",
              price: 750,
              createdAt : productTwo.createdAt,
              updatedAt: productTwo.updatedAt
            }
          ],
        });
    });

    
    it("should find a invoice", async () => {
      const invoiceRepository = new InvoiceRepository();

      await invoiceRepository.generate(invoice);

      const result = await invoiceRepository.find("1");
   
      expect(result.id.id).toEqual("1");
      expect(result.name).toEqual("Invoice 1");
      expect(result.document).toEqual("1234567890");
      expect(result.address.street).toEqual("street 1");
      expect(result.address.complement).toEqual("Next to drugstore");
      expect(result.address.number).toEqual("123");
      expect(result.address.city).toEqual("City 1");
      expect(result.address.state).toEqual("SO");
      expect(result.address.zipCode).toEqual("123654987");

      expect(result.items.length).toBe(2);

      expect(result.items[0].id.id).toEqual("1")
      expect(result.items[0].name).toEqual("Product 1")
      expect(result.items[0].price).toEqual(500)
      expect(result.items[0].createdAt).toStrictEqual(invoice.items[0].createdAt)
      expect(result.items[0].updatedAt).toStrictEqual(invoice.items[0].updatedAt)

      expect(result.items[1].id.id).toEqual("2")
      expect(result.items[1].name).toEqual("Product 2")
      expect(result.items[1].price).toEqual(750)
      expect(result.items[1].createdAt).toStrictEqual(invoice.items[1].createdAt)
      expect(result.items[1].updatedAt).toStrictEqual(invoice.items[1].updatedAt)
  });
});