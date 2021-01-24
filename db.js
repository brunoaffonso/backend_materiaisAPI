import mysql from 'mysql2/promise';

async function connect() {
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

export async function insertUnidade(name) {
  const conn = await connect();
  const sql = 'INSERT INTO unidade(name) VALUES (?);';
  const values = [name];
  return await conn.query(sql, values);
}

export async function selectUnidade() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM unidade');
  return rows;
}

const res = async () => {
  console.log(await selectUnidade());
};

res();
