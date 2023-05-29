const { CalcularTotal } = require("../utils/Helpers")


const calcular = async(req,res)=>{
    const { idPedido } =  req.params
    let total = await CalcularTotal(idPedido)
    res.json({data:total})
}


module.exports = {calcular}