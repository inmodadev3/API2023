const mysqlConnection = require("../DataBases/cnxDash")

const CalcularTotal = (idPedido) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(`select intCantidad, intPrecio from tbldetallepedidosterminal where intIdPedido = ${idPedido}`, (err, rows, fields) => {
            if (err) {
                reject(err)
                return
            }
            let total = 0;
            for (const item of rows) {
                total += item.intCantidad * item.intPrecio
            }
            resolve(total)

        })
    })
}

const consultarDetallePedidosTerminal = (id) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query("CALL SP_ConsultarDetallePedidoTerminal(?)", [id], (err, rows, fields) => {
            //console.log(rows)
            if (!err) {
                resolve(rows[0]);
            } else {
                reject(err);
            }
            // mysqlConnection.end();
        });
    });
}

const CambiarEstadoPedidoTerminal = (id,estado) =>{
    return new Promise((resolve,reject)=>{
        mysqlConnection.query(`update tblpedidosTerminal set intEstado = ${estado} where intIdPedido = ${id}`,(err,rows,fields)=>{
            if(err){
                reject(err)
                return
            }

            resolve(true)
        })
    })
}


module.exports = { CalcularTotal, consultarDetallePedidosTerminal,CambiarEstadoPedidoTerminal }