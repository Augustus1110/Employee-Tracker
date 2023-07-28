const mysql = require('mysql2')

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'

});

connection.connect(function(){
    console.log('connected to database')
})

module.exports = connection;