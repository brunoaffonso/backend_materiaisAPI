import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertContrato(
  numero,
  ano,
  renovacao,
  inicio,
  fim,
  bdi,
  descricao
) {
  const conn = await connect();
  const sql =
    'INSERT INTO contrato(numero, ano, renovacao, inicio, fim, bdi, descricao) VALUES (?,?,?,?,?,?,?);';
  const values = [numero, ano, renovacao, inicio, fim, bdi, descricao];
  return await conn.query(sql, values);
}

async function selectContrato() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM contrato');
  return rows;
}

async function deleteContrato(id) {
  const conn = await connect();
  const sql = 'DELETE FROM contrato WHERE id_contrato=?';
  const values = [id];
  return await conn.query(sql, values);
}

async function updateContrato(
  id,
  numero,
  ano,
  renovacao,
  inicio,
  fim,
  bdi,
  descricao
) {
  const conn = await connect();
  const sql =
    'UPDATE contrato SET numero=?, ano=?, renovacao=?, inicio=?, fim=?, bdi=?, descricao=? WHERE id_contrato=?';
  const values = [numero, ano, renovacao, inicio, fim, bdi, descricao, id];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectContrato();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const numero = parseInt(req.body.numero);
    const ano = parseInt(req.body.ano);
    const renovacao = req.body.renovacao;
    const inicio = req.body.inicio;
    const fim = req.body.fim;
    const bdi = req.body.bdi;
    const descricao = req.body.descricao;

    const [rows] = await insertContrato(
      numero,
      ano,
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
    const rows = await deleteContrato(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const numero = parseInt(req.body.numero);
    const ano = parseInt(req.body.ano);
    const renovacao = req.body.renovacao;
    const inicio = req.body.inicio;
    const fim = req.body.fim;
    const bdi = req.body.bdi;
    const descricao = req.body.descricao;
    const rows = await updateContrato(
      id,
      numero,
      ano,
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
