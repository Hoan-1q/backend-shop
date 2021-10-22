import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const UserModel = types
  .model('User model', {
    id: types.maybe(types.number),
    username: types.optional(types.string, ''),
    name: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    phone: types.maybeNull(types.string),
    address: types.optional(types.string, ''),
    avatar: types.maybeNull(types.string),
    email: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setUsername(username: string) {
      self.username = username;
    },
    setName(value: string) {
      self.name = value;
    },
    setPassword(value: string) {
      self.password = value;
    },
    setPhone(value: string) {
      self.phone = value;
    },
    setAddress(value: string) {
      self.address = value;
    },
    setAvatar(value: string) {
      self.avatar = value;
    },
    setEmail(value: string) {
      self.email = value;
    },
  }));

export interface IUserModel extends Instance<typeof UserModel> {}
export interface IUserModelOut extends SnapshotOut<typeof UserModel> {}
