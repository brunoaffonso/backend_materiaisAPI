import express from 'express';
import unidadeRouter from './routes/unidade';
import departamentoRouter from './routes/departamento';
import setorRouter from './routes/setor';
import contratoRouter from './routes/contrato';
import materialRouter from './routes/material';
import estoqueRouter from './routes/estoque';
import servicoRouter from './routes/servico';
import matservRouter from './routes/matServ';

// import * as db from './db';

const app = express();
const port = 3001;

app.use(express.json());
app.use('/unidade', unidadeRouter);
app.use('/departamento', departamentoRouter);
app.use('/setor', setorRouter);
app.use('/contrato', contratoRouter);
app.use('/material', materialRouter);
app.use('/estoque', estoqueRouter);
app.use('/servico', servicoRouter);
app.use('/matserv', matservRouter);

app.listen(port, () => {
  console.log('API Started.');
});
