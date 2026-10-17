/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import {
  Compass,
  Calendar,
  Clock,
  MapPin,
  Mountain,
  ShieldCheck,
  Users,
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Download,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ExternalLink,
  Award,
  ArrowDown,
  Menu as MenuIcon,
  Tent,
  Utensils,
  Play,
  Layers,
  Trees
} from 'lucide-react';

// WhatsApp SVG Icon matching reference
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.97.574 3.805 1.564 5.353L2.25 21.75l4.526-1.282A9.97 9.97 0 0 0 12.03 22c5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.283c-1.63 0-3.153-.466-4.46-1.272l-.32-.197-2.684.76.772-2.617-.21-.336A8.258 8.258 0 0 1 3.778 12.03c0-4.551 3.702-8.253 8.253-8.253 4.551 0 8.253 3.702 8.253 8.253 0 4.551-3.702 8.253-8.253 8.253zm4.52-6.177c-.248-.124-1.467-.724-1.695-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.506.112-.112.248-.29.372-.435.124-.145.166-.248.248-.415.083-.166.041-.31-.02-.435-.062-.124-.56-1.35-.767-1.849-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.31-.228.248-.87 0.85-.87 2.073s.891 2.404 1.016 2.57c.124.166 1.753 2.677 4.246 3.754.593.256 1.057.409 1.419.524.596.19 1.138.163 1.567.099.478-.071 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.476-.29z" />
    </svg>
  );
}

// Master Data Structure matching reference P object adapted to Kilimanjaro 11 Days
const P = {
  title: "TREKKING AL KILIMANJARO & SAFARI EN TANZANIA",
  destination: "Tanzania, África Oriental",
  dates: "5 al 15 de Febrero de 2027",
  duration: "11 Días",
  officialPriceUSD: "3.350",
  contact: {
    whatsappNumber: "5493516816262",
    whatsappDisplay: "+54 9 351 6816262",
    email: "birnexperience@gmail.com",
    website: "https://birnexperience.com/",
    instagram: "https://www.instagram.com/birnexperience",
    instagramHighlight: "https://www.instagram.com/stories/highlights/18250535248101437/",
    facebook: "https://www.facebook.com/birnexperience/"
  },
  stats: [
    { num: "11", unit: "DÍAS", label: "Experiencia integral", sub: "5 al 15 de Febrero 2027", accent: "#d45e33" },
    { num: "10", unit: "NOCHES", label: "Refugios & Lodges", sub: "Ruta Marangu & Safari", accent: "#009ea4" },
    { num: "5.895", unit: "M", label: "Punto más alto", sub: "Uhuru Peak · Cima de África", accent: "#d45e33" },
    { num: "3.350", unit: "USD", label: "TARIFA OFICIAL", sub: "Por persona en base doble", accent: "#d45e33" }
  ],
  itinerary: [
    {
      day: 1,
      date: "05 DE FEBRERO",
      title: "Llegada al Aeropuerto de Kilimanjaro (JRO) → Moshi",
      subtitle: "Bienvenida en Moshi, traslado y briefing",
      stage: "llegada",
      stageLabel: "Llegada & Encuentro",
      location: "Aeropuerto JRO → Hotel en Moshi / Arusha",
      meal: "Cena de bienvenida",
      accommodation: "Hotel Confortable en Moshi ***",
      images: ["/assets/images/aeropuerto.webp"],
      activities: [
        "Recepción personalizada del grupo en el Aeropuerto Internacional de Kilimanjaro (JRO).",
        "Traslado en vehículo privado hacia el hotel base en Moshi (45 min de trayecto).",
        "Revisión minuciosa de equipo individual, aclimatación y charla técnica general con el guía de Birn Experience y el equipo de montaña."
      ],
      metrics: { distance: "Traslado en vehículo", ascent: "—", descent: "—", duration: "1 h" }
    },
    {
      day: 2,
      date: "06 DE FEBRERO",
      title: "Puerta de Marangu (1.870 m) → Mandara Hut (2.720 m)",
      subtitle: "Ingreso al Parque y marcha en selva tropical",
      stage: "marangu",
      stageLabel: "Selva & Inicio Trekking",
      location: "Marangu Gate · Selva Tropical · Mandara Hut",
      meal: "Pensión completa (Desayuno, picnic y cena)",
      accommodation: "Mandara Hut (Refugio de madera)",
      images: ["/assets/images/inicio-trekking.webp"],
      activities: [
        "Traslado de Moshi a Marangu Gate (1 h) y registro oficial ante las autoridades del Parque Nacional.",
        "Inicio del trekking ascendiendo por un frondoso bosque húmedo tropical habitado por monos colobos y aves exóticas.",
        "Llegada a Mandara Hut y caminata opcional al cráter Maundi para contemplar vistas hacia Kenia."
      ],
      metrics: { distance: "8 km", ascent: "850 m", descent: "0 m", duration: "4 a 5 h" }
    },
    {
      day: 3,
      date: "07 DE FEBRERO",
      title: "Mandara Hut (2.720 m) → Horombo Hut (3.720 m)",
      subtitle: "Páramo alpino con vistas a Mawenzi y Kibo",
      stage: "marangu",
      stageLabel: "Páramo & Horombo",
      location: "Bosque de brezos · Páramo · Horombo Hut",
      meal: "Pensión completa en refugio",
      accommodation: "Horombo Hut (Refugio alpino)",
      images: ["/assets/images/horombo-hut.webp"],
      activities: [
        "Dejamos atrás la selva pluvial para ingresar en el páramo de arbustos gigantes y senecios kilimanjari.",
        "Apertura del horizonte con las primeras vistas espectaculares del pico Kibo y las agujas del Mawenzi.",
        "Llegada a Horombo Hut a 3.720 m, hidratación profunda y descanso programado para la aclimatación."
      ],
      metrics: { distance: "12 km", ascent: "1.000 m", descent: "0 m", duration: "6 a 7 h" }
    },
    {
      day: 4,
      date: "08 DE FEBRERO",
      title: "Jornada de Aclimatación en Horombo Hut (3.720 m) → Zebra Rocks",
      subtitle: "Aclimatación activa en Zebra Rocks (4.020 m)",
      stage: "marangu",
      stageLabel: "Aclimatación Clave",
      location: "Horombo Hut · Zebra Rocks (4.020 m) · Horombo",
      meal: "Pensión completa en refugio",
      accommodation: "Horombo Hut",
      images: ["/assets/images/aclimatacion.webp"],
      activities: [
        "Día estratégico fundamental de nuestra expedición para estimular la producción de glóbulos rojos.",
        "Caminata suave de aclimatación hasta las formaciones geológicas rayadas de Zebra Rocks (4.020 m).",
        "Regreso a Horombo Hut para almorzar, descansar, monitorear saturación de oxígeno y reponer energía."
      ],
      metrics: { distance: "5 km", ascent: "300 m", descent: "300 m", duration: "3 h" }
    },
    {
      day: 5,
      date: "09 DE FEBRERO",
      title: "Horombo Hut (3.720 m) → Kibo Hut (4.703 m)",
      subtitle: "Cruce del desierto alpino a Kibo Hut",
      stage: "marangu",
      stageLabel: "Desierto Alpino & Kibo",
      location: "The Saddle (Silla de montar) · Refugio Kibo",
      meal: "Pensión completa (cena temprana)",
      accommodation: "Kibo Hut (Refugio de piedra)",
      images: ["/assets/images/dia-5.webp"],
      activities: [
        "Marcha a través del árido e imponente desierto volcánico entre los macizos de Kibo y Mawenzi.",
        "El paisaje se vuelve sobrio, mineral y silencioso mientras nos aproximamos a la base rocosa de Kibo Hut.",
        "Cena temprana a las 17:30 h, preparación final de frontales, ropa térmica y descanso antes del ataque nocturno."
      ],
      metrics: { distance: "10 km", ascent: "983 m", descent: "0 m", duration: "5 a 6 h" }
    },
    {
      day: 6,
      date: "10 DE FEBRERO",
      title: "Ataque a Cumbre: Kibo Hut → Uhuru Peak (5.895 m) → Horombo Hut",
      subtitle: "Amanecer en Uhuru Peak (5.895 m) y descenso",
      stage: "cumbre",
      stageLabel: "¡Cumbre de África!",
      location: "Gilman's Point (5.685 m) · Stella Point · Uhuru Peak (5.895 m)",
      meal: "Té y snacks en marcha · Almuerzo en Kibo · Cena en Horombo",
      accommodation: "Horombo Hut",
      images: ["/assets/images/cima-kilimanjaro.webp"],
      activities: [
        "Salida a medianoche bajo un cielo estrellado a paso 'pole pole' subiendo la ladera de ceniza volcánica.",
        "Llegada a Gilman's Point (5.685 m) en el borde del cráter justo cuando el sol asoma sobre las nubes.",
        "Travesía final por el borde del glaciar hasta el Uhuru Peak (5.895 m): ¡la cumbre más alta de África!",
        "Celebración en la cima, fotos de recuerdo y descenso paulatino a Kibo para recuperar fuerzas y continuar a Horombo."
      ],
      metrics: { distance: "21 km", ascent: "1.192 m", descent: "2.175 m", duration: "11 a 14 h" }
    },
    {
      day: 7,
      date: "11 DE FEBRERO",
      title: "Horombo Hut (3.720 m) → Puerta de Marangu → Moshi / Arusha",
      subtitle: "Descenso final, certificados y descanso",
      stage: "marangu",
      stageLabel: "Descenso & Celebración",
      location: "Horombo → Mandara → Marangu Gate → Moshi",
      meal: "Desayuno en montaña · Almuerzo de despedida · Cena en hotel",
      accommodation: "Hotel Confortable en Moshi / Arusha ***",
      images: ["/assets/images/grupo.webp"],
      activities: [
        "Última caminata en descenso cruzando Mandara Hut hasta la Puerta de Marangu (1.870 m).",
        "Entrega de los certificados oficiales de cumbre emitidos por el Parque Nacional Kilimanjaro.",
        "Despedida de nuestro cálido equipo de porteadores y cocineros tanzanos y traslado al hotel para una merecida ducha y cena."
      ],
      metrics: { distance: "20 km", ascent: "0 m", descent: "1.850 m", duration: "5 a 6 h" }
    },
    {
      day: 8,
      date: "12 DE FEBRERO",
      title: "Safari en el Parque Nacional Tarangire",
      subtitle: "Parque Tarangire, baobabs y elefantes",
      stage: "safari",
      stageLabel: "Safari Tarangire",
      location: "Parque Nacional Tarangire · Valle del Rift",
      meal: "Pensión completa (picnic en el parque y cena en lodge)",
      accommodation: "Safari Lodge / Tented Camp confortable",
      images: ["/assets/images/safari-grupo.webp"],
      activities: [
        "Salida en vehículos 4x4 todoterreno con techo elevable diseñados especialmente para fotografía de safari.",
        "Recorrido por Tarangire, famoso por sus milenarios árboles baobab y concentraciones récord de elefantes.",
        "Avistamiento de jirafas, leones, cebras, ñus y aves exóticas a lo largo del río Tarangire. Noche mágica bajo las estrellas africanas."
      ],
      metrics: { distance: "Game drive 4x4", ascent: "—", descent: "—", duration: "Jornada completa" }
    },
    {
      day: 9,
      date: "13 DE FEBRERO",
      title: "Safari en la Gran Caldera del Cráter Ngorongoro",
      subtitle: "Cráter Ngorongoro y los 'Cinco Grandes'",
      stage: "safari",
      stageLabel: "Cráter Ngorongoro",
      location: "Área de Conservación de Ngorongoro · Lago Magadi",
      meal: "Pensión completa en safari",
      accommodation: "Lodge panorámico en Karatu / Ngorongoro",
      images: ["/assets/images/safari-2.webp"],
      activities: [
        "Descenso de 600 metros al interior de la caldera volcánica intacta más grande del planeta.",
        "Exploración de la mayor densidad de fauna salvaje de África: rinocerontes negros, manadas de leones, hipopótamos y flamencos.",
        "Almuerzo picnic junto a la laguna de hipopótamos Ngoitoktok y ascenso vespertino hacia el lodge con vistas panorámicas."
      ],
      metrics: { distance: "Game drive 4x4", ascent: "—", descent: "—", duration: "Jornada completa" }
    },
    {
      day: 10,
      date: "14 DE FEBRERO",
      title: "Inmersión Cultural Masai y Retorno a Arusha",
      subtitle: "Cultura ancestral Masai y mercados locales",
      stage: "cultura",
      stageLabel: "Cultura Masai & Arusha",
      location: "Boma tradicional Masai · Mercado de Arusha",
      meal: "Desayuno en lodge y cena de despedida",
      accommodation: "Hotel Confortable en Arusha ***",
      images: ["/assets/images/maasai.webp"],
      activities: [
        "Visita respetuosa a una comunidad tradicional Masai en su poblado (Boma) para conocer sus costumbres, danzas y vida comunitaria.",
        "Tiempo libre para recorrer los mercados artesanales de Arusha y adquirir recuerdos de madera tallada y telas.",
        "Cena especial de cierre compartiendo las vivencias de la expedición con todo el grupo y el equipo de Birn Experience."
      ],
      metrics: { distance: "Traslados culturales", ascent: "—", descent: "—", duration: "Día completo" }
    },
    {
      day: 11,
      date: "15 DE FEBRERO",
      title: "Traslado al Aeropuerto Internacional JRO · Retorno",
      subtitle: "Despedida de Tanzania y vuelo de retorno",
      stage: "regreso",
      stageLabel: "Retorno a Casa",
      location: "Arusha → Aeropuerto Kilimanjaro (JRO)",
      meal: "Desayuno en el hotel",
      accommodation: "Fin de nuestros servicios",
      images: ["/assets/images/despedida.webp"],
      activities: [
        "Desayuno en el hotel de Arusha y últimos preparativos de equipaje.",
        "Traslado coordinado en vehículo privado hacia el Aeropuerto Internacional de Kilimanjaro (JRO).",
        "Embarque en el vuelo internacional de regreso. Fin de nuestros servicios de expedición con Birn Experience."
      ],
      metrics: { distance: "Traslado al aeropuerto", ascent: "—", descent: "—", duration: "1 h" }
    }
  ],
  inclusions: [
    "Coordinación integral y asesoramiento de Ricardo Birn, seguimiento continuo a la distancia y acompañamiento en destino del guía de Birn Experience junto a los guías locales.",
    "Guías de montaña tanzanos certificados por TANAPA (Parque Nacional Kilimanjaro) con amplia experiencia.",
    "Equipo completo de porteadores para el transporte de equipaje y cocineros de montaña dedicados.",
    "Todos los permisos de ingreso, tasas de acampada y conservación del Parque Nacional Kilimanjaro.",
    "Tasa de rescate obligatoria en montaña (Kilimanjaro Rescue Fee).",
    "Alojamiento durante el trekking en los refugios oficiales de montaña de la Ruta Marangu (Mandara, Horombo, Kibo).",
    "Alojamiento en hoteles y lodges confortables de calidad seleccionada en Moshi, Arusha y zona de safari.",
    "Pensión completa durante los días de trekking en montaña y safaris (desayunos, comidas de marcha y cenas calientes).",
    "Safari completo en 4x4 todoterreno exclusivo en Parque Nacional Tarangire y Cráter del Ngorongoro.",
    "Entradas a los parques nacionales de safari y tarifas de descenso al cráter de Ngorongoro.",
    "Todos los traslados terrestres privados en furgonetas y vehículos 4x4 exclusivos para el grupo.",
    "Seguro de asistencia médica integral en viaje y en actividades de montaña.",
    "Oxímetro de pulso, botiquín de primeros auxilios de expedición y protocolo de evacuación."
  ],
  exclusions: [
    "Vuelos internacionales hasta el Aeropuerto Internacional de Kilimanjaro (JRO) y regreso.",
    "Visado de entrada a Tanzania (aprox. 50 USD, tramitable online o a la llegada).",
    "Seguro de cancelación personal o coberturas adicionales opcionales.",
    "Propinas para el equipo local de montaña y conductores de safari (tradición en Tanzania).",
    "Gastos personales, bebidas alcohólicas o gaseosas fuera de las comidas provistas.",
    "Equipo personal de montaña (saco de dormir de alta montaña, indumentaria térmica, calzado)."
  ],
  recommendations: [
    {
      title: "Condición Física y Aclimatación",
      items: [
        "El Kilimanjaro no exige escalada técnica con cuerdas, pero sí una sólida resistencia cardiovascular para caminatas sostenidas.",
        "Nuestra clave de éxito es la regla de oro 'pole pole' (despacio en suajili) y la jornada extra de aclimatación en Horombo Hut (3.720 m).",
        "Monitoreamos dos veces al día la saturación de oxígeno y pulso cardíaco de cada integrante del grupo."
      ]
    },
    {
      title: "Indumentaria y Calzado Técnico",
      items: [
        "Sistema riguroso de tres capas: capa térmica transpirable, abrigo polar / pluma de alta densidad y chaqueta impermeable cortavientos.",
        "Botas de trekking de montaña probadas previamente con caña media o alta y suela adherente.",
        "Guantes térmicos dobles, gorro de lana, gafas de sol con protección UV alta (categoría 3 o 4) y linterna frontal con baterías extra."
      ]
    },
    {
      title: "Logística, Visado y Vacunas",
      items: [
        "Se camina durante el día solo con una mochila liviana de día (20-30 L); el petate principal es transportado por los porteadores.",
        "Pasaporte con vigencia mínima de 6 meses desde la fecha de ingreso.",
        "Vacunación contra la Fiebre Amarilla requerida y profilaxis recomendada según indicaciones de tu centro de medicina del viajero."
      ]
    }
  ],
  faqs: [
    {
      q: "¿Cuál es la tarifa oficial y qué incluye exactamente?",
      a: "La tarifa oficial es de USD 3.350 por persona en base doble. Incluye la coordinación y asesoramiento de Ricardo Birn, el acompañamiento en destino del guía de Birn Experience y guías locales certificados, todos los permisos y tasas oficiales del Parque Nacional Kilimanjaro, rescate en montaña, alojamiento en refugios y lodges, pensión completa en trekking y safari, vehículos 4x4 exclusivos, porteadores y cocineros."
    },
    {
      q: "¿Se requiere experiencia técnica de escalada para subir al Kilimanjaro?",
      a: "No se requiere experiencia de escalada en roca ni hielo, ni uso de cuerdas o arneses. La Ruta Marangu transcurre por senderos de montaña transitables. La mayor exigencia es la adaptación a la altitud (5.895 m), la cual abordamos con un esquema de aclimatación progresivo."
    },
    {
      q: "¿Por qué elegimos la Ruta Marangu y sus refugios de madera?",
      a: "La Ruta Marangu es la única vía del Kilimanjaro que cuenta con refugios alpinos de madera techados con camas y colchones (Mandara, Horombo y Kibo). Esto garantiza un descanso reparador, protección total frente a vientos y lluvias, y una recuperación física muy superior a la acampada en carpas."
    },
    {
      q: "¿Cómo son los safaris en Tarangire y el Cráter de Ngorongoro?",
      a: "Son experiencias de primer nivel en vehículos todoterreno 4x4 con techo abatible y ventanas panorámicas. Visitamos Tarangire por sus legendarios baobabs y grandes manadas de elefantes, y luego descendemos al Cráter del Ngorongoro, un anfiteatro natural volcánico con una de las concentraciones de fauna salvaje más altas del planeta."
    },
    {
      q: "¿Cómo reservo mi lugar en la expedición?",
      a: "Podés contactarnos directamente por WhatsApp (+54 9 351 6816262) o por correo (birnexperience@gmail.com). Dado que nos trasladamos en grupos reducidos para garantizar un trato humano, seguridad y atención minuciosa, los cupos son estrictamente limitados."
    }
  ]
};

// Filter tabs for itinerary matching z in reference
const z = [
  { id: "all", line1: "Todos", line2: "(11 Jornadas)", fullLabel: "Todos (11 Jornadas)", startIndex: 0 },
  { id: "marangu", line1: "Ruta", line2: "Marangu", fullLabel: "Ruta Marangu (Trek)", startIndex: 1 },
  { id: "cumbre", line1: "Uhuru Peak", line2: "5.895 m", fullLabel: "Cumbre Uhuru Peak", startIndex: 5 },
  { id: "safari", line1: "Safaris &", line2: "Cultura", fullLabel: "Safaris & Ngorongoro", startIndex: 7 }
];

// Helper modulo distance for 3D carousel
const B = (e: number, t: number, n: number) => {
  let r = e - t;
  if (r > n / 2) r -= n;
  if (r < -n / 2) r += n;
  return r === 0 ? 0 : r === -1 ? -1 : r === 1 ? 1 : r < 0 ? -2 : 2;
};

/* =========================================================================
   1. NAVBAR COMPONENT (I) - 100% Matching Reference & Mobile Drawer
   ========================================================================= */
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Itinerario", href: "#itinerario" },
    { label: "Mapa", href: "#mapa-travesia" },
    { label: "Qué Incluye", href: "#inclusiones" },
    { label: "Tarifa", href: "#precio" },
    { label: "Preguntas Frecuentes", href: "#preguntas" }
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#01141c]/75 backdrop-blur-xl border-b border-[#d45e33]/20 py-3 shadow-lg shadow-black/30'
            : 'bg-gradient-to-b from-[#01141c]/70 via-[#022c3b]/30 to-transparent backdrop-blur-[2px] py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            {/* Brand Logo */}
            <a
              id="nav-brand-logo"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d45e33] rounded-lg p-1"
            >
              <img
                src="/images/logo1.png"
                alt="Birn Experience Logo"
                width={40}
                height={40}
                loading="eager"
                decoding="async"
                className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
              <div className="flex flex-col">
                <span className="text-[12px] sm:text-lg font-bold font-title tracking-[0.16em] text-[#f5f0e8] leading-none uppercase">
                  BIRN
                </span>
                <span className="text-[12px] sm:text-[10px] font-semibold tracking-[0.3em] text-[#d45e33] uppercase leading-tight mt-1">
                  EXPERIENCE
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  id={`nav-link-${link.href.replace('#', '')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative text-xs xl:text-sm font-medium text-white/80 hover:text-white px-3.5 py-2 rounded-xl border border-transparent hover:border-white/15 hover:bg-white/[0.08] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d45e33]"
                >
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:scale-[1.04]">
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                id="nav-cta-whatsapp"
                href={`https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience%2C%20quiero%20consultar%20disponibilidad%20y%20detalles%20de%20la%20expedici%C3%B3n%20al%20Kilimanjaro.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#d45e33] hover:bg-[#b34d2a] active:bg-[#913d1e] text-white shadow-sm shadow-[#d45e33]/20 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                <span className="inline-block transition-transform duration-200 ease-out group-hover:scale-[1.03]">
                  Consultar Viaje
                </span>
              </a>
            </div>

            {/* Tablet & Mobile Right Container */}
            <div className="flex lg:hidden items-center gap-2.5 sm:gap-3">
              {/* Tablet CTA: visible on sm/md, hidden on small mobile */}
              <a
                id="nav-cta-tablet"
                href={`https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience%2C%20quiero%20consultar%20disponibilidad%20y%20detalles%20de%20la%20expedici%C3%B3n%20al%20Kilimanjaro.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex md:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold bg-[#d45e33] hover:bg-[#b34d2a] active:bg-[#913d1e] text-white shadow-sm shadow-[#d45e33]/20 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                <span className="inline-block transition-transform duration-200 ease-out group-hover:scale-[1.03]">
                  Consultar Viaje
                </span>
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                ref={toggleButtonRef}
                id="mobile-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menú de navegación"
                className="p-2 rounded-lg bg-white/[0.05] text-[#f5f0e8] hover:text-white hover:bg-white/[0.1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d45e33]"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-[#d45e33]" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown matching reference */}
        {isOpen && (
          <div
            ref={menuRef}
            id="mobile-menu-dropdown"
            className="lg:hidden border-b border-white/10 px-4 pt-4 pb-6 mt-2 space-y-3 bg-[#01141c]/90 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 relative z-50 shadow-xl"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  id={`mobile-nav-link-${link.href.replace('#', '')}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group flex items-center justify-between px-3.5 py-3 rounded-xl border border-transparent hover:border-white/15 text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.08] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="inline-block transition-transform duration-200 ease-out group-hover:scale-[1.02]">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10">
              <a
                id="mobile-nav-cta-whatsapp"
                href={`https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience%2C%20quiero%20consultar%20disponibilidad%20y%20detalles%20de%20la%20expedici%C3%B3n%20al%20Kilimanjaro.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full text-xs font-semibold bg-[#d45e33] hover:bg-[#b34d2a] text-white shadow-md shadow-[#d45e33]/20 transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          id="mobile-menu-backdrop"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
    </>
  );
};

/* =========================================================================
   2. HERO COMPONENT (L) - 100% Matching Reference Structure & Classes
   ========================================================================= */
const Hero: React.FC<{ onScrollToItinerary: () => void }> = ({ onScrollToItinerary }) => {
  return (
    <section className="w-full relative min-h-[auto] md:min-h-0 lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#01141c] pt-24 sm:pt-28 md:pt-28 lg:pt-36 pb-10 sm:pb-12 md:pb-14 lg:pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat opacity-78 scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/assets/images/hero_kilimanjaro.jpg')`,
          backgroundPosition: 'center 30%'
        }}
      />
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#01141c]/62 via-[#01141c]/35 to-[#01141c]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#01141c]/52 via-transparent to-[#01141c]/52" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(1,20,28,0.2)_0%,rgba(1,20,28,0.68)_100%)]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge & Lines */}
        <div className="flex flex-col items-center justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2.5 text-[#e4a381] font-title text-xs sm:text-sm font-bold tracking-[3px] uppercase">
            <Mountain className="w-4 h-4 text-[#d45e33]" />
            <span>TANZANIA · FEBRERO 2027</span>
          </div>
          <div className="flex items-center justify-center gap-3 mt-2.5">
            <div className="h-px w-20 sm:w-28 bg-gradient-to-r from-transparent to-[#d45e33]" />
            <span className="text-[#d45e33] text-[0.6rem]">◆</span>
            <div className="h-px w-20 sm:w-28 bg-gradient-to-l from-transparent to-[#d45e33]" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-5 tracking-tight">
          KILIMANJARO
          <br />
          TREK{' '}
          <span className="text-[#d45e33] drop-shadow-[0_0_35px_rgba(212,94,51,0.4)]">
            + SAFARIS
          </span>
        </h1>

        {/* Subtitle with responsive line-breaks matching reference */}
        <p className="font-body text-base sm:text-lg md:text-xl text-white/85 font-light tracking-wide mb-6 sm:mb-8 max-w-4xl lg:max-w-5xl mx-auto leading-relaxed">
          <span className="hidden md:inline">
            Un viaje de 11 días que combina trekking en alta montaña, cultura Maasai y naturaleza
            <br />
            recorriendo la Ruta Marangu hasta el Uhuru Peak (5.895 m), y safaris en Tarangire y Ngorongoro.
          </span>
          <span className="inline md:hidden">
            Una experiencia de 11 días que
            <br />
            combina trekking en alta montaña,
            <br />
            cultura Maasai y safaris silvestres.
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
          <button
            onClick={() => {
              window.open(
                `https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience%2C%20deseo%20reservar%20mi%20lugar%20para%20el%20viaje%20de%20Trekking%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027%20-%20Tarifa%20oficial%20USD%203.350).`,
                '_blank',
                'noopener,noreferrer'
              );
            }}
            className="btn-editorial text-[12px] sm:text-sm py-3.5 px-7 cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>RESERVAR LUGAR</span>
          </button>

          <button
            onClick={onScrollToItinerary}
            className="text-xs sm:text-sm uppercase tracking-widest text-[#95cecf] hover:text-white px-5 py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer rounded-lg hover:bg-white/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#95cecf]"
          >
            <span>Ver Itinerario</span>
            <ArrowDown className="w-4 h-4 text-[#d45e33] animate-bounce" />
          </button>
        </div>

        {/* Bottom Banner Strip */}
        <div className="w-full border-t border-[#d45e33]/30 pt-5 sm:pt-6 mt-1 sm:mt-2">
          <div className="font-title text-sm sm:text-base md:text-lg text-[#e4a381] tracking-[2px] uppercase flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 font-bold text-center">
            <span className="hidden sm:inline">✦ DEL 5 AL 15 DE FEBRERO 2027</span>
            <span className="inline sm:hidden text-center leading-tight">
              ✦ 5 AL 15 DE FEBRERO 2027
            </span>
            <span className="hidden sm:inline text-[#009ea4]">·</span>
            <span className="text-[#d45e33] font-black">USD 3.350 POR PERSONA ✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   3. CIFRAS / STATS COMPONENT (R) - 100% Matching Grid & Responsive Borders
   ========================================================================= */
const Cifras: React.FC = () => {
  return (
    <section id="cifras" className="bg-[#01141c] py-14 sm:py-16 md:py-18 lg:py-22 px-4 sm:px-6 lg:px-8 border-t border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#d45e33] font-title font-extrabold mb-2.5">
            DIMENSIONES DE LA EXPERIENCIA
          </div>
          <h2 className="font-title text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
            <span className="block sm:inline">El Viaje</span>{' '}
            <span className="block sm:inline">en Cifras</span>
          </h2>
        </div>

        <div className="border-t border-b border-white/15 py-6 sm:py-8 md:py-8 my-4 md:my-6">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {P.stats.map((stat, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={stat.label}
                  className={`py-6 md:py-5 lg:py-6 px-3 sm:px-5 lg:px-6 text-center flex flex-col justify-start transition-colors duration-300 hover:bg-white/[0.02] border-white/10 ${
                    idx === 3 ? 'border-r-0' : 'lg:border-r'
                  } ${isEven ? 'border-r' : 'border-r-0 lg:border-r'} ${
                    idx < 2 ? 'border-b lg:border-b-0' : 'border-b-0'
                  }`}
                >
                  <div className="flex items-baseline justify-center gap-1 sm:gap-1.5 h-10 sm:h-12 md:h-12 lg:h-14 mb-2">
                    <span className="font-title text-3xl sm:text-4xl md:text-[2.2rem] lg:text-4xl xl:text-5xl font-black text-white tracking-tight">
                      {stat.num}
                    </span>
                    <span
                      className="font-title text-xs sm:text-sm md:text-sm lg:text-base font-black uppercase tracking-wider"
                      style={{ color: stat.accent }}
                    >
                      {stat.unit}
                    </span>
                  </div>
                  <p className="font-title text-sm sm:text-base uppercase tracking-wider text-white font-bold mb-1.5 leading-snug">
                    {stat.label}
                  </p>
                  <p className="text-xs sm:text-sm text-[#95cecf] font-normal leading-tight">
                    {idx === 0 ? (
                      <>
                        <span className="sm:hidden">5 al 15<br />de Febrero 2027</span>
                        <span className="hidden sm:inline">5 al 15 de Febrero 2027</span>
                      </>
                    ) : idx === 1 ? (
                      <>
                        <span className="sm:hidden">Ruta Marangu<br />y Safaris</span>
                        <span className="hidden sm:inline">Ruta Marangu y Safaris</span>
                      </>
                    ) : idx === 2 ? (
                      <>
                        <span className="sm:hidden">Uhuru Peak<br />5.895 m</span>
                        <span className="hidden sm:inline">Uhuru Peak · Cima de África</span>
                      </>
                    ) : (
                      <>
                        <span className="sm:hidden">Tarifa oficial<br />por persona</span>
                        <span className="hidden sm:inline">Por persona en base doble</span>
                      </>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   4. EXPEDITION MAP SECTION - Interactive Geospatial Leaflet Map
   ========================================================================= */
interface ExpeditionWaypoint {
  id: string;
  name: string;
  dayNumber: number;
  dayLabel: string;
  stage: string;
  zone: string;
  altitude: string;
  lat: number;
  lng: number;
  highlight: string;
  imageUrl: string;
}

const expeditionWaypoints: ExpeditionWaypoint[] = [
  {
    id: "jro-moshi-d1",
    name: "Aeropuerto JRO → Moshi Base",
    dayNumber: 1,
    dayLabel: "Día 1 · 05 Febrero",
    stage: "Llegada y Traslado a Moshi",
    zone: "marangu",
    altitude: "890 m",
    lat: -3.3349,
    lng: 37.3404,
    highlight: "Recepción personalizada de nuestro grupo en el Aeropuerto Internacional de Kilimanjaro (JRO), traslado en vehículo privado hacia el hotel en Moshi y briefing técnico general con el equipo.",
    imageUrl: "/assets/images/aeropuerto.webp"
  },
  {
    id: "marangu-mandara-d2",
    name: "Puerta de Marangu → Mandara Hut",
    dayNumber: 2,
    dayLabel: "Día 2 · 06 Febrero",
    stage: "Selva Tropical y Comienzo del Trek",
    zone: "marangu",
    altitude: "2.720 m",
    lat: -3.1856,
    lng: 37.5133,
    highlight: "Registro oficial en Marangu Gate (1.870 m) y ascenso de 8 km por la densa selva tropical pluvial, hogar de monos colobos y aves exóticas, hasta el primer refugio Mandara Hut.",
    imageUrl: "/assets/images/inicio-trekking.webp"
  },
  {
    id: "mandara-horombo-d3",
    name: "Mandara Hut → Horombo Hut",
    dayNumber: 3,
    dayLabel: "Día 3 · 07 Febrero",
    stage: "Páramo Alpino y Vistas a Kibo",
    zone: "marangu",
    altitude: "3.720 m",
    lat: -3.1389,
    lng: 37.4419,
    highlight: "Transición de la selva al páramo de senecios gigantes. Se abren vistas panorámicas espectaculares hacia el pico Kibo y las agujas recortadas del Mawenzi.",
    imageUrl: "/assets/images/horombo-hut.webp"
  },
  {
    id: "zebra-rocks-d4",
    name: "Aclimatación en Horombo · Zebra Rocks",
    dayNumber: 4,
    dayLabel: "Día 4 · 08 Febrero",
    stage: "Jornada Clave de Aclimatación Activa",
    zone: "marangu",
    altitude: "4.020 m",
    lat: -3.1250,
    lng: 37.4320,
    highlight: "Caminata estratégica hacia las singulares franjas geológicas de Zebra Rocks (4.020 m) siguiendo la premisa 'climb high, sleep low', retornando a descansar a Horombo.",
    imageUrl: "/assets/images/aclimatacion.webp"
  },
  {
    id: "horombo-kibo-d5",
    name: "Horombo Hut → The Saddle → Kibo Hut",
    dayNumber: 5,
    dayLabel: "Día 5 · 09 Febrero",
    stage: "Desierto Volcánico y Refugio Base",
    zone: "marangu",
    altitude: "4.703 m",
    lat: -3.0789,
    lng: 37.3828,
    highlight: "Cruce del árido e hipnótico desierto alpino entre Kibo y Mawenzi hasta Kibo Hut. Cena temprana a las 17:30 h y descanso antes del ataque nocturno a la cumbre.",
    imageUrl: "/assets/images/dia-5.webp"
  },
  {
    id: "uhuru-peak-summit-d6",
    name: "Uhuru Peak (Cima de África) · 5.895 m",
    dayNumber: 6,
    dayLabel: "Día 6 · 10 Febrero",
    stage: "Cumbre Uhuru Peak · Techo de África",
    zone: "cumbre",
    altitude: "5.895 m",
    lat: -3.0674,
    lng: 37.3556,
    highlight: "Salida a medianoche bajo las estrellas a paso pole pole. Paso por Gilman's Point al amanecer y coronación del Techo de África en Uhuru Peak (5.895 m) junto a los glaciares.",
    imageUrl: "/assets/images/cima-kilimanjaro.webp"
  },
  {
    id: "descenso-marangu-d7",
    name: "Descenso a Marangu Gate → Moshi",
    dayNumber: 7,
    dayLabel: "Día 7 · 11 Febrero",
    stage: "Descenso Final y Certificados Oficiales",
    zone: "marangu",
    altitude: "1.870 m",
    lat: -3.2458,
    lng: 37.5186,
    highlight: "Descenso final desde Horombo atravesando el bosque hasta la Puerta de Marangu. Entrega de los certificados oficiales de cumbre y traslado al hotel en Moshi para una merecida ducha y cena.",
    imageUrl: "/assets/images/grupo.webp"
  },
  {
    id: "tarangire-safari-d8",
    name: "Parque Nacional Tarangire",
    dayNumber: 8,
    dayLabel: "Día 8 · 12 Febrero",
    stage: "Safari en 4x4 entre Baobabs y Elefantes",
    zone: "safari",
    altitude: "1.100 m",
    lat: -3.8333,
    lng: 36.0000,
    highlight: "Game drive en vehículos 4x4 todoterreno descubriendo las mayores concentraciones de elefantes de Tanzania, majestuosos baobabs, jirafas y leones a lo largo del río Tarangire.",
    imageUrl: "/assets/images/safari-grupo.webp"
  },
  {
    id: "ngorongoro-crater-d9",
    name: "Gran Cráter del Ngorongoro",
    dayNumber: 9,
    dayLabel: "Día 9 · 13 Febrero",
    stage: "Caldera Volcánica y los Cinco Grandes",
    zone: "safari",
    altitude: "1.700 m",
    lat: -3.1700,
    lng: 35.5800,
    highlight: "Descenso de 600 metros al interior de la caldera volcánica intacta más grande del planeta para avistar la mayor densidad faunística: rinocerontes negros, leones, hipopótamos y flamencos.",
    imageUrl: "/assets/images/safari-2.webp"
  },
  {
    id: "aldea-masai-arusha-d10",
    name: "Comunidad Masai y Mercado de Arusha",
    dayNumber: 10,
    dayLabel: "Día 10 · 14 Febrero",
    stage: "Inmersión Cultural y Tradición Masai",
    zone: "safari",
    altitude: "1.400 m",
    lat: -3.3731,
    lng: 36.6944,
    highlight: "Visita respetuosa a una comunidad tradicional Masai en su boma para conocer sus costumbres y danzas ancestrales. Recorrido por los mercados de artesanía local y cena de despedida.",
    imageUrl: "/assets/images/maasai.webp"
  },
  {
    id: "retorno-jro-d11",
    name: "Arusha → Aeropuerto Kilimanjaro (JRO)",
    dayNumber: 11,
    dayLabel: "Día 11 · 15 Febrero",
    stage: "Traslado Privado y Vuelo Internacional",
    zone: "safari",
    altitude: "890 m",
    lat: -3.4294,
    lng: 37.0745,
    highlight: "Desayuno en el hotel, últimos preparativos de equipaje y traslado coordinado en vehículo privado hacia el Aeropuerto Internacional de Kilimanjaro para tomar el vuelo de regreso.",
    imageUrl: "/assets/images/despedida.webp"
  }
];

const expeditionFilterZones = [
  { id: "all", line1: "Todos", line2: "(11 Jornadas)", fullLabel: "Todos (11 Jornadas)" },
  { id: "marangu", line1: "Ruta", line2: "Marangu", icon: Trees, fullLabel: "Ruta Marangu (Trek)" },
  { id: "cumbre", line1: "Uhuru Peak", line2: "5.895 m", icon: Mountain, fullLabel: "Uhuru Peak (Cumbre)" },
  { id: "safari", line1: "Safaris &", line2: "Cultura", icon: Compass, fullLabel: "Safaris & Ngorongoro" }
];

const ExpeditionMapSection: React.FC<{ onSelectDay?: (day: number) => void }> = ({ onSelectDay }) => {
  const waypoints = expeditionWaypoints;
  const [selectedPoint, setSelectedPoint] = useState<ExpeditionWaypoint>(waypoints[0]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mapType, setMapType] = useState<"satellite" | "topo">("satellite");

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const filteredPoints = waypoints.filter(
    (wp) => activeFilter === "all" || wp.zone === activeFilter
  );

  const getMarkerIcon = (point: ExpeditionWaypoint, isSelected: boolean) => {
    const isSpecial = point.dayNumber === 2 || point.dayNumber === 3 || point.dayNumber === 5 || point.dayNumber === 7;
    const isSafari = point.zone === "safari";
    const isCumbre = point.zone === "cumbre";
    const bgColor = isSelected
      ? "#ff4a11"
      : isSafari
      ? "#009ea4"
      : isCumbre
      ? "#d45e33"
      : isSpecial
      ? "#e4a381"
      : "#022c3b";

    const size = isSelected ? 36 : 26;
    const pulseHtml = isSelected
      ? `<div class="absolute -inset-2.5 rounded-full border-2 border-white animate-ping opacity-75"></div>
         <div class="absolute -inset-1 rounded-full border-2 border-[#ff7849] opacity-90"></div>`
      : "";

    const labelVisibility = isSelected
      ? "block opacity-100 pointer-events-auto"
      : "hidden group-hover:block opacity-0 group-hover:opacity-100 pointer-events-none";

    const labelPlacement = point.lat < -3.3 ? "bottom-full mb-2" : "top-full mt-1.5";

    const labelHtml = `
      <div class="marker-label absolute left-1/2 -translate-x-1/2 ${labelPlacement} whitespace-nowrap z-50 transition-opacity duration-150 ${labelVisibility}">
        <div class="px-2 py-0.5 rounded shadow-lg backdrop-blur-sm ${
          isSelected
            ? "bg-[#d45e33] text-white border border-white/60 font-black text-xs"
            : "bg-[#01141c]/95 text-[#f5f0e8] border border-white/30 font-bold text-[11px]"
        }">
          <span>${point.name}</span>
          <span class="ml-1 opacity-80 font-mono text-[10px] text-[#95cecf]">${point.altitude}</span>
        </div>
      </div>
    `;

    return L.divIcon({
      className: "custom-expedition-marker group",
      html: `
        <div class="relative flex items-center justify-center cursor-pointer select-none" style="width: ${size}px; height: ${size}px;">
          ${pulseHtml}
          <div class="w-full h-full rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-200 ${
            isSelected ? "scale-110" : "hover:scale-105"
          }" style="background-color: ${bgColor}; border: ${
            isSelected ? "3px solid #ffffff" : "2px solid rgba(255,255,255,0.85)"
          };">
            <span style="font-size: ${isSelected ? "11px" : "10px"}; font-weight: 900; font-family: sans-serif;">
              ${point.dayNumber}
            </span>
          </div>
          ${labelHtml}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [-3.3, 36.7],
      zoom: 9,
      minZoom: 6,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      dragging: true
    });
    mapInstanceRef.current = map;
    map.scrollWheelZoom.enable();
    map.touchZoom.enable();

    const tileLayer = L.tileLayer(
      mapType === "satellite"
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap, Esri, OpenTopoMap",
        maxZoom: 18,
        noWrap: true
      }
    ).addTo(map);
    tileLayerRef.current = tileLayer;

    const latLngs: [number, number][] = waypoints.map((w) => [w.lat, w.lng]);
    L.polyline(latLngs, {
      color: "#d45e33",
      weight: 3.5,
      opacity: 0.85,
      dashArray: "6, 8"
    }).addTo(map);

    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [35, 35] });

    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const map = mapInstanceRef.current;
    map.removeLayer(tileLayerRef.current);
    const newTile = L.tileLayer(
      mapType === "satellite"
        ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        attribution: "© OpenStreetMap, Esri, OpenTopoMap",
        maxZoom: 18,
        noWrap: true
      }
    ).addTo(map);
    tileLayerRef.current = newTile;
  }, [mapType]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    filteredPoints.forEach((point) => {
      const isSelected = selectedPoint?.id === point.id;
      const marker = L.marker([point.lat, point.lng], {
        icon: getMarkerIcon(point, isSelected),
        zIndexOffset: isSelected ? 1500 : point.dayNumber === 6 ? 600 : point.dayNumber === 1 ? 400 : 300
      }).addTo(map);

      marker.on("click", () => {
        setSelectedPoint(point);
        map.panTo([point.lat, point.lng], { animate: true, duration: 0.5 });
      });
      markersRef.current[point.id] = marker;
    });
  }, [filteredPoints, selectedPoint]);

  const currentIndex = waypoints.findIndex((w) => w.id === selectedPoint.id);
  const prevPoint = currentIndex > 0 ? waypoints[currentIndex - 1] : null;
  const nextPoint = currentIndex < waypoints.length - 1 ? waypoints[currentIndex + 1] : null;

  const handleNavigate = (target: ExpeditionWaypoint | null) => {
    if (target) {
      setSelectedPoint(target);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([target.lat, target.lng], { animate: true, duration: 0.5 });
      }
    }
  };

  const handleFilterChange = (zoneId: string) => {
    setActiveFilter(zoneId);
    const newFiltered = waypoints.filter((wp) => zoneId === "all" || wp.zone === zoneId);
    if (newFiltered.length > 0 && !newFiltered.some((wp) => wp.id === selectedPoint.id)) {
      const target = newFiltered[0];
      setSelectedPoint(target);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([target.lat, target.lng], { animate: true, duration: 0.5 });
      }
    }
  };

  return (
    <section
      id="mapa-travesia"
      className="py-16 sm:py-20 lg:py-24 bg-[#01141c] border-t border-b border-white/10 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 border border-[#d45e33]/40 bg-[#d45e33]/10 text-[#d45e33] font-title text-[12px] sm:text-xs font-black tracking-[3px] px-5 py-1.5 rounded-full uppercase mb-4">
            ✦ CARTOGRAFÍA GEOESPACIAL REAL ✦
          </div>
          <h2 className="font-title text-2xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mb-3 font-black">
            Mapa Real de la Travesía
          </h2>
          <p className="text-base sm:text-lg text-[#95cecf] font-light max-w-2xl mx-auto leading-relaxed">
            <span className="hidden sm:inline">
              Explora de manera interactiva la ruta completa a través de Tanzania,
              <br />
              la Ruta Marangu al Kilimanjaro (5.895 m), Tarangire y el Cráter Ngorongoro.
            </span>
            <span className="inline sm:hidden">
              Explora la ruta completa a través de
              <br />
              Kilimanjaro, Tarangire y Ngorongoro
              <br />
              en Tanzania.
            </span>
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d45e33]" />
            <span className="text-[#d45e33] text-[0.6rem]">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d45e33]" />
          </div>
        </div>

        {/* Filter bar and controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-2 w-full md:w-auto">
            {expeditionFilterZones.map((filter) => {
              const isSelected = activeFilter === filter.id;
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`p-3 md:py-1.5 md:px-3.5 rounded-xl md:rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex flex-col md:flex-row items-center justify-center gap-1 text-center ${
                    isSelected
                      ? "bg-[#d45e33] text-white shadow-md"
                      : "bg-white/5 border border-white/10 text-[#95cecf] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {Icon && <Icon className="w-3.5 h-3.5 shrink-0 text-[#00e5ee]" />}
                    <span className="md:hidden font-bold leading-tight">
                      {filter.line1}
                      <br />
                      {filter.line2}
                    </span>
                    <span className="hidden md:inline">{filter.fullLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop satellite/topo switch + instructions */}
          <div className="hidden sm:flex flex-col items-end text-right gap-2 shrink-0 self-end">
            <button
              onClick={() => setMapType(mapType === "satellite" ? "topo" : "satellite")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#95cecf] hover:text-white border border-white/10 text-xs font-semibold transition-colors cursor-pointer self-end"
            >
              <Layers className="w-3.5 h-3.5 text-[#00e5ee]" />
              <span>{mapType === "satellite" ? "Ver Relieve Topo" : "Ver Satélite"}</span>
            </button>
            <p className="text-xs text-white/70 font-light leading-snug text-right">
              Toca los puntos en el mapa
              <br />
              para ver información de cada sitio.
            </p>
          </div>

          {/* Mobile satellite/topo switch + instructions */}
          <div className="flex sm:hidden items-center justify-between gap-3 w-full">
            <p className="text-[12px] text-white/70 font-light leading-tight text-left flex-1">
              Toca los puntos en el mapa
              <br />
              para ver información de cada
              <br />
              sitio debajo del mapa.
            </p>
            <button
              onClick={() => setMapType(mapType === "satellite" ? "topo" : "satellite")}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-[#95cecf] border border-white/10 text-xs font-semibold"
            >
              <Layers className="w-3.5 h-3.5 text-[#00e5ee]" />
              <span>{mapType === "satellite" ? "Topo" : "Satélite"}</span>
            </button>
          </div>
        </div>

        {/* Map and Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch w-full">
          {/* Map Column */}
          <div className="w-full md:col-span-1 lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#022c3b] h-[260px] sm:h-[340px] md:h-[490px] lg:h-[510px]">
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            
          </div>

          {/* Card Column */}
          <div className="w-full md:col-span-1 lg:col-span-5 bg-[#022c3b] border border-white/10 rounded-2xl p-4 sm:p-5 md:p-4.5 lg:p-6 shadow-2xl flex flex-col justify-between min-h-[360px] md:h-[490px] lg:h-[510px] overflow-hidden">
            <div>
              {/* Card Image */}
              <div className="relative h-32 sm:h-40 md:h-36 lg:h-44 w-full rounded-xl overflow-hidden mb-3 border border-white/10 shrink-0">
                <img
                  src={selectedPoint.imageUrl}
                  alt={selectedPoint.name}
                  width={500}
                  height={220}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-[12px] sm:text-[11px] font-bold uppercase tracking-wider text-white">
                  {selectedPoint.dayLabel}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-[#d45e33] px-2.5 py-1 rounded text-[12px] sm:text-xs font-black text-white">
                  {selectedPoint.altitude}
                </div>
              </div>

              {/* Card Meta & Texts */}
              <div className="space-y-1.5">
                <div className="text-[11px] sm:text-xs font-bold text-[#e4a381] uppercase tracking-wider truncate">
                  {selectedPoint.stage}
                </div>
                <h3 className="font-title text-base sm:text-lg md:text-lg lg:text-xl font-black text-white uppercase tracking-wide leading-tight line-clamp-2">
                  {selectedPoint.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#9fb1b8] leading-relaxed font-light line-clamp-3 md:line-clamp-3 lg:line-clamp-4">
                  {selectedPoint.highlight}
                </p>
              </div>

              {/* Prev / Next navigation */}
              <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/10 text-xs">
                {prevPoint ? (
                  <button
                    onClick={() => handleNavigate(prevPoint)}
                    className="inline-flex items-center gap-1 text-[#95cecf] hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Día {prevPoint.dayNumber}</span>
                  </button>
                ) : (
                  <span className="text-white/20">Inicio</span>
                )}
                <span className="text-white/30">|</span>
                {nextPoint ? (
                  <button
                    onClick={() => handleNavigate(nextPoint)}
                    className="inline-flex items-center gap-1 text-[#95cecf] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Día {nextPoint.dayNumber}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-white/20">Final</span>
                )}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-3 border-t border-white/10 mt-2">
              <button
                onClick={() => {
                  if (onSelectDay) onSelectDay(selectedPoint.dayNumber);
                  const el = document.getElementById(`day-${selectedPoint.dayNumber}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="btn-editorial text-[12px] sm:text-xs w-full py-2.5 sm:py-3 tracking-wider flex items-center justify-center cursor-pointer shadow-lg active:scale-95 whitespace-nowrap"
              >
                <span>VER DÍA {selectedPoint.dayNumber} EN ITINERARIO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
/* =========================================================================
   5. ALTITUDE PROFILE COMPONENT - Interactive Drag Scroll Chart
   ========================================================================= */
interface AltitudePoint {
  day: number;
  location: string;
  altitude: number;
  note: string;
  keyPoint: boolean;
}

const altitudePointsData: AltitudePoint[] = [
  { day: 1, location: "Moshi Base", altitude: 890, note: "Llegada, traslado al hotel y briefing técnico", keyPoint: false },
  { day: 2, location: "Mandara Hut", altitude: 2720, note: "Ascenso por la selva tropical húmeda", keyPoint: false },
  { day: 3, location: "Horombo Hut", altitude: 3720, note: "Páramo alpino con vistas a Kibo y Mawenzi", keyPoint: true },
  { day: 4, location: "Zebra Rocks", altitude: 4020, note: "Jornada clave de aclimatación activa", keyPoint: true },
  { day: 5, location: "Kibo Hut", altitude: 4703, note: "Desierto alpino volcánico y refugio de asalto", keyPoint: true },
  { day: 6, location: "Uhuru Peak", altitude: 5895, note: "¡Techo de África al amanecer! Glaciares de cumbre", keyPoint: true },
  { day: 7, location: "Marangu Gate", altitude: 1870, note: "Descenso final y entrega de certificados oficiales", keyPoint: false },
  { day: 8, location: "Parque Tarangire", altitude: 1100, note: "Safari 4x4 entre baobabs y grandes manadas de elefantes", keyPoint: false },
  { day: 9, location: "Cráter Ngorongoro", altitude: 1700, note: "Caldera volcánica intacta y fauna de los Cinco Grandes", keyPoint: true },
  { day: 10, location: "Aldea Masai", altitude: 1400, note: "Encuentro cultural ancestral y mercado local", keyPoint: false },
  { day: 11, location: "Aeropuerto JRO", altitude: 890, note: "Desayuno, traslado coordinado y vuelo de retorno", keyPoint: false }
];

const AltitudeProfileSection: React.FC<{ onSelectDay?: (day: number) => void }> = ({ onSelectDay }) => {
  const pointsData = altitudePointsData;
  const [selectedDay, setSelectedDay] = useState<number>(6);
  const [hoveredPoint, setHoveredPoint] = useState<AltitudePoint | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const dragInfoRef = useRef<{ startX: number; scrollLeft: number; hasDragged: boolean }>({
    startX: 0,
    scrollLeft: 0,
    hasDragged: false
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const container = scrollContainerRef.current;
    if (container) {
      isDraggingRef.current = true;
      dragInfoRef.current = {
        startX: e.clientX,
        scrollLeft: container.scrollLeft,
        hasDragged: false
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const container = scrollContainerRef.current;
      if (!container) return;
      const deltaX = e.clientX - dragInfoRef.current.startX;
      if (Math.abs(deltaX) > 4) {
        dragInfoRef.current.hasDragged = true;
      }
      container.scrollLeft = dragInfoRef.current.scrollLeft - deltaX;
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setTimeout(() => {
          dragInfoRef.current.hasDragged = false;
        }, 50);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleTouchStart = () => {
    dragInfoRef.current.hasDragged = false;
  };

  const handleTouchMove = () => {
    dragInfoRef.current.hasDragged = true;
  };

  const getX = (index: number) => 45 + (index / (pointsData.length - 1)) * 810;
  const getY = (alt: number) => 205 - (alt / 6000) * 170;

  const linePath = pointsData.reduce((acc, pt, index) => {
    const x = getX(index);
    const y = getY(pt.altitude);
    return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  const areaPath = `${linePath} L ${getX(pointsData.length - 1)} 205 L ${getX(0)} 205 Z`;

  const activeDay = hoveredPoint?.day ?? selectedDay;
  const activeIndex = pointsData.findIndex((pt) => pt.day === activeDay);
  const activePoint = activeIndex >= 0 ? pointsData[activeIndex] : pointsData[0];

  const handlePointClick = (dayNumber: number) => {
    if (dragInfoRef.current.hasDragged) return;
    setSelectedDay(dayNumber);
  };

  return (
    <section
      id="perfil-altura"
      className="py-16 sm:py-20 bg-[#022c3b]/80 px-4 border-t border-[#d45e33]/20 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-title text-2xl md:text-4xl text-[#d45e33] text-center tracking-[3px] uppercase mb-2 font-black">
          Perfil de Altitud
        </h2>
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d45e33]" />
          <span className="text-[#d45e33] text-[0.6rem]">◆</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d45e33]" />
        </div>

        <div className="bg-[#022c3b] p-5 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div className="text-[12px] sm:text-xs uppercase tracking-widest text-white font-bold">
              Escala de Elevación: Desde Moshi (890 m) hasta Uhuru Peak (5.895 m)
            </div>
            <div className="text-xs sm:text-sm text-[#95cecf] flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white text-[#022c3b] shrink-0 font-bold text-[10px]">
                i
              </span>
              <span>Toca o pasa el cursor sobre un nodo para ver información</span>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ touchAction: "pan-x pan-y" }}
            className="w-full overflow-x-auto pb-4 custom-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            <div className="min-w-[680px]">
              <svg viewBox="0 0 900 240" className="w-full h-auto overflow-visible select-none">
                <defs>
                  <linearGradient id="altGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d45e33" stopOpacity="0.45" />
                    <stop offset="60%" stopColor="#009ea4" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#022c3b" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[1500, 3000, 4500, 5895].map((val) => {
                  const y = getY(val);
                  return (
                    <g key={val}>
                      <line
                        x1={45}
                        y1={y}
                        x2={855}
                        y2={y}
                        stroke="#ffffff"
                        strokeOpacity="0.08"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={35}
                        y={y + 3}
                        fill="#95cecf"
                        fontSize="9"
                        textAnchor="end"
                        fontFamily="sans-serif"
                      >
                        {val.toLocaleString()} m
                      </text>
                    </g>
                  );
                })}

                <path d={areaPath} fill="url(#altGradient)" />
                <path d={linePath} fill="none" stroke="#d45e33" strokeWidth="2.5" />

                {activePoint && activeIndex >= 0 && (() => {
                  const cx = getX(activeIndex);
                  const cy = getY(activePoint.altitude);
                  const boxX = Math.max(45, Math.min(665, cx - 95));
                  const isHigh = cy < 60;
                  const boxY = isHigh ? cy + 14 : cy - 50 - 12;
                  return (
                    <g className="pointer-events-none transition-opacity duration-200">
                      <line
                        x1={cx}
                        y1={isHigh ? cy + 6 : cy - 6}
                        x2={cx}
                        y2={isHigh ? boxY : boxY + 50}
                        stroke="#d45e33"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                        opacity="0.8"
                      />
                      <rect
                        x={boxX}
                        y={boxY}
                        width={190}
                        height={50}
                        rx="8"
                        fill="#01141c"
                        fillOpacity="0.96"
                        stroke="#d45e33"
                        strokeWidth="1.5"
                        strokeOpacity="0.9"
                      />
                      <text
                        x={boxX + 95}
                        y={boxY + 18}
                        fill="#95cecf"
                        fontSize="11"
                        fontWeight="700"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        DÍA {activePoint.day} · {activePoint.location}
                      </text>
                      <text
                        x={boxX + 95}
                        y={boxY + 36}
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="900"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        {activePoint.altitude.toLocaleString()} m
                      </text>
                    </g>
                  );
                })()}

                {pointsData.map((pt, index) => {
                  const cx = getX(index);
                  const cy = getY(pt.altitude);
                  const isActive = activeDay === pt.day;
                  return (
                    <g
                      key={pt.day}
                      className="cursor-pointer"
                      onClick={() => handlePointClick(pt.day)}
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isActive ? 8 : pt.keyPoint ? 6 : 4.5}
                        fill={isActive ? "#ff7849" : pt.keyPoint ? "#d45e33" : "#009ea4"}
                        stroke="#ffffff"
                        strokeWidth={isActive ? 2.5 : 1.5}
                      />
                      <text
                        x={cx}
                        y={228}
                        fill={isActive ? "#d45e33" : "#95cecf"}
                        fontSize="10"
                        fontWeight={isActive ? "900" : "600"}
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        D{pt.day}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#95cecf]">
            <div className="text-white/90">
              <strong className="text-[#d45e33]">Día {activePoint.day}:</strong>{" "}
              {activePoint.location} — {activePoint.note} ({activePoint.altitude.toLocaleString()} m)
            </div>
            <div className="text-[11px] text-[#95cecf] font-mono">
              ✦ Cota Máxima: 5.895 m · Cota Valle: 890 m
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
/* =========================================================================
   6. DAY CARD (U) - Inner Card for Itinerary
   ========================================================================= */
const DayCard: React.FC<{
  day: typeof P.itinerary[0];
  isActive: boolean;
}> = ({ day, isActive }) => {
  const hasMetrics = !!(day.metrics && (day.metrics.distance || day.metrics.ascent));

  return (
    <article
      id={`day-${day.day}`}
      className={`h-full w-full rounded-3xl border border-white/12 p-4 sm:p-5 lg:p-6 flex flex-col justify-between shadow-[0_24px_70px_rgba(0,0,0,0.65)] transition-all duration-500 overflow-hidden relative [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale] [text-rendering:optimizeLegibility] ${
        isActive
          ? 'bg-[#011c27] ring-1 ring-[#009ea4]/40 border-white/20 opacity-100 shadow-[0_24px_70px_rgba(0,0,0,0.85)]'
          : 'bg-[#011c27]/85 backdrop-blur-md opacity-80'
      }`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(0,158,164,0.15)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(212,94,51,0.15)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col h-full justify-between gap-2.5 sm:gap-3">
        {/* Header */}
        <div className="shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="hidden lg:flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-xl bg-[#d45e33] text-white font-title text-xs font-black uppercase tracking-wider shadow-sm">
                DÍA {day.day}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#95cecf] uppercase tracking-wider">
                {day.date}
              </span>
            </div>
            <span className="hidden md:inline-block text-xs font-bold uppercase tracking-wider text-[#00e5ee]">
              {day.stageLabel}
            </span>
          </div>

          <div className="text-[11px] sm:text-xs md:text-xs lg:text-sm uppercase tracking-widest text-[#d45e33] font-bold mb-0.5 md:mb-1 leading-snug line-clamp-1">
            {day.subtitle}
          </div>

          <h3 className="font-title text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white uppercase tracking-tight leading-snug md:leading-tight line-clamp-2">
            {day.title}
          </h3>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3.5 lg:gap-5 items-start md:items-center flex-1 min-h-0 overflow-y-auto md:overflow-visible pr-0.5 md:pr-0 scrollbar-thin">
          {/* Photo */}
          <div className="md:col-span-5 flex flex-col justify-center shrink-0">
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg relative h-24 sm:h-28 md:h-[185px] lg:h-[195px] xl:h-[205px]">
              <img
                src={day.images[0]}
                alt={day.title}
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105 pointer-events-none"
              />
            </div>
          </div>

          {/* Details & Metrics */}
          <div className="md:col-span-7 flex flex-col justify-between gap-1.5 md:gap-2 min-h-0 flex-1">
            {hasMetrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 p-1.5 sm:p-2 md:p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs shrink-0">
                {day.metrics?.distance && (
                  <div>
                    <div className="flex items-center gap-1 text-[#95cecf] text-[10px] sm:text-[11px] font-bold uppercase">
                      <Clock className="w-3 h-3 text-[#00e5ee] shrink-0" />
                      <span className="truncate">Distancia</span>
                    </div>
                    <span className="font-bold text-white text-[11px] sm:text-sm truncate block">{day.metrics.distance}</span>
                  </div>
                )}
                {day.metrics?.ascent && (
                  <div>
                    <div className="flex items-center gap-1 text-[#95cecf] text-[10px] sm:text-[11px] font-bold uppercase">
                      <Mountain className="w-3 h-3 text-[#d45e33] shrink-0" />
                      <span className="truncate">Ascenso</span>
                    </div>
                    <span className="font-bold text-white text-[11px] sm:text-sm truncate block">{day.metrics.ascent}</span>
                  </div>
                )}
                {day.metrics?.descent && (
                  <div>
                    <div className="flex items-center gap-1 text-[#95cecf] text-[10px] sm:text-[11px] font-bold uppercase">
                      <ArrowDown className="w-3 h-3 text-[#95cecf] shrink-0" />
                      <span className="truncate">Descenso</span>
                    </div>
                    <span className="font-bold text-white text-[11px] sm:text-sm truncate block">{day.metrics.descent}</span>
                  </div>
                )}
                {day.metrics?.duration && (
                  <div>
                    <div className="flex items-center gap-1 text-[#95cecf] text-[10px] sm:text-[11px] font-bold uppercase">
                      <Clock className="w-3 h-3 text-[#e4a381] shrink-0" />
                      <span className="truncate">Tiempo</span>
                    </div>
                    <span className="font-bold text-white text-[11px] sm:text-sm truncate block">{day.metrics.duration}</span>
                  </div>
                )}
              </div>
            )}

            {/* Activities bullets - Placed ABOVE badges in all views */}
            <ul className="space-y-1 md:space-y-1.5 text-sm md:text-xs lg:text-[13px] xl:text-sm text-[#f5f0e8]/90 font-light leading-snug md:leading-tight lg:leading-snug">
              {day.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#009ea4] mt-0.5 shrink-0 text-xs">◆</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>

            {/* Badges: Accommodation & Meal - Placed BELOW activities (Selector 1 below Selector 2) */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 md:py-1 rounded-lg bg-white/5 border border-white/10 text-[#f5f0e8] text-[11px] sm:text-xs">
                <Tent className="w-3.5 h-3.5 text-[#009ea4] shrink-0" />
                <span className="truncate max-w-[170px] sm:max-w-[200px]">{day.accommodation}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 md:py-1 rounded-lg bg-white/5 border border-white/10 text-[#f5f0e8] text-[11px] sm:text-xs">
                <Utensils className="w-3.5 h-3.5 text-[#d45e33] shrink-0" />
                <span className="truncate max-w-[170px] sm:max-w-[200px]">{day.meal}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Location info only (consultation button and stageLabel span removed) */}
        <div className="pt-2 sm:pt-2.5 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-[#95cecf] shrink-0 mt-auto md:mt-0">
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#d45e33] shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">{day.location}</span>
          </span>
        </div>
      </div>
    </article>
  );
};

/* =========================================================================
   7. ITINERARIO COMPONENT (V) - 3D Carousel & Mobile Slider
   ========================================================================= */
const Itinerario: React.FC<{ selectedDayNumber: number | null }> = ({ selectedDayNumber }) => {
  const itinerary = P.itinerary;
  const count = itinerary.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (selectedDayNumber && selectedDayNumber >= 1 && selectedDayNumber <= count) {
      setCurrentIndex(selectedDayNumber - 1);
      const itElement = document.getElementById('itinerario');
      if (itElement) itElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedDayNumber, count]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (e.key === 'ArrowLeft') handlePrev();
        else if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentDay = itinerary[currentIndex];
  const activeDayNumber = currentDay ? currentDay.day : 1;
  const activeCategory =
    activeDayNumber <= 4 ? "marangu" : activeDayNumber <= 7 ? "cumbre" : "safari";

  const handleConsultDay = () => {
    const text = encodeURIComponent(
      `Hola Birn Experience, deseo consultar sobre el Día ${activeDayNumber} (${currentDay?.title}) de la expedición al Kilimanjaro.`
    );
    window.open(`https://wa.me/${P.contact.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Drag & Touch gestures ref
  const gestureRef = useRef({
    startX: 0,
    startY: 0,
    isDown: false,
    hasDragged: false,
    isVerticalScroll: false
  });

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      gestureRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        isDown: true,
        hasDragged: false,
        isVerticalScroll: false
      };
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!gestureRef.current.isDown) return;
    const diff = e.clientX - gestureRef.current.startX;
    if (Math.abs(diff) > 8) {
      gestureRef.current.hasDragged = true;
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (gestureRef.current.isDown) {
      const diff = e.clientX - gestureRef.current.startX;
      if (Math.abs(diff) >= 45) {
        if (diff < 0) handleNext();
        else handlePrev();
      }
    }
    gestureRef.current.isDown = false;
    setTimeout(() => {
      gestureRef.current.hasDragged = false;
    }, 60);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    gestureRef.current = {
      startX: t.clientX,
      startY: t.clientY,
      isDown: true,
      hasDragged: false,
      isVerticalScroll: false
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!gestureRef.current.isDown || e.touches.length !== 1) return;
    const t = e.touches[0];
    const dx = t.clientX - gestureRef.current.startX;
    const dy = t.clientY - gestureRef.current.startY;
    if (!gestureRef.current.hasDragged && !gestureRef.current.isVerticalScroll) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        gestureRef.current.isVerticalScroll = true;
      } else if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        gestureRef.current.hasDragged = true;
      }
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (gestureRef.current.isDown && !gestureRef.current.isVerticalScroll) {
      const t = e.changedTouches[0];
      const dx = t.clientX - gestureRef.current.startX;
      const dy = t.clientY - gestureRef.current.startY;
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) handleNext();
        else handlePrev();
      }
    }
    gestureRef.current.isDown = false;
    gestureRef.current.isVerticalScroll = false;
    setTimeout(() => {
      gestureRef.current.hasDragged = false;
    }, 60);
  };

  return (
    <section
      ref={sectionRef}
      id="itinerario"
      className="py-16 sm:py-20 lg:py-24 bg-[#022c3b] relative scroll-mt-20 w-full overflow-hidden border-t border-b border-white/10"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[340px] bg-[#009ea4]/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute right-10 bottom-1/4 w-[480px] h-[280px] bg-[#d45e33]/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 border border-[#d45e33]/40 bg-[#d45e33]/10 text-[#d45e33] font-title text-[12px] sm:text-xs font-black tracking-[3px] px-5 py-1.5 rounded-full uppercase mb-4">
            ✦ CRONOGRAMA OFICIAL DETALLADO ✦
          </div>
          <h2 className="font-title text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase mb-3 font-black">
            <span className="hidden sm:inline">Itinerario Día por Día</span>
            <span className="inline sm:hidden">
              Itinerario
              <br />
              Día por Día
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#95cecf] font-light max-w-2xl mx-auto leading-relaxed text-center">
            <span className="hidden sm:inline">
              11 jornadas con foco integral en el trekking al Kilimanjaro (5.895 m):
              <br />
              Ruta Marangu en refugios alpinos, aclimatación en Horombo y safaris en Tarangire y Ngorongoro.
            </span>
            <span className="inline sm:hidden">
              11 jornadas con foco principal en el trekking
              <br />
              al Kilimanjaro, cumbre en Uhuru Peak y
              <br />
              safaris en Tarangire y Ngorongoro.
            </span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-7">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d45e33]" />
          <span className="text-[#d45e33] text-[0.6rem]">◆</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d45e33]" />
        </div>

        {/* Filter buttons matching reference responsive layout */}
        <div className="mb-6">
          {/* Mobile buttons */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-lg mx-auto md:hidden">
            {z.map((item) => {
              const isActive = item.id !== "all" && activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(item.startIndex)}
                  className={`p-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex flex-col items-center justify-center gap-1 text-center ${
                    isActive
                      ? 'bg-[#d45e33] text-white shadow-md'
                      : 'bg-white/5 border border-white/10 text-[#95cecf] hover:text-white'
                  }`}
                >
                  <span className="font-bold leading-tight">
                    {item.line1}
                    <br />
                    {item.line2}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tablet buttons */}
          <div className="hidden md:flex lg:hidden flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {z.map((item) => {
              const isActive = item.id !== "all" && activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(item.startIndex)}
                  className={`py-1.5 px-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#d45e33] text-white shadow-md'
                      : 'bg-white/5 border border-white/10 text-[#95cecf] hover:text-white'
                  }`}
                >
                  <span>{item.fullLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop buttons */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-2.5">
            {z.map((item) => {
              const isActive = item.id !== "all" && activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(item.startIndex)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d45e33] ${
                    isActive
                      ? 'bg-[#d45e33] text-white shadow-lg shadow-[#d45e33]/30 scale-105'
                      : 'bg-white/5 border border-white/10 text-[#95cecf] hover:border-[#d45e33]/50 hover:text-white'
                  }`}
                >
                  <span>{item.fullLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Helper Note */}
        <div className="hidden lg:block text-center mb-6">
          <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed asterisk-text">
            *Deslizá cada día para conocer los detalles completos de la expedición.
          </p>
        </div>

        {/* 1. DESKTOP 3D CAROUSEL (hidden lg:block) */}
        <div
          className="relative hidden lg:block overflow-hidden py-2 lg:min-h-[540px] xl:min-h-[550px] px-6 lg:px-[90px] xl:px-[120px] cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'pan-y' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Ver día anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#01141c]/80 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#009ea4] hover:text-white cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Ver día siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#01141c]/80 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#009ea4] hover:text-white cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="relative h-[520px] xl:h-[530px] w-full" style={{ perspective: '1100px' }}>
            {itinerary.map((dayItem, idx) => {
              const diff = B(idx, currentIndex, count);
              const isActive = diff === 0;
              const isPrev = diff === -1;
              const isNext = diff === 1;

              let tx = 0;
              let scale = 1;
              let rotY = 0;
              let opacity = 0;
              let blur = 10;
              let zIdx = 0;
              let pointer = 'none';

              if (isActive) {
                tx = 0;
                scale = 1;
                rotY = 0;
                opacity = 1;
                blur = 0;
                zIdx = 30;
                pointer = 'auto';
              } else if (isPrev) {
                tx = -410;
                scale = 0.78;
                rotY = 6;
                opacity = 0.75;
                blur = 1.5;
                zIdx = 18;
                pointer = 'auto';
              } else if (isNext) {
                tx = 410;
                scale = 0.78;
                rotY = -6;
                opacity = 0.75;
                blur = 1.5;
                zIdx = 18;
                pointer = 'auto';
              } else {
                tx = diff < 0 ? -640 : 640;
                scale = 0.6;
                rotY = diff < 0 ? 8 : -8;
                opacity = 0;
                blur = 10;
                zIdx = 0;
                pointer = 'none';
              }

              return (
                <div
                  key={dayItem.day}
                  onClick={(e) => {
                    if (gestureRef.current.hasDragged) {
                      e.preventDefault();
                    } else {
                      if (isPrev) handlePrev();
                      if (isNext) handleNext();
                    }
                  }}
                  className={`absolute inset-x-0 mx-auto top-0 h-[510px] xl:h-[520px] w-full max-w-[690px] transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    pointer === 'auto' ? 'cursor-pointer' : 'pointer-events-none'
                  }`}
                  style={{
                    transform: isActive ? 'none' : `translateX(${tx}px) scale(${scale}) rotateY(${rotY}deg)`,
                    opacity: isActive ? 1 : opacity,
                    filter: isActive ? 'none' : `blur(${blur}px)`,
                    zIndex: zIdx,
                    transformStyle: isActive ? 'flat' : 'preserve-3d',
                    backfaceVisibility: isActive ? 'visible' : 'hidden',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                  aria-hidden={!isActive}
                >
                  <DayCard day={dayItem} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. TABLET 3D CAROUSEL (hidden md:block lg:hidden) */}
        <div className="hidden md:block lg:hidden w-full select-none">
          <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-xl bg-[#d45e33] text-white font-title text-xs font-black uppercase tracking-wider">
                DÍA {currentDay?.day}
              </span>
              <span className="text-xs font-bold text-[#95cecf] uppercase tracking-wider">
                {currentDay?.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Ver día anterior"
                onClick={handlePrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#01141c]/85 text-white/80 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#009ea4] hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Ver día siguiente"
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#01141c]/85 text-white/80 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#009ea4] hover:text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className="relative w-full overflow-hidden py-2 cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'pan-y' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative h-[515px] w-full" style={{ perspective: '1100px' }}>
              {itinerary.map((dayItem, idx) => {
                const diff = B(idx, currentIndex, count);
                const isActive = diff === 0;
                const isPrev = diff === -1;
                const isNext = diff === 1;

                let tx = 0;
                let scale = 1;
                let rotY = 0;
                let opacity = 0;
                let blur = 10;
                let zIdx = 0;
                let pointer = 'none';

                if (isActive) {
                  tx = 0;
                  scale = 1;
                  rotY = 0;
                  opacity = 1;
                  blur = 0;
                  zIdx = 30;
                  pointer = 'auto';
                } else if (isPrev) {
                  tx = -390;
                  scale = 0.78;
                  rotY = 6;
                  opacity = 0.75;
                  blur = 1.5;
                  zIdx = 18;
                  pointer = 'auto';
                } else if (isNext) {
                  tx = 390;
                  scale = 0.78;
                  rotY = -6;
                  opacity = 0.75;
                  blur = 1.5;
                  zIdx = 18;
                  pointer = 'auto';
                } else {
                  tx = diff < 0 ? -620 : 620;
                  scale = 0.6;
                  rotY = diff < 0 ? 8 : -8;
                  opacity = 0;
                  blur = 10;
                  zIdx = 0;
                  pointer = 'none';
                }

                return (
                  <div
                    key={dayItem.day}
                    onClick={(e) => {
                      if (gestureRef.current.hasDragged) {
                        e.preventDefault();
                      } else {
                        if (isPrev) handlePrev();
                        if (isNext) handleNext();
                      }
                    }}
                    className={`absolute inset-x-0 mx-auto top-0 h-[505px] w-full max-w-[660px] transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      pointer === 'auto' ? 'cursor-pointer' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: isActive ? 'none' : `translateX(${tx}px) scale(${scale}) rotateY(${rotY}deg)`,
                      opacity: isActive ? 1 : opacity,
                      filter: isActive ? 'none' : `blur(${blur}px)`,
                      zIndex: zIdx,
                      transformStyle: isActive ? 'flat' : 'preserve-3d',
                      backfaceVisibility: isActive ? 'visible' : 'hidden',
                      WebkitFontSmoothing: 'antialiased'
                    }}
                    aria-hidden={!isActive}
                  >
                    <DayCard day={dayItem} isActive={isActive} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. MOBILE SMART STAGE (md:hidden w-full select-none) - Exactly matching reference */}
        <div className="md:hidden w-full select-none">
          {/* Top navigation controls matching reference */}
          <div className="flex justify-end items-center mb-1.5 px-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Ver día anterior"
                onClick={handlePrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#01141c]/85 text-white/80 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#009ea4] hover:text-white active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Ver día siguiente"
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#01141c]/85 text-white/80 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#009ea4] hover:text-white active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 mb-3 px-1">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-xl bg-[#d45e33] text-white font-title text-[12px] font-black uppercase tracking-wider shadow-sm">
                  DÍA {currentDay?.day}
                </span>
                <span className="text-[12px] font-bold text-[#95cecf] uppercase tracking-wider">
                  {currentDay?.date}
                </span>
              </div>
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#00e5ee]">
                {currentDay?.stageLabel}
              </span>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <p className="text-xs text-white/70 font-light text-right leading-tight asterisk-text">
                *Selecciona las flechas
                <br />
                para cambiar de día.
              </p>
            </div>
          </div>

          {/* Swipeable 3D Card Stage */}
          <div
            className="relative w-full overflow-hidden py-2 cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'pan-y' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative h-[640px] sm:h-[610px] w-full" style={{ perspective: '850px' }}>
              {itinerary.map((dayItem, idx) => {
                const diff = B(idx, currentIndex, count);
                const isActive = diff === 0;
                const isPrev = diff === -1;
                const isNext = diff === 1;

                let tx = 0;
                let scale = 1;
                let rotY = 0;
                let opacity = 0;
                let blur = 10;
                let zIdx = 0;
                let pointer = 'none';

                if (isActive) {
                  tx = 0;
                  scale = 1;
                  rotY = 0;
                  opacity = 1;
                  blur = 0;
                  zIdx = 30;
                  pointer = 'auto';
                } else if (isPrev) {
                  tx = -290;
                  scale = 0.8;
                  rotY = 6;
                  opacity = 0.65;
                  blur = 2;
                  zIdx = 15;
                  pointer = 'auto';
                } else if (isNext) {
                  tx = 290;
                  scale = 0.8;
                  rotY = -6;
                  opacity = 0.65;
                  blur = 2;
                  zIdx = 15;
                  pointer = 'auto';
                } else {
                  tx = diff < 0 ? -480 : 480;
                  scale = 0.6;
                  rotY = diff < 0 ? 8 : -8;
                  opacity = 0;
                  blur = 10;
                  zIdx = 0;
                  pointer = 'none';
                }

                return (
                  <div
                    key={dayItem.day}
                    onClick={(e) => {
                      if (gestureRef.current.hasDragged) {
                        e.preventDefault();
                      } else {
                        if (isPrev) handlePrev();
                        if (isNext) handleNext();
                      }
                    }}
                    className={`absolute inset-x-0 mx-auto top-0 h-[630px] sm:h-[600px] w-full max-w-[360px] sm:max-w-[420px] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      pointer === 'auto' ? 'cursor-pointer' : 'pointer-events-none'
                    }`}
                    style={{
                      transform: isActive ? 'none' : `translateX(${tx}px) scale(${scale}) rotateY(${rotY}deg)`,
                      opacity: isActive ? 1 : opacity,
                      filter: isActive ? 'none' : `blur(${blur}px)`,
                      zIndex: zIdx,
                      transformStyle: isActive ? 'flat' : 'preserve-3d',
                      backfaceVisibility: isActive ? 'visible' : 'hidden',
                      WebkitFontSmoothing: 'antialiased'
                    }}
                    aria-hidden={!isActive}
                  >
                    <DayCard day={dayItem} isActive={isActive} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   8. COORDINADOR & NOSOTROS COMPONENT (W) - "Nosotros" Voice & Leadership
   ========================================================================= */
const CoordinadorNosotros: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 768 && textRef.current) {
        const h = textRef.current.offsetHeight;
        if (h > 0) setBoxSize(h);
      } else {
        setBoxSize(null);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section id="coordinador" className="py-20 sm:py-24 bg-[#01141c] border-t border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 border border-[#d45e33]/40 bg-[#d45e33]/10 text-[#d45e33] font-title text-[12px] sm:text-xs font-black tracking-[3px] px-5 py-1.5 rounded-full uppercase mb-4">
            ✦ LIDERAZGO Y SEGURIDAD PROFESIONAL ✦
          </div>
          <h2 className="font-title text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase mb-3 font-black">
            Coordinación y<br />Equipo de Guías
          </h2>
          <p className="text-base sm:text-lg text-[#95cecf] font-light max-w-2xl mx-auto leading-relaxed">
            <span className="hidden sm:inline">
              Experiencia en terreno, planificación rigurosa y acompañamiento permanente
              <br />
              en cada etapa del recorrido por Tanzania.
            </span>
            <span className="inline sm:hidden">
              Experiencia en terreno, planificación rigurosa y acompañamiento permanente en cada etapa.
            </span>
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d45e33]" />
            <span className="text-[#d45e33] text-[0.6rem]">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d45e33]" />
          </div>
        </div>

        {/* Card matching reference layout */}
        <div className="rounded-3xl border border-white/15 bg-[#02222d]/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left: Ricardo Birn / Nosotros */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    style={boxSize ? { height: `${boxSize}px`, width: `${boxSize}px`, flexShrink: 0 } : undefined}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#d45e33] shrink-0 shadow-lg relative bg-[#01141c] aspect-square"
                  >
                    <img
                      src="/assets/images/ricardo-birn.webp"
                      alt="Ricardo Birn - Coordinador de expedición"
                      width={96}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div ref={textRef} className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-widest text-[#d45e33] font-bold block mb-1">
                      Coordinador General & Tour Leader
                    </span>
                    <h3 className="font-title text-2xl sm:text-3xl text-white font-black uppercase tracking-wide leading-tight">
                      Ricardo Birn
                    </h3>
                    <p className="text-xs sm:text-sm text-[#95cecf] font-medium leading-normal mt-0.5">
                      Montañista, Tour Leader y Lic. en Educación Física
                    </p>
                  </div>
                </div>

                {/* Adapted narrative using "Nosotros" voice */}
                <div className="space-y-4 text-[15px] sm:text-base text-[#f5f0e8]/90 leading-relaxed font-light">
                  <p>
                    Coordinamos y asesoramos cada expedición con la impronta y respaldo de Birn Experience. Ricardo Birn coordina minuciosamente toda la etapa previa y acompaña el desarrollo del viaje a la distancia, estando pendiente minuto a minuto. Su vasta trayectoria en las cumbres más exigentes del planeta —incluyendo los Himalayas y los Andes— sumada a su formación profesional, garantiza un criterio estricto de seguridad, dosificación metódica del esfuerzo y soporte constante para cada participante.
                  </p>
                  <p>
                    En Tanzania, los expedicionarios son recibidos por el guía de Birn Experience y el equipo de guías locales certificados, quienes brindan la coordinación en terreno, acompañamiento cercano y supervisión constante: desde la bienvenida en el Aeropuerto Internacional JRO y el monitoreo diario de saturación de oxígeno en los refugios de la Ruta Marangu, hasta la conducción en los safaris de Tarangire y el Cráter de Ngorongoro.
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#009ea4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold text-[15px] sm:text-xs">
                      Seguridad en Montaña
                    </strong>
                    <span className="text-[#95cecf] text-[15px] sm:text-xs">
                      Protocolos preventivos, oxímetro diario y gestión de altitud
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#d45e33] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-bold text-[15px] sm:text-xs">
                      Acompañamiento Humano
                    </strong>
                    <span className="text-[#95cecf] text-[15px] sm:text-xs">
                      Grupos reducidos y atención personalizada paso a paso
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Equipo de Guías Locales Tanzanos */}
            <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-black/15">
              <div>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                  <div
                    style={boxSize ? { height: `${boxSize}px`, width: `${boxSize}px`, flexShrink: 0 } : undefined}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#009ea4] shrink-0 shadow-lg relative bg-[#01141c] aspect-square"
                  >
                    <img
                      src="/assets/images/equipo.webp"
                      alt="Equipo de Guías Locales - Birn Experience & Guías TANAPA"
                      width={96}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-widest text-[#009ea4] font-bold block mb-1">
                      Equipo en Destino & TANAPA
                    </span>
                    <h3 className="font-title text-xl sm:text-2xl text-white font-black uppercase tracking-wider leading-tight">
                      Equipo de Guías Locales
                    </h3>
                    <p className="text-xs sm:text-sm text-[#95cecf] font-medium leading-normal mt-0.5">
                      Birn Experience & Guías TANAPA Certificados
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-[#f5f0e8]/90 leading-relaxed font-light">
                  <p>
                    Junto al <strong>guía de Birn Experience</strong> que recibe y acompaña al grupo en destino, trabajamos en estrecha articulación con <strong>guías locales tanzanos registrados en el Parque Nacional Kilimanjaro</strong>, porteadores experimentados y cocineros profesionales de montaña.
                  </p>
                  <p>
                    Este equipo conjunto brinda coordinación presencial, atención en español y un profundo conocimiento de las pendientes del volcán, asegurando una aclimatación óptima bajo el ritmo tradicional <em>"pole pole"</em> y un índice sobresaliente de éxito en cumbre cuidando en todo momento la integridad del grupo.
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e4a381]">
                    <Check className="w-4 h-4 text-[#009ea4]" />
                    <span>Ratio de Apoyo Excepcional</span>
                  </div>
                  <p className="text-xs text-[#95cecf] leading-relaxed">
                    Contamos con múltiples porteadores y asistentes por expedicionario para que asciendas cómodo cargando únicamente tu mochila de día con abrigo e hidratación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   9. INCLUSIONES COMPONENT - Diseño Original con Pestañas Interactivas y Detalle Completo
   ========================================================================= */
const Inclusiones: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kili' | 'safari' | 'noincluye'>('kili');

  const kiliItems = [
    {
      title: "Recogida y regreso:",
      desc: "Traslados oficiales desde y hacia el Aeropuerto Internacional de Kilimanjaro (JRO)."
    },
    {
      title: "Transporte privado:",
      desc: "Transporte exclusivo desde el hotel en Moshi hasta la puerta de los Parques (punto de partida) y de regreso al finalizar."
    },
    {
      title: "Hoteles en Moshi:",
      desc: "2 noches de hotel de calidad seleccionada (la noche anterior y posterior a la subida), con desayuno incluido."
    },
    {
      title: "Guías calificados en español:",
      desc: "Nuestro equipo de guías tanzanos certificados por TANAPA (Parque Nacional Kilimanjaro) te acompaña y asiste durante cada jornada."
    },
    {
      title: "Alojamiento en cabañas:",
      desc: "Pernocte en los refugios oficiales de montaña de la Ruta Marangu (cabañas de Mandara, Horombo y Kibo) con camas y colchones."
    },
    {
      title: "Tickets de ingreso:",
      desc: "Todas las tarifas, tasas de entrada, acampada y conservación del Parque Nacional Kilimanjaro."
    },
    {
      title: "Salarios justos del equipo:",
      desc: "Cobertura de salarios dignos para guías, cocineros profesionales y porteadores dedicados."
    },
    {
      title: "Comidas completas:",
      desc: "Pensión completa con desayuno, almuerzo y cena calientes, así como bebidas calientes y viandas de marcha en la montaña."
    },
    {
      title: "Agua tratada y lavado:",
      desc: "De 3 a 4 litros de agua tratada provistos diariamente por escalador y agua caliente para lavado personal."
    },
    {
      title: "Seguridad y rescate:",
      desc: "Tasa de rescate obligatoria en montaña (Kilimanjaro Rescue Fee), equipo portátil complementario de oxígeno, oxímetro de pulso, primeros auxilios y servicios de evacuación de rescate terrestre del Parque Kilimanjaro."
    },
    {
      title: "Certificado de cumbre:",
      desc: "Certificado oficial del Parque Nacional del Kilimanjaro por tu exitoso intento de cumbre."
    },
    {
      title: "Coordinación y liderazgo:",
      desc: "Coordinación integral y asesoramiento de Ricardo Birn con seguimiento continuo a la distancia y acompañamiento en destino del guía de Birn Experience junto a los guías locales."
    },
    {
      title: "Asistencia médica integral:",
      desc: "Seguro de asistencia médica integral en viaje y en actividades de montaña durante toda la expedición."
    }
  ];

  const safariItems = [
    {
      title: "Safaris completos:",
      desc: "Observación de vida silvestre en los Parques Nacionales Tarangire y Cráter de Ngorongoro en el circuito norte."
    },
    {
      title: "Vehículo privado 4x4:",
      desc: "Todoterreno exclusivo con escotilla de techo abatible para fotos y vistas panorámicas a 360 grados."
    },
    {
      title: "Guía de safari en español:",
      desc: "Conductor y guía experimentado que habla español para explicar el comportamiento animal y los ecosistemas."
    },
    {
      title: "Aranceles de Parques:",
      desc: "Todos los tickets de acceso y permisos de descenso al Cráter de Ngorongoro y Parque Nacional Tarangire."
    },
    {
      title: "Hoteles en Arusha:",
      desc: "2 noches de hotel en Arusha (la noche antes y después del safari) con desayuno incluido."
    },
    {
      title: "Farm of Dreams Lodge:",
      desc: "Alojamiento con desayuno, almuerzo y cena incluidos en Karatu en un confortable lodge de alta calidad."
    },
    {
      title: "Almuerzos en safari:",
      desc: "Comidas campestres y viandas de picnic durante todo el trayecto de exploración."
    },
    {
      title: "Agua potable:",
      desc: "Provisión de agua mineral embotellada para todo el recorrido del safari."
    },
    {
      title: "Visita cultural a comunidad Masai:",
      desc: "Convivencia respetuosa e intercambio cultural en el poblado tradicional Masai."
    },
    {
      title: "Regreso al aeropuerto:",
      desc: "Traslado final en vehículo privado al Aeropuerto Internacional de Kilimanjaro (JRO)."
    }
  ];

  const noIncluyeItems = [
    {
      title: "Tarifas aéreas internacionales:",
      desc: "Vuelos internacionales hacia y desde el Aeropuerto de Kilimanjaro (JRO) y retorno."
    },
    {
      title: "Visa de Tanzania:",
      desc: "US$ 50 por persona a su llegada al aeropuerto o mediante trámite de e-visa digital."
    },
    {
      title: "Seguro de viaje:",
      desc: "Seguro de cancelación personal o coberturas complementarias opcionales."
    },
    {
      title: "Artículos de carácter personal:",
      desc: "Indumentaria técnica particular, saco de dormir de alta montaña, botas de trekking y elementos de aseo personal."
    },
    {
      title: "Propinas para el equipo de montaña:",
      desc: "Promedio sugerido de USD 200 por participante en total para guías, porteadores y cocineros (tradición arraigada en Tanzania)."
    },
    {
      title: "Propinas para safari:",
      desc: "USD 10 por día por cliente para el guía y conductor de safari."
    },
    {
      title: "Snacks y medicina personal:",
      desc: "Suplementos deportivos, barras energéticas, medicamentos particulares o gastos personales no contemplados."
    },
    {
      title: "Cenas en Arusha:",
      desc: "Cenas en las 2 noches de hotel en Arusha (desayuno sí está incluido) y bebidas fuera de las comidas provistas."
    }
  ];

  return (
    <section id="inclusiones" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#01141c] relative border-t border-white/10 scroll-mt-24">
      <div id="servicios" className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 border border-[#009ea4]/40 bg-[#009ea4]/10 text-[#009ea4] font-title text-[12px] sm:text-xs font-black tracking-[3px] px-5 py-1.5 rounded-full uppercase mb-4">
            ✦ TRANSPARENCIA TOTAL ✦
          </div>
          <h2 className="font-title text-3xl sm:text-5xl text-white tracking-tight uppercase">
            <span className="hidden sm:inline">¿Qué Incluye tu Viaje?</span>
            <span className="inline sm:hidden">
              ¿Qué Incluye
              <br />
              tu Viaje?
            </span>
          </h2>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d45e33]" />
            <span className="text-[#d45e33] text-[0.6rem]">◆</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d45e33]" />
          </div>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#95cecf] font-light leading-relaxed">
            Te presentamos el desglose completo de todo lo que incluimos para que viajes con absoluta tranquilidad y sin sorpresas.
          </p>
        </div>

        {/* Tabs Controls */}
        <div className="flex justify-center gap-2.5 sm:gap-4 mb-10 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('kili')}
            className={`px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'kili'
                ? 'bg-[#009ea4] border border-[#009ea4] text-white shadow-lg shadow-[#009ea4]/35 scale-[1.02]'
                : 'bg-[#01141c]/80 border border-white/15 text-[#f5f0e8]/85 hover:text-white hover:border-white/30'
            }`}
          >
            1. Ascenso al Kilimanjaro
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('safari')}
            className={`px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'safari'
                ? 'bg-[#009ea4] border border-[#009ea4] text-white shadow-lg shadow-[#009ea4]/35 scale-[1.02]'
                : 'bg-[#01141c]/80 border border-white/15 text-[#f5f0e8]/85 hover:text-white hover:border-white/30'
            }`}
          >
            2. Safari en Tanzania
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('noincluye')}
            className={`px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'noincluye'
                ? 'bg-[#009ea4] border border-[#009ea4] text-white shadow-lg shadow-[#009ea4]/35 scale-[1.02]'
                : 'bg-[#01141c]/80 border border-white/15 text-[#f5f0e8]/85 hover:text-white hover:border-white/30'
            }`}
          >
            Servicios No Incluidos
          </button>
        </div>

        {/* Tab Content: Kilimanjaro */}
        {activeTab === 'kili' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 animate-fadeIn">
            {/* Main Service Card */}
            <div className="md:col-span-7 lg:col-span-8 bg-[#01141c]/80 border border-white/12 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <h3 className="font-title text-xl sm:text-2xl text-white font-black uppercase tracking-wider">
                  Incluido en el Ascenso al Kilimanjaro
                </h3>
              </div>
              <ul className="space-y-3.5">
                {kiliItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#f5f0e8]/90 font-normal leading-relaxed">
                    <span className="text-[#25d366] font-bold shrink-0 mt-0.5 text-base">✔</span>
                    <span>
                      <strong className="text-white font-bold">{item.title}</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Card: Nuestro Criterio */}
            <div className="md:col-span-5 lg:col-span-4 bg-[#01141c]/70 border border-white/12 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <h3 className="font-title text-lg sm:text-xl text-white font-black uppercase tracking-wider">
                  Nuestro Criterio
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-[#95cecf] leading-relaxed flex flex-col gap-5">
                <p>
                  <strong className="text-[#d45e33] font-bold block mb-1">Ruta Marangu:</strong>
                  Elegimos esta ruta para brindarte cabañas de madera con luz solar y camas, evitando el desgaste de dormir sobre el suelo helado.
                </p>
                <p>
                  <strong className="text-[#009ea4] font-bold block mb-1">Porteo Profesional:</strong>
                  Los porteadores trasladan tu equipaje principal. Tú caminas ligero, únicamente con tu mochila de día con agua, abrigo y cámara.
                </p>
                <p>
                  <strong className="text-[#95cecf] font-bold block mb-1">Acompañamiento Cercano:</strong>
                  Cuidamos tus signos de oxigenación, tu hidratación y tu ritmo de paso en todo momento.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#f5f0e8]/80 mt-2 leading-relaxed">
                  <p>
                    *Sin cargos ocultos ni sorpresas en destino. Todas las tarifas del parque nacional, permisos oficiales y safaris están cubiertos en nuestra tarifa de USD 3.350.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Safari */}
        {activeTab === 'safari' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 animate-fadeIn">
            {/* Main Service Card */}
            <div className="md:col-span-7 lg:col-span-8 bg-[#01141c]/80 border border-white/12 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <h3 className="font-title text-xl sm:text-2xl text-white font-black uppercase tracking-wider">
                  Incluido en el Safari en Tanzania
                </h3>
              </div>
              <ul className="space-y-3.5">
                {safariItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#f5f0e8]/90 font-normal leading-relaxed">
                    <span className="text-[#25d366] font-bold shrink-0 mt-0.5 text-base">✔</span>
                    <span>
                      <strong className="text-white font-bold">{item.title}</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Card: Hospedajes de Safari */}
            <div className="md:col-span-5 lg:col-span-4 bg-[#01141c]/70 border border-white/12 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <h3 className="font-title text-lg sm:text-xl text-white font-black uppercase tracking-wider">
                  Hospedajes de Safari
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-[#95cecf] leading-relaxed flex flex-col gap-5">
                <p>
                  <strong className="text-[#d45e33] font-bold block mb-1">Farm of Dreams Lodge:</strong>
                  Te alojas en un acogedor lodge entre las colinas de Karatu, con piscina y pensión completa.
                </p>
                <p>
                  <strong className="text-[#009ea4] font-bold block mb-1">Green Mountain Hotel:</strong>
                  Hotel en Arusha ideal para descansar y celebrar el regreso de la montaña antes de los safaris.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#f5f0e8]/80 mt-2 leading-relaxed">
                  <p>
                    *Sin cargos ocultos ni sorpresas en destino. Todas las tarifas del parque nacional, permisos oficiales y safaris están cubiertos en nuestra tarifa de USD 3.350.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: No Incluido */}
        {activeTab === 'noincluye' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 animate-fadeIn">
            {/* Main Service Card */}
            <div className="md:col-span-7 lg:col-span-8 bg-[#01141c]/80 border border-white/12 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <h3 className="font-title text-xl sm:text-2xl text-white font-black uppercase tracking-wider">
                  Servicios No Incluidos
                </h3>
              </div>
              <ul className="space-y-3.5">
                {noIncluyeItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#f5f0e8]/80 font-normal leading-relaxed">
                    <span className="text-[#e55353] font-bold shrink-0 mt-0.5 text-base">✖</span>
                    <span>
                      <strong className="text-white font-bold">{item.title}</strong> {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Card: Acompañamiento en Propinas */}
            <div className="md:col-span-5 lg:col-span-4 bg-[#01141c]/70 border border-white/12 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <h3 className="font-title text-lg sm:text-xl text-white font-black uppercase tracking-wider">
                  Acompañamiento en Propinas
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-[#95cecf] leading-relaxed flex flex-col gap-4">
                <p>
                  Las propinas en Tanzania son una tradición de gratitud hacia el equipo local de porteadores y cocineros que hacen posible la travesía. En nuestra charla técnica en Moshi te asesoramos para organizar el fondo común de manera transparente y justa para todos.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#f5f0e8]/80 mt-4 leading-relaxed">
                  <p>
                    *Sin cargos ocultos ni sorpresas en destino. Todas las tarifas del parque nacional, permisos oficiales y safaris están cubiertos en nuestra tarifa de USD 3.350.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* =========================================================================
   10. PRECIO COMPONENT (K) - Official Price USD 3.350 & Guarantee
   ========================================================================= */
const Precio: React.FC = () => {
  return (
    <section id="precio" className="py-14 sm:py-16 px-4 bg-[#022c3b] relative border-t border-[#d45e33]/20 scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-title text-xs sm:text-sm text-[#d45e33] tracking-[3px] mb-3 uppercase font-bold">
          ✦ TREKKING AL KILIMANJARO & SAFARI · 11 DÍAS ✦
        </div>
        <h2 className="font-title text-2xl md:text-4xl text-white tracking-[3px] uppercase mb-2 font-black">
          INVERSIÓN DE EXPEDICIÓN
        </h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d45e33]" />
          <span className="text-[#d45e33] text-[0.6rem]">◆</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d45e33]" />
        </div>

        <div className="mb-2">
          <div className="font-title text-6xl sm:text-8xl md:text-9xl font-black text-[#d45e33] leading-none drop-shadow-[0_0_40px_rgba(212,94,51,0.35)]">
            USD {P.officialPriceUSD}
          </div>
          <p className="text-sm sm:text-base text-[#95cecf] font-medium tracking-wider mt-3 uppercase text-balance">
            <span className="hidden sm:inline">
              Tarifa oficial por persona en base doble · Cupos reducidos · 5 al 15 de Febrero de 2027
            </span>
            <span className="inline sm:hidden">
              Tarifa oficial por persona en base doble ·
              <br />
              Cupos reducidos · 5 al 15 de Febrero de 2027
            </span>
          </p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => {
              window.open(
                `https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience%2C%20deseo%20reservar%20mi%20lugar%20para%20la%20expedici%C3%B3n%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027%20-%20Tarifa%20oficial%3A%20USD%203.350).`,
                '_blank',
                'noopener,noreferrer'
              );
            }}
            className="btn-editorial text-[12px] sm:text-sm w-full sm:w-auto shadow-md shadow-[#d45e33]/20 cursor-pointer py-3.5 px-8 flex items-center justify-center gap-2 active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>CONSULTAR DISPONIBILIDAD Y RESERVA</span>
          </button>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   11. DOSSIER COMPONENT (q) - Download Official Program PDF
   ========================================================================= */
const Dossier: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = '/docs/Birn_Experience_Kilimanjaro_2027_Dossier_Oficial.pdf';
    a.download = 'Birn_Experience_Kilimanjaro_2027_Dossier_Oficial.pdf';
    a.rel = 'noopener noreferrer';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 5000);
  };

  return (
    <section id="descargar-dossier" className="py-16 sm:py-20 bg-[#022c3b] border-t border-b border-white/10 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-[#01141c]/90 backdrop-blur-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#d45e33]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 border border-[#009ea4]/40 bg-[#009ea4]/10 text-[#009ea4] font-title text-[12px] sm:text-xs font-black tracking-[3px] px-4 py-1 rounded-full uppercase">
                ✦ DOCUMENTACIÓN OFICIAL DEL PROGRAMA ✦
              </div>
              <h2 className="font-title text-2xl sm:text-3xl text-white font-black uppercase tracking-tight">
                Descargar Dossier Completo en PDF
              </h2>
              <p className="text-[15px] sm:text-base text-[#95cecf] font-light leading-relaxed">
                Obtén de forma directa, rápida y 100% segura el archivo oficial con el detalle de las 11 jornadas.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-[15px] sm:text-xs text-white/75">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#009ea4]" />
                  <span>Verificado y seguro (sin publicidad)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-[#d45e33]" />
                  <span>Información técnica oficial del viaje</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center shrink-0 w-full lg:w-auto">
              <button
                onClick={handleDownload}
                className="btn-editorial text-[12px] sm:text-xs py-4 px-8 tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-xl active:scale-95 w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>DESCARGAR DOSSIER TÉCNICO</span>
              </button>
              {downloaded && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#2DD4BF] font-semibold animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Descarga completada correctamente</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   12. INSTAGRAM SECTION - Story Highlight & 3 Reels Elements (Prompt Brief)
   ========================================================================= */
const InstagramSection: React.FC = () => {
  const reels = [
    {
      id: "reel-1",
      title: "Comienzo del Viaje al Kilimanjaro",
      tag: "Comienzo del Viaje",
      img: "/src/assets/images/regenerated_image_1792176058741.webp",
      fallbackImg: "/assets/images/regenerated_image_1792176058741.webp",
      alt: "Comienzo del Viaje al Kilimanjaro en Marangu Gate con Birn Experience",
      views: "18.4K",
      desc: "Nuestros primeros pasos en Tanzania y el inicio de la expedición hacia la montaña más alta de África.",
      url: "https://www.instagram.com/p/DUuGddWEe9G/",
      cta: "Abrir Posteo en Instagram"
    },
    {
      id: "reel-2",
      title: "Momento de Cumbre de Todo el Grupo",
      tag: "Momento de Cumbre",
      img: "/src/assets/images/regenerated_image_1792176060316.webp",
      fallbackImg: "/assets/images/regenerated_image_1792176060316.webp",
      alt: "Momento de Cumbre de Todo el Grupo en Uhuru Peak (5.895 m) con Birn Experience",
      views: "34.1K",
      desc: "La emoción de todo el grupo al alcanzar juntos la cima del Kilimanjaro en Uhuru Peak (5.895 m).",
      url: "https://www.instagram.com/p/DU5gMFujhm3/",
      cta: "Abrir Reel en Instagram"
    },
    {
      id: "reel-3",
      title: "Safari Salvaje en Tarangire & Ngorongoro",
      tag: "Safari en el Viaje",
      img: "/src/assets/images/regenerated_image_1792176061518.webp",
      fallbackImg: "/assets/images/regenerated_image_1792176061518.webp",
      alt: "Safari Salvaje 4x4 en Tarangire & Cráter Ngorongoro con Birn Experience",
      views: "22.6K",
      desc: "Viviendo la experiencia inolvidable del safari 4x4 entre baobabs, elefantes y fauna africana.",
      url: "https://www.instagram.com/p/DWAFT_4kchU/",
      cta: "Abrir Reel en Instagram"
    }
  ];

  return (
    <section className="py-20 bg-[#01161e] border-t border-b border-white/10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 border border-[#d45e33]/40 bg-[#d45e33]/10 text-[#d45e33] font-title text-[12px] sm:text-xs font-black tracking-[3px] px-5 py-1.5 rounded-full uppercase mb-4">
            ✦ NUESTRA COMUNIDAD EN REDES ✦
          </div>
          <h2 className="font-title text-3xl sm:text-4xl text-white font-black uppercase tracking-tight mb-3">
            Historias & Reels en Instagram
          </h2>
          <p className="text-sm sm:text-base text-[#95cecf] font-light max-w-xl mx-auto">
            Sigue nuestras expediciones reales en tiempo real. Al hacer clic accederás al contenido completo en nuestra cuenta oficial de Instagram.
          </p>
        </div>

        {/* Highlight Story + 3 Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Featured Story */}
          <a
            href={P.contact.instagramHighlight}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl overflow-hidden border-2 border-[#d45e33] p-1 bg-gradient-to-b from-[#d45e33] to-[#009ea4] shadow-xl hover:scale-[1.02] transition-transform flex flex-col justify-between"
          >
            <div className="relative rounded-[22px] overflow-hidden h-full flex flex-col justify-between p-5 bg-[#01141c]">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url('/assets/images/masai_village.jpg')` }} />
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#d45e33] text-white font-title text-[10px] font-black uppercase tracking-wider">
                  HISTORIA DESTACADA
                </span>
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div className="relative z-10 mt-28">
                <div className="w-12 h-12 rounded-full border-2 border-white/80 p-0.5 mb-2 mx-auto">
                  <img src="/images/logo1.png" alt="Birn" className="w-full h-full object-contain rounded-full bg-[#01141c]" />
                </div>
                <h4 className="font-title text-base text-white text-center font-bold uppercase">
                  @birnexperience
                </h4>
                <p className="text-xs text-[#95cecf] text-center mt-1">
                  Ver historia completa en Instagram ↗
                </p>
              </div>
            </div>
          </a>

          {/* 3 Reels elements */}
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${reel.title} - ${reel.tag}`}
              className="group relative rounded-3xl overflow-hidden border border-white/15 bg-[#01141c]/90 shadow-xl hover:border-[#009ea4] transition-all hover:-translate-y-1 flex flex-col justify-between h-[360px]"
            >
              {/* Media image container with <img> and referrerPolicy */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={reel.img}
                  alt={reel.alt}
                  title={reel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + reel.fallbackImg) {
                      target.src = reel.fallbackImg;
                    }
                  }}
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#01141c] via-[#01141c]/40 to-transparent pointer-events-none"
                data-image={reel.img}
                data-title={reel.title}
                data-alt={reel.alt}
              />

              {/* Reel Header */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#95cecf] text-[10px] font-bold uppercase border border-white/10">
                  {reel.tag}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-white/90 bg-black/50 px-2 py-0.5 rounded-full">
                  <Play className="w-3 h-3 fill-white" />
                  {reel.views}
                </span>
              </div>

              {/* Reel Footer info */}
              <div className="relative z-10 p-4 space-y-1">
                <p className="text-xs text-[#95cecf] line-clamp-2 leading-relaxed font-light">
                  {reel.desc}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] text-[#e4a381] font-semibold">
                  <ExternalLink className="w-3 h-3" />
                  <span>{reel.cta}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   13. PREPARACIÓN & PREGUNTAS FRECUENTES (J) - Columns 01,02,03 & Accordion
   ========================================================================= */
const PreparacionFAQ: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="preparacion" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#022c3b] border-t border-white/10 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 border border-[#009ea4]/40 bg-[#009ea4]/10 text-[#009ea4] font-title text-[12px] sm:text-xs font-black tracking-[3px] px-5 py-1.5 rounded-full uppercase mb-4">
            ✦ GUÍA TÉCNICA & PREPARACIÓN ✦
          </div>
          <h2 className="font-title text-3xl sm:text-5xl text-white tracking-tight uppercase mb-3">
            <span className="sm:hidden">
              Preparación
              <br />
              & Preguntas
              <br />
              Frecuentes
            </span>
            <span className="hidden sm:inline">
              Preparación
              <br />
              & Preguntas Frecuentes
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#95cecf] font-light max-w-xl mx-auto text-balance">
            Todo lo necesario para llegar en óptimas condiciones físicas, con el equipamiento adecuado y con absoluta tranquilidad.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d45e33]" />
          <span className="text-[#d45e33] text-[0.6rem]">◆</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d45e33]" />
        </div>

        {/* 3 Preparation Columns (01, 02, 03) matching reference */}
        <div className="mb-24">
          <div className="text-xs uppercase tracking-[0.25em] text-[#d45e33] font-title font-bold text-center mb-8">
            RECOMENDACIONES ESENCIALES PARA LA EXPEDICIÓN AL KILIMANJARO
          </div>

          <div className="border-t border-b border-white/15 py-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {P.recommendations.map((rec, idx) => (
              <div
                key={rec.title}
                className="py-8 md:py-2 px-4 sm:px-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <div className="font-title text-3xl sm:text-4xl font-black text-[#d45e33] mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="font-title text-base sm:text-lg text-white font-black uppercase tracking-wider mb-4">
                    {rec.title}
                  </h3>
                  <ul className="space-y-3.5">
                    {rec.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#f5f0e8]/90 font-normal leading-relaxed">
                        <span className="text-[#009ea4] mt-1 shrink-0 text-xs font-bold">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section matching reference */}
        <div id="preguntas" className="max-w-3xl mx-auto scroll-mt-28 pt-4">
          <div id="faq" className="scroll-mt-28">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d45e33] font-title font-bold mb-2">
                RESOLVEMOS TUS DUDAS
              </div>
              <h3 className="font-title text-2xl sm:text-3xl text-white font-black uppercase tracking-wide">
                Preguntas Frecuentes
              </h3>
            </div>

            <div className="space-y-4">
              {P.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/12 bg-[#01141c]/80 backdrop-blur-md overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d45e33]"
                    >
                      <span className="font-title text-sm sm:text-base text-white font-bold tracking-wide">
                        {faq.q}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#d45e33]/20 text-[#d45e33]' : 'text-white/60'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-6 sm:px-6 pt-2 text-sm sm:text-base text-[#95cecf] font-light leading-relaxed border-t border-white/5">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   14. FOOTER & CONTACTO (Y) - 100% Matching Layout & Details
   ========================================================================= */
const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-[#01161e] text-[#a0b3ba] border-t border-white/10 relative">
      {/* Pre-footer Call to Action */}
      <div className="border-b border-white/10 py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-[#022c3b]/60 to-transparent">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="micro-label !text-[12px] sm:!text-[0.725rem] mb-2 block">
            5 AL 15 DE FEBRERO 2027 · GRUPOS REDUCIDOS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-black uppercase tracking-tight mb-4">
            <span className="hidden sm:inline">
              ¿LISTO PARA CORONAR
              <br />
              EL TECHO DE ÁFRICA?
            </span>
            <span className="inline sm:hidden">
              ¿Listo para
              <br />
              coronar el Techo
              <br />
              de África?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#c8d6dc] max-w-2xl mx-auto mb-8 leading-relaxed">
            <span className="hidden sm:inline">
              Escríbenos para recibir asesoramiento directo de nosotros y condiciones de reserva.
            </span>
            <span className="inline sm:hidden">
              Escríbenos para recibir asesoramiento de nuestro equipo
              <br />
              y condiciones de reserva.
            </span>
          </p>
          <div className="flex items-center justify-center w-full sm:w-auto">
            <button
              onClick={() => {
                window.open(
                  `https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience!%20Deseo%20consultar%20informaci%C3%B3n%20sobre%20la%20expedici%C3%B3n%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027).`,
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
              className="btn-editorial text-[12px] sm:text-xs w-full sm:w-auto px-8 py-4 tracking-wider cursor-pointer shadow-md shadow-[#d45e33]/15 flex items-center justify-center gap-2.5 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Solicitar Información y Disponibilidad</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo1.png"
                alt="Birn Experience"
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 object-contain drop-shadow-lg"
              />
              <div>
                <span className="font-display text-[12px] sm:text-lg tracking-wider text-white font-extrabold uppercase block leading-tight">
                  BIRN EXPERIENCE
                </span>
                <span className="text-[12px] sm:text-[10px] uppercase tracking-[0.2em] text-[#95cecf]">
                  Expediciones de Montaña & Aventura
                </span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#9fb1b8] leading-relaxed max-w-sm font-light">
              Nosotros creamos experiencias de montaña auténticas, seguras y humanas en los escenarios naturales más sobrecogedores del mundo, bajo la coordinación de Ricardo Birn y nuestro equipo de guías.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={P.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#d45e33] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={P.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#d45e33] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${P.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-title text-sm text-white font-bold tracking-wider uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#itinerario" className="hover:text-white transition-colors">
                  Itinerario Día por Día
                </a>
              </li>
              <li>
                <a href="#mapa-travesia" className="hover:text-white transition-colors">
                  Cartografía de la Travesía
                </a>
              </li>
              <li>
                <a href="#perfil-altura" className="hover:text-white transition-colors">
                  Perfil de Altitud
                </a>
              </li>
              <li>
                <a href="#inclusiones" className="hover:text-white transition-colors">
                  Servicios Incluidos
                </a>
              </li>
              <li>
                <a href="#precio" className="hover:text-white transition-colors">
                  Tarifa Oficial USD 3.350
                </a>
              </li>
              <li>
                <a href="#preguntas" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-title text-sm text-white font-bold tracking-wider uppercase mb-4">
              Contacto Directo
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${P.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {P.contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d45e33] shrink-0" />
                <a
                  href={`mailto:${P.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {P.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#009ea4] shrink-0 mt-0.5" />
                <span>Córdoba, Argentina · Salidas Internacionales</span>
              </li>
            </ul>
            <div className="pt-2">
              <span className="text-xs text-[#95cecf] block font-medium">
                Atención personalizada garantizada en menos de 24 hs.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d939c] gap-4">
          <div>
            © {new Date().getFullYear()} Birn Experience. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Ruta Marangu · Tanzania</span>
            <span>·</span>
            <span>Tarifa Oficial USD 3.350</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* =========================================================================
   15. FLOATING ACTION BUTTONS (X) - 100% Matching WhatsApp & Scroll Top
   ========================================================================= */
const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Volver arriba"
          className="w-11 h-11 rounded-full bg-[#01141c]/90 text-white border border-white/20 shadow-lg backdrop-blur-md flex items-center justify-center hover:bg-[#d45e33] transition-colors cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp Floating Pill Button */}
      <button
        onClick={() => {
          window.open(
            `https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience!%20Quiero%20consultar%20disponibilidad%20y%20ficha%20t%C3%A9cnica%20para%20la%20expedici%C3%B3n%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027).`,
            '_blank',
            'noopener,noreferrer'
          );
        }}
        aria-label="Consultar por WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <WhatsAppIcon className="w-6 h-6 fill-white" />
      </button>
    </div>
  );
};

/* =========================================================================
   MASTER APPLICATION COMPONENT (oe) - 100% Matching Structure
   ========================================================================= */
export default function App() {
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | null>(null);

  const handleSelectDay = (day: number) => {
    setSelectedDayNumber(day);
  };

  const handleScrollToItinerary = () => {
    const el = document.getElementById('itinerario');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#022c3b] text-[#f5f0e8] font-sans antialiased overflow-x-hidden selection:bg-[#d45e33] selection:text-white">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="flex-1 w-full">
        {/* Hero */}
        <Hero onScrollToItinerary={handleScrollToItinerary} />

        {/* Cifras / Key Stats */}
        <Cifras />

        {/* Cartografía / Expedition Map */}
        <ExpeditionMapSection onSelectDay={handleSelectDay} />

        {/* Altitude Profile */}
        <AltitudeProfileSection />

        {/* Day-by-Day Itinerary Carousel */}
        <Itinerario selectedDayNumber={selectedDayNumber} />

        {/* Coordinación y Equipo / Nosotros */}
        <CoordinadorNosotros />

        {/* Inclusiones & No Incluye */}
        <Inclusiones />

        {/* Precio Oficial USD 3.350 */}
        <Precio />

        {/* Dossier Download */}
        <Dossier />

        {/* Instagram Reels & Story Highlight */}
        <InstagramSection />

        {/* Preparación & FAQ Accordion */}
        <PreparacionFAQ />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Floating Action Buttons */}
      <FloatingActions />
    </div>
  );
}
