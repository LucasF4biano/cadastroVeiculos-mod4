const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Criar veículo
router.post('/', (req, res) => {
    const { marca, modelo, ano, cor, placa, fornecedor_id } = req.body;
    if (!marca || !modelo || !placa || !fornecedor_id) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    
    db.query('SELECT * FROM Fornecedor WHERE id = ?', [fornecedor_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        if (results.length === 0) return res.status(400).json({ error: 'Fornecedor não encontrado' });
        
        db.query('INSERT INTO Veiculo SET ?', { marca, modelo, ano, cor, placa, fornecedor_id }, (err, result) => {
            if (err) return res.status(500).json({ error: err.sqlMessage });
            res.status(201).json({ id: result.insertId, marca, modelo, ano, cor, placa, fornecedor_id });
        });
    });
});

// Listar veículos
router.get('/', (req, res) => {
    db.query('SELECT V.*, F.nome AS fornecedor FROM Veiculo V JOIN Fornecedor F ON V.fornecedor_id = F.id', (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
});

// Atualizar veículo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano, cor, placa, fornecedor_id } = req.body;
    db.query('UPDATE Veiculo SET ? WHERE id = ?', [{ marca, modelo, ano, cor, placa, fornecedor_id }, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: 'Veículo atualizado com sucesso' });
    });
});

// Deletar veículo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Veiculo WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: 'Veículo removido com sucesso' });
    });
});

module.exports = router;