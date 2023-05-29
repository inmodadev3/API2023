const express = require('express');
const router = express.Router();
const ProductsService = require('../Services/productosService');
const service = new ProductsService();

/*router.get('/', async (req,res) =>{
    const product = await service.find();
    res.json(product);
});*/
router.get('/', async (req,res) =>{
    const product = await service.buscarclase();
    res.json(product);
});
// router.get('/:id', async (req,res) =>{
//     const {id} = req.params;
//     const product = await service.findOne(id);
//     res.json(product);
// });
router.get('/:id', async (req,res) =>{
    const {id} = req.params;
    const product = await service.findOneclas(id);
    res.json(product);
});

router.get('/ref/:id', async (req,res) =>{
    const {id} = req.params;
    const product = await service.buscarProductoPorId(id);
    res.json(product);
})
// CONSULTAR PRODUCTOS EN LA TERMINAL
router.get('/ref/:id/:idp', async (req,res) =>{
    const {id} = req.params;
    const {idp} = req.params;
    const product = await service.buscarProductoPorId_precio(id, idp);
    res.json(product);
})

module.exports = router;