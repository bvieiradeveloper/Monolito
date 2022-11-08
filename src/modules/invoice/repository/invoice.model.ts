import { BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";


@Table({
    tableName: "invoices",
    timestamps: false,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare  id: string;
    @Column({ allowNull: false })
    declare  name: string;
    @Column({ allowNull: false })
    declare  document: string;
    @Column({ allowNull: false })
    declare  street: string;
    @Column({ allowNull: false })
    declare  number: string;
    @Column({ allowNull: false })
    declare  complement: string;
    @Column({ allowNull: false })
    declare  city: string;
    @Column({ allowNull: false })
    declare  state: string;
    @Column({ allowNull: false })
    declare  zipCode: string;
    @HasMany(() => ProductModel,{ foreignKey: 'invoice_id'})
    declare  items: ProductModel[];
};

