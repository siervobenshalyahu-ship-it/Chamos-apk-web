/* Baraja española de 40 cartas dibujada en SVG, sin imágenes externas.
   Uso: Cartas.svg(rango, palo) -> string SVG. Rangos: 1-7, 10 (sota), 11 (caballo), 12 (rey).
   Palos: "oros", "copas", "espadas", "bastos". */
(function () {
  "use strict";
  var COL = { oros: "#d9a21b", copas: "#c8372d", espadas: "#2f5fb3", bastos: "#2f8f58" };
  var INK = { oros: "#7a560a", copas: "#7a1d17", espadas: "#1b3a75", bastos: "#1a5733" };
  var LINE = "#2b2118", SKIN = "#f0c9a0";
  var NOMBRE = { 1: "As", 10: "Sota", 11: "Caballo", 12: "Rey" };

  /* Símbolo del palo en una caja de 24 x 24. */
  function sym(s) {
    if (s === "oros") {
      return '<circle cx="12" cy="12" r="10.6" fill="#ecbd3c" stroke="#7a560a" stroke-width="1.4"/>' +
        '<circle cx="12" cy="12" r="7.4" fill="none" stroke="#7a560a" stroke-width="1.1"/>' +
        '<circle cx="12" cy="12" r="3.2" fill="#f7d874" stroke="#7a560a" stroke-width="1"/>' +
        '<path d="M12 1.6v3M12 19.4v3M1.6 12h3M19.4 12h3" stroke="#7a560a" stroke-width="1" stroke-linecap="round"/>';
    }
    if (s === "copas") {
      return '<path d="M4 2.6h16c0 8.6-3.6 12.4-8 12.4S4 11.2 4 2.6z" fill="#d6453a" stroke="#7a1d17" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<path d="M7 5.5c.4 3.6 2 5.8 4 6.6" fill="none" stroke="#f3a59d" stroke-width="1.2" stroke-linecap="round"/>' +
        '<path d="M12 15v5" stroke="#7a1d17" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M7.2 21.6h9.6" stroke="#7a1d17" stroke-width="2.2" stroke-linecap="round"/>';
    }
    if (s === "espadas") {
      return '<path d="M12 .8l3.4 12.4H8.6z" fill="#6f9ae6" stroke="#1b3a75" stroke-width="1.3" stroke-linejoin="round"/>' +
        '<path d="M12 3v9.5" stroke="#cfe0ff" stroke-width="1" stroke-linecap="round"/>' +
        '<path d="M5.4 13.6h13.2" stroke="#1b3a75" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path d="M12 14v6" stroke="#1b3a75" stroke-width="2.4" stroke-linecap="round"/>' +
        '<circle cx="12" cy="21.8" r="1.7" fill="#1b3a75"/>';
    }
    return '<path d="M9.6 2.4Q12 .6 14.4 2.4L15.4 20Q12 22.8 8.6 20z" fill="#3ea76a" stroke="#1a5733" stroke-width="1.3" stroke-linejoin="round"/>' +
      '<path d="M10 9L5.2 6.2M14 14.6l4.8-2.8" stroke="#1a5733" stroke-width="3.6" stroke-linecap="round"/>' +
      '<path d="M10 9L5.2 6.2M14 14.6l4.8-2.8" stroke="#3ea76a" stroke-width="1.8" stroke-linecap="round"/>' +
      '<path d="M11.2 4.5v13" stroke="#8fd9a9" stroke-width="1" stroke-linecap="round"/>';
  }
  function put(s, x, y, k) {
    return '<g transform="translate(' + (x - 12 * k) + " " + (y - 12 * k) + ") scale(" + k + ')">' + sym(s) + "</g>";
  }

  /* Posiciones de los símbolos para cada número. */
  var K = 1.3, L = 33, R = 67, M = 50;
  var POS = {
    2: [[M, 40], [M, 116]],
    3: [[M, 34], [M, 78], [M, 122]],
    4: [[L, 40], [R, 40], [L, 116], [R, 116]],
    5: [[L, 40], [R, 40], [M, 78], [L, 116], [R, 116]],
    6: [[L, 36], [R, 36], [L, 78], [R, 78], [L, 120], [R, 120]],
    7: [[L, 36], [R, 36], [M, 57], [L, 78], [R, 78], [L, 120], [R, 120]]
  };

  /* Las tres figuras: sota (10), caballo (11) y rey (12). */
  function figura(r, s) {
    var c = COL[s], d = INK[s], o = 'stroke="' + LINE + '" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';
    var g = "";
    if (r === 10) {                                       /* sota: paje de pie */
      g += '<rect x="40" y="108" width="8" height="26" fill="#3b3b4a" ' + o + "/>";
      g += '<rect x="52" y="108" width="8" height="26" fill="#3b3b4a" ' + o + "/>";
      g += '<path d="M38 134h11M51 134h11" stroke="' + LINE + '" stroke-width="3" stroke-linecap="round"/>';
      g += '<path d="M39 64L27 92l5 3 11-22z" fill="' + c + '" ' + o + "/>";
      g += '<path d="M61 64l12 24-5 4-12-20z" fill="' + c + '" ' + o + "/>";
      g += '<path d="M33 113L39 62Q50 56 61 62L67 113z" fill="' + c + '" ' + o + "/>";
      g += '<path d="M36 94h28" stroke="' + d + '" stroke-width="2.4"/>';
      g += '<circle cx="50" cy="48" r="9" fill="' + SKIN + '" ' + o + "/>";
      g += '<path d="M40 46Q50 27 60 46Q50 42 40 46z" fill="' + c + '" ' + o + "/>";
      g += '<path d="M58 38Q73 28 71 48" fill="none" stroke="' + d + '" stroke-width="2"/>';
      g += '<circle cx="46.5" cy="49" r="1" fill="' + LINE + '"/><circle cx="53.5" cy="49" r="1" fill="' + LINE + '"/>';
      g += put(s, 75, 100, 0.95);
    } else if (r === 11) {                                /* caballo: jinete */
      g += '<path d="M33 112v24M42 114v22M62 114v22M71 112v24" stroke="#6b4421" stroke-width="4.6" stroke-linecap="round"/>';
      g += '<path d="M33 112v24M42 114v22M62 114v22M71 112v24" stroke="' + LINE + '" stroke-width=".8" stroke-linecap="round" opacity=".5"/>';
      g += '<path d="M76 100Q92 102 88 126" fill="none" stroke="#4a2f16" stroke-width="3.4" stroke-linecap="round"/>';
      g += '<ellipse cx="53" cy="104" rx="26" ry="13" fill="#8c5a2e" ' + o + "/>";
      g += '<path d="M33 98L29 72 21 66 11 73l3 8 8-1 3 21z" fill="#8c5a2e" ' + o + "/>";
      g += '<circle cx="19" cy="72" r="1.2" fill="' + LINE + '"/>';
      g += '<path d="M29 72l5 14" stroke="#4a2f16" stroke-width="2.6" stroke-linecap="round"/>';
      g += '<path d="M42 92h24v16H42z" fill="' + c + '" ' + o + "/>";
      g += '<path d="M48 88l1-26h13l2 26z" fill="' + c + '" ' + o + "/>";
      g += '<circle cx="56" cy="52" r="8" fill="' + SKIN + '" ' + o + "/>";
      g += '<path d="M47 50Q56 34 65 50Q56 46 47 50z" fill="' + d + '" ' + o + "/>";
      g += '<path d="M62 42Q73 36 72 50" fill="none" stroke="' + c + '" stroke-width="2"/>';
      g += '<path d="M69 100L76 34" stroke="' + LINE + '" stroke-width="1.8" stroke-linecap="round"/>';
      g += '<path d="M76 34l14 5-13 7z" fill="' + c + '" ' + o + "/>";
    } else {                                              /* rey: de frente con corona */
      g += '<path d="M25 136L31 72Q50 60 69 72L75 136z" fill="' + c + '" ' + o + "/>";
      g += '<path d="M31 72Q50 82 69 72L66 86Q50 94 34 86z" fill="#fbf6e8" ' + o + "/>";
      g += '<circle cx="40" cy="82" r="1" fill="' + LINE + '"/><circle cx="50" cy="86" r="1" fill="' + LINE + '"/><circle cx="60" cy="82" r="1" fill="' + LINE + '"/>';
      g += '<path d="M84 40v96" stroke="' + LINE + '" stroke-width="2.4" stroke-linecap="round"/>';
      g += '<circle cx="84" cy="38" r="4" fill="#ecbd3c" ' + o + "/>";
      g += '<path d="M31 78L22 104M69 78l9 22" stroke="' + c + '" stroke-width="8" stroke-linecap="round"/>';
      g += '<circle cx="50" cy="52" r="12" fill="' + SKIN + '" ' + o + "/>";
      g += '<path d="M38 56Q40 74 50 76Q60 74 62 56Q50 66 38 56z" fill="#d9d4cc" ' + o + "/>";
      g += '<path d="M37 40L39 24 45 33 50 21 55 33 61 24 63 40z" fill="#ecbd3c" ' + o + "/>";
      g += '<path d="M37 40h26" stroke="#7a560a" stroke-width="1.6"/>';
      g += '<circle cx="45" cy="52" r="1.2" fill="' + LINE + '"/><circle cx="55" cy="52" r="1.2" fill="' + LINE + '"/>';
      g += put(s, 50, 112, 0.9);
    }
    return g;
  }

  function svg(r, s) {
    var d = INK[s], c = COL[s], body = "";
    if (r === 1) body = put(s, 50, 78, 3.5);
    else if (r >= 10) body = figura(r, s);
    else POS[r].forEach(function (p) { body += put(s, p[0], p[1], K); });
    var txt = 'font-family="Fraunces, Georgia, serif" font-weight="700" font-size="15" fill="' + d + '"';
    return '<svg viewBox="0 0 100 156" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + r + " de " + s + '" focusable="false">' +
      '<rect x="1" y="1" width="98" height="154" rx="9" fill="#f7f0da" stroke="#cdbf98" stroke-width="1.4"/>' +
      '<rect x="6" y="6" width="88" height="144" rx="4" fill="none" stroke="' + c + '" stroke-opacity=".55" stroke-width="1"/>' +
      body +
      '<text x="11" y="21" ' + txt + ">" + r + "</text>" +
      '<text x="89" y="135" ' + txt + ' text-anchor="start" transform="rotate(180 89 135)">' + r + "</text>" +
      "</svg>";
  }

  window.Cartas = { svg: svg, ranks: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12], suits: ["oros", "copas", "espadas", "bastos"], nombre: function (r) { return NOMBRE[r] || String(r); } };
})();
