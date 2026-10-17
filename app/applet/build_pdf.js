import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

async function generateDossier() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const cDarkTeal = rgb(0.01, 0.17, 0.23); // #022c3b
  const cOrange = rgb(0.83, 0.37, 0.20);  // #d45e33
  const cLightTeal = rgb(0.58, 0.81, 0.81); // #95cecf
  const cWhite = rgb(1, 1, 1);
  const cGray = rgb(0.4, 0.4, 0.4);
  const cDark = rgb(0.1, 0.1, 0.1);
  const cCyan = rgb(0, 0.62, 0.64); // #009ea4
  const cBoxBg = rgb(0.96, 0.98, 0.98);

  const pageWidth = 595.28;
  const pageHeight = 841.89;

  // Helper for adding footer to pages 2-6
  const addFooter = (page, pageNum) => {
    page.drawRectangle({
      x: 35,
      y: 35,
      width: pageWidth - 70,
      height: 1,
      color: rgb(0.85, 0.85, 0.85)
    });
    page.drawText('BIRN EXPERIENCE', {
      x: 35,
      y: 22,
      size: 8,
      font: fontBold,
      color: cOrange
    });
    page.drawText('NATURALEZA - CULTURA - AVENTURA', {
      x: 130,
      y: 22,
      size: 7,
      font: fontRegular,
      color: cGray
    });
    page.drawText(`BIRN EXPERIENCE | Kilimanjaro 2027 - ${pageNum}`, {
      x: pageWidth - 200,
      y: 22,
      size: 7,
      font: fontRegular,
      color: cGray
    });
  };

  const addHeader = (page, title, subtitle) => {
    page.drawText(title, {
      x: 35,
      y: pageHeight - 45,
      size: 16,
      font: fontBold,
      color: cDarkTeal
    });
    if (subtitle) {
      page.drawText(subtitle, {
        x: 35,
        y: pageHeight - 60,
        size: 9,
        font: fontBold,
        color: cCyan
      });
    }
    // Tagline top right
    page.drawText('MONTANAS QUE INSPIRAN', {
      x: pageWidth - 165,
      y: pageHeight - 40,
      size: 7,
      font: fontBold,
      color: cGray
    });
    page.drawText('VIAJES QUE TRANSFORMAN', {
      x: pageWidth - 165,
      y: pageHeight - 50,
      size: 7,
      font: fontRegular,
      color: cGray
    });
    page.drawRectangle({
      x: 35,
      y: pageHeight - 68,
      width: pageWidth - 70,
      height: 1.5,
      color: cOrange
    });
  };

  // ==========================================
  // PAGE 1: COVER
  // ==========================================
  const page1 = doc.addPage([pageWidth, pageHeight]);
  
  page1.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: cDarkTeal
  });

  try {
    const imgPath = path.resolve('public/assets/images/hero_kilimanjaro.jpg');
    if (fs.existsSync(imgPath)) {
      const imgBytes = fs.readFileSync(imgPath);
      const img = await doc.embedJpg(imgBytes);
      page1.drawImage(img, {
        x: 35,
        y: 190,
        width: pageWidth - 70,
        height: 400
      });
    }
  } catch (err) {
    console.error('Image embed error:', err);
  }

  page1.drawText('BIRN EXPERIENCE', {
    x: 45,
    y: pageHeight - 80,
    size: 22,
    font: fontBold,
    color: cOrange
  });
  page1.drawText('EXPEDICIONES OFICIALES - AFRICA ORIENTAL', {
    x: 45,
    y: pageHeight - 100,
    size: 10,
    font: fontRegular,
    color: cLightTeal
  });

  page1.drawText('KILIMANJARO', {
    x: 45,
    y: 135,
    size: 38,
    font: fontBold,
    color: cOrange
  });
  page1.drawText('SEPTIEMBRE 2027 - TANZANIA', {
    x: 45,
    y: 105,
    size: 16,
    font: fontBold,
    color: cWhite
  });
  page1.drawText('Ruta Marangu - Cumbre Uhuru Peak (5.895 m) - Safaris Tarangire & Ngorongoro', {
    x: 45,
    y: 80,
    size: 9.5,
    font: fontRegular,
    color: cLightTeal
  });

  page1.drawText('MONTANAS QUE INSPIRAN - VIAJES QUE TRANSFORMAN', {
    x: 45,
    y: 45,
    size: 9,
    font: fontBold,
    color: cWhite
  });

  // ==========================================
  // PAGE 2: ITINERARIO DIAS 1 A 3
  // ==========================================
  const page2 = doc.addPage([pageWidth, pageHeight]);
  addHeader(page2, 'KILIMANJARO - ITINERARIO', 'DIAS 1 A 3');
  addFooter(page2, 2);

  page2.drawRectangle({
    x: 35,
    y: pageHeight - 130,
    width: pageWidth - 70,
    height: 52,
    color: cBoxBg,
    borderColor: cCyan,
    borderWidth: 1
  });
  page2.drawText('KILIMANJARO: "TECHO DE AFRICA"', {
    x: 45,
    y: pageHeight - 90,
    size: 9,
    font: fontBold,
    color: cDarkTeal
  });
  page2.drawText('La Ruta Marangu tambien se conoce como "Coca Cola" o ruta turistica. Es la ruta mas segura y clasica a la cumbre.', {
    x: 45,
    y: pageHeight - 104,
    size: 8,
    font: fontRegular,
    color: cDark
  });
  page2.drawText('Unica que ofrece alojamiento en cabanas acondicionadas con literas en cada campamento, banos y servicios.', {
    x: 45,
    y: pageHeight - 116,
    size: 8,
    font: fontRegular,
    color: cDark
  });

  let yPos = pageHeight - 160;
  page2.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page2.drawText('DIA 1 - 15 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 32;
  page2.drawText('RECOGIDA EN EL AEROPUERTO DE KILIMANJARO -> MOSHI', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 14;
  page2.drawText('Alojamiento: Panama Garden Resort, Moshi. Traslado: Aeropuerto - Moshi.', { x: 35, y: yPos, size: 8.5, font: fontOblique, color: cOrange });
  yPos -= 16;
  page2.drawText('Llegada al Aeropuerto Internacional de Kilimanjaro (JRO), donde el equipo de Birn Experience recibira al grupo para el', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 12;
  page2.drawText('traslado privado hacia el hotel en Moshi. Reunion grupal y charla informativa de expedicion junto al equipo de guias.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });

  yPos -= 30;
  page2.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page2.drawText('DIA 2 - 16 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 32;
  page2.drawText('PUERTA MARANGU (1.800 M) -> MANDARA HUT (2.743 M)', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 14;
  page2.drawText('Alojamiento: Mandara Hut (cabanas de madera). Regimen: Pension completa.', { x: 35, y: yPos, size: 8.5, font: fontOblique, color: cOrange });
  yPos -= 16;
  page2.drawText('Al mediodia registro oficial en el Parque Nacional Kilimanjaro y comienzo del trekking a traves de la densa selva', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 12;
  page2.drawText('tropical humeda, avistando aves exoticas y monos colobos blancos y negros hasta llegar a Mandara Hut.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 16;
  page2.drawRectangle({ x: 35, y: yPos - 18, width: pageWidth - 70, height: 22, color: cBoxBg });
  page2.drawText('DISTANCIA: 8 km    |    ASCENSO: 915 m    |    TIEMPO: 4 a 5 h    |    ALTITUD FINAL: 2.743 m', { x: 45, y: yPos - 12, size: 8, font: fontBold, color: cDarkTeal });

  yPos -= 40;
  page2.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page2.drawText('DIA 3 - 17 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 32;
  page2.drawText('MANDARA HUT (2.743 M) -> HOROMBO HUT (3.720 M)', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 14;
  page2.drawText('Alojamiento: Horombo Hut (las cabanas mas pintorescas del macizo).', { x: 35, y: yPos, size: 8.5, font: fontOblique, color: cOrange });
  yPos -= 16;
  page2.drawText('Marcha saliendo de la selva para ingresar en el paramo alpino de arbustos gigantes y senecios. Se abren vistas', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 12;
  page2.drawText('magnificas a los picos de Mawenzi y Kibo. Llegada alrededor de las 15:00 h para hidratacion y descanso.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 16;
  page2.drawRectangle({ x: 35, y: yPos - 18, width: pageWidth - 70, height: 22, color: cBoxBg });
  page2.drawText('DISTANCIA: 11 km    |    ASCENSO: 977 m    |    TIEMPO: 5 a 6 h    |    ALTITUD FINAL: 3.720 m', { x: 45, y: yPos - 12, size: 8, font: fontBold, color: cDarkTeal });

  // ==========================================
  // PAGE 3: ITINERARIO DIAS 4 A 7
  // ==========================================
  const page3 = doc.addPage([pageWidth, pageHeight]);
  addHeader(page3, 'KILIMANJARO - ITINERARIO', 'DIAS 4 A 7 - ACLIMATACION Y ATAQUE A CUMBRE');
  addFooter(page3, 3);

  yPos = pageHeight - 95;

  page3.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page3.drawText('DIA 4 - 18 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page3.drawText('HOROMBO HUT (3.720 M) A ZEBRA ROCKS (4.060 M) - ACLIMATACION', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 13;
  page3.drawText('Alojamiento: Horombo Hut. Excursion activa "sube alto, duerme bajo".', { x: 35, y: yPos, size: 8, font: fontOblique, color: cOrange });
  yPos -= 13;
  page3.drawText('Caminata fundamental para estimular la produccion de globulos rojos hacia las formaciones rayadas de Zebra Rocks.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 15;
  page3.drawRectangle({ x: 35, y: yPos - 16, width: pageWidth - 70, height: 18, color: cBoxBg });
  page3.drawText('GANANCIA / PERDIDA: 380 m   |   PUNTO ALTO: 4.060 m   |   OBJETIVO: Aclimatacion Fisiologica', { x: 45, y: yPos - 11, size: 7.5, font: fontBold, color: cDarkTeal });

  yPos -= 30;
  page3.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page3.drawText('DIA 5 - 19 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page3.drawText('HOROMBO HUT (3.720 M) A KIBO HUT (4.750 M)', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 13;
  page3.drawText('Alojamiento: Kibo Hut (refugio de piedra a los pies del cono de cumbre).', { x: 35, y: yPos, size: 8, font: fontOblique, color: cOrange });
  yPos -= 13;
  page3.drawText('Cruce del desierto alpino The Saddle entre Mawenzi y Kibo. Cena temprana a las 17:30 h y descanso antes del ataque.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 15;
  page3.drawRectangle({ x: 35, y: yPos - 16, width: pageWidth - 70, height: 18, color: cBoxBg });
  page3.drawText('DISTANCIA: 9 km   |   ASCENSO: 1.030 m   |   TIEMPO: 6 h   |   ALTITUD FINAL: 4.750 m', { x: 45, y: yPos - 11, size: 7.5, font: fontBold, color: cDarkTeal });

  yPos -= 30;
  page3.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page3.drawText('DIA 6 - 20 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page3.drawText('CAMPAMENTO KIBO (4.750 M) A PIEDRA DE HINDI (ACLIMATACION)', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 13;
  page3.drawText('Alojamiento: Kibo Hut. Paseo de aclimatacion ganando 300 m de desnivel.', { x: 35, y: yPos, size: 8, font: fontOblique, color: cOrange });
  yPos -= 13;
  page3.drawText('Descanso activo, hidratacion profunda, cena temprana y preparacion de linternas frontales y abrigo.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 15;
  page3.drawRectangle({ x: 35, y: yPos - 16, width: pageWidth - 70, height: 18, color: cBoxBg });
  page3.drawText('DESNIVEL: 300 m   |   CAMPAMENTO BASE: 4.750 m   |   CENA: 18:00   |   SALIDA CUMBRE: Medianoche', { x: 45, y: yPos - 11, size: 7.5, font: fontBold, color: cDarkTeal });

  yPos -= 30;
  page3.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cOrange });
  page3.drawText('DIA 7 - 21 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page3.drawText('CUMBRE UHURU PEAK (5.895 M) - TECHO DE AFRICA -> HOROMBO', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cOrange });
  yPos -= 13;
  page3.drawText('Noche en Horombo Hut tras descender de la cima. Jornada cumbre de la expedicion.', { x: 35, y: yPos, size: 8, font: fontOblique, color: cDarkTeal });
  yPos -= 13;
  page3.drawText('Salida a medianoche a paso pole pole por la ladera volcanica hasta Gillman\'s Point (5.681 m) al amanecer. Coronacion', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 12;
  page3.drawText('de Uhuru Peak (5.895 m) junto a los glaciares ecuatoriales y descenso a Horombo Hut para descansar.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 15;
  page3.drawRectangle({ x: 35, y: yPos - 16, width: pageWidth - 70, height: 18, color: cBoxBg });
  page3.drawText('ASCENSO: 1.145 m   |   DESCENSO: 2.175 m   |   TIEMPO A CIMA: 7 h   |   CUMBRE: 5.895 m', { x: 45, y: yPos - 11, size: 7.5, font: fontBold, color: cOrange });

  // ==========================================
  // PAGE 4: ITINERARIO DIAS 8 A 11
  // ==========================================
  const page4 = doc.addPage([pageWidth, pageHeight]);
  addHeader(page4, 'TANZANIA - SAFARIS & CULTURA', 'DIAS 8 A 11 - DESCENSO, TARANGIRE, NGORONGORO Y REGRESO');
  addFooter(page4, 4);

  yPos = pageHeight - 95;

  page4.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page4.drawText('DIA 8 - 22 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page4.drawText('HOROMBO HUT (3.720 M) -> PUERTA DE MARANGU (1.800 M) -> ARUSHA', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 13;
  page4.drawText('Alojamiento: Green Mountain Hotel, Arusha. Entrega de Certificados Oficiales.', { x: 35, y: yPos, size: 8, font: fontOblique, color: cOrange });
  yPos -= 13;
  page4.drawText('Descenso a traves del bosque nublado hasta Marangu Gate. Almuerzo de festejo, despedida del equipo local de', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 12;
  page4.drawText('porteadores y traslado en vehiculo privado hacia el hotel en Arusha para las merecidas duchas calientes.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 15;
  page4.drawRectangle({ x: 35, y: yPos - 16, width: pageWidth - 70, height: 18, color: cBoxBg });
  page4.drawText('DISTANCIA: 19 km   |   DESCENSO: 1.920 m   |   TIEMPO: 6 h   |   TRASLADO: 3 h a Arusha', { x: 45, y: yPos - 11, size: 7.5, font: fontBold, color: cDarkTeal });

  yPos -= 30;
  page4.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page4.drawText('DIA 9 - 23 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page4.drawText('PARQUE NACIONAL DE TARANGIRE & ALDEA TRADICIONAL MASAI', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 13;
  page4.drawText('Cena y Alojamiento: Farm of Dreams Lodge, Karatu. Safari 4x4 y encuentro cultural.', { x: 35, y: yPos, size: 8, font: fontOblique, color: cOrange });
  yPos -= 13;
  page4.drawText('Safari entre centenarios arboles baobab y las manadas de elefantes mas grandes de Tanzania. Visita a una boma Masai', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 12;
  page4.drawText('para conocer sus costumbres ancestrales, bailes tradicionales y vida comunitaria.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 15;
  page4.drawRectangle({ x: 35, y: yPos - 16, width: pageWidth - 70, height: 18, color: cBoxBg });
  page4.drawText('DISTANCIA: 110 km   |   TRASLADO: 2 h 30 min   |   ACTIVIDAD: Safari 4x4 + Experiencia Cultural Masai', { x: 45, y: yPos - 11, size: 7.5, font: fontBold, color: cDarkTeal });

  yPos -= 30;
  page4.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page4.drawText('DIA 10 - 24 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page4.drawText('CALDERA DEL CRATER NGORONGORO -> RETORNO A ARUSHA', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 13;
  page4.drawText('Alojamiento: Green Mountain Hotel, Arusha. La mayor densidad de vida silvestre del planeta.', { x: 35, y: yPos, size: 8, font: fontOblique, color: cOrange });
  yPos -= 13;
  page4.drawText('Descenso de 600 metros al interior del crater: avistamiento de rinocerontes negros, leones, hipopotamos y flamencos.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 12;
  page4.drawText('Almuerzo picnic frente a la laguna de hipopotamos y regreso a Arusha por la tarde.', { x: 35, y: yPos, size: 8, font: fontRegular, color: cDark });
  yPos -= 15;
  page4.drawRectangle({ x: 35, y: yPos - 16, width: pageWidth - 70, height: 18, color: cBoxBg });
  page4.drawText('DESCENSO AL CRATER: 600 m   |   ACTIVIDAD: Safari completo en crater   |   RETORNO: Arusha', { x: 45, y: yPos - 11, size: 7.5, font: fontBold, color: cDarkTeal });

  yPos -= 30;
  page4.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: cCyan });
  page4.drawText('DIA 11 - 25 SEPTIEMBRE', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;
  page4.drawText('TRASLADO AL AEROPUERTO INTERNACIONAL DE KILIMANJARO (JRO)', { x: 35, y: yPos, size: 9.5, font: fontBold, color: cDarkTeal });
  yPos -= 13;
  page4.drawText('Desayuno en el hotel y traslado privado al aeropuerto para vuelos internacionales. Fin del viaje.', { x: 35, y: yPos, size: 8, font: fontOblique, color: cOrange });

  // ==========================================
  // PAGE 5: SERVICIOS KILIMANJARO (ASCENSO)
  // ==========================================
  const page5 = doc.addPage([pageWidth, pageHeight]);
  addHeader(page5, 'KILIMANJARO - SERVICIOS', 'INFORMACION DEL ASCENSO');
  addFooter(page5, 5);

  yPos = pageHeight - 95;
  page5.drawRectangle({ x: 35, y: yPos - 18, width: 160, height: 20, color: cDarkTeal });
  page5.drawText('SERVICIOS INCLUIDOS', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;

  const incKili = [
    'Recogida y regreso al aeropuerto de Kilimanjaro.',
    'Transporte privado desde el hotel hasta la puerta de los Parques y regreso al hotel tras el ascenso.',
    '2 noches de hotel (la noche anterior y posterior a la subida), con desayuno incluido.',
    'Guias calificados que hablan espanol.',
    'Alojamiento en las cabanas de cada campamento oficial de la Ruta Marangu.',
    'Tickets de ingreso y permisos oficiales al Parque Nacional Kilimanjaro.',
    'Salarios justos y regulados para guias, cocineros y porteadores.',
    'Certificado del Parque Nacional del Kilimanjaro por su exitoso intento de cumbre.',
    'Servicios de evacuacion y rescate terrestre del equipo del Parque Kilimanjaro.',
    'Desayuno, almuerzo y cena completos, asi como bebidas calientes en la montana.',
    'Guias de montana capacitados, guias asistentes, porteadores y cocineros profesionales.',
    'Bebidas calientes y agua caliente para lavado diario provistas en la montana.',
    'Equipo portatil complementario de oxigeno y primeros auxilios (en caso de emergencia).',
    '3 a 4 litros de agua tratada (por escalador) provistos diariamente durante el ascenso.'
  ];

  for (const item of incKili) {
    page5.drawText('[+]', { x: 40, y: yPos, size: 8, font: fontBold, color: cCyan });
    page5.drawText(item, { x: 58, y: yPos, size: 8.5, font: fontRegular, color: cDark });
    yPos -= 17;
  }

  yPos -= 15;
  page5.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: rgb(0.2, 0.2, 0.2) });
  page5.drawText('NO INCLUIDO', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;

  const noIncKili = [
    'Articulos de caracter personal.',
    'Propinas para guias, porteadores y cocineros (sugerencia promedio: USD 200 por montanista).',
    'Snacks y medicina personal.'
  ];

  for (const item of noIncKili) {
    page5.drawText('[-]', { x: 40, y: yPos, size: 8, font: fontBold, color: cOrange });
    page5.drawText(item, { x: 58, y: yPos, size: 8.5, font: fontRegular, color: cDark });
    yPos -= 17;
  }

  // ==========================================
  // PAGE 6: SERVICIOS TANZANIA (SAFARI)
  // ==========================================
  const page6 = doc.addPage([pageWidth, pageHeight]);
  addHeader(page6, 'TANZANIA - SERVICIOS', 'INFORMACION DEL SAFARI');
  addFooter(page6, 6);

  yPos = pageHeight - 95;
  page6.drawRectangle({ x: 35, y: yPos - 18, width: 160, height: 20, color: cDarkTeal });
  page6.drawText('SERVICIOS INCLUIDOS', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;

  const incSafari = [
    'Todos los aranceles de entrada al Parque Nacional Tarangire y Crater de Ngorongoro en el circuito norte.',
    '2 noches de hotel en Arusha, la noche antes y despues del safari con desayuno incluido.',
    'Comida para todo el recorrido: desayuno y almuerzo en safari.',
    'Desayuno, almuerzo y cena incluidos en alojamiento en Farm of Dreams Lodge (Karatu).',
    'Visita cultural a la comunidad tradicional / pueblo Masai.',
    'Vehiculo privado 4x4 todoterreno con escotilla de techo elevable para vistas panoramicas y fotos 360.',
    'Guia de safari experimentado de habla hispana.',
    'Regreso y traslados al aeropuerto.',
    'Agua potable provista para todo el safari.'
  ];

  for (const item of incSafari) {
    page6.drawText('[+]', { x: 40, y: yPos, size: 8, font: fontBold, color: cCyan });
    page6.drawText(item, { x: 58, y: yPos, size: 8.5, font: fontRegular, color: cDark });
    yPos -= 18;
  }

  yPos -= 20;
  page6.drawRectangle({ x: 35, y: yPos - 18, width: 140, height: 20, color: rgb(0.2, 0.2, 0.2) });
  page6.drawText('NO INCLUIDO', { x: 42, y: yPos - 13, size: 9, font: fontBold, color: cWhite });
  yPos -= 30;

  const noIncSafari = [
    'Tarifas aereas internacionales.',
    'Visa de ingreso a Tanzania: US$ 50 por persona al arribo.',
    'Seguro de viaje personal / asistencia medica.',
    'Todo lo no especificado explicitamente en los servicios incluidos.',
    'Propinas para el guia y conductor de safari (USD 10 por dia por cliente).'
  ];

  for (const item of noIncSafari) {
    page6.drawText('[-]', { x: 40, y: yPos, size: 8, font: fontBold, color: cOrange });
    page6.drawText(item, { x: 58, y: yPos, size: 8.5, font: fontRegular, color: cDark });
    yPos -= 18;
  }

  const pdfBytes = await doc.save();

  const outPathPublic = path.resolve('public/docs/Birn_Experience_Kilimanjaro_2027_Dossier_Oficial.pdf');
  const outPathDist = path.resolve('dist/docs/Birn_Experience_Kilimanjaro_2027_Dossier_Oficial.pdf');

  fs.mkdirSync(path.dirname(outPathPublic), { recursive: true });
  fs.writeFileSync(outPathPublic, pdfBytes);

  fs.mkdirSync(path.dirname(outPathDist), { recursive: true });
  fs.writeFileSync(outPathDist, pdfBytes);

  console.log(`Successfully generated official dossier PDF (${pdfBytes.length} bytes) with 6 pages!`);
}

generateDossier().catch(console.error);
