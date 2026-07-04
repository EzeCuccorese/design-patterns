# Plan de Cambio: Configuración de Seguridad Nginx y Dockerfile

Este plan detalla la incorporación de cabeceras de seguridad HTTP robustas en Nginx y la actualización de la configuración de Dockerfile para copiar este archivo de configuración en el servidor de producción.

## Cambios Propuestos

1. **Creación de `nginx.conf`**:
   - Crear el archivo `nginx.conf` en la raíz del proyecto.
   - Definir un servidor básico escuchando en el puerto 80.
   - Servir archivos estáticos desde `/usr/share/nginx/html`.
   - Implementar un fallback a `index.html` para el soporte de enrutamiento SPA (`try_files $uri $uri/ /index.html;`).
   - Incorporar las cabeceras de seguridad requeridas:
     - `X-Content-Type-Options: nosniff`
     - `X-Frame-Options: SAMEORIGIN`
     - `X-XSS-Protection: "1; mode=block"`
     - `Referrer-Policy: strict-origin-when-cross-origin`
     - `Content-Security-Policy` (CSP) adaptada a una SPA de Vite que utiliza Google Fonts:
       - `default-src 'self';`
       - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;` (para Google Fonts y estilos inline generados/inyectados por PrismJS y la compilación)
       - `font-src 'self' data: https://fonts.gstatic.com;` (para fuentes cargadas externamente)
       - `img-src 'self' data: blob:;` (para imágenes locales y SVGs en línea)
       - `script-src 'self' 'unsafe-inline';` (Vite y PrismJS a veces necesitan ejecutar ciertos scripts inline)
       - `connect-src 'self';`
       - `object-src 'none';`
       - `frame-ancestors 'self';`
       - `base-uri 'self';`
       - `form-action 'self';`

2. **Actualización de `Dockerfile`**:
   - Agregar la instrucción para copiar `nginx.conf` a `/etc/nginx/conf.d/default.conf` en la etapa de producción.

## Plan de Verificación

1. **Compilación de la Imagen Docker**:
   - Proponer un `docker build` local para validar que el archivo `nginx.conf` es copiado correctamente en la ruta indicada.
2. **Verificación de Sintaxis de Nginx**:
   - Validar que la configuración de Nginx no contiene errores sintácticos mediante `nginx -t` dentro de un contenedor temporal.
3. **Verificación de Cabeceras**:
   - Ejecutar una petición HTTP localmente sobre el contenedor para certificar la presencia de las cabeceras `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy` y `Content-Security-Policy`.
