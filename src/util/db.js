import * as mysql from 'mysql2/promise';
import { debugLogger } from './log';
import dotenv from 'dotenv';
dotenv.config();

const args = {
  host: process.env.DB_CONNECT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
debugLogger.debug(`Creating sql connection.. with special args ${JSON.stringify(args)}`);

const connection = mysql.createPool(args);

export const runDbQueryStatement = async (sql, argArray) => {
  // Run a db query
  // mysql2/promise has a nasty return of 2 arrays :/
  let res = null;
  debugLogger.debug(` QUERY: ${sql}`);
  try {
    const [rows] = await connection.query(sql, argArray);
    res = rows;
  } catch (e) {
    // console.log(e);
    debugLogger.error(e);
  }
  debugLogger.debug('query results:', res);
  return res;
};

export const runDbInsert = async (sql, argArray) => {
  // There is a diffent result spape for inserts vs queries so we gotta make a new procedure
  // mysql2/promise return on an insert looks like:
  /*
    [
    ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 602,
        info: '',
        serverStatus: 2,
        warningStatus: 0
    },
    undefined
    ]
  */
  let res = null;
  debugLogger.debug(` INSERT: ${sql}`);
  try {
    [res] = await connection.query(sql, argArray);
  } catch (e) {
    debugLogger.error(e);
    throw (e);
    // throw(e);
  }
  debugLogger.debug('insert results: ', res);
  return res;
};
