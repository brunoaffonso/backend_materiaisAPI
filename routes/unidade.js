import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertUnidade(name) {
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

async function updateUnidade(id, name) {
  const conn = await connect();
  const sql = 'UPDATE unidade SET name=? WHERE id_unidade=?';
  const values = [name, id];
  return await conn.query(sql, values);
}

async function deleteUnidade(id) {
  const conn = await connect();
  const sql = 'DELETE FROM unidade WHERE id_unidade=?';
  const values = [id];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectUnidade();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const [rows] = await insertUnidade(req.body.name);
    const id = JSON.stringify(rows.insertId);
    res.send(id);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await deleteUnidade(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const rows = await updateUnidade(id, name);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
