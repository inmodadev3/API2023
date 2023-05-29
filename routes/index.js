const express = require('express');


const productosRouter = require('./productosRouter');
const tercerosRouter = require('./tercerosRouter');
const vendedoresRouter = require('./vendedoresRouter');
const pedidosRouter = require('./pedidosRouter');


function routerApi(app)
{
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/productos', productosRouter);
    router.use('/terceros', tercerosRouter);
    router.use('/vendedores', vendedoresRouter);
    router.use('/pedidos', pedidosRouter);
    
    /*
    app.use('/vendedores', vendedoresRouter);
    app.use('');
    app.use('');
    app.use('');
    app.use('');*/
}

module.exports = routerApi;