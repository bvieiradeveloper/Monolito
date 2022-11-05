import InvoiceModel from './invoice.model';
import ProductModel from './product.model';
import Invoice from '../domain/entity/invoice';
export default class InvoiceRepository {
    async create(entity: Invoice): Promise<void> {
      await InvoiceModel.create(
        {
          id: entity.id,
          name: entity.name,
          document: entity.name,
          street: entity.address.street,
          number: entity.address.number,
          complement: entity.address.complement,
          city: entity.address.city,
          state: entity.address.state,
          zipCode: entity.address.zipCode,
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
          })),
        },
        {
          include: [{ model: ProductModel }],
        }
      );
    }
  }
