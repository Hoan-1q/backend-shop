import { Instance, SnapshotOut, types } from 'mobx-state-tree';

const ProductOrderModel = types
  .model('Order model', {
    product_name: types.optional(types.string, ''),
    product_price: types.optional(types.number, 0),
    quantity: types.optional(types.number, 0),
  })
  .actions((self) => ({
    setProductOrderName(value: string) {
      self.product_name = value;
    },
    setProductOrderPice(value: number) {
      self.product_price = value;
    },
    setquantity(value: number) {
      self.quantity = value;
    },
  }));

export const OrderModel = types
  .model('Order model', {
    id: types.maybe(types.number),
    name: types.optional(types.string, ''),
    mobile: types.optional(types.string, ''),
    address: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    price_total: types.optional(types.number, 0),
    products: types.optional(types.array(ProductOrderModel), []),
  });

export interface IOrderModel extends Instance<typeof OrderModel> {}
export interface IOrderModelOut extends SnapshotOut<typeof OrderModel> {}
