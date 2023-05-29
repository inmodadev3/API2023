const mysqlConnection = require('../DataBases/cnxDash.js');
const sqlConnection = require('../DataBases/cnxHgi.js');

class tercerosService {

    async buscarTerceroPorId(id) {
        return new Promise((resolve, reject) => {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            sqlConnection.query(`select top 15 t.StrTipoId as tipoId, t.StrIdTercero as idTercero,t.StrNombre as nombre,
            t.strNombreComercial as nomCcial, t.strDireccion as direcc1,t.strdireccion2 as direcc2,t.StrTelefono as tel,
             t.strcelular as cel ,t.StrFax as tel2,t.intPlazo, tes.StrDescripcion as estado, 
             tc.StrDescripcion as ciudad, t.strMailFE as emailFE, t.intCupo as cupo, tp1.StrDescripcion as flete, 
             tp2.StrDescripcion as descuento, tt.intprecio as precioTercero, tt.strdescripcion as descTipoTercero,
            (select intsaldof from QryCarteraTercero 
                where StrTercero = t.StrIdTercero and IntAno = ${year} and IntPeriodo = ${month}) as cartera
            from TblTerceros as t
                inner join TblTerParametro1 as tp1 on tp1.StrIdParametro = t.StrParametro1
                inner join TblTerParametro2 as tp2 on tp2.StrIdParametro = t.StrParametro2
                inner join TblEstados as tes on tes.IntIdEstado = t.IntTEstado
                inner join TblCiudades as tc on tc.StrIdCiudad = t.StrCiudad
				inner join TblTiposTercero as tt on tt.IntIdTipoTercero = t.IntTipoTercero
                where t.StrIdTercero like '%${id}%' or t.strnombre like'%${id}%'`, (err, rows) => {
                if (!err) {
                    resolve(rows.recordset);
                } else {
                    reject(err);
                }
            });
        });
    }

    async RelacionarTerceroPorId(id) {
        return new Promise((resolve, reject) => {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            sqlConnection.query(`select top 15 t.StrTipoId as tipoId, t.StrIdTercero as idTercero,t.StrNombre as nombre,
            t.strNombreComercial as nomCcial, t.strDireccion as direcc1,t.strdireccion2 as direcc2,t.StrTelefono as tel,
             t.strcelular as cel ,t.StrFax as tel2,t.intPlazo, tes.StrDescripcion as estado, 
             tc.StrDescripcion as ciudad, t.strMailFE as emailFE, t.intCupo as cupo, tp1.StrDescripcion as flete, 
             tp2.StrDescripcion as descuento, tt.intprecio as precioTercero, tt.strdescripcion as descTipoTercero,
            (select intsaldof from QryCarteraTercero 
                where StrTercero = t.StrIdTercero and IntAno = ${year} and IntPeriodo = ${month}) as cartera
            from TblTerceros as t
                inner join TblTerParametro1 as tp1 on tp1.StrIdParametro = t.StrParametro1
                inner join TblTerParametro2 as tp2 on tp2.StrIdParametro = t.StrParametro2
                inner join TblEstados as tes on tes.IntIdEstado = t.IntTEstado
                inner join TblCiudades as tc on tc.StrIdCiudad = t.StrCiudad
				inner join TblTiposTercero as tt on tt.IntIdTipoTercero = t.IntTipoTercero
                where t.StrIdTercero = '${id}'`, (err, rows) => {
                if (!err) {
                    resolve(rows.recordset);
                } else {
                    reject(err);
                }
            });
        });
    }

    async BuscarTerceroContados() {
        return new Promise((resolve, reject) => {
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = fecha.getMonth() + 1;
            sqlConnection.query(`select top 15 t.StrTipoId as tipoId, t.StrIdTercero as idTercero,t.StrNombre as nombre,
            t.strNombreComercial as nomCcial, t.strDireccion as direcc1,t.strdireccion2 as direcc2,t.StrTelefono as tel,
             t.strcelular as cel ,t.StrFax as tel2, t.IntTipoTercero,t.intPlazo, tes.StrDescripcion as estado, 
             tc.StrDescripcion as ciudad, t.strMailFE as emailFE, t.intCupo as cupo, tp1.StrDescripcion as flete, 
             tp2.StrDescripcion as descuento,
            (select intsaldof from QryCarteraTercero 
                where StrTercero = t.StrIdTercero and IntAno = ${year} and IntPeriodo = ${month}) as cartera
            from TblTerceros as t
                inner join TblTerParametro1 as tp1 on tp1.StrIdParametro = t.StrParametro1
                inner join TblTerParametro2 as tp2 on tp2.StrIdParametro = t.StrParametro2
                inner join TblEstados as tes on tes.IntIdEstado = t.IntTEstado
                inner join TblCiudades as tc on tc.StrIdCiudad = t.StrCiudad
                where t.StrIdTercero in ('123111','123112','12313','9999') `, (err, rows) => {
                if (!err) {
                    resolve(rows.recordset);
                } else {
                    reject(err);
                }
            });
        });
    }

    async actualizarTercero() {
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
    async() {
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
    async() {
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
    async() {
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
    async() {
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
}
module.exports = tercerosService;