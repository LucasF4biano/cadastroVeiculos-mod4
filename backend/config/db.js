const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'programacao2'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        process.exit(1);
    }
    console.log('Conectado ao MySQL');
});

module.exports = db;