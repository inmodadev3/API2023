const express = require('express');
const router = express.Router();
const vendedoresService = require('../Services/vendedoresService');
const service = new vendedoresService();


router.get('/', async (req,res) =>{
    const vendedor = await service.ListarVendedores();
    res.json(vendedor);
});

router.get('/us/:id/cl/:ke', async (req,res) =>{
    const {id} = req.params;
    const {ke} = req.params;
    const vendedor = await service.loginVendedores(id,ke);
    res.json(vendedor);
});

router.post('/', async (req,res)=>{
    const {usuario, contrasena } = req.body;
    const vendedorLogin = await service.loginVendedores(usuario,contrasena);
    res.json(vendedorLogin);
});

module.exports = router;