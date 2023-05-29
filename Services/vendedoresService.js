const mysqlConnection = require('../DataBases/cnxDash.js');
const sqlConnection = require('../DataBases/cnxHgi.js');

class vendedoresService{

    async loginVendedores(id, ke){
        return new Promise((resolve, reject)=>{
            mysqlConnection.query(`select stridVendedor, strNombreEmpleado, strUsuario, strClave from tbllogin
             where strUsuario = '${id}' and strClave= '${ke}'`,(err, rows, fields) =>{
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            });
        });
    }

    async ListarVendedores(){
        return new Promise((resolve, reject) => {
            sqlConnection.query(`select tblvendedores.StrNombre,tblvendedores.StrPwd,tblvendedores.StrIdVendedor,tblvendedores.StrCargo,tblcargos.StrNombre  as 'strNombreCargo' from TblVendedores inner join tblcargos on tblvendedores.strCargo=tblcargos.strIdCargo where tblvendedores.IntEstado <> 0`,(err,rows, fields)=>{
                if(!err){
                    resolve(rows.recordset);
                }else{
                    reject(err);
                }
            });
        });
    }

}
module.exports = vendedoresService;