import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function insertEstoque(
  material,
  fabricante,
  modelo,
  numero_serie,
  desenho,
  data_entrada,
  data_saida,
  localizacao,
  responsavel_retirada,
  info,
  em_estoque
) {
  const conn = await connect();
  const sql =
    'INSERT INTO estoque(material, fabricante, modelo, numero_serie, desenho, data_entrada, data_saida, localizacao, responsavel_retirada, info, em_estoque) VALUES (?,?,?,?,?,?,?,?,?,?,?);';
  const values = [
    material,
    fabricante,
    modelo,
    numero_serie,
    desenho,
    data_entrada,
    data_saida,
    localizacao,
    responsavel_retirada,
    info,
    em_estoque,
  ];
  return await conn.query(sql, values);
}

async function selectEstoque() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM estoque');
  return rows;
}

async function deleteEstoque(id) {
  const conn = await connect();
  const sql = 'DELETE FROM estoque WHERE id_estoque=?';
  const values = [id];
  return await conn.query(sql, values);
}

async function updateEstoque(
  material,
  fabricante,
  modelo,
  numero_serie,
  desenho,
  data_entrada,
  data_saida,
  localizacao,
  responsavel_retirada,
  info,
  em_estoque,
  id
) {
  const conn = await connect();
  const sql =
    'UPDATE estoque SET material=?, fabricante=?, modelo=?, numero_serie=?, desenho=?, data_entrada=?, data_saida=?, localizacao=?, responsavel_retirada=?, info=?, em_estoque=? WHERE id_estoque=?';
  const values = [
    material,
    fabricante,
    modelo,
    numero_serie,
    desenho,
    data_entrada,
    data_saida,
    localizacao,
    responsavel_retirada,
    info,
    em_estoque,
    id,
  ];
  return await conn.query(sql, values);
}

router.get('/', async function (req, res) {
  try {
    const rows = await selectEstoque();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const material = parseInt(req.body.material);
    const fabricante = req.body.fabricante;
    const modelo = req.body.modelo;
    const numero_serie = req.body.numero_serie;
    const desenho = req.body.desenho;
    const data_entrada = req.body.data_entrada;
    const data_saida = req.body.data_saida;
    const localizacao = req.body.localizacao;
    const responsavel_retirada = req.body.responsavel_retirada;
    const info = req.body.info;
    const em_estoque = parseInt(req.body.em_estoque);
    const [rows] = await insertEstoque(
      material,
      fabricante,
      modelo,
      numero_serie,
      desenho,
      data_entrada,
      data_saida,
      localizacao,
      responsavel_retirada,
      info,
      em_estoque
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
    const rows = await deleteEstoque(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const material = parseInt(req.body.material);
    const fabricante = req.body.fabricante;
    const modelo = req.body.modelo;
    const numero_serie = req.body.numero_serie;
    const desenho = req.body.desenho;
    const data_entrada = req.body.data_entrada;
    const data_saida = req.body.data_saida;
    const localizacao = req.body.localizacao;
    const responsavel_retirada = req.body.responsavel_retirada;
    const info = req.body.info;
    const em_estoque = parseInt(req.body.em_estoque);
    const rows = await updateEstoque(
      material,
      fabricante,
      modelo,
      numero_serie,
      desenho,
      data_entrada,
      data_saida,
      localizacao,
      responsavel_retirada,
      info,
      em_estoque,
      id
    );
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
