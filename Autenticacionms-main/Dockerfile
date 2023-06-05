# utiliza una imagen de Node.js como base
FROM node:16

# establece el directorio de trabajo en /app
WORKDIR /app

# copia el archivo package.json y package-lock.json a la imagen
COPY package*.json ./

# instala las dependencias del proyecto
RUN npm install

# copia el resto de los archivos del proyecto a la imagen
COPY tsconfig.json ./
COPY . .

# expone el puerto 3002, que es el puerto por defecto que utiliza Express
EXPOSE 3002

# ejecuta el comando npm run dev para iniciar el servidor
CMD ["npm", "run", "dev"]