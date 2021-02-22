import express from 'express';
import cors from 'cors';
import unidadeRouter from './routes/unidade.js';
import departamentoRouter from './routes/departamento.js';
import setorRouter from './routes/setor.js';
import contratoRouter from './routes/contrato.js';
import vigenciaRouter from './routes/vigencia.js';
import materialRouter from './routes/material.js';
import estoqueRouter from './routes/estoque.js';
import servicoRouter from './routes/servico.js';
import matservRouter from './routes/matServ.js';
import dataRouter from './routes/data.js';
import userRouter from './routes/user.js';

// import * as db from './db';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/unidade', unidadeRouter);
app.use('/departamento', departamentoRouter);
app.use('/setor', setorRouter);
app.use('/contrato', contratoRouter);
app.use('/vigencia', vigenciaRouter);
app.use('/material', materialRouter);
app.use('/estoque', estoqueRouter);
app.use('/servico', servicoRouter);
app.use('/matserv', matservRouter);
app.use('/data', dataRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log('API Started.');
});
