//importar modulos para la conexion a la base de datos
const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

//conectar a la base de datos con las credenciales (database)
const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    //manejar los errores al conectar a la base de datos
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La coneción a la base de datos a sido cerrada');
            console.log('La coneción a la base de datos a sido cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('conexiones de la base de datos');
            console.error('conexiones de la base de datos');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('se a perdido la conexion a la base de datos');
            console.error('se a perdido la conexion a la base de datos');
        }
        console.log('error de conexion')
    }
    if (connection) {
        //conexion realizada
        connection.release();
        console.log("conexion establesida");
        return;
    }
});
//mandar los resultados de la consulta como un objeto
pool.query = promisify(pool.query);
//exportar modulo de conexion
module.exports = pool;