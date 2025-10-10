# Dockerfile

# 1. Usar una imagen oficial de Node.js ligera como base
FROM node:20-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias primero (para aprovechar el caché de Docker)
COPY package*.json ./

# 4. Instalar las dependencias del proyecto
RUN npm install

# 5. Copiar el resto de los archivos de tu proyecto al contenedor
COPY . .

# 6. Exponer el puerto que Vite usa para el servidor de desarrollo
EXPOSE 5173

# 7. El comando que se ejecutará al iniciar el contenedor
CMD [ "npm", "run", "dev" ]