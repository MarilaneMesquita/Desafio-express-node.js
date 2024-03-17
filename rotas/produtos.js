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

// Rota GET para obter a lista de produtos
router.get('/', async (req, res, next) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao obter produtos do banco de dados:', error);
        next(error);
    }
});

// Rota POST para adicionar um novo produto
router.post('/', async (req, res, next) => {
    try {
        const connection = await createConnection();
        const { nome, descricao, preco, data_atualizado } = req.body;
        const [result] = await connection.query('INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)', [nome, descricao, preco, data_atualizado]);
        res.json({ id: result.insertId, nome, descricao, preco, data_atualizado });
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        next(error);
    }
});

module.exports = router;
