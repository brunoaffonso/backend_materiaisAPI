import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertSetor(name, departamento) {
  const conn = await connect();
  const sql = 'INSERT INTO setor(name, departamento) VALUES (?,?);';
  const values = [name, departamento];
  return await conn.query(sql, values);
}

async function selectSetor() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM setor');
  return rows;
}

async function deleteSetor(id) {
  const conn = await connect();
  const sql = 'DELETE FROM setor WHERE id_setor=?';
  const values = [id];
  return await conn.query(sql, values);
}
async function updateSetor(id, name, unidade) {
  const conn = await connect();
  const sql = 'UPDATE setor SET name=?, departamento=? WHERE id_setor=?';
  const values = [name, unidade, id];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectSetor();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const name = req.body.name;
    const departamento = parseInt(req.body.departamento);
    const [rows] = await insertSetor(name, departamento);
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
    const rows = await deleteSetor(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.patch('/:id/:name/:departamento', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const name = req.params.name;
    const departamento = parseInt(req.params.departamento);
    const rows = await updateSetor(id, name, departamento);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
