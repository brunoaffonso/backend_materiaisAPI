import express from 'express';
import { connect } from '../db.js';

const router = express.Router();

async function usersList() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM users');
  return rows;
}

async function insertUser(first_name, last_name, email, password) {
  const conn = await connect();
  const sql =
    'INSERT INTO users(first_name, last_name, email, password) VALUES (?,?,?,?);';
  const values = [first_name, last_name, email, password];
  return await conn.query(sql, values);
}

export async function selectUser() {
  const conn = await connect();
  try {
    const [rows] = await conn.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.log(error);
    const rows = [];
    return rows;
  }
}

async function updateUser(id, first_name, last_name, email, password) {
  const conn = await connect();
  const sql =
    'UPDATE users SET first_name=?, last_name=?, email=?, password=? WHERE id_user=?';
  const values = [first_name, last_name, email, password, id];
  return await conn.query(sql, values);
}

async function deleteUser(id) {
  const conn = await connect();
  const sql = 'DELETE FROM users WHERE id_user=?';
  const values = [id];
  return await conn.query(sql, values);
}

router.post('/authenticate', async function (req, res) {
  const users = usersList();
  const { email, password } = req.body;

  const user = await usersList.findOne({ email }).select('+password');
});

router.post('/register', async function (req, res) {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const [rows] = await insertUser(first_name, last_name, email, password);
    const id = JSON.stringify(rows.insertId);
    res.send(id);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/', async function (req, res) {
  try {
    const rows = await selectUser();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/', async function (req, res) {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const [rows] = await insertUser(first_name, last_name, email, password);
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
    const rows = await deleteUser(id);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const rows = await updateUser(id, first_name, last_name, email, password);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
