import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { ADD_ONS, COMPARISON_ROWS, PLANS, priceWithVat } from "../app/site-data.ts";

const distUrl = new URL("../dist/", import.meta.url);

test("los precios sin IVA producen los totales finales anunciados", () => {
  assert.deepEqual(
    PLANS.map((plan) => priceWithVat(plan.price)),
    [199, 299, 399, 549, 749],
  );
});

test("los adicionales muestran precios finales y límites claros", () => {
  assert.deepEqual(
    ADD_ONS.map((item) => item.price),
    ["$35", "$4 / $8", "Desde $35", "Desde +20%", "Desde $20/mes"],
  );
  assert.equal(ADD_ONS.filter((item) => item.taxLabel === "IVA incluido").length, 4);
  assert.match(ADD_ONS[1].detail, /Pedido mínimo de cinco productos/);
  assert.match(ADD_ONS[2].detail, /hasta dos horas/);
});

test("el alcance SEO aumenta de forma progresiva entre los planes", () => {
  const searchConsole = COMPARISON_ROWS.find((row) => row.label === "Google Search Console");
  const keywordResearch = COMPARISON_ROWS.find((row) => row.label === "Investigación inicial de palabras clave");

  assert.deepEqual(searchConsole?.values, [false, false, true, true, true]);
  assert.deepEqual(keywordResearch?.values, [false, false, false, false, true]);
  assert.deepEqual(
    PLANS.map((plan) => plan.seoFeature),
    [
      "SEO técnico esencial",
      "SEO por página",
      "SEO para productos y categorías",
      "SEO para comercio electrónico",
      "SEO avanzado inicial",
    ],
  );
  assert.match(PLANS[0].extras.join(" "), /SEO técnico esencial/);
  assert.match(PLANS[2].extras.join(" "), /SEO para categorías/);
  assert.match(PLANS[3].extras.join(" "), /medición inicial de conversiones/);
  assert.match(PLANS[4].extras.join(" "), /palabras clave/);
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
  assert.match(bundle, /IVA incluido/);
  assert.match(bundle, /desde \$55/);
  assert.match(bundle, /Pedido mínimo de cinco productos/);
  assert.match(bundle, /desde \+30%/);
  assert.match(bundle, /hasta 90 minutos/);
  assert.match(bundle, /SEO técnico esencial/);
  assert.match(bundle, /SEO por página/);
  assert.match(bundle, /SEO para productos y categorías/);
  assert.match(bundle, /SEO para comercio electrónico/);
  assert.match(bundle, /SEO avanzado inicial/);
  assert.match(bundle, /Investigación inicial de palabras clave/);
  assert.match(bundle, /No garantiza una posición específica en Google/);
  assert.doesNotMatch(bundle, /DE \/ WEB|593XXXXXXXXX|tudominio/);
  assert.doesNotMatch(bundle, /vigentes hasta nuevo aviso/);
});
