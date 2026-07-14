"use client";

import { useEffect, useRef, useState } from "react";
import {
  ADD_ONS,
  COMPARISON_ROWS,
  CONDITIONS,
  CONTACT,
  FAQS,
  FEATURES,
  formatUsd,
  LAUNCH_VALIDITY,
  PLANS,
  PROCESS,
  Plan,
  priceWithVat,
  SEO_FEATURE_INDEX,
  VAT_RATE,
  whatsappUrl,
} from "./site-data";

const generalAdviceMessage = "Hola, quiero recibir asesoría para saber qué plan web se adapta mejor a mi negocio.";
const finalMessage = "Hola, quiero desarrollar una página web para mi negocio. Necesito ayuda para elegir el plan más adecuado.";

function Arrow() {
  return <span className="button-arrow" aria-hidden="true">→</span>;
}

function WhatsAppLink({
  message,
  children,
  className = "button button-primary",
  onClick,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      className={className}
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function FeatureState({ included, label }: { included: boolean; label: string }) {
  return (
    <li className={included ? "feature feature-included" : "feature feature-excluded"}>
      <span className="feature-icon" aria-hidden="true">{included ? "✓" : "○"}</span>
      <span className="sr-only">{included ? "Incluido: " : "No incluido: "}</span>
      <span>{label}</span>
    </li>
  );
}

function PlanCard({
  plan,
  index,
  selected,
  onSelect,
  onCompare,
}: {
  plan: Plan;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onCompare: () => void;
}) {
  const featured = plan.id === "tienda-pro";

  return (
    <article
      className={`plan-card ${featured ? "plan-card-featured" : ""} ${selected ? "plan-card-selected" : ""}`}
      id={`plan-${plan.id}`}
      style={{ "--card-delay": `${index * 55}ms` } as React.CSSProperties}
    >
      <div className="plan-topline">
        <span className="plan-index">0{index + 1}</span>
        {plan.badge ? <span className="plan-badge">{plan.badge}</span> : <span className="plan-stage">Plan progresivo</span>}
      </div>

      <div className="plan-heading">
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
      </div>

      <div className="price-block">
        <div className="price-line">
          <p className="price"><span aria-hidden="true">$</span>{formatUsd(plan.price)}</p>
          <span className="tax-label">+ IVA {Math.round(VAT_RATE * 100)}%</span>
        </div>
        <div className="price-context">
          <span>Pago único</span>
          <small>Precio base</small>
        </div>
      </div>
      <p className="price-total">Total final con IVA: <strong>${formatUsd(priceWithVat(plan.price))}</strong></p>

      <p className="hosting-note"><span aria-hidden="true">●</span> Dominio, hosting y SSL por un año</p>

      <WhatsAppLink
        message={plan.whatsappMessage}
        className={`button plan-button ${featured ? "button-primary" : "button-outline"}`}
        onClick={onSelect}
      >
        {plan.button}
      </WhatsAppLink>

      <p className="plan-highlight">{plan.highlight}</p>

      <details className="plan-features" open>
        <summary>
          <span>Funciones del plan</span>
          <span>{plan.includedCount} de {FEATURES.length}</span>
        </summary>
        <ul>
          {FEATURES.map((feature, featureIndex) => (
            <FeatureState
              key={feature}
              label={featureIndex === SEO_FEATURE_INDEX ? plan.seoFeature : feature}
              included={featureIndex < plan.includedCount}
            />
          ))}
        </ul>
      </details>

      <button className="details-link" type="button" onClick={onCompare}>
        Ver todos los detalles <span aria-hidden="true">↓</span>
      </button>

      <details className="included-extras">
        <summary>Alcance específico</summary>
        <ul>
          {plan.extras.map((extra) => <li key={extra}>{extra}</li>)}
        </ul>
      </details>

      <div className="plan-meta">
        <p><span>Correcciones</span><strong>{plan.corrections}</strong></p>
        <p><span>Soporte</span><strong>{plan.support}</strong></p>
        <p><span>Entrega estimada</span><strong>{plan.delivery}</strong></p>
      </div>
    </article>
  );
}

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <span className="table-yes"><span aria-hidden="true">✓</span><span className="sr-only">Incluido</span></span>;
  }
  if (value === false) {
    return <span className="table-no"><span aria-hidden="true">—</span><span className="sr-only">No incluido</span></span>;
  }
  return <span>{value}</span>;
}

function ComparisonTerm({
  label,
  hint,
  tooltipId,
}: {
  label: string;
  hint?: string;
  tooltipId: string;
}) {
  if (!hint) return <span>{label}</span>;

  return (
    <span className="comparison-term">
      <span>{label}</span>
      <button
        className="comparison-help"
        type="button"
        aria-label={`Explicación de ${label}`}
        aria-describedby={tooltipId}
      >
        <span aria-hidden="true">?</span>
      </button>
      <span className="comparison-tooltip" id={tooltipId} role="tooltip">{hint}</span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 },
    );
    revealItems.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (highlightTimer.current) clearTimeout(highlightTimer.current);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const showPlanColumn = (index: number) => {
    setHighlightedColumn(index);
    document.getElementById("comparacion")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    highlightTimer.current = setTimeout(() => setHighlightedColumn(null), 2200);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="nav-shell">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label={`${CONTACT.brand}, ir al inicio`}>
            <span className="brand-name">{CONTACT.brand}</span>
            <small>{CONTACT.role}</small>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Cerrar menú" : "Abrir menú"}</span>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <nav id="main-navigation" className={menuOpen ? "main-nav main-nav-open" : "main-nav"} aria-label="Navegación principal">
            <a href="#planes" onClick={closeMenu}>Planes</a>
            <a href="#comparacion" onClick={closeMenu}>Comparación</a>
            <a href="#portafolio" onClick={closeMenu}>Portafolio</a>
            <a href="#proceso" onClick={closeMenu}>Cómo trabajamos</a>
            <a href="#preguntas" onClick={closeMenu}>Preguntas frecuentes</a>
          </nav>

          <WhatsAppLink message={generalAdviceMessage} className="button button-primary nav-cta">
            Cuéntame tu proyecto
          </WhatsAppLink>
        </div>
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-grid">
            <div className="hero-copy reveal is-visible">
              <p className="eyebrow"><span /> Desarrollo web · Precios de lanzamiento</p>
              <h1>Una página web pensada para hacer crecer tu negocio.</h1>
              <p className="hero-lead">Desde una presencia profesional hasta una tienda virtual completa. Elige el plan que se adapta a tu proyecto y comienza a construir una base digital preparada para crecer.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#planes">Ver planes <Arrow /></a>
                <WhatsAppLink message={generalAdviceMessage} className="button button-quiet">Cuéntame tu proyecto</WhatsAppLink>
              </div>
              <p className="hero-note"><span aria-hidden="true">✓</span> Dominio, hosting y certificado SSL incluidos durante el primer año.</p>
            </div>

            <div className="hero-visual reveal is-visible" aria-label="Vista conceptual de planes web progresivos" role="img">
              <div className="browser-frame">
                <div className="browser-bar"><span /><span /><span /><i /></div>
                <div className="browser-content">
                  <div className="visual-heading"><span>Tu negocio</span><strong>Crece con la web adecuada.</strong></div>
                  <div className="visual-plans">
                    <div><span>01</span><b>Presencia</b><i /></div>
                    <div><span>03</span><b>Catálogo</b><i /><i /><i /></div>
                    <div className="visual-plan-active"><span>05</span><b>Tienda Pro</b><i /><i /><i /><i /></div>
                  </div>
                  <div className="visual-caption"><span>Una base profesional</span><b>+</b><span>herramientas para crecer</span></div>
                </div>
              </div>
              <span className="visual-orbit visual-orbit-one" aria-hidden="true">Estrategia</span>
              <span className="visual-orbit visual-orbit-two" aria-hidden="true">Conversión</span>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Beneficios incluidos">
          <div>
            <p><span>01</span> Pago único por desarrollo</p>
            <p><span>02</span> Preparado para celulares</p>
            <p><span>03</span> Acompañamiento y soporte</p>
            <p><span>04</span> Base lista para crecer</p>
          </div>
        </section>

        <section className="section plans-section" id="planes">
          <div className="section-heading section-heading-split reveal">
            <div>
              <p className="eyebrow"><span /> Planes de desarrollo web</p>
              <h2>Elige lo que tu negocio necesita hoy.</h2>
            </div>
            <div className="section-intro">
              <p>Todos los planes parten de una base profesional. A medida que avanzas, se incorporan herramientas para mostrar productos, gestionar pedidos y vender directamente desde tu página.</p>
              <small>Precios de lanzamiento sin IVA, expresados en USD. El total final con IVA se muestra debajo de cada precio. Válidos para {LAUNCH_VALIDITY}.</small>
            </div>
          </div>

          <div className="plans-grid reveal">
            {PLANS.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={index}
                selected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
                onCompare={() => showPlanColumn(index)}
              />
            ))}
          </div>
        </section>

        <section className="section comparison-section" id="comparacion">
          <div className="section-heading reveal">
            <p className="eyebrow"><span /> Comparación completa</p>
            <h2>Compara todos los planes</h2>
            <p>Revisa cada función y encuentra la opción que corresponde a las necesidades actuales de tu proyecto.</p>
          </div>

          <div className="table-hint" aria-hidden="true">Desliza para comparar · toca ? para conocer cada término →</div>
          <div className="comparison-wrap reveal" tabIndex={0} aria-label="Tabla de comparación de planes; desplázate horizontalmente si es necesario">
            <table>
              <thead>
                <tr>
                  <th scope="col">Función</th>
                  {PLANS.map((plan, index) => (
                    <th key={plan.id} scope="col" className={highlightedColumn === index ? "column-highlight" : ""}>
                      <span>{plan.name}</span>
                      <strong>${formatUsd(plan.price)} <small>+ IVA</small></strong>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, rowIndex) => (
                  <tr key={row.label}>
                    <th scope="row">
                      <ComparisonTerm
                        label={row.label}
                        hint={row.hint}
                        tooltipId={`comparison-help-${rowIndex}`}
                      />
                    </th>
                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${PLANS[index].id}`} className={highlightedColumn === index ? "column-highlight" : ""}>
                        <ComparisonCell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="portfolio-band" id="portafolio">
          <div className="portfolio-band-inner reveal">
            <div>
              <p className="eyebrow"><span /> Trabajo real</p>
              <h2>Conoce proyectos que ya he desarrollado.</h2>
            </div>
            <div className="portfolio-band-copy">
              <p>Revisa mi portafolio para conocer el enfoque visual, la calidad y el tipo de experiencia que puedo construir para tu negocio.</p>
              <a className="button button-primary" href={CONTACT.portfolio} target="_blank" rel="noreferrer">
                Ver mi portafolio <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="section process-section" id="proceso">
          <div className="section-heading section-heading-split reveal">
            <div>
              <p className="eyebrow"><span /> Un proceso claro</p>
              <h2>Así comienza tu proyecto</h2>
            </div>
            <p className="section-intro">Cada etapa tiene un objetivo concreto. Sabrás qué necesitamos, qué estamos construyendo y cuándo avanzamos.</p>
          </div>
          <ol className="process-grid reveal">
            {PROCESS.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section terms-section" id="condiciones">
          <div className="terms-grid">
            <div className="section-heading reveal">
              <p className="eyebrow"><span /> Alcance transparente</p>
              <h2>Información importante antes de comenzar</h2>
              <p>Estas condiciones mantienen el proyecto ordenado, evitan costos inesperados y protegen el alcance acordado.</p>
            </div>

            <details className="terms-accordion reveal">
              <summary><span>Consultar condiciones del servicio</span><i aria-hidden="true">+</i></summary>
              <ul>
                {CONDITIONS.map((condition) => <li key={condition}>{condition}</li>)}
              </ul>
            </details>
          </div>

          <div className="add-ons reveal" id="adicionales">
            <div className="add-ons-heading">
              <p className="eyebrow"><span /> Alcance adicional</p>
              <h3>Extras con precios claros.</h3>
              <p>Solo pagas más cuando el proyecto necesita trabajo fuera del alcance incluido. Los valores monetarios de esta sección son precios finales con IVA incluido.</p>
            </div>
            <div className="add-ons-grid">
              {ADD_ONS.map((item) => (
                <article key={item.name}>
                  <h4>{item.name}</h4>
                  <div className="add-on-price">
                    <strong>{item.price}</strong>
                    <small>{item.taxLabel}</small>
                  </div>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="payment-block reveal">
            <div className="payment-copy">
              <p className="eyebrow"><span /> Forma de pago</p>
              <h3>Tres etapas, un avance ordenado.</h3>
              <p>Cada etapa será revisada antes de continuar. El método de pago se acordará con cada cliente.</p>
            </div>
            <ol className="payment-steps">
              <li><strong>50%</strong><span>Para comenzar el proyecto</span></li>
              <li><strong>30%</strong><span>Al presentar la página funcional</span></li>
              <li><strong>20%</strong><span>Antes de publicar y entregar accesos</span></li>
            </ol>
          </div>
        </section>

        <section className="section faq-section" id="preguntas">
          <div className="faq-layout">
            <div className="section-heading reveal">
              <p className="eyebrow"><span /> Respuestas directas</p>
              <h2>Preguntas frecuentes</h2>
              <p>Todo lo esencial antes de elegir un plan. Si tu caso es diferente, conversemos.</p>
              <WhatsAppLink message={generalAdviceMessage} className="text-link">Resolver una duda <Arrow /></WhatsAppLink>
            </div>
            <div className="faq-list reveal">
              {FAQS.map((item, index) => (
                <details key={item.question}>
                  <summary><span><small>{String(index + 1).padStart(2, "0")}</small>{item.question}</span><i aria-hidden="true">+</i></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" id="contacto">
          <div className="final-cta-inner reveal">
            <p className="eyebrow eyebrow-light"><span /> Tu siguiente paso</p>
            <h2>Tu negocio puede comenzar con una mejor presencia digital.</h2>
            <p>Cuéntame qué necesitas y te ayudaré a elegir el plan adecuado para tu proyecto.</p>
            <div className="hero-actions">
              <WhatsAppLink message={finalMessage} className="button button-light">Hablar sobre mi proyecto</WhatsAppLink>
              <a className="button button-dark-outline" href="#planes">Volver a comparar planes <span aria-hidden="true">↑</span></a>
            </div>
            <small>Responderé tus dudas antes de que tomes una decisión.</small>
          </div>
        </section>
      </main>

      <a className="floating-whatsapp" href={whatsappUrl(generalAdviceMessage)} target="_blank" rel="noreferrer" aria-label="Hablar por WhatsApp">
        <span aria-hidden="true">WA</span>
      </a>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand brand-light" href="#inicio"><span className="brand-name">{CONTACT.brand}</span><small>{CONTACT.role}</small></a>
            <p>Diseño y desarrollo de páginas web para negocios que quieren crecer en internet.</p>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <a href={whatsappUrl(generalAdviceMessage)} target="_blank" rel="noreferrer">WhatsApp: {CONTACT.whatsappDisplay}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <span>{CONTACT.location}</span>
          </div>
          <div className="footer-column">
            <h3>Explorar</h3>
            <a href="#planes">Planes</a>
            <a href={CONTACT.portfolio} target="_blank" rel="noreferrer">Portafolio ↗</a>
            <a href="#condiciones">Condiciones</a>
            <a href="#preguntas">Preguntas frecuentes</a>
            <a href="#privacidad">Política de privacidad</a>
          </div>
          <div className="footer-column">
            <h3>Redes</h3>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <div className="privacy-note" id="privacidad">
          <strong>Privacidad.</strong> Los datos que compartas por correo o WhatsApp se usarán únicamente para responder tu consulta y preparar una propuesta.
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {CONTACT.name}. Todos los derechos reservados.</p>
          <p>Diseño claro · Desarrollo responsable</p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
