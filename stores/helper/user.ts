import axios from 'axios';
import { IUserModel } from 'stores/model/User';

const getAllUsers = async () => {
  const res = await axios.get('/api/users');
  const data = res.data as IUserModel[];
  return data;
};

export { getAllUsers };
