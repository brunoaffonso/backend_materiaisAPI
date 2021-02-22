import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertVigencia(
  contrato,
  renovacao,
  inicio,
  fim,
  bdi,
  descricao
) {
  const conn = await connect();
  const sql =
    'INSERT INTO vigencia(contrato, renovacao, inicio, fim, bdi, descricao) VALUES (?,?,?,?,?,?);';
  const values = [contrato, renovacao, inicio, fim, bdi, descricao];
  return await conn.query(sql, values);
}

export async function selectVigencia() {
  const conn = await connect();
  try {
    const [rows] = await conn.query('SELECT * FROM vigencia');
    return rows;
  } catch (error) {
    console.log(error);
    const rows = [];
    return rows;
  }
}

async function deleteVigencia(id) {
  const conn = await connect();
  const sql = 'DELETE FROM vigencia WHERE id_vigencia=?';
  const values = [id];
  return await conn.query(sql, values);
}

async function updateVigencia(
  id,
  contrato,
  renovacao,
  inicio,
  fim,
  bdi,
  descricao
) {
  const conn = await connect();
  const sql =
    'UPDATE vigencia SET contrato=?, renovacao=?, inicio=?, fim=?, bdi=?, descricao=? WHERE id_vigencia=?';
  const values = [contrato, renovacao, inicio, fim, bdi, descricao, id];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectVigencia();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const contrato = parseInt(req.body.contrato);
    const renovacao = req.body.renovacao;
    const inicio = req.body.inicio;
    const fim = req.body.fim;
    const bdi = req.body.bdi;
    const descricao = req.body.descricao;

    const [rows] = await insertVigencia(
      contrato,
      renovacao,
      inicio,
      fim,
      bdi,
      descricao
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
    const rows = await deleteVigencia(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const contrato = parseInt(req.body.contrato);
    const renovacao = req.body.renovacao;
    const inicio = req.body.inicio;
    const fim = req.body.fim;
    const bdi = req.body.bdi;
    const descricao = req.body.descricao;
    const rows = await updateVigencia(
      id,
      contrato,
      renovacao,
      inicio,
      fim,
      bdi,
      descricao
    );
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
