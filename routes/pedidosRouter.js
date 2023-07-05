const express = require('express');
const router = express.Router();
const PedidosService = require('../Services/pedidosService');
const service = new PedidosService();
const {GetCarritoPaginado} = require('../Services/v2/PedidosService')

//Consultar productos asociados a pedidos 
router.get('/:id/detalle', async (req, res) => {
    const { id } = req.params;
    const pedido = await service.consultarDetallePedidos(id);
    res.json(pedido);
});
//Consultar productos asociados a un pedido en terminal
router.get('/detalle/:id', async (req, res) => {
    const { id } = req.params;
    const pedido = await service.consultarDetallePedidosTerminal(id);
    res.json(pedido);
});
// Consulta los pedidos que aun no se han enviado y se encuentran en la tblpedidosTerminal
router.get('/vendedor/:id/proceso', async (req, res) => {
    const { id } = req.params;
    const pedido = await service.consultarPedidosEnProcesoVendedor(id);
    res.json(pedido);
});
//Consultar ultimos 10 pedidos enviados al dash
router.get('/vendedor/:id', async (req, res) => {
    const { id } = req.params;
    const pedido = await service.consultarPedidosVendedor(id);
    res.json(pedido);
});
//consultar encabezado pedido vendedor
router.get('/vendedor/:id/encabezado', async (req, res) => {
    const { id } = req.params;
    const pedido = await service.ConsultarEncabezadoPedidosVendedor(id);
    res.json(pedido);
});
// guardar detalle de cada producto agregado al pedido
router.post('/ref/', async (req, res) => {
    const { detalle } = req.body;
    await service.GuardarDetallePedidoTerminal(detalle);
    res.json({status:'se ha agregado la referencia con exito a la tabla temporal'})
});
//guarda encabezado al iniciar el pedido en la tblpedidosTerminal
router.post('/en/', async (req, res) => {
    const { encabezado } = req.body;
    pedido =await service.GuardarEncabezadoPedidoTerminal(encabezado);
    res.json({nroPedido:pedido})
});
// enviar pedidos para que se gestione con normalidad
router.post('/', async (req, res) => {
    const { idPedido } = req.body;
    await service.enviarPedido(idPedido);
    res.json({status:'se ha enviado el pedido con exito'})
});
//actualizar observacion delpedidoterminal
router.put('/observacion/', async (req,res) =>{
    const {data} = req.body;
    await service.ActualizarObservacionEncabezado(data)
    res.json({status:"actualizado"})
});
//actualizar cantidad, color, talla, observacion , precio
router.put('/actualizar/', async (req,res) =>{
    const {data} = req.body;
    await service.ActualizarCamposProducto(data)
    res.json({status:"actualizado"})
});
// eliminar pedidos 
router.put('/eliminar/:id',async (req,res)=>{
    const {id} = req.params;
    await service.EliminarPedidoTerminal(id);
    res.json({status:"Pedido Eliminado"})
});
//eliminar producto del pedido 
router.delete('/eliminar/detalle/',(req, res) =>{
    const {data} = req.body;
    service.EliminarDetallePedido(data);
     res.json({status:"Producto eliminado"});
});

router.get('/carrito/:id',GetCarritoPaginado)

module.exports = router;




router.post('////', (req, res) => {
    const { strIdVendedor,strNombVendedor,strIdPedidoVendedor, strIdCliente,strNombCliente,strCiudadCliente, intValorTotal, dtFechaFinalizacion,intTipo,intTipoPedido,intCompania,strObservacion,strCorreoClienteAct,strTelefonoClienteAct,strCelularClienteAct,strCiudadClienteAct,strIdDependencia,strNombreDependencia,blEspera } = req.body;
    service.GuardarEncabezadoPedido(strIdVendedor,strNombVendedor,strIdPedidoVendedor, strIdCliente,strNombCliente,strCiudadCliente, intValorTotal, dtFechaFinalizacion,intTipo,intTipoPedido,intCompania,strObservacion,strCorreoClienteAct,strTelefonoClienteAct,strCelularClienteAct,strCiudadClienteAct,strIdDependencia,strNombreDependencia,blEspera );
    res.json({status:'se ha agregado encabezado con exito'})
});