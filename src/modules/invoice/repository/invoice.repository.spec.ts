import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice";
import Product from "../domain/entity/product";
import Address from "../domain/value-object/address.value-object";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import ProductModel from './product.model';


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
        ProductModel
      ]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a new order", async () => {
        const invoiceRepository = new InvoiceRepository();
        
        await ProductModel.create({
            id: productOne.id.id,
            name: productOne.name,
            price: productOne.price,
            createdAt: productOne.createdAt,
            updatedAt: productOne.updatedAt
        })
 
        await ProductModel.create({
            id: productTwo.id.id,
            name: productTwo.name,
            price: productTwo.price,
            createdAt: productTwo.createdAt,
            updatedAt: productTwo.updatedAt
        })

        await invoiceRepository.create(invoice);
    

        const orderModel = await InvoiceModel.findOne({
          where: { id: invoice.id.id},
          include: ["items"],
        });
    })
})