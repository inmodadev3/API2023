const mysql = require('mysql');
const mysql2 = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: '10.10.10.128',
    user: 'root',
    password: 'Sistemas2018*',
    database : 'DASH',
    multipleStatements: true
});

mysqlConnection.connect(function(error){
    if(error){
        console.error(error)
    }else{
        console.log('database dash is connected')
    }
});


module.exports = mysqlConnection;