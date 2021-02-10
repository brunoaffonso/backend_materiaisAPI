import mysql from 'mysql2/promise';

export async function connect() {
  if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;

  const connection = await mysql.createConnection(
    'mysql://netiot69_api:ehsDyrk8235eAUGd@192.185.211.159:3306/netiot69_materiais'
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
