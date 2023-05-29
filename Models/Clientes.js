const sqlConnection = require('../DataBases/cnxHgi');
const mysqlConnection= require('../DataBases/cnxDash');

const Cliente = {}

Cliente.getById = async(id) =>{
        
    //const [rows, fields] = await sqlConnection.query('select * from tblterceros where stridtercero =?',[id]);
    //const {id} = req.params;
    await sqlConnection.request().query(`select * from TblTerceros where StrIdTercero = '${id}' `,(err,result) =>{
        if(err){
            console.log(err)
            return
        }
        console.log(result.recordset[0])
        return result.recordset[0];
    });

}
module.exports = Cliente;
/*
const db = require('./database');

//const Cliente = {
  getById: async function(id) {
    const [rows, fields] = await db.execute('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0];
  },
  getAll: async function() {
    const [rows, fields] = await db.execute('SELECT * FROM clientes');
    return rows;
  },
  create: async function(cliente) {
    const { nombre, email, telefono } = cliente;
    const [result, fields] = await db.execute('INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)', [nombre, email, telefono]);
    return result.insertId;
  },
  update: async function(id, cliente) {
    const { nombre, email, telefono } = cliente;
    const [result, fields] = await db.execute('UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?', [nombre, email, telefono, id]);
    return result.affectedRows > 0;
  },
  delete: async function(id) {
    const [result, fields] = await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Cliente;*/
