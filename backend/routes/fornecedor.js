const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Criar fornecedor
router.post('/', (req, res) => {
    const { nome, cnpj, endereco, telefone, email } = req.body;
    if (!nome || !cnpj) return res.status(400).json({ error: 'Nome e CNPJ são obrigatórios' });
    
    db.query('INSERT INTO Fornecedor SET ?', { nome, cnpj, endereco, telefone, email }, (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.status(201).json({ id: result.insertId, nome, cnpj, endereco, telefone, email });
    });
});

// Listar fornecedores
router.get('/', (req, res) => {
    db.query('SELECT * FROM Fornecedor', (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
});

// Atualizar fornecedor
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cnpj, endereco, telefone, email } = req.body;
    db.query('UPDATE Fornecedor SET ? WHERE id = ?', [{ nome, cnpj, endereco, telefone, email }, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: 'Fornecedor atualizado com sucesso' });
    });
});

// Deletar fornecedor
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Fornecedor WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: 'Fornecedor removido com sucesso' });
    });
});

module.exports = router;