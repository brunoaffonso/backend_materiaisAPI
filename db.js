import mysql from 'mysql2/promise';

export async function connect() {
  if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  const connection = await mysql.createConnection(
    'mysql://api:123456@localhost:3306/db_materiais'
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
