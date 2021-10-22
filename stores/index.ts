import React from 'react';
import {
  addMiddleware, Instance, types, cast, flow, applySnapshot,
} from 'mobx-state-tree';
import axios from 'axios';
import { UserModel } from './model/User';
import { ProductModel } from './model/Product';
import { OrderModel } from './model/Order';

const userDefault = UserModel.create({});
const productDefault = ProductModel.create({});
export const CategoriyModel = types
  .model('Category model', {
    id: types.maybe(types.number),
    name: types.optional(types.string, ''),
  });

export const StoreModel = types
  .model({
    tab: types.optional(types.number, 0),
    user: types.optional(UserModel, {}),
    users: types.optional(types.array(UserModel), []),
    product: types.optional(ProductModel, {}),
    productList: types.optional(types.array(ProductModel), []),
    categories: types.optional(types.array(CategoriyModel), []),
    orderList: types.optional(types.array(OrderModel), []),
  })
  .actions((self) => ({
    setTab(value: number) {
      self.tab = value;
    },
    setUserDefault() {
      self.user = userDefault;
    },
    setProductDefault() {
      self.product = productDefault;
    },
    getAllUser: flow(function* () {
      try {
        const res = yield axios.get('/api/users');
        // const dataUser = JSON.parse(res.data);
        self.users = cast(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }),
    getAllProduct: flow(function* () {
      try {
        const res = yield axios.get('/api/products');
        // const dataUser = JSON.parse(res.data);
        self.productList = cast(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }),
    saveUser: flow(function* () {
      try {
        const res = yield axios.post('/api/add-user', { data: self.user });
        if (res.status === 200) {
          applySnapshot(self.user, userDefault);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }),
    getUserByID: flow(function* (id) {
      try {
        const res = yield axios.get(`/api/user/${id}`);
        self.user = res.data;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }),
    deleteUserByID: flow(function* (id) {
      try {
        const res = yield axios.delete(`/api/user/${id}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }),
    saveProduct: flow(function* () {
      try {
        const res = yield axios.post('/api/add-product', { data: self.product });
        if (res.status === 200) {
          applySnapshot(self.product, productDefault);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }),
    getProductsByID: flow(function* (id) {
      try {
        const res = yield axios.get(`/api/products/${id}`);
        self.product = res.data;
      } catch (error) {
        console.log(error);
      }
    }),
    getCategory: flow(function* () {
      try {
        const res = yield axios.get('/api/categories');
        self.categories = cast(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }),
    deleteProductByID: flow(function* (id) {
      try {
        const res = yield axios.delete(`/api/products/${id}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }),
    setAllOrders: flow(function* () {
      try {
        const res = yield axios.get('/api/orders');
        self.orderList = cast(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }),
  }));

const store = StoreModel.create();

addMiddleware(store, (call, next) => {
  if (call.type === 'flow_resume_error') {
    try {
      next(call);
    } catch (err) {
      const error = err?.response?.data?.msg;
      console.log(error);
    }
  }
  return next(call);
});

const StoreContext = React.createContext<IStoreModel>(store);

export { store, StoreContext };

export interface IStoreModel extends Instance<typeof StoreModel> {}
