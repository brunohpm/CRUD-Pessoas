import { openDB } from '../configDB.js';

export async function createTable(req, res) {
    openDB().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Pessoa (id INTEGER PRIMARY KEY, nome TEXT, idade integer, cpf TEXT)')
    });
}

export async function selectPessoas(req, res) {
    openDB().then(db => {
        db.all('SELECT * FROM Pessoa')
            .then(pessoas => res.json(pessoas))
    })
}

export async function selectPessoa(req, res) {
    let id = req.body.id;
    openDB().then(db => {
        db.get('SELECT * FROM Pessoa WHERE id=?', [id])
            .then(pessoa => res.json(pessoa))
    })
}

export async function insertPessoa(req, res) {
    let pessoa = req.body;
    openDB().then(db => {
        db.run('INSERT INTO Pessoa (nome, idade, cpf) VALUES (?, ?, ?)', [pessoa.nome, pessoa.idade, pessoa.cpf])
    });
    res.json({
        "statsCode": 200
    })
}

export async function updatePessoa(req, res) {
    let pessoa = req.body;
    openDB().then(db => {
        db.run('UPDATE Pessoa SET nome=?, idade=?, cpf=? WHERE ID=?', [pessoa.nome, pessoa.idade, pessoa.cpf, pessoa.id])
    })
    res.json({
        "statsCode": 200
    })
}

export async function deletePessoa(req, res) {
    let id = req.params.id;
    openDB().then(db => {
        db.get('DELETE FROM Pessoa WHERE id=?', [id])
            .then(res => res)
    });
    res.json({
        "statsCode": 200
    })
}