import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertMatServ(numero_rs, material, quantidade, comentarios) {
  const conn = await connect();
  const sql =
    'INSERT INTO mat_serv(numero_rs, material, quantidade, comentarios) VALUES (?,?,?,?);';
  const values = [numero_rs, material, quantidade, comentarios];
  return await conn.query(sql, values);
}

async function selectMatServ() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM mat_serv');
  return rows;
}

async function deleteMatServ(id) {
  const conn = await connect();
  const sql = 'DELETE FROM mat_serv WHERE id_mat_serv=?';
  const values = [id];
  return await conn.query(sql, values);
}

async function updateMatServ(numero_rs, material, quantidade, comentarios, id) {
  const conn = await connect();
  const sql =
    'UPDATE mat_serv SET numero_rs=?, material=?, quantidade=?, comentarios=? WHERE id_mat_serv=?';
  const values = [numero_rs, material, quantidade, comentarios, id];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectMatServ();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const numero_rs = parseInt(req.body.numero_rs);
    const material = parseInt(req.body.material);
    const quantidade = parseInt(req.body.quantidade);
    const comentarios = req.body.comentarios;
    const [rows] = await insertMatServ(
      numero_rs,
      material,
      quantidade,
      comentarios
    );
    const id = JSON.stringify(rows.insertId);
    res.send(id);
    console.log([
      numero_item,
      descricao,
      quantidade_ano,
      tipo_unidade,
      valor,
      comentarios,
    ]);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await deleteMatServ(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const numero_rs = parseInt(req.body.numero_rs);
    const material = parseInt(req.body.material);
    const quantidade = parseInt(req.body.quantidade);
    const comentarios = req.body.comentarios;
    const rows = await updateMatServ(
      numero_rs,
      material,
      quantidade,
      comentarios,
      id
    );
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
