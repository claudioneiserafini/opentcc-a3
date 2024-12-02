# Usar uma imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante dos arquivos da aplicação para dentro do contêiner
COPY . .

# Expor a porta em que o servidor vai rodar
EXPOSE 3000

# Definir o comando para rodar a aplicação
CMD ["npm", "start"]
