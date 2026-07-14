# Planes de desarrollo web — Angel Espinoza

Landing estática en React y Vite para presentar cinco planes de desarrollo web: Presencia, Negocio, Catálogo, Tienda y Tienda Pro.

## Desarrollo local

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

La web estará disponible en `http://127.0.0.1:5173/`.

## Validación

```bash
npm run build
npm test
```

La compilación estática se genera en `dist/`.

## Publicación futura en Cloudflare Pages

1. Subir este proyecto a un repositorio de GitHub.
2. Conectar el repositorio desde Cloudflare Pages.
3. Usar `npm run build` como comando de compilación.
4. Usar `dist` como directorio de salida.

El archivo `wrangler.toml` ya contiene la configuración básica de salida para Cloudflare Pages.

## Datos editables

Los datos de contacto, planes, precios, funciones y mensajes de WhatsApp están centralizados en `app/site-data.ts`.
