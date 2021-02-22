import express from 'express';
import { connect } from '../db.js';
// import { selectContrato } from './contrato.js';
// import { selectDepartamento } from './departamento.js';
// import { selectEstoque } from './estoque.js';
// import { selectMaterial } from './material.js';
// import { selectMatServ } from './matServ.js';
// import { selectServico } from './servico.js';
// import { selectSetor } from './setor.js';
// import { selectUnidade } from './unidade.js';
// import { selectVigencia } from './vigencia.js';

const router = express.Router();

export async function getData() {
  try {
    const conn = await connect();
    const [contrato] = await conn.query('SELECT * FROM contrato');
    const [departamento] = await conn.query('SELECT * FROM departamento');
    const [estoque] = await conn.query('SELECT * FROM estoque');
    const [material] = await conn.query('SELECT * FROM material');
    const [matServ] = await conn.query('SELECT * FROM mat_serv');
    const [servico] = await conn.query('SELECT * FROM servico');
    const [setor] = await conn.query('SELECT * FROM setor');
    const [unidade] = await conn.query('SELECT * FROM unidade');
    const [vigencia] = await conn.query('SELECT * FROM vigencia');

    const fullServices = servico.map((s) => {
      const reqs = matServ
        .filter((m) => m.numero_rs === s.id_servico)
        .map((s) => {
          const [matDesc] = material.filter(
            (material) => material.id_material === s.material
          );
          return {
            id_mat_serv: s.id_mat_serv,
            numero_rs: s.numero_rs,
            material: s.material,
            descricao: matDesc,
            quantidade: s.quantidade,
            comentarios: s.comentarios,
          };
        });
      const [unid] = unidade.filter((u) => u.id_unidade === s.unidade);
      const [depto] = departamento.filter(
        (u) => u.id_departamento === s.departamento
      );
      const [setr] = setor.filter((u) => u.id_setor === s.setor);
      return {
        id_servico: s.id_servico,
        numero_rs: s.numero_rs,
        numero_os: s.numero_os,
        data_abertura: s.data_abertura,
        data_fechamento: s.data_fechamento,
        unidade: s.unidade,
        unidadeName: unid.name,
        departamento: s.departamento,
        departamentoName: depto.name,
        setor: s.setor,
        setorName: setr.name,
        obs: s.obs,
        custo: s.custo,
        reqs,
      };
    });

    const rows = {
      contrato,
      departamento,
      estoque,
      material,
      matServ,
      servico,
      setor,
      unidade,
      vigencia,
      fullServices,
    };

    // console.log(rows);
    // console.log(fullServices);

    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// export async function getFullServices() {
//   const conn = await connect();
//   const [departamento] = await conn.query('SELECT * FROM departamento');
//   const [material] = await conn.query('SELECT * FROM material');
//   const [matServ] = await conn.query('SELECT * FROM mat_serv');
//   const [servico] = await conn.query('SELECT * FROM servico');
//   const [setor] = await conn.query('SELECT * FROM setor');
//   const [unidade] = await conn.query('SELECT * FROM unidade');
//   const res = servico.map((s) => {
//     const reqs = matServ
//       .filter((m) => m.numero_rs === s.id_servico)
//       .map((s) => {
//         const [matDesc] = material.filter(
//           (material) => material.id_material === s.material
//         );
//         return {
//           id_mat_serv: s.id_mat_serv,
//           numero_rs: s.numero_rs,
//           material: s.material,
//           descricao: matDesc,
//           quantidade: s.quantidade,
//           comentarios: s.comentarios,
//         };
//       });
//     const [unid] = unidade.filter((u) => u.id_unidade === s.unidade);
//     const [depto] = departamento.filter(
//       (u) => u.id_departamento === s.departamento
//     );
//     const [setr] = setor.filter((u) => u.id_setor === s.setor);
//     return {
//       id_servico: s.id_servico,
//       numero_rs: s.numero_rs,
//       numero_os: s.numero_os,
//       data_abertura: s.data_abertura,
//       data_fechamento: s.data_fechamento,
//       unidade: s.unidade,
//       unidadeName: unid.name,
//       departamento: s.departamento,
//       departamentoName: depto.name,
//       setor: s.setor,
//       setorName: setr.name,
//       obs: s.obs,
//       custo: s.custo,
//       reqs,
//     };
//   });
//   return res;
// }

// router.get('/', async function (req, res) {
//   try {
//     const contrato = await selectContrato();
//     const departamento = await selectDepartamento();
//     const estoque = await selectEstoque();
//     const material = await selectMaterial();
//     const matServ = await selectMatServ();
//     const servico = await selectServico();
//     const setor = await selectSetor();
//     const unidade = await selectUnidade();
//     const vigencia = await selectVigencia();
//     const fullServices = await getFullServices();
//     const rows = {
//       contrato,
//       departamento,
//       estoque,
//       material,
//       matServ,
//       servico,
//       setor,
//       unidade,
//       vigencia,
//       fullServices,
//     };
//     res.send(rows);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

// router.get('/', async function (req, res) {
//   try {
//     const conn = await connect();
//     const [contrato] = await conn.query('SELECT * FROM contrato');
//     const [departamento] = await conn.query('SELECT * FROM departamento');
//     const [estoque] = await conn.query('SELECT * FROM estoque');
//     const [material] = await conn.query('SELECT * FROM material');
//     const [matServ] = await conn.query('SELECT * FROM mat_serv');
//     const [servico] = await conn.query('SELECT * FROM servico');
//     const [setor] = await conn.query('SELECT * FROM setor');
//     const [unidade] = await conn.query('SELECT * FROM unidade');
//     const [vigencia] = await conn.query('SELECT * FROM vigencia');

//     const fullServices = servico.map((s) => {
//       const reqs = matServ
//         .filter((m) => m.numero_rs === s.id_servico)
//         .map((s) => {
//           const [matDesc] = material.filter(
//             (material) => material.id_material === s.material
//           );
//           return {
//             id_mat_serv: s.id_mat_serv,
//             numero_rs: s.numero_rs,
//             material: s.material,
//             descricao: matDesc,
//             quantidade: s.quantidade,
//             comentarios: s.comentarios,
//           };
//         });
//       const [unid] = unidade.filter((u) => u.id_unidade === s.unidade);
//       const [depto] = departamento.filter(
//         (u) => u.id_departamento === s.departamento
//       );
//       const [setr] = setor.filter((u) => u.id_setor === s.setor);
//       return {
//         id_servico: s.id_servico,
//         numero_rs: s.numero_rs,
//         numero_os: s.numero_os,
//         data_abertura: s.data_abertura,
//         data_fechamento: s.data_fechamento,
//         unidade: s.unidade,
//         unidadeName: unid.name,
//         departamento: s.departamento,
//         departamentoName: depto.name,
//         setor: s.setor,
//         setorName: setr.name,
//         obs: s.obs,
//         custo: s.custo,
//         reqs,
//       };
//     });

//     const rows = {
//       contrato,
//       departamento,
//       estoque,
//       material,
//       matServ,
//       servico,
//       setor,
//       unidade,
//       vigencia,
//       fullServices,
//     };
//     res.send(rows);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

router.get('/', async function (req, res) {
  try {
    const rows = await getData();
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;
