# Etapa 1: Construcción
FROM node:22-alpine AS build

WORKDIR /app

# Copiar archivos de definición de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar archivos del código fuente y configuraciones
COPY . .

# Compilar el proyecto con Vite
RUN npm run build

# Etapa 2: Servidor Web de Producción
FROM nginx:stable-alpine

# Copiar la carpeta compilada de la etapa anterior al directorio por defecto de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx con cabeceras de seguridad
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 del contenedor
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
