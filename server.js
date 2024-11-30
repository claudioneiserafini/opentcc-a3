const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados para TCCs
const connectionTccs = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'gerenciador_tccs'
});

// Configuração do banco de dados para Usuários
const connectionUsers = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'register'
});

// Teste de conexão com os bancos de dados
connectionTccs.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de TCCs:', err);
        return;
    }
    console.log('Conectado ao banco de dados TCCs!');
});

connectionUsers.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de Usuários:', err);
        return;
    }
    console.log('Conectado ao banco de dados Usuários!');
});

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// ---------------------------------- Rotas para TCCs ----------------------------------

// Rota para listar todos os TCCs
app.get('/tccs', (req, res) => {
    const search = req.query.search;
    let sql = 'SELECT * FROM tccs';

    if (search) {
        sql += ' WHERE titulo LIKE ? OR resumo LIKE ? OR autor LIKE ?';
        const searchTerm = `%${search}%`;
        connectionTccs.query(sql, [searchTerm, searchTerm, searchTerm], (err, results) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(results);
        });
    } else {
        connectionTccs.query(sql, (err, results) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(results);
        });
    }
});

// Rota para detalhes de um TCC
app.get('/tccs/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tccs WHERE id = ?';

    connectionTccs.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(404).send('TCC não encontrado');
            return;
        }
        res.json(results[0]);
    });
});

// Rota para cadastrar TCCs
app.post('/tccs', upload.single('arquivo'), (req, res) => {
    const { autor, titulo, resumo } = req.body;
    const arquivo_pdf = `/uploads/${req.file.filename}`;

    const sql = 'INSERT INTO tccs (autor, titulo, resumo, arquivo_pdf) VALUES (?, ?, ?, ?)';
    connectionTccs.query(sql, [autor, titulo, resumo, arquivo_pdf], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao cadastrar o TCC.');
            return;
        }
        res.status(201).json({ message: 'TCC cadastrado com sucesso!', id: results.insertId });
    });
});

// ---------------------------------- Rotas para Usuários ----------------------------------

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Gerar hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
        connectionUsers.query(sql, [username, email, hashedPassword], (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Erro ao registrar usuário.' });
                return;
            }
            res.status(201).json({ message: 'Usuário registrado com sucesso!', id: results.insertId });
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar a requisição.' });
    }
});

// Rota para login de usuário
app.post('/login', (req, res) => {
    const { usernameOrEmail, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    connectionUsers.query(sql, [usernameOrEmail, usernameOrEmail], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ message: 'Usuário ou e-mail não encontrado!' });
        }

        const user = results[0];

        // Comparar senha informada com o hash armazenado
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                res.json({ message: 'Login realizado com sucesso!' });
            } else {
                res.status(400).json({ message: 'Senha incorreta!' });
            }
        });
    });
});


// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
