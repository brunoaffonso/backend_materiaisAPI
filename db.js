import mysql from 'mysql2/promise';
import { user, pass, ip, port, db } from './dbAccess.js';

async function connectDb() {
  const connection = await mysql.createConnection(
    `mysql://${user}:${pass}@${ip}:${port}/${db}`
  );
  global.connection = connection;
  return connection;
}

export async function connect() {
  if (global.connection && connection.connection._fatalError === null) {
    console.log(connection.connection._fatalError);
    console.log('OK');
    // return connectDb();
    return global.connection;
  } else {
    await connectDb();
    connect();
  }

  console.log('Connected');
  return connectDb();
}

export async function close() {
  global.connection.destroy();
}

// connect();

// const res = async () => {
//   console.log(await selectUnidade());
// };

// res();
