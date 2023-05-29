const sql = require('mssql');

const config ={
    user:'Hgi',
    password:'Hgi',
    server:'192.168.1.127\\SQLEXPRESS',
    database:'INMODANET',
    options:{
        encrypt : false
    },
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const pool = new sql.ConnectionPool(config);

pool.connect(err => {
    if (err) {
        console.error('error de conexion:', err);
    } else {
        console.log('conexion exitosa hgi')
    }
});

module.exports = pool;