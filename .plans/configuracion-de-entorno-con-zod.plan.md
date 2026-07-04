# Plan de Implementación: Validación de Configuración de Entorno con Zod

Este plan detalla la creación e implementación del esquema de validación para las variables de entorno utilizando Zod en `src/config/env.ts`.

## Cambios Propuestos

1. **Instalación de Dependencias**:
   * Instalar `zod` en el proyecto (Realizado).

2. **Esquema de Validación de Variables de Entorno (`src/config/env.ts`)**:
   * Definir un esquema con Zod que valide:
     * `VITE_APP_TITLE`: Título de la aplicación (debe ser un string, no vacío, con valor por defecto).
     * `VITE_DEV_MODE`: Modo de desarrollo (enum: 'development' | 'production' | 'test', con valor por defecto).
     * `VITE_API_URL`: URL del API principal de la aplicación (debe ser una URL válida, con valor por defecto).
   * Validar las variables expuestas por Vite (`import.meta.env`) usando el esquema definido.
   * Exportar un objeto de configuración verificado y congelado de forma inmutable (`Object.freeze()`).

3. **Creación del archivo `.env.example` y `.env`**:
   * Crear archivos `.env.example` y `.env` para declarar y configurar las variables de entorno de la aplicación.

## Plan de Verificación

* Ejecutar `npm run build` o correr `tsc` para verificar que no haya errores de compilación TypeScript.
* Integrar la configuración en `src/main.tsx` o `src/App.tsx` para verificar que los datos validados se cargan correctamente.
