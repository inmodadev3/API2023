const DASH = require('../../DataBases/cnxDash');

const GetCarritoPaginado = async(req, res) => {
    const { id } = req.params
    const { pag } = req.query

    const TotalPages = await new  Promise((resolve,reject)=>{
        DASH.query(`SELECT COUNT(*) as TotalPedidos FROM tbldetallepedidosTerminal WHERE  tbldetallepedidosTerminal.intIdPedido = ? `,[id],(err,rows)=>{
            if(err)reject(err)
            resolve(rows)
        })
    })
    DASH.query("CALL SP_ConsultarDetallePedidoTerminalDos(?,?)", [id,pag], (err, rows) => {
        if (err) res.status(400).json({ error: err })
        console.log(TotalPages[0].TotalPedidos)
        let paginasTotales = Number.isInteger(TotalPages[0].TotalPedidos / 20) ? TotalPages[0].TotalPedidos / 20 : parseInt(TotalPages[0].TotalPedidos / 20) + 1
        res.status(200).json({ data: rows[0], TotalPages: paginasTotales })
    })
}


module.exports = {
    GetCarritoPaginado
}