const ALLOWED_ORIGINS = [
  "https://epdm-specialisten.dk",
  "https://www.epdm-specialisten.dk",
];

function getCorsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-forensic-id",
    "Vary": "Origin",
  };
}

export default {
  async fetch(request) {
    const cors = getCorsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method !== "POST" || new URL(request.url).pathname !== "/price") {
      return Response.json(
        { error: "POST /price required" },
        { status: 405, headers: cors }
      );
    }

    // Forensic logging
    const forensicId = request.headers.get("x-forensic-id") || "unknown";
    console.log(`[FORENSIC] id=${forensicId} ip=${request.headers.get("cf-connecting-ip")} ts=${Date.now()}`);

    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON body" },
        { status: 400, headers: cors }
      );
    }

    const laengde = parseFloat(body.laengde || 0);
    const bredde = parseFloat(body.bredde || 0);
    const lim = body.lim === true;
    const tagtype = body.tagtype || "flat";

    if (laengde <= 0 || bredde <= 0) {
      return Response.json(
        { error: "Længde og bredde skal være større end 0" },
        { status: 400, headers: cors }
      );
    }

    // 20 cm sikkerhedsoverlæg
    const overlaeg = 0.2;
    const prodLaengde = laengde + overlaeg;
    const prodBredde = bredde + overlaeg;
    const areal = prodLaengde * prodBredde;

    // Prisberegning (server-side only)
    const basisPris = 195;
    const limPris = 65;
    const slopeFaktor = tagtype === "slope" ? 1.15 : 1.0;

    let foliePris = areal * (basisPris + (lim ? limPris : 0)) * slopeFaktor;

    // Bulk-rabat: 7% ved over 100 m²
    let rabat = 0;
    const bulkAktiv = areal > 100;
    if (bulkAktiv) {
      rabat = foliePris * 0.07;
      foliePris -= rabat;
    }

    const total = foliePris;

    return Response.json(
      {
        prodLaengde: Math.round(prodLaengde * 100) / 100,
        prodBredde: Math.round(prodBredde * 100) / 100,
        areal: Math.round(areal * 100) / 100,
        foliePris: Math.round(foliePris),
        bulkRabat: bulkAktiv,
        rabat: Math.round(rabat),
        total: Math.round(total),
      },
      { headers: cors }
    );
  },
};
