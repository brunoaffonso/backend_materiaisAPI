import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertServico(
  numero_rs,
  numero_os,
  data_abertura,
  data_fechamento,
  unidade,
  departamento,
  setor,
  obs,
  custo
) {
  const conn = await connect();
  const sql =
    'INSERT INTO servico(numero_rs, numero_os, data_abertura, data_fechamento, unidade, departamento, setor, obs, custo) VALUES (?,?,?,?,?,?,?,?,?);';
  const values = [
    numero_rs,
    numero_os,
    data_abertura,
    data_fechamento,
    unidade,
    departamento,
    setor,
    obs,
    custo,
  ];
  return await conn.query(sql, values);
}

async function selectServico() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM servico');
  return rows;
}

async function deleteServico(id) {
  const conn = await connect();
  const sql = 'DELETE FROM servico WHERE id_servico=?';
  const values = [id];
  return await conn.query(sql, values);
}

async function updateServico(
  numero_rs,
  numero_os,
  data_abertura,
  data_fechamento,
  unidade,
  departamento,
  setor,
  obs,
  custo,
  id
) {
  const conn = await connect();
  const sql =
    'UPDATE servico SET numero_rs=?, numero_os=?, data_abertura=?, data_fechamento=?, unidade=?, departamento=?, setor=?, obs=?, custo=? WHERE id_servico=?';
  const values = [
    numero_rs,
    numero_os,
    data_abertura,
    data_fechamento,
    unidade,
    departamento,
    setor,
    obs,
    custo,
    id,
  ];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectServico();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const numero_rs = parseInt(req.body.numero_rs);
    const numero_os = parseInt(req.body.numero_os);
    const data_abertura = req.body.data_abertura;
    const data_fechamento = req.body.data_fechamento;
    const unidade = parseInt(req.body.unidade);
    const departamento = parseInt(req.body.departamento);
    const setor = parseInt(req.body.setor);
    const obs = req.body.obs;
    const custo = req.body.custo;
    const [rows] = await insertServico(
      numero_rs,
      numero_os,
      data_abertura,
      data_fechamento,
      unidade,
      departamento,
      setor,
      obs,
      custo
    );
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
    const rows = await deleteServico(id);
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
    const numero_os = parseInt(req.body.numero_os);
    const data_abertura = req.body.data_abertura;
    const data_fechamento = req.body.data_fechamento;
    const unidade = parseInt(req.body.unidade);
    const departamento = parseInt(req.body.departamento);
    const setor = parseInt(req.body.setor);
    const obs = req.body.obs;
    const custo = req.body.custo;
    const rows = await updateServico(
      numero_rs,
      numero_os,
      data_abertura,
      data_fechamento,
      unidade,
      departamento,
      setor,
      obs,
      custo,
      id
    );
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
