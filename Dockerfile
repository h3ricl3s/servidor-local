# especifica versao de sistema operacional base

FROM node:20-alpine

# Define a pasta onde o codigo vai ser executado
WORKDIR /app 

# copia os arquivos package.json e package-lock.json para a pasta /app
COPY package*.json ./

# Instala as dependencias 
RUN npm install

#copia o resto do codigo para a pasta /app
COPY . .

# Informar a porta que vai ser utilizada
EXPOSE 8080

# Comando para executar a aplicacao em modo de desenvolvimento 
CMD ["npm", "run", "dev"]