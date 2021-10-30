import { runDbQueryStatement, runDbInsert } from '../util/db';

const mapDBUserToObject = (a) => {
  let res = null;

  if (a) {
    res = {
      id: a.USER_ID,
      name: a.NAME,
    };
  }
  return res;
};

// TODO: I would definitely write stored procedures in a seperate file rather than raw SQL in JS
export const getUserQuery = async (id) => {
  const queryString = 'SELECT * FROM USERS WHERE USER_ID=?;';
  const dbUser = await runDbQueryStatement(queryString, [Number(id)]);
  return dbUser.map((a) => mapDBUserToObject(a));
};

export const createUserQuery = (name) => {
  const queryString = 'INSERT INTO USERS (NAME) VALUES (?);';
  return runDbInsert(queryString, [name]);
};

export const deleteUserQuery = (id) => {
  const queryString = 'DELETE FROM USERS WHERE USER_ID=?;';
  return runDbQueryStatement(queryString, [Number(id)]);
};

export const updateUserQuery = (id, name) => {
  const queryString = 'UPDATE USERS SET NAME=? WHERE USER_ID=?;';
  return runDbQueryStatement(queryString, [name, Number(id)]);
};
