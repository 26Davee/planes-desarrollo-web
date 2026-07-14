import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { PLANS, priceWithVat } from "../app/site-data.ts";

const distUrl = new URL("../dist/", import.meta.url);

test("los precios sin IVA producen los totales finales anunciados", () => {
  assert.deepEqual(
    PLANS.map((plan) => priceWithVat(plan.price)),
    [199, 299, 399, 549, 749],
  );
});

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
  assert.match(bundle, /Total final con IVA/);
  assert.match(bundle, /173\.04/);
  assert.match(bundle, /260/);
  assert.match(bundle, /346\.96/);
  assert.match(bundle, /477\.39/);
  assert.match(bundle, /651\.3/);
  assert.match(bundle, /199,00 en total/);
  assert.match(bundle, /299,00 en total/);
  assert.match(bundle, /399,00 en total/);
  assert.match(bundle, /549,00 en total/);
  assert.match(bundle, /749,00 en total/);
  assert.match(bundle, /Hasta 50/);
  assert.match(bundle, /60 días/);
  assert.match(bundle, /Página adicional/);
  assert.doesNotMatch(bundle, /DE \/ WEB|593XXXXXXXXX|tudominio/);
  assert.doesNotMatch(bundle, /IVA incluido|vigentes hasta nuevo aviso/);
});
