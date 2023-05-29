const mysqlConnection = require('../DataBases/cnxDash.js');
const sqlConnection = require('../DataBases/cnxHgi.js');


class ProductsService {
    constuctor() {
        this.products = [];
    }

    async create() {

    }

    async buscarProductoPorId(id) {
        return new Promise((resolve, reject) => {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            sqlConnection.query(` SELECT TOP 10 p.StrIdProducto AS referencia, p.StrDescripcion AS descripcion, 
            p.strunidad AS UM,p.strauxiliar as cantxEmpaque, p.strparam2 AS Ubicacion,  p.strparam3 AS medida, pp1.StrDescripcion AS sexo, 
            pp2.StrDescripcion AS Material,  pp3.StrDescripcion AS Marca, 
            p.intprecio1,  p.intprecio2,  p.intprecio3, p.intprecio4, 
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '1') AS img1, 
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '2') AS img2, 
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '3') AS img3,
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '4') AS img4,
            (SELECT intCantidadFinal 
             FROM qrySaldosInv 
             WHERE strProducto = p.StrIdProducto and IntAno = ${year} and IntPeriodo = ${month}) AS saldoInv
            FROM tblproductos AS p
            INNER JOIN TblProdParametro1 AS pp1 ON pp1.StrIdPParametro1 = p.StrPParametro1
            INNER JOIN TblProdParametro2 AS pp2 ON pp2.StrIdPParametro = p.StrPParametro2
            INNER JOIN TblProdParametro3 AS pp3 ON pp3.StrIdPParametro = p.StrPParametro3
            WHERE StrIdProducto LIKE '%${id}%' `, async (err, rows) => {
                if (!err) {
                    resolve(rows.recordset)
                } else {
                    reject(err);
                }
            });
        });
    }

    async buscarProductoPorId_precio(id, idp) {
        return new Promise((resolve, reject) => {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            sqlConnection.query(` SELECT TOP 10 p.StrIdProducto AS referencia, p.StrDescripcion AS descripcion, 
            p.strunidad AS UM,p.strauxiliar as cantxEmpaque, p.strparam2 AS Ubicacion,  p.strparam3 AS medida, pp1.StrDescripcion AS sexo, 
            pp2.StrDescripcion AS Material,  pp3.StrDescripcion AS Marca, 
            p.intprecio${idp} as precio, 
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '1') AS img1, 
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '2') AS img2, 
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '3') AS img3,
            (SELECT strarchivo 
             FROM tblimagenes 
             WHERE stridcodigo = p.StrIdProducto AND StrDescripcion = '4') AS img4,
            (SELECT intCantidadFinal 
             FROM qrySaldosInv 
             WHERE strProducto = p.StrIdProducto and IntAno = ${year} and IntPeriodo = ${month}) AS saldoInv
            FROM tblproductos AS p
            INNER JOIN TblProdParametro1 AS pp1 ON pp1.StrIdPParametro1 = p.StrPParametro1
            INNER JOIN TblProdParametro2 AS pp2 ON pp2.StrIdPParametro = p.StrPParametro2
            INNER JOIN TblProdParametro3 AS pp3 ON pp3.StrIdPParametro = p.StrPParametro3
            WHERE StrIdProducto LIKE '${id}%' `, async (err, rows) => {

                if (!err) {
                    resolve(rows.recordset)
                } else {
                    reject(err);
                }
            });
        });
    }

    async buscarRutaImagenProducto() {
        return new Promise((resolve, reject) => {
            sqlConnection.query(`select * from tblimagenes where stridproducto `)
        })
    }



    async find() {
        return new Promise((resolve, reject) => {
            mysqlConnection.query('select * from tblvendedores', (err, rows, fields) => {
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            });
        });
    }

    async buscarclase() {
        return new Promise((resolve, reject) => {
            sqlConnection.query('select * from tblclases ', (err, rows, fields) => {
                if (!err) {
                    resolve(rows.recordset);
                } else {
                    reject(err);
                }
            });
        });
    }
    async findOne(id) {
        return new Promise((resolve, reject) => {
            mysqlConnection.query('select * from tblvendedores where strcedula = ?', [id], (err, rows, fields) => {
                if (!err) {
                    //  this.products = rows;
                    resolve(rows);
                } else {
                    reject(err);
                }
            });
        });
    }


    async findOneclas(id) {
        return new Promise((resolve, reject) => {
            sqlConnection.request().query(`select * from TblTerceros where StrIdTercero = '${id}' `, (err, rows) => {
                if (!err) {
                    //  this.products = rows;
                    resolve(rows.recordset[0]);
                } else {
                    reject(err);
                }
            });
        });
    }
    async update() {

    }
    async delete() {

    }
}

module.exports = ProductsService;