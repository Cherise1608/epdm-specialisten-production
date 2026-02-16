// ─── LanguageContext ─────────────────────────────────────────────────────────
// Vanilla JS i18n system for EPDM Specialisten
// Default: DA | Options: EN, DE
// ─────────────────────────────────────────────────────────────────────────────

var LanguageContext = (function () {
    var STORAGE_KEY = 'epdm-lang';
    var DEFAULT_LANG = 'da';
    var SUPPORTED = ['da', 'en', 'de'];

    var currentLang = DEFAULT_LANG;

    // ── Translation dictionary ──────────────────────────────────────────────
    var translations = {

        // ── Navbar ──────────────────────────────────────────────────────────
        'nav.subtitle':        { da: 'Teknisk Rådgivning & Materialesalg', en: 'Technical Advisory & Material Sales', de: 'Technische Beratung & Materialverkauf' },
        'nav.fordele':         { da: 'Fordele', en: 'Benefits', de: 'Vorteile' },
        'nav.faq':             { da: 'FAQ', en: 'FAQ', de: 'FAQ' },
        'nav.beregn':          { da: 'Beregn Pris', en: 'Get Quote', de: 'Preis Berechnen' },

        // ── Hero ────────────────────────────────────────────────────────────
        'hero.badge':          { da: 'Ingeniør-valideret Kvalitet', en: 'Engineer-Validated Quality', de: 'Ingenieur-validierte Qualität' },
        'hero.title1':         { da: 'Ingeniørens præcision.', en: "The engineer's precision.", de: 'Die Präzision des Ingenieurs.' },
        'hero.title2':         { da: 'Tømrerens erfaring.', en: "The carpenter's experience.", de: 'Die Erfahrung des Zimmermanns.' },
        'hero.desc':           { da: 'Vi leverer præcisionsskåret tagfolie baseret på 20 års praktisk viden og tekniske DIN-standarder.', en: 'We deliver precision-cut roofing membrane based on 20 years of practical knowledge and technical DIN standards.', de: 'Wir liefern präzisionsgeschnittene Dachfolie basierend auf 20 Jahren praktischer Erfahrung und technischen DIN-Standards.' },
        'hero.cta':            { da: 'Start Beregning', en: 'Start Calculation', de: 'Berechnung Starten' },
        'hero.lifespan':       { da: 'Forventet levetid: 50+ år', en: 'Expected lifespan: 50+ years', de: 'Erwartete Lebensdauer: 50+ Jahre' },

        // ── Fordele section ─────────────────────────────────────────────────
        'fordele.title':       { da: 'Derfor vælger ingeniører EPDM', en: 'Why engineers choose EPDM', de: 'Warum Ingenieure EPDM wählen' },
        'fordele.card1.title': { da: 'Cut-to-Size Teknologi', en: 'Cut-to-Size Technology', de: 'Cut-to-Size Technologie' },
        'fordele.card1.desc':  { da: 'Glem alt om utætte samlinger. Vi leverer <strong>én samlet dug</strong> skræddersyet til dit tag direkte fra fabrikken.', en: 'Forget about leaking joints. We deliver <strong>one single sheet</strong> custom-cut for your roof directly from the factory.', de: 'Vergessen Sie undichte Nähte. Wir liefern <strong>eine einzige Bahn</strong>, maßgeschneidert für Ihr Dach direkt ab Werk.' },
        'fordele.card2.title': { da: 'Direkte fra Tyskland', en: 'Direct from Germany', de: 'Direkt aus Deutschland' },
        'fordele.card2.desc':  { da: 'Vi importerer direkte fra DWZ i Tyskland uden fordyrende mellemled. Du får professionel industrikvalitet.', en: 'We import directly from DWZ in Germany without costly middlemen. You get professional industrial quality.', de: 'Wir importieren direkt von DWZ in Deutschland ohne teure Zwischenhändler. Sie erhalten professionelle Industriequalität.' },
        'fordele.card3.title': { da: '+50 Års Levetid', en: '+50 Years Lifespan', de: '+50 Jahre Lebensdauer' },
        'fordele.card3.desc':  { da: 'Certificeret efter strenge tyske <strong>DIN EN 13956</strong> standarder. UV-bestandig og rod-fast gummi.', en: 'Certified according to strict German <strong>DIN EN 13956</strong> standards. UV-resistant and root-proof rubber.', de: 'Zertifiziert nach strengen deutschen <strong>DIN EN 13956</strong> Standards. UV-beständig und wurzelfester Gummi.' },

        // ── About / Circle section ──────────────────────────────────────────
        'about.circle.subtitle': { da: 'Teknisk Rådgivning<br>& Materialesalg', en: 'Technical Advisory<br>& Material Sales', de: 'Technische Beratung<br>& Materialverkauf' },
        'about.years':           { da: 'Års Viden', en: 'Years Exp.', de: 'Jahre Erfahrung' },
        'about.title':           { da: 'Holdbarhed gennem dokumentation', en: 'Durability through documentation', de: 'Haltbarkeit durch Dokumentation' },
        'about.quote':           { da: '"Jeg har brugt 20 år på at forstå, hvorfor tage fejler. Hos EPDM Specialisten fjerner jeg fejlkilderne ved at levere en løsning skåret på præcise fabriksmål."', en: '"I have spent 20 years understanding why roofs fail. At EPDM Specialisten, I eliminate the sources of error by delivering a solution cut to precise factory measurements."', de: '"Ich habe 20 Jahre damit verbracht zu verstehen, warum Dächer versagen. Bei EPDM Specialisten eliminiere ich die Fehlerquellen, indem ich eine Lösung liefere, die auf präzise Werksmaße zugeschnitten ist."' },
        'about.credit':          { da: 'Kasper Hansen, Bygningsingeniør & Tømrer', en: 'Kasper Hansen, Structural Engineer & Carpenter', de: 'Kasper Hansen, Bauingenieur & Zimmermann' },

        // ── FAQ section ─────────────────────────────────────────────────────
        'faq.title':             { da: 'Ofte stillede spørgsmål', en: 'Frequently asked questions', de: 'Häufig gestellte Fragen' },
        'faq.q1':                { da: 'Hvor meget koster det?', en: 'How much does it cost?', de: 'Wie viel kostet es?' },
        'faq.a1':                { da: '<p class="mb-2">Priserne varierer efter tagstørrelse. Som udgangspunkt starter vores EPDM folie ved <strong>195 kr./m²</strong> (ekskl. systempakke).</p><p>Brug vores prisberegner nedenfor for et præcist estimat inkl. lim, primer og fragt. Endelig tilbud fremsendes altid skriftligt.</p>', en: '<p class="mb-2">Prices vary depending on roof size. As a starting point, our EPDM membrane starts at <strong>195 DKK/m²</strong> (excl. system package).</p><p>Use our price calculator below for a precise estimate incl. adhesive, primer and shipping. Final offers are always provided in writing.</p>', de: '<p class="mb-2">Die Preise variieren je nach Dachgröße. Unsere EPDM-Folie beginnt bei <strong>195 DKK/m²</strong> (exkl. Systempaket).</p><p>Nutzen Sie unseren Preisrechner unten für eine präzise Schätzung inkl. Kleber, Primer und Versand. Endgültige Angebote werden immer schriftlich erstellt.</p>' },
        'faq.q2':                { da: 'Hvad er forskellen på EPDM og tagpap?', en: 'What is the difference between EPDM and roofing felt?', de: 'Was ist der Unterschied zwischen EPDM und Dachpappe?' },
        'faq.a2':                { da: '<p class="mb-2"><strong>EPDM</strong> er en gummimembran med +50 års dokumenteret levetid, der leveres i ét stykke uden samlinger. Det er UV-resistent og kræver ingen åben ild ved montering.</p><p><strong>Tagpap</strong> holder typisk 15-25 år og kræver svejsning med gasbrænder. EPDM er en dyrere investering nu, men billigere over tid grundet levetiden.</p>', en: '<p class="mb-2"><strong>EPDM</strong> is a rubber membrane with 50+ years of documented lifespan, delivered in one piece without joints. It is UV-resistant and requires no open flame during installation.</p><p><strong>Roofing felt</strong> typically lasts 15-25 years and requires welding with a gas torch. EPDM is a more expensive investment now, but cheaper over time due to its lifespan.</p>', de: '<p class="mb-2"><strong>EPDM</strong> ist eine Gummimembran mit über 50 Jahren dokumentierter Lebensdauer, die in einem Stück ohne Nähte geliefert wird. Sie ist UV-beständig und erfordert keine offene Flamme bei der Installation.</p><p><strong>Dachpappe</strong> hält typischerweise 15-25 Jahre und erfordert Schweißen mit einem Gasbrenner. EPDM ist eine teurere Investition, aber langfristig günstiger aufgrund der Lebensdauer.</p>' },
        'faq.q3':                { da: 'Udfører I også tømrerarbejde?', en: 'Do you also do carpentry work?', de: 'Führen Sie auch Zimmermannsarbeiten durch?' },
        'faq.a3':                { da: '<p class="mb-3"><strong>Ja, i høj grad.</strong> Kasper er faglært tømrer med en baggrund i krævende renoveringsprojekter.</p><p class="mb-2">Vi har erfaring med alt fra tunge konstruktioner til fint snedkerarbejde, herunder:</p><ul class="list-disc pl-4 mb-3 space-y-1"><li><strong>Totalrenovering:</strong> F.eks. lejlighedssammenlægninger og ombygninger.</li><li><strong>Specialinventar:</strong> Radiatorskjulere og indbyggede løsninger.</li><li><strong>Klassisk håndværk:</strong> Frederiksberg-paneler og stuk-detaljer.</li></ul><p class="italic text-slate-500">"Når du vælger os til dit tag, får du ikke bare en tagdækker. Du får en fagmand, der er vant til at arbejde med millimeterpræcision – uanset om det er tagkonstruktionen eller finishen på sternbrædderne."</p>', en: '<p class="mb-3"><strong>Yes, absolutely.</strong> Kasper is a certified carpenter with a background in demanding renovation projects.</p><p class="mb-2">We have experience with everything from heavy constructions to fine joinery, including:</p><ul class="list-disc pl-4 mb-3 space-y-1"><li><strong>Full renovation:</strong> E.g. apartment mergers and conversions.</li><li><strong>Custom fixtures:</strong> Radiator covers and built-in solutions.</li><li><strong>Classic craftsmanship:</strong> Frederiksberg panels and stucco details.</li></ul><p class="italic text-slate-500">"When you choose us for your roof, you don\'t just get a roofer. You get a craftsman accustomed to working with millimeter precision – whether it\'s the roof structure or the finish on the fascia boards."</p>', de: '<p class="mb-3"><strong>Ja, auf jeden Fall.</strong> Kasper ist ausgebildeter Zimmermann mit Erfahrung in anspruchsvollen Sanierungsprojekten.</p><p class="mb-2">Wir haben Erfahrung mit allem, von schweren Konstruktionen bis hin zu feiner Tischlerei, einschließlich:</p><ul class="list-disc pl-4 mb-3 space-y-1"><li><strong>Komplettsanierung:</strong> Z.B. Wohnungszusammenlegungen und Umbauten.</li><li><strong>Spezialanfertigungen:</strong> Heizkörperverkleidungen und Einbaulösungen.</li><li><strong>Klassisches Handwerk:</strong> Frederiksberg-Paneele und Stuckdetails.</li></ul><p class="italic text-slate-500">"Wenn Sie uns für Ihr Dach wählen, bekommen Sie nicht nur einen Dachdecker. Sie bekommen einen Handwerker, der es gewohnt ist, mit Millimeterpräzision zu arbeiten – ob bei der Dachkonstruktion oder dem Finish an den Stirnbrettern."</p>' },
        'faq.q4':                { da: 'Kan jeg selv montere EPDM-dugen?', en: 'Can I install the EPDM membrane myself?', de: 'Kann ich die EPDM-Membran selbst verlegen?' },
        'faq.a4':                { da: 'Ja, det er muligt for den erfarne gør-det-selv person. Fordelen ved vores løsning er, at du modtager dugen i ét stykke, hvilket fjerner behovet for at svejse samlinger på taget. Vi anbefaler dog altid, at du følger vores installationsvejledning nøje for at sikre garantien.', en: 'Yes, it is possible for the experienced DIYer. The advantage of our solution is that you receive the membrane in one piece, eliminating the need to weld joints on the roof. However, we always recommend that you follow our installation guide carefully to ensure the warranty.', de: 'Ja, für den erfahrenen Heimwerker ist das möglich. Der Vorteil unserer Lösung ist, dass Sie die Membran in einem Stück erhalten, wodurch das Schweißen von Nähten auf dem Dach entfällt. Wir empfehlen jedoch immer, unsere Installationsanleitung sorgfältig zu befolgen, um die Garantie zu gewährleisten.' },
        'faq.q5':                { da: 'Hvad er leveringstiden?', en: 'What is the delivery time?', de: 'Wie lang ist die Lieferzeit?' },
        'faq.a5':                { da: 'Da vi skærer på mål direkte fra fabrikken i Tyskland, skal du forvente ca. <strong>5-8 hverdage</strong> fra bestilling til levering på din adresse i Danmark.', en: 'Since we cut to size directly from the factory in Germany, you should expect approx. <strong>5-8 business days</strong> from order to delivery at your address in Denmark.', de: 'Da wir direkt ab Werk in Deutschland auf Maß schneiden, sollten Sie mit ca. <strong>5-8 Werktagen</strong> von der Bestellung bis zur Lieferung an Ihre Adresse in Dänemark rechnen.' },
        'faq.q6':                { da: 'Tilbyder I garanti?', en: 'Do you offer a warranty?', de: 'Bieten Sie eine Garantie an?' },
        'faq.a6':                { da: '<p><strong>Ja. Vi giver fuld tryghed.</strong></p><p class="mb-2">Du får fabriksgaranti på materialet. Men vigtigst af alt: EPDM-gummi nedbrydes ikke af solen som tagpap gør. Derfor viser tekniske tests (SKZ), at levetiden er over <strong>50 år</strong>.</p><p>Du køber altså et tag, der holder længere, end garantien løber.</p>', en: '<p><strong>Yes. We provide full peace of mind.</strong></p><p class="mb-2">You get a factory warranty on the material. But most importantly: EPDM rubber does not degrade from sunlight like roofing felt does. Technical tests (SKZ) show a lifespan of over <strong>50 years</strong>.</p><p>So you are buying a roof that lasts longer than the warranty.</p>', de: '<p><strong>Ja. Wir bieten volle Sicherheit.</strong></p><p class="mb-2">Sie erhalten eine Werksgarantie auf das Material. Aber am wichtigsten: EPDM-Gummi wird nicht durch Sonnenlicht abgebaut wie Dachpappe. Technische Tests (SKZ) zeigen eine Lebensdauer von über <strong>50 Jahren</strong>.</p><p>Sie kaufen also ein Dach, das länger hält als die Garantie.</p>' },
        'faq.q7':                { da: 'Kan EPDM lægges ovenpå mit gamle tag?', en: 'Can EPDM be installed on top of my old roof?', de: 'Kann EPDM auf mein altes Dach gelegt werden?' },
        'faq.a7':                { da: 'EPDM kan ofte lægges ovenpå eksisterende tagpap eller beton, forudsat at underlaget er jævnt, tørt og fri for skarpe genstande. Vi anbefaler dog altid en besigtigelse eller at sende os billeder før bestilling.', en: 'EPDM can often be installed on top of existing roofing felt or concrete, provided the surface is even, dry and free of sharp objects. However, we always recommend an inspection or sending us photos before ordering.', de: 'EPDM kann oft auf bestehende Dachpappe oder Beton verlegt werden, vorausgesetzt der Untergrund ist eben, trocken und frei von scharfen Gegenständen. Wir empfehlen jedoch immer eine Besichtigung oder uns Fotos vor der Bestellung zu senden.' },

        // ── Calculator section ──────────────────────────────────────────────
        'calc.title':            { da: 'Beregn din pris', en: 'Calculate your price', de: 'Berechne deinen Preis' },
        'calc.subtitle':         { da: 'Vi inkluderer automatisk 20cm sikkerhedsoverlæg i beregningen', en: 'We automatically include 20cm safety overlap in the calculation', de: 'Wir inkludieren automatisch 20cm Sicherheitsüberlappung in der Berechnung' },
        'calc.flat.title':       { da: 'Fladt tag (0-2,5°)', en: 'Flat roof (0-2.5°)', de: 'Flachdach (0-2,5°)' },
        'calc.flat.desc':        { da: 'Standardløsning til carporte og skure. Her beregner vi med de rene mål + 20 cm overlæg på alle sider.', en: 'Standard solution for carports and sheds. We calculate with the exact measurements + 20 cm overlap on all sides.', de: 'Standardlösung für Carports und Schuppen. Wir berechnen mit den genauen Maßen + 20 cm Überlappung auf allen Seiten.' },
        'calc.slope.title':      { da: 'Tag med fald (>2,5°)', en: 'Sloped roof (>2.5°)', de: 'Dach mit Gefälle (>2,5°)' },
        'calc.slope.desc':       { da: 'Ved fald tilføjes en faktor 1.15x i beregningen for at sikre, at gummimembranen dækker den ekstra flade, som hældningen skaber.', en: 'For slopes, a factor of 1.15x is added to the calculation to ensure the rubber membrane covers the extra surface created by the incline.', de: 'Bei Gefälle wird ein Faktor von 1,15x in die Berechnung aufgenommen, um sicherzustellen, dass die Gummimembran die durch die Neigung entstehende zusätzliche Fläche abdeckt.' },
        'calc.length':           { da: 'Længde (meter)', en: 'Length (meters)', de: 'Länge (Meter)' },
        'calc.width':            { da: 'Bredde (meter)', en: 'Width (meters)', de: 'Breite (Meter)' },
        'calc.rooftype':         { da: 'Tagtype', en: 'Roof type', de: 'Dachtyp' },
        'calc.flat.option':      { da: 'Fladt tag', en: 'Flat roof', de: 'Flachdach' },
        'calc.slope.option':     { da: 'Skråt tag (Merpris)', en: 'Sloped roof (Surcharge)', de: 'Schrägdach (Aufpreis)' },
        'calc.discount':         { da: 'Stor-købs rabat aktiveret (-7%)', en: 'Bulk discount activated (-7%)', de: 'Mengenrabatt aktiviert (-7%)' },
        'calc.syspackage':       { da: 'Inkluder Systempakke (+65 kr/m²)', en: 'Include System Package (+65 DKK/m²)', de: 'Systempaket inkludieren (+65 DKK/m²)' },
        'calc.syspackage.desc':  { da: 'Indeholder lim & primer tilpasset mængden', en: 'Contains adhesive & primer matched to quantity', de: 'Enthält Kleber & Primer passend zur Menge' },
        'calc.btn':              { da: 'Beregn Pris Nu', en: 'Calculate Price Now', de: 'Preis Jetzt Berechnen' },
        'calc.result.label':     { da: 'Estimeret pris inkl. moms & systempakke', en: 'Estimated price incl. VAT & system package', de: 'Geschätzter Preis inkl. MwSt. & Systempaket' },
        'calc.offer.title':      { da: 'Modtag tilbud', en: 'Receive an offer', de: 'Angebot erhalten' },
        'calc.offer.desc':       { da: 'Vi sender specifikationen til din mail', en: 'We will send the specification to your email', de: 'Wir senden die Spezifikation an Ihre E-Mail' },
        'calc.offer.name':       { da: 'Navn', en: 'Name', de: 'Name' },
        'calc.offer.phone':      { da: 'Telefon', en: 'Phone', de: 'Telefon' },
        'calc.offer.email':      { da: 'Email', en: 'Email', de: 'E-Mail' },
        'calc.offer.address':    { da: 'Leveringsadresse', en: 'Delivery address', de: 'Lieferadresse' },
        'calc.offer.accept':     { da: 'Jeg accepterer handelsbetingelserne. Bemærk: Målvarer (Cut-to-size) er ikke omfattet af standard returret.', en: 'I accept the terms and conditions. Note: Custom-cut products (Cut-to-size) are not covered by standard return policy.', de: 'Ich akzeptiere die Geschäftsbedingungen. Hinweis: Maßgeschneiderte Produkte (Cut-to-size) sind von der Standard-Rückgaberegelung ausgenommen.' },
        'calc.offer.send':       { da: 'Send Forespørgsel', en: 'Send Inquiry', de: 'Anfrage Senden' },

        // ── Engineer section ────────────────────────────────────────────────
        'eng.title':             { da: 'Ingeniør-valideret sikkerhed', en: 'Engineer-validated safety', de: 'Ingenieur-validierte Sicherheit' },
        'eng.desc':              { da: 'I en branche præget af hurtige løsninger, vælger vi dokumentation. Vi kombinerer tysk ingeniørkunst med dansk håndværkertradition.', en: 'In an industry marked by quick fixes, we choose documentation. We combine German engineering with Danish craftsmanship tradition.', de: 'In einer Branche, die von schnellen Lösungen geprägt ist, setzen wir auf Dokumentation. Wir kombinieren deutsche Ingenieurskunst mit dänischer Handwerkstradition.' },
        'eng.din.title':         { da: 'DIN EN 13956', en: 'DIN EN 13956', de: 'DIN EN 13956' },
        'eng.din.desc':          { da: 'Officiel tysk industristandard for EPDM-gummi.', en: 'Official German industry standard for EPDM rubber.', de: 'Offizieller deutscher Industriestandard für EPDM-Gummi.' },
        'eng.life.title':        { da: '50 Års Levetid', en: '50 Years Lifespan', de: '50 Jahre Lebensdauer' },
        'eng.life.desc':         { da: 'Dokumenteret holdbarhed gennem SKZ-testinstituttet.', en: 'Documented durability through the SKZ testing institute.', de: 'Dokumentierte Haltbarkeit durch das SKZ-Prüfinstitut.' },

        // ── Meet section ────────────────────────────────────────────────────
        'meet.title':            { da: 'Mød EPDM Specialisten', en: 'Meet the EPDM Specialist', de: 'Lernen Sie den EPDM-Spezialisten kennen' },
        'meet.bio':              { da: '"Jeg er uddannet <strong>Bygningsingeniør</strong> og faglært <strong>Tømrer</strong>. Den kombination er din sikkerhed. Jeg forstår både kemien i gummiet og konstruktionen i dit tag. Jeg sælger ikke bare en rulle folie – jeg sælger visheden om, at dit tag holder tæt, når stormen rammer."', en: '"I am a trained <strong>Structural Engineer</strong> and certified <strong>Carpenter</strong>. That combination is your guarantee. I understand both the chemistry of the rubber and the construction of your roof. I don\'t just sell a roll of membrane – I sell the certainty that your roof stays tight when the storm hits."', de: '"Ich bin ausgebildeter <strong>Bauingenieur</strong> und gelernter <strong>Zimmermann</strong>. Diese Kombination ist Ihre Sicherheit. Ich verstehe sowohl die Chemie des Gummis als auch die Konstruktion Ihres Daches. Ich verkaufe nicht nur eine Rolle Folie – ich verkaufe die Gewissheit, dass Ihr Dach dicht hält, wenn der Sturm kommt."' },
        'meet.owner':            { da: 'Ejer & Grundlægger', en: 'Owner & Founder', de: 'Inhaber & Gründer' },

        // ── Footer ──────────────────────────────────────────────────────────
        'footer.info':           { da: 'Information', en: 'Information', de: 'Information' },
        'footer.terms':          { da: 'Handelsbetingelser', en: 'Terms & Conditions', de: 'Geschäftsbedingungen' },
        'footer.privacy':        { da: 'Privatlivspolitik', en: 'Privacy Policy', de: 'Datenschutzrichtlinie' },

        // ── Cookie banner ───────────────────────────────────────────────────
        'cookie.text':           { da: 'Vi bruger funktionelle cookies til svindelforebyggelse.', en: 'We use functional cookies for fraud prevention.', de: 'Wir verwenden funktionale Cookies zur Betrugsprävention.' },
        'cookie.readmore':       { da: 'Læs mere', en: 'Read more', de: 'Mehr erfahren' },
        'cookie.necessary':      { da: 'Kun nødvendige', en: 'Necessary only', de: 'Nur notwendige' },
        'cookie.accept':         { da: 'Accepter alle', en: 'Accept all', de: 'Alle akzeptieren' },

        // ── Modals ──────────────────────────────────────────────────────────
        'modal.terms.title':     { da: 'Handelsbetingelser', en: 'Terms & Conditions', de: 'Geschäftsbedingungen' },
        'modal.terms.close':     { da: 'Luk Vindue', en: 'Close Window', de: 'Fenster Schließen' },
        'modal.privacy.title':   { da: 'Privatlivspolitik', en: 'Privacy Policy', de: 'Datenschutzrichtlinie' },
        'modal.privacy.close':   { da: 'Luk Vindue', en: 'Close Window', de: 'Fenster Schließen' },

        // ── JS alerts (used by client-calculator.js) ────────────────────────
        'alert.invalid_dims':    { da: 'Indtast venligst gyldige mål for både længde og bredde.', en: 'Please enter valid dimensions for both length and width.', de: 'Bitte geben Sie gültige Maße für Länge und Breite ein.' },
        'alert.error':           { da: 'Der opstod en fejl. Prøv igen.', en: 'An error occurred. Please try again.', de: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' },
        'alert.fill_fields':     { da: 'Udfyld venligst alle kontaktfelter.', en: 'Please fill in all contact fields.', de: 'Bitte füllen Sie alle Kontaktfelder aus.' },
        'email.subject':         { da: 'Tilbud forespørgsel: ', en: 'Quote request: ', de: 'Angebotsanfrage: ' },
        'email.body':            { da: 'Hej EPDM Specialisten,\r\n\r\nJeg ønsker et tilbud på følgende:\r\n', en: 'Hello EPDM Specialisten,\r\n\r\nI would like a quote for the following:\r\n', de: 'Hallo EPDM Specialisten,\r\n\r\nIch möchte ein Angebot für Folgendes:\r\n' },
        'email.price':           { da: '\r\nEstimeret Pris: ', en: '\r\nEstimated Price: ', de: '\r\nGeschätzter Preis: ' },
        'email.contact':         { da: '\r\n\r\nKontaktinfo:\r\nNavn: ', en: '\r\n\r\nContact info:\r\nName: ', de: '\r\n\r\nKontaktdaten:\r\nName: ' },
        'calc.dims_prefix':      { da: 'Dine mål: ', en: 'Your dimensions: ', de: 'Ihre Maße: ' },
        'calc.dims_prod':        { da: '. Produktionsmål (inkl. 20cm overlæg): ', en: '. Production dimensions (incl. 20cm overlap): ', de: '. Produktionsmaße (inkl. 20cm Überlappung): ' },
    };

    // ── Get a translation by key ────────────────────────────────────────────
    function t(key) {
        var entry = translations[key];
        if (!entry) return key;
        return entry[currentLang] || entry[DEFAULT_LANG] || key;
    }

    // ── Apply all data-i18n attributes on the page ──────────────────────────
    function applyTranslations() {
        // Text content
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });

        // HTML content (for elements containing <strong>, <br>, etc.)
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            el.innerHTML = t(key);
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // Update <html lang="">
        document.documentElement.lang = currentLang;

        // Update switcher active state (uses same Tailwind classes as nav links)
        document.querySelectorAll('[data-lang]').forEach(function (btn) {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.remove('text-slate-500');
                btn.classList.add('text-slate-900');
            } else {
                btn.classList.remove('text-slate-900');
                btn.classList.add('text-slate-500');
            }
        });
    }

    // ── Set language ────────────────────────────────────────────────────────
    function setLanguage(lang) {
        if (SUPPORTED.indexOf(lang) === -1) return;
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        applyTranslations();
    }

    // ── Get current language ────────────────────────────────────────────────
    function getLanguage() {
        return currentLang;
    }

    // ── Initialize on page load ─────────────────────────────────────────────
    function init() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED.indexOf(stored) !== -1) {
            currentLang = stored;
        }
        applyTranslations();
    }

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    return {
        t: t,
        setLanguage: setLanguage,
        getLanguage: getLanguage,
        applyTranslations: applyTranslations
    };
})();
