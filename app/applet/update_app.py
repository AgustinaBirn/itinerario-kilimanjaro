with open('src/App.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update WhatsApp CTA messages to be short and clear, without any mention of "ficha técnica"
code = code.replace(
    'Hola%20Birn%20Experience%2C%20quiero%20consultar%20disponibilidad%20y%20detalles%20de%20la%20expedici%C3%B3n%20al%20Kilimanjaro.',
    'Hola%20Birn%20Experience%2C%20quiero%20consultar%20sobre%20el%20viaje%20al%20Kilimanjaro.'
)

code = code.replace(
    'Hola%20Birn%20Experience%2C%20deseo%20reservar%20mi%20lugar%20para%20el%20viaje%20de%20Trekking%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027%20-%20Tarifa%20oficial%20USD%203.350).',
    'Hola%20Birn%20Experience%2C%20quiero%20consultar%20para%20reservar%20mi%20lugar%20al%20Kilimanjaro.'
)

code = code.replace(
    'Hola%20Birn%20Experience%2C%20deseo%20reservar%20mi%20lugar%20para%20la%20expedici%C3%B3n%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027%20-%20Tarifa%20oficial%3A%20USD%203.350).',
    'Hola%20Birn%20Experience%2C%20deseo%20reservar%20mi%20lugar%20para%20el%20viaje%20al%20Kilimanjaro.'
)

code = code.replace(
    'Hola%20Birn%20Experience!%20Deseo%20consultar%20informaci%C3%B3n%20sobre%20la%20expedici%C3%B3n%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027).',
    'Hola%20Birn%20Experience%2C%20tengo%20una%20consulta%20sobre%20el%20viaje%20al%20Kilimanjaro.'
)

code = code.replace(
    'Hola%20Birn%20Experience!%20Quiero%20consultar%20disponibilidad%20y%20ficha%20t%C3%A9cnica%20para%20la%20expedici%C3%B3n%20al%20Kilimanjaro%20de%2011%20d%C3%ADas%20(5%20al%2015%20de%20Febrero%20de%202027).',
    'Hola%20Birn%20Experience%2C%20quiero%20consultar%20por%20la%20expedici%C3%B3n%20al%20Kilimanjaro.'
)

code = code.replace(
    'href={`https://wa.me/${P.contact.whatsappNumber}`}',
    'href={`https://wa.me/${P.contact.whatsappNumber}?text=Hola%20Birn%20Experience%2C%20quiero%20consultar%20sobre%20el%20viaje%20al%20Kilimanjaro.`}'
)

# Replace "GUÍA TÉCNICA" with "GUÍA DE PREPARACIÓN"
code = code.replace(
    '✦ GUÍA TÉCNICA & PREPARACIÓN ✦',
    '✦ GUÍA DE PREPARACIÓN & EQUIPO ✦'
)

# 2. Update Dossier Component
old_dossier_start = '/* =========================================================================\n   11. DOSSIER COMPONENT'
old_dossier_end = '/* =========================================================================\n   12. INSTAGRAM SECTION'

idx1 = code.find(old_dossier_start)
idx2 = code.find(old_dossier_end)
assert idx1 != -1 and idx2 != -1, 'Dossier markers not found'

new_dossier = """/* =========================================================================
   11. DOSSIER COMPONENT - Secure Direct PDF Itinerary Download
   ========================================================================= */
const Dossier: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

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
                Descargar Itinerario Oficial en PDF
              </h2>
              <p className="text-[15px] sm:text-base text-[#95cecf] font-light leading-relaxed">
                Descarga de forma directa y 100% segura el documento oficial con el detalle de las 11 jornadas, alojamientos y servicios incluidos.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-[15px] sm:text-xs text-white/75">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#009ea4]" />
                  <span>Descarga directa y segura (PDF oficial)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-[#d45e33]" />
                  <span>Programa completo de la expedición</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center shrink-0 w-full lg:w-auto">
              <a
                href="/docs/Birn_Experience_Kilimanjaro_2027_Dossier_Oficial.pdf"
                download="Birn_Experience_Kilimanjaro_2027_Dossier_Oficial.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setDownloaded(true);
                  setTimeout(() => setDownloaded(false), 5000);
                }}
                className="btn-editorial text-[12px] sm:text-xs py-4 px-8 tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-xl active:scale-95 w-full sm:w-auto no-underline text-white font-bold"
              >
                <Download className="w-4 h-4" />
                <span>DESCARGAR ITINERARIO EN PDF</span>
              </a>
              {downloaded && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#2DD4BF] font-semibold animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Descarga iniciada de forma segura</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"""

code = code[:idx1] + new_dossier + code[idx2:]

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('App.tsx updated successfully!')
