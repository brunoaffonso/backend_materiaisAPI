import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertDepartamento(name, unidade) {
  const conn = await connect();
  const sql = 'INSERT INTO departamento(name, unidade) VALUES (?,?);';
  const values = [name, unidade];
  return await conn.query(sql, values);
}

async function selectDepartamento() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM departamento');
  return rows;
}

async function deleteDepartamento(id) {
  const conn = await connect();
  const sql = 'DELETE FROM departamento WHERE id_departamento=?';
  const values = [id];
  return await conn.query(sql, values);
}
async function updateDepartamento(id, name, unidade) {
  const conn = await connect();
  const sql =
    'UPDATE departamento SET name=?, unidade=? WHERE id_departamento=?';
  const values = [name, unidade, id];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectDepartamento();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const name = req.body.name;
    const unidade = parseInt(req.body.unidade);
    const [rows] = await insertDepartamento(name, unidade);
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
    const rows = await deleteDepartamento(id);
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
    const unidade = parseInt(req.body.unidade);
    const rows = await updateDepartamento(id, name, unidade);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
