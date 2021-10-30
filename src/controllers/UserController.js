import {
  getUserQuery,
  createUserQuery,
  deleteUserQuery,
  updateUserQuery,
} from '../models/UserModel';
import { debugLogger } from '../util/log';

export const getUser = async (id) => {
  debugLogger.info(`grabbing data for user:${id}`);
  const res = await getUserQuery(id);

  if (!res) {
    debugLogger.warn(`couldnt find user:${id}`);
    throw new Error('get user query error');
  }
  return res;
};

export const createUser = async (name) => {
  // TODO: procedure to check if user is already saved
  debugLogger.info(`creating user:${name}`);
  const res = await createUserQuery(name);

  if (!res && res.affectedRows == 1) {
    debugLogger.warn(`couldnt create user:${name}`);
    throw new Error('create user query error');
  }
  return res;
};

export const deleteUser = async (id) => {
  debugLogger.info(`deleting ID:${id}`);
  const res = await deleteUserQuery(id);
  const result = res && res.affectedRows == 1;

  if (!result) {
    debugLogger.warn(`user:${id} not deleted`);
    throw new Error('delete user query error');
  }
  return result;
};

export const updateUser = async (id, name) => {
  debugLogger.info(`updating user:${id}`);
  const res = await updateUserQuery(id, name);
  const result = res && res.affectedRows == 1;

  if (!result) {
    debugLogger.warn(`user:${id} not updated}`);
    throw new Error('update user query error');
  }
  return result;
};
