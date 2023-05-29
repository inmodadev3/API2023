const express = require('express');
const router = express.Router();
const mysqlConnection = require('../DataBases/cnxDash.js');
const sqlConnection = require('../DataBases/cnxHgi.js');

// get all vendedores
router.get('/', (req, res) => {
    mysqlConnection.query('select * from tblvendedores', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log('err')
        }
    });
});
// get vendedoles bby id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('select * from tblvendedores where strcedula = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.get('/', (req, res) => {
    sqlConnection.query('select * from tblclases ', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log('err')
        }
        // sqlConnection.close();
    });
});

router.post('/pedido/', (req, res) => {
    const { intIdPedido, strIdProducto, strDecripcion, intCantidad, strUnidadMedida, strObservacion, intPrecio, intPrecioProducto, strTalla, strColor } = req.body;
    const query = "CALL SP_GuardarDetallePedido(?,?,?,?,?,?,?,?,?,?)";
    mysqlConnection.query(query, [intIdPedido, strIdProducto, strDecripcion, intCantidad, strUnidadMedida, strObservacion, intPrecio, intPrecioProducto, strTalla, strColor], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'ref metida a lo bien' })
        } else {
            console.log(err)
        }
    });
});
module.exports = router;






