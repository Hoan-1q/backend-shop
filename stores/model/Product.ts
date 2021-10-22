import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { str2Num } from 'stores/helper/ultil';

export const ProductModel = types
  .model('Product model', {
    id: types.maybe(types.number),
    title: types.optional(types.string, ''),
    avatar: types.optional(types.string, ''),
    images: types.optional(types.array(types.string), []),
    price: types.maybeNull(types.number),
    amount: types.maybeNull(types.number),
    sumary: types.optional(types.string, ''),
    content: types.optional(types.string, ''),
    category: types.optional(types.number, 0),
  })
  .actions((self) => ({
    setTitle(value: string) {
      self.title = value;
    },
    setCategory(value: any) {
      self.category = Number(value);
    },
    removeImage(index: number) {
      self.images.splice(index, 1);
    },
    addImage(value: string) {
      self.images.push(value);
    },
    setAvatar(value: string) {
      self.avatar = value;
    },
    setPrice(value: string) {
      self.price = str2Num(value);
    },
    setAmount(value: string) {
      self.amount = str2Num(value);
    },
    setSumary(value: string) {
      self.sumary = value;
    },
    setContent(value: string) {
      self.content = value;
    },
  }));

export interface IProductModel extends Instance<typeof ProductModel> {}
export interface IProductModelOut extends SnapshotOut<typeof ProductModel> {}
