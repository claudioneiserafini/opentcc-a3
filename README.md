[A3] Projeto Prático - DEVWEB I

**OpenTCC** é um sistema voltado para o gerenciamento dos Trabalhos de Conclusão de Curso (TCCs). Os usuarios poderão visualizar os TCCs desenvolvidos e em andamento cadastrados. Qualquer um pode cadastrar novos TCC's, incluindo informações detalhadas, permitindo qualquer usuario baixar PDFs dos trabalhos disponiveis. 
- Imagens das paginas em: https://imgur.com/a/0Iu5qRh

🚀 **Funcionalidades Implementadas:**
- Tela de login e cadastro.
- Opção de entrar como visitante.
- Visualizar uma lista de TCCs cadastrados.
- Pesquisar por Autor, Titulo e resumo.
- Cadastrar novos TCCs com título, autor, resumo e arquivo PDF.
- Obter detalhes específicos de um TCC listado.
- Baixar os PDFs disponíveis diretamente pelo sistema.
- Fazer upload de arquivos PDF vinculados aos TCCs.

💻 **Tecnologias Utilizadas:**
- Node.js: Ambiente de execução do JavaScript no servidor.
- MySQL: Banco de dados relacional utilizado para armazenar as informações dos TCCs e usuários.
- bcrypt: Para criptografar senhas de usuários.
- Express.js: Framework para simplificar a criação de APIs e rotas.
- Multer: Middleware para lidar com upload de arquivos.
- HTML/CSS/JavaScript (Planejado): Para a interface do sistema (frontend).
  Comando para instalação: npm install express mysql2 bcrypt multer cors

🛠️ **Passo a Passo:**
  1. Baixe o código: Clone o repositório do projeto ou baixe o código como arquivo ZIP.
  2. Baixe as dependências: No terminal, navegue até o diretório do projeto e instale as dependências necessárias:
    - npm install express mysql2 bcrypt multer cors
  3. Crie o banco de dados: Certifique-se de que o MySQL esteja rodando no seu sistema.
     - node iniciar_db.js
  4. Inicie o servidor: Execute o servidor.
    - node server.js
  5. Acesso: Cadastre-se ou entre como visitante.
     - No login utilizar o nome do usuario ao inves do email.
  7. Baixe ou cadastre novos TCCs.

📂 **Estrutura do Projeto:**
```
MEU-PROJETO-A3/
├── node_modules/           # Diretório gerado automaticamente pelo npm
├── public/                 # Diretório para arquivos públicos (imagens, fontes, etc.)
├── scripts/                # Scripts JavaScript utilizados no frontend
│   ├── cadastrar.js
│   ├── detalhes.js
│   ├── index.js
│   └── inicio.js
├── src/                    # Diretório de código-fonte (pode conter backend e frontend no futuro)
├── styles/                 # Arquivos CSS para estilização do frontend
│   ├── cadastrar.css
│   ├── detalhes.css
│   ├── index.css
│   ├── inicio.css
│   └── menu-rodape.css
├── uploads/                # Diretório para armazenar arquivos enviados (PDFs dos TCCs)
│
├── cadastrar.html          # Página HTML para cadastro de TCCs
├── detalhes.html           # Página HTML para exibir detalhes de um TCC
├── index.html              # Página inicial do sistema
├── inicio.html             # Página inicial com funcionalidades
├── menu.html               # Componente de menu compartilhado
├── rodape.html             # Componente de rodapé compartilhado
│
├── init.sql                # Script SQL para criação de tabelas e dados iniciais
├── iniciar_db.js           # Script para inicializar o banco de dados
├── package.json            # Arquivo de configuração do npm
├── package-lock.json       # Arquivo de lock das dependências
├── server.js               # Arquivo principal do servidor Node.js
```
