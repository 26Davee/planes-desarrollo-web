# DE / Web — Planes de desarrollo web

Landing de precios para presentar cinco planes progresivos de desarrollo web: Presencia, Negocio, Catálogo, Tienda y Tienda Pro.

## Personalización rápida

Los datos de marca y contacto están centralizados en `app/site-data.ts`:

- Nombre y marca.
- Número de WhatsApp.
- Correo y ubicación.
- Enlaces de redes sociales.
- Planes, precios, funciones y mensajes.

## Desarrollo local

```bash
npm install
npm run dev
```

## Validación

```bash
npm run build
npm run lint
npx tsc --noEmit
node --test tests/rendered-html.test.mjs
```
