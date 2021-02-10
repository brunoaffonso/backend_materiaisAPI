import mysql from 'mysql2/promise';
import { user, pass, ip, port, db } from './dbAccess.js';

export async function connect() {
  if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  const connection = await mysql.createConnection(
    `mysql://${user}:${pass}@${ip}:${port}/${db}`
  );
  console.log('Connected');
  global.connection = connection;
  return connection;
}

// connect();

// const res = async () => {
//   console.log(await selectUnidade());
// };

// res();
