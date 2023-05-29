const express = require('express');
const router = express.Router();
const mysqlConnection = require('../DataBases/cnxDash');
const sqlConnection = require('../DataBases/cnxHgi');
const tercerosService = require('../Services/tercerosService');
const service = new tercerosService();
//consultar tercero por Id o por nombre
router.get('/:id', async (req,res) =>{
    const {id}= req.params;
    const tercero = await service.buscarTerceroPorId(id);
    res.json(tercero);
});
// consulta cliente por Id  para relacionar los datos con el nuevo pedido a crear
router.get('/:id/datos', async (req,res) =>{
    const {id}= req.params;
    const tercero = await service.RelacionarTerceroPorId(id);
    res.json(tercero);
});
//Busca clientes por contado para que se muestren por defecto en la vista ppal terminal
router.get('/', async (req,res) =>{
    const tercero = await service.BuscarTerceroContados();
    res.json(tercero);
});



module.exports = router;