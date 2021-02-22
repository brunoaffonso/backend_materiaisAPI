import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertMaterial(
  numero_item,
  descricao,
  quantidade_ano,
  tipo_unidade,
  valor,
  comentarios
) {
  const conn = await connect();
  const sql =
    'INSERT INTO material(numero_item, descricao, quantidade_ano, tipo_unidade, valor, comentarios) VALUES (?,?,?,?,?,?);';
  const values = [
    numero_item,
    descricao,
    quantidade_ano,
    tipo_unidade,
    valor,
    comentarios,
  ];
  return await conn.query(sql, values);
}

export async function selectMaterial() {
  const conn = await connect();
  try {
    const [rows] = await conn.query('SELECT * FROM material');
    return rows;
  } catch (error) {
    console.log(error);
    const rows = [];
    return rows;
  }
}

async function deleteMaterial(id) {
  const conn = await connect();
  const sql = 'DELETE FROM material WHERE id_material=?';
  const values = [id];
  return await conn.query(sql, values);
}

async function updateMaterial(
  numero_item,
  descricao,
  quantidade_ano,
  tipo_unidade,
  valor,
  comentarios,
  id
) {
  const conn = await connect();
  const sql =
    'UPDATE material SET numero_item=?, descricao=?, quantidade_ano=?, tipo_unidade=?, valor=?, comentarios=? WHERE id_material=?';
  const values = [
    numero_item,
    descricao,
    quantidade_ano,
    tipo_unidade,
    valor,
    comentarios,
    id,
  ];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectMaterial();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const numero_item = parseInt(req.body.numero_item);
    const descricao = req.body.descricao;
    const quantidade_ano = parseInt(req.body.quantidade_ano);
    const tipo_unidade = req.body.tipo_unidade;
    const valor = req.body.valor;
    const comentarios = req.body.comentarios;
    const [rows] = await insertMaterial(
      numero_item,
      descricao,
      quantidade_ano,
      tipo_unidade,
      valor,
      comentarios
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
    const rows = await deleteMaterial(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const numero_item = parseInt(req.body.numero_item);
    const descricao = req.body.descricao;
    const quantidade_ano = parseInt(req.body.quantidade_ano);
    const tipo_unidade = req.body.tipo_unidade;
    const valor = req.body.valor;
    const comentarios = req.body.comentarios;
    const rows = await updateMaterial(
      numero_item,
      descricao,
      quantidade_ano,
      tipo_unidade,
      valor,
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
