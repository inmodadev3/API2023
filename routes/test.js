const router = require('express').Router()
const {calcular} = require('../Services/test')

router.get('/total/:idPedido',calcular)



module.exports = router