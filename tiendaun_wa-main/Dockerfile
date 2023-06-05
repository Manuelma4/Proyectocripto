# Construye la imagen base de Node.js
FROM node:18.16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación en el contenedor
COPY package.json .
COPY yarn.lock .


# Instala las dependencias de la aplicación
RUN npm install --force

COPY . .

# Compila la aplicación para producción
RUN yarn build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 5173

# Define el comando para ejecutar la aplicación cuando el contenedor se inicie
CMD ["npm", "run", "dev"]
