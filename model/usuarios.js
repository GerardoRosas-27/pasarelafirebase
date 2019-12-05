const pool = require('../database');

const usuarios = {};//Crear objeto
//metodo para encriptar la contraseña
usuarios.Insert = async (data) => {
    try {
        await pool.query('INSERT INTO usuarios set ?', [data]);
        return true;
    } catch (error) {
        return false; 
    }
};

usuarios.FindAll = async () => {
    const colls = await pool.query('SELECT * FROM usuarios');
    return colls;
};

usuarios.Find = async (id) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
}

usuarios.Update = async (data, id) => {
    try {
        await pool.query('UPDATE usuarios SET ? WHERE id = ?', [data, id]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }  
}

usuarios.Delete = async (id) => {
    try {
        await pool.query('DELETE FROM usuarios WHERE id =?', [id]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = usuarios;