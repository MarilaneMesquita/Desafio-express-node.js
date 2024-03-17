const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Função para criar a conexão com o banco de dados
const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'senha',
        database: 'minha_database'
    });
};

// Rota GET para obter a lista de clientes
router.get('/', async (req, res, next) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao obter clientes do banco de dados:', error);
        next(error);
    }
});

// Rota POST para adicionar um novo cliente
router.post('/', async (req, res, next) => {
    try {
        const connection = await createConnection();
        const { nome, sobrenome, email, idade } = req.body;
        const [result] = await connection.query('INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, idade]);
        res.json({ id: result.insertId, nome, sobrenome, email, idade });
    } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        next(error);
    }
});

module.exports = router;
