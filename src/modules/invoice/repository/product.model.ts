import { AllowNull } from 'sequelize-typescript';
import InvoiceModel from './invoice.model';
import {
    Table,
    Model,
    PrimaryKey,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from "sequelize-typescript";

  
  @Table({
    tableName: "products",
    timestamps: false,
  })
  export default class ProductModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoice_id: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice: ProductModel;
    @Column({ allowNull: false })
    declare name: string;
    @Column({ allowNull: false })
    declare price: number;
    @Column({ allowNull: false })
    declare createdAt: Date;
    @Column({ allowNull: false })
    declare updatedAt: Date;
  }