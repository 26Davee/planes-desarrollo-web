import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { ADD_ONS, COMPARISON_ROWS, CONDITIONS, FAQS, PLANS, priceWithVat, WHATSAPP_LEVELS } from "../app/site-data.ts";

const distUrl = new URL("../dist/", import.meta.url);
const stylesUrl = new URL("../app/globals.css", import.meta.url);

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

test("la integración con WhatsApp progresa sin prometer automatizaciones externas", () => {
  const whatsappComparison = COMPARISON_ROWS.find((row) => row.label === "Integración con WhatsApp");
  const whatsappFaqs = [
    "¿La integración con WhatsApp es igual en todos los planes?",
    "¿El sistema confirma automáticamente una transferencia bancaria?",
    "¿Puedo añadir una automatización avanzada de WhatsApp después?",
  ];

  assert.deepEqual(
    WHATSAPP_LEVELS.map((level) => level.id),
    PLANS.map((plan) => plan.id),
  );
  assert.deepEqual(
    whatsappComparison?.values,
    ["Contacto directo", "Consulta prellenada", "Pedido preparado", "Apoyo durante la compra", "Apoyo en compra completa"],
  );
  assert.match(WHATSAPP_LEVELS[3].note, /verifican manualmente/);
  assert.doesNotMatch(WHATSAPP_LEVELS.map((level) => `${level.title} ${level.tag}`).join(" "), /Ventas automatizadas|Máxima automatización/);
  assert.ok(whatsappFaqs.every((question) => FAQS.some((item) => item.question === question)));
  assert.ok(CONDITIONS.some((condition) => /WhatsApp Business Platform/.test(condition)));
});

test("los términos técnicos tienen explicaciones breves", () => {
  const termsWithHelp = [
    "Hosting por un año",
    "Certificado SSL",
    "SEO técnico esencial",
    "SEO por página",
    "SEO para productos y categorías",
    "Datos estructurados",
    "Google Analytics",
    "Google Search Console",
    "Medición de conversiones",
    "Pago con tarjetas",
  ];

  for (const label of termsWithHelp) {
    const row = COMPARISON_ROWS.find((item) => item.label === label);
    assert.ok(row?.hint, `${label} debe incluir una explicación`);
    assert.ok(row.hint.length < 180, `${label} debe mantener una explicación corta`);
  }
});

test("las explicaciones se despliegan dentro de su fila sin cubrir otras columnas", async () => {
  const styles = await readFile(stylesUrl, "utf8");

  assert.match(styles, /\.comparison-term\s*\{[^}]*grid-template-columns:/s);
  assert.match(styles, /\.comparison-tooltip\s*\{[^}]*position: static;[^}]*grid-column: 1 \/ -1;/s);
  assert.doesNotMatch(styles, /left: calc\(100% \+ 10px\)/);
});

test("la progresión de WhatsApp conserva una distribución responsive", async () => {
  const styles = await readFile(stylesUrl, "utf8");

  assert.match(styles, /\.whatsapp-levels\s*\{[^}]*repeat\(5, minmax\(0, 1fr\)\)/s);
  assert.match(styles, /\.whatsapp-levels\s*\{[^}]*repeat\(3, minmax\(0, 1fr\)\)/s);
  assert.match(styles, /\.whatsapp-levels\s*\{[^}]*repeat\(2, minmax\(0, 1fr\)\)/s);
  assert.match(styles, /\.whatsapp-levels\s*\{[^}]*grid-template-columns: 1fr/s);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
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
  assert.match(bundle, /Explicación de/);
  assert.match(bundle, /toca \? para conocer cada término/);
  assert.match(bundle, /Herramienta de Google para comprobar la indexación/);
  assert.match(bundle, /Tu WhatsApp evoluciona junto con tu negocio/);
  assert.match(bundle, /Pedidos organizados/);
  assert.match(bundle, /Alcance claro/);
  assert.match(bundle, /WhatsApp Business Platform/);
  assert.doesNotMatch(bundle, /DE \/ WEB|593XXXXXXXXX|tudominio/);
  assert.doesNotMatch(bundle, /vigentes hasta nuevo aviso/);
});
