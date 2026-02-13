var PRICING_API = 'https://epdm-pricing.jescacherisevia.workers.dev';

// Prisberegner
document.getElementById('calcBtn').addEventListener('click', async function () {
    var lengthVal = parseFloat(document.getElementById('length').value.replace(',', '.'));
    var widthVal = parseFloat(document.getElementById('width').value.replace(',', '.'));
    var roofType = document.getElementById('roofType').value;
    var limChecked = document.getElementById('limPakke').checked;

    if (!lengthVal || !widthVal || lengthVal < 0 || widthVal < 0) {
        alert('Indtast venligst gyldige mål for både længde og bredde.');
        return;
    }

    try {
        var params = new URLSearchParams({
            laengde: lengthVal, bredde: widthVal,
            lim: limChecked, tagtype: roofType === 'slope' ? 'slope' : 'flat'
        });
        var res = await fetch(PRICING_API + '/price?' + params);
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
            'Dine mål: ' + lengthVal + 'm x ' + widthVal +
            'm. Produktionsmål (inkl. 20cm overlæg): ' + d.prodLaengde.toFixed(2) +
            'm x ' + d.prodBredde.toFixed(2) + 'm (' + d.areal.toFixed(2) + ' m²).';

        document.getElementById('result').classList.remove('hidden');
        document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
        alert('Der opstod en fejl. Prøv igen.');
    }
});

// Vejr-widget
var weatherKey = '***REDACTED***';
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (pos) {
        try {
            var res = await fetch(
                'https://api.openweathermap.org/data/2.5/weather?lat=' + pos.coords.latitude +
                '&lon=' + pos.coords.longitude + '&appid=' + weatherKey + '&units=metric&lang=da'
            );
            var data = await res.json();
            var temp = Math.ceil(data.main.temp);
            var good = temp >= 5 && temp <= 25;
            document.getElementById('weather-widget').classList.remove('hidden');
            document.getElementById('weather-text').innerHTML = good
                ? 'Perfekt installationsvejr: ' + temp + '°C i dit område.'
                : 'Vejret kræver opmærksomhed: ' + temp + '°C.';
            document.getElementById('weather-icon').className = good
                ? 'fa-solid fa-sun text-2xl text-yellow-500 mt-1'
                : 'fa-solid fa-cloud-rain text-2xl text-slate-400 mt-1';
        } catch (e) { console.log('Vejrfejl'); }
    });
}

// Cookie-banner
if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-banner').classList.remove('hidden');
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
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
        alert('Udfyld venligst alle kontaktfelter.');
        return;
    }

    var subject = encodeURIComponent('Tilbud forespørgsel: ' + navn);
    var body = encodeURIComponent(
        'Hej EPDM Specialisten,\r\n\r\nJeg ønsker et tilbud på følgende:\r\n' +
        dims + '\r\nEstimeret Pris: ' + pris +
        '\r\n\r\nKontaktinfo:\r\nNavn: ' + navn +
        '\r\nTlf: ' + tlf + '\r\nEmail: ' + email +
        '\r\nAdresse: ' + adresse
    );
    window.location.href = 'mailto:kasper@epdm-specialisten.dk?subject=' + subject + '&body=' + body;
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
