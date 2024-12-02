const mysql = require('mysql2');
const fs = require('fs');

// Configurações do MySQL (sem banco de dados específico)
const connection = mysql.createConnection({
    host: 'tcc-db',
    user: 'admin',
    password: 'admin',
});

// Função para executar o script SQL
function executarScriptSql(filePath) {
    const script = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return script.split(';').map(cmd => cmd.trim()).filter(cmd => cmd);
}

// Função para criar bancos de dados e tabelas
function criarBancoDeDados() {
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            return;
        }

        console.log('Conectado ao MySQL com sucesso.');

        // Criar os bancos de dados se não existirem
        connection.query('CREATE DATABASE IF NOT EXISTS gerenciador_tccs', (err) => {
            if (err) {
                console.error('Erro ao criar banco gerenciador_tccs:', err);
            } else {
                console.log('Banco de dados gerenciador_tccs criado/verificado.');
                configurarTabelas('gerenciador_tccs', './init.sql');
            }
        });

        connection.query('CREATE DATABASE IF NOT EXISTS register', (err) => {
            if (err) {
                console.error('Erro ao criar banco register:', err);
            } else {
                console.log('Banco de dados register criado/verificado.');
                configurarTabelas('register', './init.sql');
            }
        });
    });
}

// Função para configurar tabelas
function configurarTabelas(database, scriptPath) {
    const dbConnection = mysql.createConnection({
        host: 'tcc-db',
        user: 'admin',
        password: 'admin',
        database: database,
    });

    const comandosSql = executarScriptSql(scriptPath);

    comandosSql.forEach((comando) => {
        dbConnection.query(comando, (err) => {
            if (err) {
                console.error(`Erro ao executar comando no banco ${database}:`, err);
            } else {
                console.log(`Comando executado no banco ${database}: ${comando.substring(0, 50)}...`);
            }
        });
    });

    dbConnection.end(() => {
        console.log(`Tabelas configuradas no banco ${database}.`);
    });
}

// Chamar a função principal
criarBancoDeDados();
