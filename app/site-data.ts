export const CONTACT = {
  brand: "Angel Espinoza",
  name: "Angel Espinoza",
  role: "Desarrollo Web",
  whatsapp: "593959015655",
  whatsappDisplay: "+593 959 015 655",
  email: "david005espinoza@gmail.com",
  location: "Riobamba, Ecuador",
  instagram: "https://www.instagram.com/davee.ds3/",
  linkedin: "https://www.linkedin.com/in/david-espinoza-47466833b/",
  portfolio: "https://mi-portafolio-6jz.pages.dev/",
} as const;

export const VAT_RATE = 0.15;
export const LAUNCH_VALIDITY = "los primeros cinco proyectos confirmados o hasta el 30 de septiembre de 2026";

export const priceWithVat = (price: number) => {
  const priceInCents = Math.round(price * 100);
  const vatPercent = Math.round(VAT_RATE * 100);

  return Math.round((priceInCents * (100 + vatPercent)) / 100) / 100;
};
export const formatUsd = (value: number) => value.toLocaleString("es-EC", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const FEATURES = [
  "Dominio, hosting y certificado SSL",
  "Diseño adaptable a celulares",
  "WhatsApp y formulario de contacto",
  "SEO técnico esencial",
  "Páginas informativas según el plan",
  "Google Analytics",
  "Catálogo de productos",
  "Buscador de productos",
  "Pedidos de productos por WhatsApp",
  "Carrito de compras",
  "Pago por transferencia o contraentrega",
  "Gestión básica de inventario",
  "Correos automáticos de pedidos",
  "Configuración de envíos y cupones",
  "Registro e historial de clientes",
  "Pago con tarjetas",
] as const;

export const SEO_FEATURE_INDEX = FEATURES.indexOf("SEO técnico esencial");

export type PlanId = "presencia" | "negocio" | "catalogo" | "tienda" | "tienda-pro";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  description: string;
  highlight: string;
  includedCount: number;
  seoFeature: string;
  whatsappFeature: string;
  badge?: string;
  button: string;
  whatsappMessage: string;
  corrections: string;
  support: string;
  delivery: string;
  extras: readonly string[];
};

export const PLANS: readonly Plan[] = [
  {
    id: "presencia",
    name: "Presencia",
    price: 173.04,
    description: "Para profesionales y emprendimientos que necesitan comenzar a mostrar su negocio en internet.",
    highlight: "Tu primera presencia digital profesional.",
    includedCount: 4,
    seoFeature: "SEO técnico esencial",
    whatsappFeature: "Contacto directo con mensaje preparado",
    button: "Elegir Presencia",
    whatsappMessage: "Hola, me interesa el Plan Presencia de $173,04 + IVA ($199,00 en total). Quisiera conocer los pasos para comenzar mi página web.",
    corrections: "1 ronda de correcciones",
    support: "15 días de soporte",
    delivery: "De 7 a 10 días laborables desde la entrega del contenido.",
    extras: [
      "Página web de una sola sección",
      "Hasta cinco bloques de contenido",
      "Inicio, presentación, servicios, galería y contacto",
      "Botón flotante de WhatsApp y formulario",
      "Redes sociales y ubicación con Google Maps",
      "Un correo corporativo",
      "SEO técnico esencial: título, descripción, sitemap e indexación",
      "Capacitación básica",
    ],
  },
  {
    id: "negocio",
    name: "Negocio",
    price: 260,
    description: "Para negocios y profesionales que necesitan presentar mejor sus servicios y generar confianza.",
    highlight: "Más espacio para contar lo que hace diferente a tu negocio.",
    includedCount: 6,
    seoFeature: "SEO por página",
    whatsappFeature: "Consultas y cotizaciones prellenadas",
    button: "Elegir Negocio",
    whatsappMessage: "Hola, me interesa el Plan Negocio de $260,00 + IVA ($299,00 en total). Quisiera conocer los pasos para desarrollar la página de mi negocio.",
    corrections: "2 rondas de correcciones",
    support: "20 días de soporte",
    delivery: "De 10 a 15 días laborables desde la entrega del contenido.",
    extras: [
      "Hasta cuatro páginas informativas",
      "Inicio, nosotros, servicios y contacto",
      "WhatsApp, formulario y redes sociales",
      "Ubicación mediante Google Maps",
      "Hasta dos correos corporativos",
      "SEO individual para hasta cuatro páginas y Google Analytics",
      "Capacitación básica",
    ],
  },
  {
    id: "catalogo",
    name: "Catálogo",
    price: 346.96,
    description: "Para tiendas que quieren mostrar sus productos y recibir pedidos directamente por WhatsApp.",
    highlight: "Convierte tu página en una vitrina disponible todos los días.",
    includedCount: 9,
    seoFeature: "SEO para productos y categorías",
    whatsappFeature: "Pedidos organizados de productos",
    button: "Elegir Catálogo",
    whatsappMessage: "Hola, me interesa el Plan Catálogo de $346,96 + IVA ($399,00 en total) para mostrar mis productos y recibir pedidos por WhatsApp.",
    corrections: "2 rondas de correcciones",
    support: "30 días de soporte",
    delivery: "De 15 a 20 días laborables desde la entrega completa del contenido.",
    extras: [
      "Hasta cinco páginas informativas",
      "Catálogo de hasta 20 productos",
      "Categorías y página individual por producto",
      "Nombre, precio, descripción e imágenes",
      "Buscador básico y pedido por WhatsApp",
      "Panel para agregar o editar productos",
      "SEO para categorías y hasta 20 productos, datos estructurados y Search Console",
      "Hasta tres correos corporativos",
      "Capacitación para administrar el catálogo",
    ],
  },
  {
    id: "tienda",
    name: "Tienda",
    price: 477.39,
    description: "Para negocios que desean recibir pedidos completos y pagos por transferencia o contraentrega.",
    highlight: "Comienza a vender con carrito, inventario y gestión de pedidos.",
    includedCount: 14,
    seoFeature: "SEO para comercio electrónico",
    whatsappFeature: "Apoyo durante el proceso de compra",
    button: "Elegir Tienda",
    whatsappMessage: "Hola, me interesa el Plan Tienda de $477,39 + IVA ($549,00 en total) con carrito, inventario y pagos por transferencia.",
    corrections: "3 rondas de correcciones",
    support: "45 días de soporte",
    delivery: "De 20 a 25 días laborables desde la entrega completa del contenido.",
    extras: [
      "Hasta cinco páginas informativas",
      "Tienda de hasta 30 productos",
      "Categorías, páginas individuales y buscador",
      "Carrito y finalización de compra",
      "Pago por transferencia o contraentrega",
      "Inventario y correos automáticos",
      "Cupones y una zona básica de envío",
      "SEO para comercio electrónico y medición inicial de conversiones",
      "Hasta tres correos corporativos",
      "Capacitación para gestionar productos y pedidos",
    ],
  },
  {
    id: "tienda-pro",
    name: "Tienda Pro",
    price: 651.3,
    description: "Para negocios que quieren ofrecer una experiencia completa de compra y recibir pagos con tarjetas.",
    highlight: "Todo lo necesario para vender directamente desde tu página.",
    includedCount: 16,
    seoFeature: "SEO avanzado inicial",
    whatsappFeature: "Apoyo para una compra más completa",
    badge: "MÁS COMPLETO",
    button: "Elegir Tienda Pro",
    whatsappMessage: "Hola, me interesa el Plan Tienda Pro de $651,30 + IVA ($749,00 en total) con carrito, inventario y pagos con tarjetas.",
    corrections: "3 rondas de correcciones",
    support: "60 días de soporte",
    delivery: "De 25 a 30 días laborables desde la entrega completa del contenido.",
    extras: [
      "Hasta siete páginas informativas",
      "Tienda de hasta 50 productos",
      "Categorías y subcategorías",
      "Carrito y finalización de compra",
      "Registro de clientes e historial de pedidos",
      "Transferencia, contraentrega y pago con tarjetas",
      "Inventario, correos automáticos y cupones",
      "Hasta dos zonas de envío",
      "SEO avanzado: palabras clave, datos estructurados, Analytics, Search Console y reporte inicial",
      "Hasta cinco correos corporativos",
      "Capacitación para productos, clientes y pedidos",
    ],
  },
] as const;

export const WHATSAPP_LEVELS = [
  {
    id: "presencia",
    plan: "Presencia",
    title: "Contacto directo",
    description: "Tus visitantes abren una conversación desde la página con un mensaje previamente preparado.",
    tag: "Atención manual",
  },
  {
    id: "negocio",
    plan: "Negocio",
    title: "Consultas guiadas",
    description: "El mensaje identifica el servicio o la consulta antes de que el cliente te escriba.",
    tag: "Consulta prellenada",
  },
  {
    id: "catalogo",
    plan: "Catálogo",
    title: "Pedidos organizados",
    description: "El cliente elige productos y cantidades, y WhatsApp recibe un resumen listo para revisar.",
    tag: "Pedido preparado",
  },
  {
    id: "tienda",
    plan: "Tienda",
    title: "Apoyo durante la compra",
    description: "La tienda reúne carrito, entrega y forma de pago; WhatsApp queda disponible para resolver dudas o recibir un comprobante.",
    tag: "Compra más ordenada",
    note: "Las transferencias se verifican manualmente antes de confirmar el pago.",
  },
  {
    id: "tienda-pro",
    plan: "Tienda Pro",
    title: "Experiencia completa",
    description: "El cliente puede pagar con tarjeta, crear su cuenta y consultar pedidos desde la tienda; WhatsApp funciona como canal de apoyo.",
    tag: "Mayor autonomía",
    badge: "Más completo",
  },
] as const;

export const PROCESS = [
  { title: "Cuéntame tu idea", text: "Conversamos sobre tu negocio, tus objetivos y las funciones que necesita tu página." },
  { title: "Definimos el plan", text: "Seleccionamos la opción adecuada y establecemos contenidos, fechas y alcance." },
  { title: "Diseñamos y desarrollamos", text: "Construimos la página, adaptamos su diseño y configuramos sus herramientas." },
  { title: "Publicamos y te capacitamos", text: "Revisamos el funcionamiento, publicamos el sitio y te enseñamos a administrarlo." },
] as const;

export const CONDITIONS = [
  "Los precios destacados son valores base sin IVA, expresados en dólares estadounidenses (USD). Al añadir el 15% de IVA se obtiene el total final indicado en cada plan.",
  "Los valores monetarios de la sección de servicios adicionales son precios finales e incluyen IVA. El recargo por entrega urgente se calcula sobre el total final cotizado.",
  "Los precios de lanzamiento son válidos para los primeros cinco proyectos confirmados o hasta el 30 de septiembre de 2026, lo que ocurra primero.",
  "El dominio, hosting y certificado SSL están incluidos durante el primer año.",
  "La renovación del dominio y hosting a partir del segundo año será asumida por el propietario del negocio. El valor se informará antes del vencimiento.",
  "El dominio debe registrarse con los datos del cliente.",
  "El cliente debe entregar logotipo, fotografías, precios, descripciones, información y datos de contacto.",
  "Los tiempos de entrega comienzan cuando se recibe el anticipo y todo el contenido necesario.",
  "Cada plan incluye únicamente la cantidad de páginas, productos y correcciones especificada.",
  "Los cambios o funciones adicionales se cotizan por separado. No se incluyen cambios ilimitados.",
  "No se incluyen fotografías profesionales, creación de logotipo, redacción extensa ni manejo de redes sociales, salvo cotización independiente.",
  "Las licencias de plugins o herramientas premium no están incluidas cuando sean necesarias para una función especial.",
  "Las notificaciones automáticas y otras integraciones avanzadas mediante WhatsApp Business Platform no están incluidas en los precios base; requieren evaluación técnica y cotización independiente.",
  "La integración de pagos con tarjeta se realiza con una pasarela compatible elegida según el proyecto y depende de una cuenta comercial aprobada.",
  "Las comisiones cobradas por bancos o pasarelas corresponden al negocio.",
  "No se incluye facturación electrónica ni integraciones personalizadas con sistemas externos.",
  "El SEO incluido corresponde a una configuración inicial según el alcance de cada plan. No garantiza una posición específica en Google; la creación continua de contenido, enlaces y optimización mensual se cotiza por separado.",
  "El soporte posterior cubre errores relacionados con el desarrollo entregado; no incluye rediseños completos ni carga permanente de contenido.",
  "Después del periodo de soporte puede contratarse un servicio de mantenimiento.",
] as const;

export const FAQS = [
  { question: "¿Los precios incluyen IVA?", answer: "En los planes, el precio destacado se muestra sin IVA y debajo aparece el total final; por ejemplo, $173,04 + IVA corresponde a $199,00. En los servicios adicionales, todos los valores monetarios indicados ya incluyen IVA." },
  { question: "¿Qué significa el SEO incluido?", answer: "Todos los planes incluyen una base técnica para que los buscadores puedan entender e indexar el sitio. Los planes superiores añaden optimización por página, SEO para productos, medición de conversiones y, en Tienda Pro, una investigación inicial de palabras clave y un reporte. Esto no garantiza aparecer primero en Google; el posicionamiento continuo se cotiza por separado." },
  { question: "¿El dominio y hosting están incluidos?", answer: "Sí. Todos los planes incluyen dominio, hosting y certificado SSL durante el primer año. A partir del segundo año, la renovación será asumida por el propietario del sitio." },
  { question: "¿La integración con WhatsApp es igual en todos los planes?", answer: "No. Presencia facilita el contacto directo; Negocio organiza consultas y cotizaciones; Catálogo prepara un resumen del pedido; y Tienda y Tienda Pro completan más pasos dentro de la página mientras mantienen WhatsApp como canal de apoyo." },
  { question: "¿El sistema confirma automáticamente una transferencia bancaria?", answer: "No. El pedido puede registrar la transferencia o permitir que el cliente envíe el comprobante, pero el negocio debe verificar el pago antes de marcarlo como confirmado. La confirmación automática requiere una pasarela de pago compatible." },
  { question: "¿Puedo añadir una automatización avanzada de WhatsApp después?", answer: "Sí. Las notificaciones automáticas y otras funciones avanzadas pueden añadirse mediante WhatsApp Business Platform u otros servicios compatibles. Se evalúan y cotizan por separado porque pueden requerir proveedores externos, plantillas aprobadas y costos recurrentes." },
  { question: "¿Podré administrar mi página?", answer: "Sí. Al finalizar el proyecto recibirás una capacitación básica para actualizar la información correspondiente al plan contratado." },
  { question: "¿Quién entrega las fotografías y los textos?", answer: "El cliente debe proporcionar el logotipo, fotografías, precios, descripciones y datos del negocio. La creación de contenido adicional puede cotizarse por separado." },
  { question: "¿Puedo agregar más productos?", answer: "Sí. Cada plan incluye una cantidad específica de productos. Los productos adicionales pueden cargarse mediante un valor adicional o directamente por el cliente después de la capacitación." },
  { question: "¿Los cambios son ilimitados?", answer: "No. Cada plan incluye entre una y tres rondas de correcciones. Los cambios adicionales se cotizan según su complejidad." },
  { question: "¿El Plan Catálogo permite cobrar desde la página?", answer: "No. El Plan Catálogo permite mostrar productos y recibir solicitudes mediante WhatsApp. Para utilizar carrito y formas de pago se necesita el Plan Tienda o Tienda Pro." },
  { question: "¿Cuál es la diferencia entre Tienda y Tienda Pro?", answer: "El Plan Tienda permite utilizar carrito, inventario, transferencia y contraentrega. Tienda Pro agrega registro de clientes, historial de pedidos y pago con tarjetas." },
  { question: "¿Las comisiones por pagos con tarjeta están incluidas?", answer: "No. Las comisiones de las pasarelas o entidades financieras son cobradas directamente al negocio por cada transacción." },
  { question: "¿Puedo solicitar una función que no aparezca en los planes?", answer: "Sí. Las funciones especiales pueden evaluarse y cotizarse de manera personalizada." },
  { question: "¿Cuánto demora el desarrollo?", answer: "El tiempo depende del plan y comienza cuando se recibe el anticipo y todo el contenido. Los proyectos pueden tomar aproximadamente entre 7 y 30 días laborables." },
] as const;

type ComparisonCell = boolean | string;
export type ComparisonRow = { label: string; hint?: string; values: readonly ComparisonCell[] };

export const COMPARISON_ROWS: readonly ComparisonRow[] = [
  { label: "Tipo de sitio", values: ["Una sección", "Sitio corporativo", "Catálogo", "Tienda virtual", "Tienda completa"] },
  { label: "Páginas informativas", values: ["1 / 5 bloques", "Hasta 4", "Hasta 5", "Hasta 5", "Hasta 7"] },
  { label: "Cantidad de productos", values: [false, false, "Hasta 20", "Hasta 30", "Hasta 50"] },
  { label: "Diseño adaptable", hint: "La página se ajusta correctamente a celulares, tabletas y computadoras.", values: [true, true, true, true, true] },
  { label: "Dominio por un año", hint: "Dirección web propia, como tunegocio.com, incluida durante el primer año.", values: [true, true, true, true, true] },
  { label: "Hosting por un año", hint: "Servicio que mantiene tu página disponible en internet durante el primer año.", values: [true, true, true, true, true] },
  { label: "Certificado SSL", hint: "Protege la conexión de tus visitantes y muestra el candado de seguridad.", values: [true, true, true, true, true] },
  { label: "Correos corporativos", hint: "Cuentas con el dominio de tu negocio, por ejemplo ventas@tunegocio.com.", values: ["1", "Hasta 2", "Hasta 3", "Hasta 3", "Hasta 5"] },
  { label: "Integración con WhatsApp", hint: "El nivel indica cuánto trabajo queda preparado antes de que el cliente inicie o continúe la conversación.", values: ["Contacto directo", "Consulta prellenada", "Pedido preparado", "Apoyo durante la compra", "Apoyo en compra completa"] },
  { label: "Formulario", values: [true, true, true, true, true] },
  { label: "Google Maps", values: [true, true, true, true, true] },
  { label: "SEO técnico esencial", hint: "Incluye título, descripción, sitemap, indexación y buenas prácticas técnicas iniciales.", values: [true, true, true, true, true] },
  { label: "SEO por página", hint: "Optimización inicial de títulos, descripciones y contenido de cada página incluida.", values: [false, "Hasta 4 páginas", "Hasta 5 páginas", "Hasta 5 páginas", "Hasta 7 páginas"] },
  { label: "SEO para productos y categorías", hint: "Optimiza nombres, descripciones y categorías para que los productos puedan encontrarse mejor en buscadores.", values: [false, false, "Hasta 20 productos", "Hasta 30 productos", "Hasta 50 productos"] },
  { label: "Datos estructurados", hint: "Información técnica que ayuda a buscadores a comprender el negocio, sus productos y su contenido.", values: [false, false, "Productos", "Productos + negocio", "Avanzados"] },
  { label: "Google Analytics", hint: "Mide visitas y comportamiento general de los usuarios.", values: [false, true, true, true, true] },
  { label: "Google Search Console", hint: "Herramienta de Google para comprobar la indexación, detectar errores y conocer qué búsquedas llevan visitas al sitio.", values: [false, false, true, true, true] },
  { label: "Medición de conversiones", hint: "Configuración inicial para medir acciones importantes como pedidos o compras.", values: [false, false, false, true, true] },
  { label: "Investigación inicial de palabras clave", hint: "Análisis de las búsquedas que podrían usar tus clientes para encontrar el negocio.", values: [false, false, false, false, true] },
  { label: "Reporte SEO inicial", hint: "Resumen de la configuración realizada, el estado inicial del sitio y las oportunidades detectadas.", values: [false, false, false, false, true] },
  { label: "Catálogo", hint: "Sección para mostrar productos con imágenes, precios y descripciones.", values: [false, false, true, true, true] },
  { label: "Categorías", hint: "Organizan los productos por grupos para que sean más fáciles de encontrar.", values: [false, false, true, true, "Sí + subcategorías"] },
  { label: "Buscador", hint: "Permite encontrar productos escribiendo su nombre o una palabra relacionada.", values: [false, false, true, true, true] },
  { label: "Pedido por WhatsApp", values: [false, false, true, true, true] },
  { label: "Carrito", hint: "Guarda los productos elegidos antes de enviar o completar el pedido.", values: [false, false, false, true, true] },
  { label: "Finalización de compra", hint: "Paso donde el cliente confirma sus datos, productos y forma de entrega o pago.", values: [false, false, false, true, true] },
  { label: "Transferencia", hint: "Permite recibir pedidos que el cliente pagará mediante transferencia bancaria.", values: [false, false, false, true, true] },
  { label: "Contraentrega", hint: "El cliente paga cuando recibe o retira el pedido, si tu negocio ofrece esta modalidad.", values: [false, false, false, true, true] },
  { label: "Inventario", hint: "Control de existencias para saber cuántas unidades están disponibles.", values: [false, false, false, true, true] },
  { label: "Correos automáticos", hint: "Mensajes que el sistema envía al cliente y al negocio cuando se registra un pedido.", values: [false, false, false, true, true] },
  { label: "Cupones", hint: "Códigos que aplican los descuentos definidos por tu negocio.", values: [false, false, false, true, true] },
  { label: "Zonas de envío", hint: "Áreas geográficas con reglas o costos de entrega configurados.", values: [false, false, false, "1 zona", "Hasta 2"] },
  { label: "Registro de clientes", hint: "Permite que cada comprador tenga una cuenta con sus datos.", values: [false, false, false, false, true] },
  { label: "Historial de pedidos", hint: "Muestra al cliente las compras o solicitudes que realizó anteriormente.", values: [false, false, false, false, true] },
  { label: "Pago con tarjetas", hint: "Permite cobrar con tarjeta mediante una pasarela de pagos; requiere una cuenta aprobada por el proveedor.", values: [false, false, false, false, true] },
  { label: "Capacitación", values: ["Básica", "Básica", "Catálogo", "Productos y pedidos", "Gestión completa"] },
  { label: "Rondas de correcciones", values: ["1", "2", "2", "3", "3"] },
  { label: "Días de soporte", values: ["15 días", "20 días", "30 días", "45 días", "60 días"] },
] as const;

export const ADD_ONS = [
  {
    name: "Página adicional",
    price: "$35",
    taxLabel: "IVA incluido",
    detail: "Página sencilla dentro del diseño existente, con textos e imágenes entregados por el cliente. Una página personalizada se cotiza desde $55, IVA incluido.",
  },
  {
    name: "Producto adicional",
    price: "$4 / $8",
    taxLabel: "IVA incluido",
    detail: "$4 con contenido listo o $8 si requiere edición básica. Productos con variaciones desde $10. Pedido mínimo de cinco productos.",
  },
  {
    name: "Ronda adicional",
    price: "Desde $35",
    taxLabel: "IVA incluido",
    detail: "$35 para Presencia y Negocio, $45 para Catálogo y $60 para Tiendas. Incluye una lista consolidada de ajustes menores y hasta dos horas; después, $25 por hora.",
  },
  {
    name: "Entrega urgente",
    price: "Desde +20%",
    taxLabel: "Sobre el total final",
    detail: "+20% por una reducción moderada del plazo y desde +30% cuando el tiempo se reduce casi a la mitad. Sujeto a disponibilidad y a que el contenido esté listo.",
  },
  {
    name: "Mantenimiento",
    price: "Desde $20/mes",
    taxLabel: "IVA incluido",
    detail: "$20 para web informativa, hasta 30 minutos; $35 para catálogo, hasta una hora o cinco productos; $50 para tienda, hasta 90 minutos y revisión técnica.",
  },
] as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
