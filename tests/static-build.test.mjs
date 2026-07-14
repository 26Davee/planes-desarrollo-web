import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const distUrl = new URL("../dist/", import.meta.url);

test("la compilación genera una página estática completa", async () => {
  const html = await readFile(new URL("index.html", distUrl), "utf8");

  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /Planes de desarrollo web \| Angel Espinoza/);
  assert.doesNotMatch(html, /og\.png|favicon\.svg/);
});

test("los datos profesionales y enlaces finales están incluidos", async () => {
  const assets = await readdir(new URL("assets/", distUrl));
  const javascript = assets.filter((file) => file.endsWith(".js"));
  assert.ok(javascript.length > 0, "Debe existir al menos un archivo JavaScript compilado");

  const bundle = (await Promise.all(
    javascript.map((file) => readFile(new URL(`assets/${file}`, distUrl), "utf8")),
  )).join("\n");

  assert.match(bundle, /Angel Espinoza/);
  assert.match(bundle, /593959015655/);
  assert.match(bundle, /david005espinoza@gmail\.com/);
  assert.match(bundle, /mi-portafolio-6jz\.pages\.dev/);
  assert.match(bundle, /\+ IVA/);
  assert.match(bundle, /Total estimado con IVA/);
  assert.match(bundle, /199/);
  assert.match(bundle, /299/);
  assert.match(bundle, /399/);
  assert.match(bundle, /549/);
  assert.match(bundle, /749/);
  assert.match(bundle, /Hasta 50/);
  assert.match(bundle, /60 días/);
  assert.match(bundle, /Página adicional/);
  assert.doesNotMatch(bundle, /DE \/ WEB|593XXXXXXXXX|tudominio/);
  assert.doesNotMatch(bundle, /IVA incluido|vigentes hasta nuevo aviso/);
});
