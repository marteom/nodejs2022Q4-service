import { UserModel } from '../user.model';
import { v4 as uuidv4 } from 'uuid';

export const getUser = async (
  userLogin: string,
  userPassword: string,
): Promise<UserModel> => {
  const userModel = new UserModel();
  userModel.id = uuidv4();
  userModel.login = userLogin;
  userModel.password = userPassword;
  userModel.version = 1;
  userModel.createdAt = Date.now();
  userModel.updatedAt = Date.now();

  return userModel;
};
