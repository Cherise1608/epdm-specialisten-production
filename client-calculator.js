var PRICING_API = 'https://epdm-pricing.jescacherisevia.workers.dev';

// Forensic fingerprint
async function generateForensicID() {
    var raw = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        screen.colorDepth,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        navigator.hardwareConcurrency || 0,
        new Date().getTimezoneOffset()
    ].join('|');
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
}

// Prisberegner
document.getElementById('calcBtn').addEventListener('click', async function () {
    var lengthVal = parseFloat(document.getElementById('length').value.replace(',', '.'));
    var widthVal = parseFloat(document.getElementById('width').value.replace(',', '.'));
    var roofType = document.getElementById('roofType').value;
    var limChecked = document.getElementById('limPakke').checked;

    if (!lengthVal || !widthVal || lengthVal < 0 || widthVal < 0) {
        alert(LanguageContext.t('alert.invalid_dims'));
        return;
    }

    try {
        var hasFunctionalConsent = localStorage.getItem('functionalConsent') === 'true';
        var forensicId = hasFunctionalConsent ? await generateForensicID() : 'anonymous';
        var res = await fetch(PRICING_API + '/price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-forensic-id': forensicId
            },
            body: JSON.stringify({
                laengde: lengthVal,
                bredde: widthVal,
                lim: limChecked,
                tagtype: roofType === 'slope' ? 'slope' : 'flat'
            })
        });
        var d = await res.json();
        if (d.error) return;

        if (d.bulkRabat) {
            document.getElementById('discount-badge').classList.remove('hidden');
        } else {
            document.getElementById('discount-badge').classList.add('hidden');
        }

        document.getElementById('total-price').innerText =
            Math.ceil(d.total).toLocaleString('da-DK') + ' kr.';
        document.getElementById('dimensions-display').innerText =
            LanguageContext.t('calc.dims_prefix') + lengthVal + 'm x ' + widthVal +
            'm' + LanguageContext.t('calc.dims_prod') + d.prodLaengde.toFixed(2) +
            'm x ' + d.prodBredde.toFixed(2) + 'm (' + d.areal.toFixed(2) + ' m²).';

        document.getElementById('result').classList.remove('hidden');
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
        alert(LanguageContext.t('alert.error'));
    }
});

// Cookie-banner
if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-banner').classList.remove('hidden');
}

function acceptNecessary() {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('functionalConsent', 'false');
    document.getElementById('cookie-banner').classList.add('hidden');
}

function acceptAll() {
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('functionalConsent', 'true');
    document.getElementById('cookie-banner').classList.add('hidden');
}

// Send forespørgsel
function sendEmail(e) {
    e.preventDefault();
    var navn = document.getElementById('navn').value;
    var tlf = document.getElementById('tlf').value;
    var email = document.getElementById('email').value;
    var adresse = document.getElementById('adresse').value;
    var pris = document.getElementById('total-price').innerText;
    var accepted = document.getElementById('accept').checked;
    var dims = document.getElementById('dimensions-display').innerText;

    if (!navn || !tlf || !email || !accepted) {
        alert(LanguageContext.t('alert.fill_fields'));
        return;
    }

    var subject = encodeURIComponent(LanguageContext.t('email.subject') + navn);
    var body = encodeURIComponent(
        LanguageContext.t('email.body') +
        dims + LanguageContext.t('email.price') + pris +
        LanguageContext.t('email.contact') + navn +
        '\r\nTlf: ' + tlf + '\r\nEmail: ' + email +
        '\r\nAdresse: ' + adresse
    );
    window.location.href = 'mailto:info@epdm-specialisten.dk?subject=' + subject + '&body=' + body;
}

// Modals
function openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.onclick = function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};
