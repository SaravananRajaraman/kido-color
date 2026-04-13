/**
 * data/coloringImages.js
 *
 * SVG outline illustrations for A–Z coloring pages.
 * Each entry has:
 *   letter  – uppercase letter
 *   name    – animal / object / vehicle / nature
 *   category – 'animals' | 'vehicles' | 'nature' | 'cartoons'
 *   svg     – inline SVG string (black outlines on white bg, closed paths)
 *
 * Illustrations use simple geometric primitives so they render perfectly
 * on every browser and have closed regions for bucket-fill.
 */

/* ── shared SVG wrapper ──────────────────────────────────── */
function wrap(w, h, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"
    style="background:#fff">${content}</svg>`;
}

/* ── stroke / fill helpers ───────────────────────────────── */
const S = 'stroke="#1C1C1C" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" fill="#fff"';
const SF= 'stroke="#1C1C1C" stroke-width="5" stroke-linejoin="round" fill="#fff"';

/* ────────────────────────────────────────────────────────── */
/*  A – Alligator                                            */
/* ────────────────────────────────────────────────────────── */
const alligator = wrap(320, 240,
`<!-- body -->
<ellipse cx="160" cy="145" rx="110" ry="52" ${SF}/>
<!-- head -->
<ellipse cx="260" cy="130" rx="60" ry="35" ${SF}/>
<!-- snout -->
<path d="M255 118 Q295 108 310 120 Q295 132 255 142 Z" ${S}/>
<!-- eye -->
<circle cx="272" cy="118" r="9" ${S}/>
<circle cx="272" cy="118" r="4" fill="#1C1C1C"/>
<!-- nostrils -->
<circle cx="298" cy="112" r="4" ${S} fill="#eee"/>
<circle cx="306" cy="110" r="4" ${S} fill="#eee"/>
<!-- tail -->
<path d="M50 145 Q10 130 5 110 Q20 120 50 138" ${S}/>
<!-- legs -->
<rect x="90"  y="190" width="28" height="34" rx="10" ${S}/>
<rect x="140" y="192" width="28" height="32" rx="10" ${S}/>
<rect x="190" y="192" width="28" height="32" rx="10" ${S}/>
<rect x="238" y="190" width="28" height="34" rx="10" ${S}/>
<!-- back scales -->
<path d="M80 118 Q90 100 100 118" ${S} fill="none"/>
<path d="M110 112 Q120 94 130 112" ${S} fill="none"/>
<path d="M140 108 Q150 90 160 108" ${S} fill="none"/>
<path d="M170 108 Q180 90 190 108" ${S} fill="none"/>
<!-- teeth -->
<path d="M262 128 L268 136 L274 128 L280 136 L286 128" ${S} fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  B – Butterfly                                            */
/* ────────────────────────────────────────────────────────── */
const butterfly = wrap(320, 280,
`<!-- body -->
<ellipse cx="160" cy="150" rx="10" ry="55" ${SF}/>
<circle cx="160" cy="88" r="14" ${SF}/>
<!-- antennae -->
<line x1="155" y1="80" x2="130" y2="55" ${S} fill="none"/>
<circle cx="128" cy="53" r="5" ${S}/>
<line x1="165" y1="80" x2="190" y2="55" ${S} fill="none"/>
<circle cx="192" cy="53" r="5" ${S}/>
<!-- top-left wing -->
<path d="M152 120 Q90 70 55 100 Q40 145 100 155 Z" ${SF}/>
<!-- top-right wing -->
<path d="M168 120 Q230 70 265 100 Q280 145 220 155 Z" ${SF}/>
<!-- bottom-left wing -->
<path d="M152 160 Q80 165 70 205 Q100 230 148 185 Z" ${SF}/>
<!-- bottom-right wing -->
<path d="M168 160 Q240 165 250 205 Q220 230 172 185 Z" ${SF}/>
<!-- wing spots (decorative circles) -->
<circle cx="98"  cy="125" r="12" ${S}/>
<circle cx="222" cy="125" r="12" ${S}/>
<circle cx="105" cy="195" r="10" ${S}/>
<circle cx="215" cy="195" r="10" ${S}/>
<!-- face -->
<circle cx="155" cy="90" r="3" fill="#1C1C1C"/>
<circle cx="165" cy="90" r="3" fill="#1C1C1C"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  C – Cat                                                  */
/* ────────────────────────────────────────────────────────── */
const cat = wrap(280, 300,
`<!-- body -->
<ellipse cx="140" cy="210" rx="80" ry="70" ${SF}/>
<!-- head -->
<circle cx="140" cy="110" r="68" ${SF}/>
<!-- ears -->
<path d="M82 65 L65 25 L108 50 Z" ${SF}/>
<path d="M198 65 L215 25 L172 50 Z" ${SF}/>
<!-- inner ears -->
<path d="M84 60 L72 35 L104 52 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M196 60 L208 35 L176 52 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- eyes -->
<ellipse cx="115" cy="100" rx="16" ry="18" ${SF}/>
<ellipse cx="165" cy="100" rx="16" ry="18" ${SF}/>
<ellipse cx="115" cy="100" rx="7" ry="14" fill="#1C1C1C"/>
<ellipse cx="165" cy="100" rx="7" ry="14" fill="#1C1C1C"/>
<!-- nose -->
<path d="M133 122 L140 130 L147 122 Z" ${SF}/>
<!-- mouth -->
<path d="M140 130 Q128 140 120 136" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M140 130 Q152 140 160 136" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- whiskers -->
<line x1="80"  y1="122" x2="130" y2="125" stroke="#1C1C1C" stroke-width="3"/>
<line x1="80"  y1="132" x2="130" y2="130" stroke="#1C1C1C" stroke-width="3"/>
<line x1="150" y1="125" x2="200" y2="122" stroke="#1C1C1C" stroke-width="3"/>
<line x1="150" y1="130" x2="200" y2="132" stroke="#1C1C1C" stroke-width="3"/>
<!-- paws -->
<ellipse cx="95"  cy="270" rx="28" ry="18" ${SF}/>
<ellipse cx="185" cy="270" rx="28" ry="18" ${SF}/>
<!-- tail -->
<path d="M215 230 Q260 195 255 150 Q250 130 238 145" stroke="#1C1C1C" stroke-width="5" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  D – Dog                                                  */
/* ────────────────────────────────────────────────────────── */
const dog = wrap(300, 300,
`<!-- body -->
<ellipse cx="150" cy="210" rx="88" ry="68" ${SF}/>
<!-- head -->
<circle cx="150" cy="105" r="65" ${SF}/>
<!-- floppy ears -->
<path d="M90 85 Q55 80 48 130 Q55 150 88 130 Z" ${SF}/>
<path d="M210 85 Q245 80 252 130 Q245 150 212 130 Z" ${SF}/>
<!-- eyes -->
<circle cx="127" cy="95" r="14" ${SF}/>
<circle cx="173" cy="95" r="14" ${SF}/>
<circle cx="127" cy="95" r="7"  fill="#1C1C1C"/>
<circle cx="173" cy="95" r="7"  fill="#1C1C1C"/>
<!-- snout -->
<ellipse cx="150" cy="125" rx="32" ry="22" ${SF}/>
<!-- nose -->
<ellipse cx="150" cy="116" rx="14" ry="9" fill="#1C1C1C"/>
<!-- mouth -->
<path d="M138 130 Q150 142 162 130" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- tongue -->
<path d="M143 140 Q150 155 157 140" ${SF}/>
<!-- legs / paws -->
<rect x="80"  y="258" width="36" height="28" rx="12" ${S}/>
<rect x="184" y="258" width="36" height="28" rx="12" ${S}/>
<!-- tail -->
<path d="M232 200 Q270 165 262 130" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- collar -->
<path d="M98 162 Q150 172 202 162" stroke="#1C1C1C" stroke-width="8" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  E – Elephant                                             */
/* ────────────────────────────────────────────────────────── */
const elephant = wrap(320, 300,
`<!-- body -->
<ellipse cx="160" cy="205" rx="105" ry="75" ${SF}/>
<!-- head -->
<ellipse cx="160" cy="105" rx="75" ry="65" ${SF}/>
<!-- trunk -->
<path d="M128 155 Q95 185 100 215 Q105 235 118 230 Q125 215 120 195 Q130 170 140 160" ${S} fill="#fff"/>
<!-- ear left -->
<ellipse cx="85" cy="100" rx="30" ry="45" ${SF}/>
<!-- ear right -->
<ellipse cx="235" cy="100" rx="30" ry="45" ${SF}/>
<!-- eye left -->
<circle cx="120" cy="88" r="12" ${SF}/>
<circle cx="120" cy="88" r="6"  fill="#1C1C1C"/>
<!-- eye right -->
<circle cx="200" cy="88" r="12" ${SF}/>
<circle cx="200" cy="88" r="6"  fill="#1C1C1C"/>
<!-- toes left -->
<ellipse cx="102" cy="269" rx="26" ry="14" ${SF}/>
<!-- toes right -->
<ellipse cx="218" cy="269" rx="26" ry="14" ${SF}/>
<!-- tusk -->
<path d="M132 140 Q120 155 115 168" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- tail -->
<path d="M260 215 Q285 220 288 240" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<circle cx="290" cy="243" r="6" fill="#1C1C1C"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  F – Fish                                                 */
/* ────────────────────────────────────────────────────────── */
const fish = wrap(300, 220,
`<!-- body -->
<ellipse cx="145" cy="110" rx="95" ry="65" ${SF}/>
<!-- tail fin -->
<path d="M50 110 L10 65 L10 155 Z" ${SF}/>
<!-- top fin -->
<path d="M145 45 Q175 20 200 45" ${S} fill="#fff"/>
<!-- bottom fin -->
<path d="M140 175 Q165 200 185 175" ${S} fill="#fff"/>
<!-- eye -->
<circle cx="215" cy="96" r="16" ${SF}/>
<circle cx="215" cy="96" r="8"  fill="#1C1C1C"/>
<!-- mouth -->
<path d="M238 112 Q248 118 238 124" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- scales (arc grid) -->
<path d="M120 80 Q140 65 160 80" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M145 75 Q165 60 185 75" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M110 100 Q130 85 150 100" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M140 95 Q160 80 180 95" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M168 90 Q188 75 208 90" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M108 120 Q128 105 148 120" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M138 116 Q158 101 178 116" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  G – Giraffe                                              */
/* ────────────────────────────────────────────────────────── */
const giraffe = wrap(260, 340,
`<!-- body -->
<ellipse cx="130" cy="250" rx="72" ry="60" ${SF}/>
<!-- neck -->
<path d="M100 195 L108 70 L152 70 L160 195 Z" ${SF}/>
<!-- head -->
<ellipse cx="130" cy="55" rx="38" ry="30" ${SF}/>
<!-- horns (ossicones) -->
<line x1="115" y1="28" x2="112" y2="10" stroke="#1C1C1C" stroke-width="7"/>
<circle cx="112" cy="9" r="5" fill="#1C1C1C"/>
<line x1="145" y1="28" x2="148" y2="10" stroke="#1C1C1C" stroke-width="7"/>
<circle cx="148" cy="9" r="5" fill="#1C1C1C"/>
<!-- ears -->
<ellipse cx="97"  cy="38" rx="10" ry="16" transform="rotate(-20 97 38)" ${SF}/>
<ellipse cx="163" cy="38" rx="10" ry="16" transform="rotate(20 163 38)" ${SF}/>
<!-- eye -->
<circle cx="116" cy="52" r="8"  ${SF}/>
<circle cx="116" cy="52" r="4"  fill="#1C1C1C"/>
<!-- nose -->
<circle cx="155" cy="62" r="5" ${S} fill="#eee"/>
<!-- spots on body -->
<path d="M95 220 Q110 210 120 222 Q112 232 98 230 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M138 232 Q153 222 162 234 Q155 244 140 242 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M108 255 Q122 245 130 257 Q122 268 108 265 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- legs -->
<rect x="82"  y="300" width="24" height="38" rx="8" ${S}/>
<rect x="114" y="302" width="24" height="36" rx="8" ${S}/>
<rect x="148" y="302" width="24" height="36" rx="8" ${S}/>
<rect x="178" y="300" width="24" height="38" rx="8" ${S}/>
<!-- tail -->
<path d="M198 255 Q215 265 210 285" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<circle cx="208" cy="287" r="5" fill="#1C1C1C"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  H – Horse                                                */
/* ────────────────────────────────────────────────────────── */
const horse = wrap(320, 300,
`<!-- body -->
<ellipse cx="160" cy="205" rx="100" ry="65" ${SF}/>
<!-- neck -->
<path d="M192 150 L210 75 L245 80 L230 158 Z" ${SF}/>
<!-- head -->
<path d="M210 75 Q235 45 260 55 Q275 75 260 90 Q245 100 225 95 Q215 90 210 75 Z" ${SF}/>
<!-- mane -->
<path d="M192 150 Q198 120 205 100 Q210 80 218 65" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M196 148 Q203 118 210 98 Q216 78 224 63" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- eye -->
<circle cx="248" cy="65" r="9" ${SF}/>
<circle cx="248" cy="65" r="5" fill="#1C1C1C"/>
<!-- nostril -->
<path d="M265 78 Q270 82 268 88" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- ear -->
<path d="M230 50 L228 28 L240 38 Z" ${SF}/>
<!-- legs -->
<rect x="82"  y="255" width="28" height="42" rx="10" ${S}/>
<rect x="122" y="258" width="28" height="38" rx="10" ${S}/>
<rect x="178" y="258" width="28" height="38" rx="10" ${S}/>
<rect x="218" y="255" width="28" height="42" rx="10" ${S}/>
<!-- hooves -->
<rect x="82"  y="286" width="28" height="14" rx="5" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<rect x="122" y="285" width="28" height="14" rx="5" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<rect x="178" y="285" width="28" height="14" rx="5" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<rect x="218" y="286" width="28" height="14" rx="5" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- tail -->
<path d="M62 215 Q30 220 22 255 Q28 270 40 260 Q38 235 62 225" stroke="#1C1C1C" stroke-width="4" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  I – Iguana                                               */
/* ────────────────────────────────────────────────────────── */
const iguana = wrap(320, 240,
`<!-- body -->
<ellipse cx="155" cy="145" rx="105" ry="50" ${SF}/>
<!-- head -->
<path d="M248 115 Q295 110 308 130 Q295 148 248 165 Q235 145 248 115 Z" ${SF}/>
<!-- dewlap -->
<path d="M260 150 Q265 172 258 185 Q250 175 255 158 Z" ${SF}/>
<!-- spine ridge -->
<path d="M80 100 Q100 88 120 95 Q140 84 160 92 Q180 82 200 90 Q220 80 240 92 Q258 84 270 100" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- spines -->
<line x1="90"  y1="100" x2="90"  y2="82"  stroke="#1C1C1C" stroke-width="4"/>
<line x1="110" y1="92"  x2="110" y2="74"  stroke="#1C1C1C" stroke-width="4"/>
<line x1="130" y1="88"  x2="130" y2="70"  stroke="#1C1C1C" stroke-width="4"/>
<line x1="150" y1="90"  x2="150" y2="72"  stroke="#1C1C1C" stroke-width="4"/>
<line x1="170" y1="88"  x2="170" y2="70"  stroke="#1C1C1C" stroke-width="4"/>
<line x1="190" y1="90"  x2="190" y2="72"  stroke="#1C1C1C" stroke-width="4"/>
<line x1="210" y1="88"  x2="210" y2="70"  stroke="#1C1C1C" stroke-width="4"/>
<!-- eye -->
<circle cx="282" cy="122" r="9" ${SF}/>
<circle cx="282" cy="122" r="5" fill="#1C1C1C"/>
<!-- legs -->
<path d="M90 188 Q75 205 65 215" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M140 190 Q130 210 120 222" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M180 190 Q190 210 200 222" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M230 188 Q245 205 255 215" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- tail -->
<path d="M55 145 Q20 140 8 120 Q18 128 50 135" stroke="#1C1C1C" stroke-width="5" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  J – Jellyfish                                            */
/* ────────────────────────────────────────────────────────── */
const jellyfish = wrap(280, 300,
`<!-- bell -->
<path d="M40 120 Q40 40 140 40 Q240 40 240 120 Q240 155 140 160 Q40 155 40 120 Z" ${SF}/>
<!-- inner dome -->
<path d="M70 115 Q70 70 140 68 Q210 70 210 115" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- eyes -->
<circle cx="115" cy="95" r="10" ${SF}/>
<circle cx="115" cy="95" r="5"  fill="#1C1C1C"/>
<circle cx="165" cy="95" r="10" ${SF}/>
<circle cx="165" cy="95" r="5"  fill="#1C1C1C"/>
<!-- smile -->
<path d="M118 115 Q140 128 162 115" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- tentacles -->
<path d="M75  158 Q68  200 80  240 Q88  260 78  280" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M100 160 Q95  200 105 240 Q110 260 102 280" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M125 162 Q122 202 130 242 Q133 262 126 282" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M155 162 Q158 202 150 242 Q147 262 154 282" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M180 160 Q185 200 175 240 Q170 260 178 280" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M205 158 Q212 200 200 240 Q192 260 202 280" stroke="#1C1C1C" stroke-width="4" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  K – Kangaroo                                             */
/* ────────────────────────────────────────────────────────── */
const kangaroo = wrap(280, 320,
`<!-- body -->
<path d="M80 200 Q75 130 110 110 Q150 95 170 130 Q185 158 180 200 Z" ${SF}/>
<!-- head -->
<path d="M110 110 Q115 70 140 62 Q165 56 172 72 Q178 92 162 110 Z" ${SF}/>
<!-- ear left -->
<path d="M120 75 L115 45 L132 60 Z" ${SF}/>
<!-- ear right -->
<path d="M155 70 L162 42 L168 62 Z" ${SF}/>
<!-- eye -->
<circle cx="152" cy="78" r="8" ${SF}/>
<circle cx="152" cy="78" r="4" fill="#1C1C1C"/>
<!-- nose -->
<ellipse cx="165" cy="90" rx="7" ry="5" fill="#1C1C1C"/>
<!-- arms -->
<path d="M150 145 Q180 150 195 168" stroke="#1C1C1C" stroke-width="6" fill="none"/>
<!-- pouch -->
<path d="M100 185 Q130 192 165 185 Q165 218 132 225 Q100 220 100 185 Z" ${SF}/>
<!-- baby in pouch -->
<circle cx="132" cy="200" r="15" ${SF}/>
<circle cx="128" cy="196" r="4" fill="#1C1C1C"/>
<!-- big legs -->
<path d="M82  200 L70  255 L88  260 L105 215" ${SF}/>
<path d="M175 200 L185 255 L205 258 L192 215" ${SF}/>
<!-- big feet -->
<ellipse cx="78"  cy="262" rx="22" ry="10" ${SF}/>
<ellipse cx="196" cy="261" rx="22" ry="10" ${SF}/>
<!-- tail -->
<path d="M80 205 Q50 230 45 268" stroke="#1C1C1C" stroke-width="8" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  L – Lion                                                 */
/* ────────────────────────────────────────────────────────── */
const lion = wrap(300, 300,
`<!-- mane -->
<circle cx="150" cy="130" r="90" ${SF}/>
<!-- face -->
<circle cx="150" cy="130" r="65" stroke="#1C1C1C" stroke-width="5" fill="#fff"/>
<!-- body -->
<ellipse cx="150" cy="240" rx="72" ry="55" ${SF}/>
<!-- eyes -->
<ellipse cx="125" cy="115" rx="14" ry="16" ${SF}/>
<ellipse cx="175" cy="115" rx="14" ry="16" ${SF}/>
<circle cx="125" cy="115" r="8" fill="#1C1C1C"/>
<circle cx="175" cy="115" r="8" fill="#1C1C1C"/>
<!-- nose -->
<path d="M140 138 L150 146 L160 138 Z" ${SF}/>
<!-- mouth -->
<path d="M150 146 Q135 158 128 152" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M150 146 Q165 158 172 152" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- whisker dots -->
<circle cx="115" cy="142" r="4" fill="#1C1C1C"/>
<circle cx="115" cy="152" r="4" fill="#1C1C1C"/>
<circle cx="185" cy="142" r="4" fill="#1C1C1C"/>
<circle cx="185" cy="152" r="4" fill="#1C1C1C"/>
<!-- mane detail lines -->
<path d="M68 100 Q80 88 95 96" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M60 130 Q72 122 85 130" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M68 160 Q80 155 92 162" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M232 100 Q220 88 205 96" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M240 130 Q228 122 215 130" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M232 160 Q220 155 208 162" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- paws -->
<ellipse cx="95"  cy="275" rx="28" ry="16" ${SF}/>
<ellipse cx="205" cy="275" rx="28" ry="16" ${SF}/>
<!-- tail -->
<path d="M218 230 Q255 210 260 180" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<circle cx="264" cy="175" r="12" ${SF}/>
`);

/* ────────────────────────────────────────────────────────── */
/*  M – Monkey                                               */
/* ────────────────────────────────────────────────────────── */
const monkey = wrap(280, 310,
`<!-- body -->
<ellipse cx="140" cy="215" rx="72" ry="65" ${SF}/>
<!-- head -->
<circle cx="140" cy="110" r="62" ${SF}/>
<!-- face plate -->
<ellipse cx="140" cy="120" rx="42" ry="35" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- ears -->
<circle cx="82"  cy="105" r="22" ${SF}/>
<circle cx="82"  cy="105" r="12" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<circle cx="198" cy="105" r="22" ${SF}/>
<circle cx="198" cy="105" r="12" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- eyes -->
<circle cx="120" cy="100" r="12" ${SF}/>
<circle cx="120" cy="100" r="6"  fill="#1C1C1C"/>
<circle cx="160" cy="100" r="12" ${SF}/>
<circle cx="160" cy="100" r="6"  fill="#1C1C1C"/>
<!-- nose -->
<ellipse cx="140" cy="120" rx="10" ry="7" fill="#1C1C1C"/>
<!-- nostrils -->
<circle cx="136" cy="120" r="3" fill="#fff"/>
<circle cx="144" cy="120" r="3" fill="#fff"/>
<!-- mouth -->
<path d="M122 132 Q140 145 158 132" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- arms -->
<path d="M72 200 Q40 218 28 240 Q32 258 45 252 Q52 228 75 215" stroke="#1C1C1C" stroke-width="7" fill="none"/>
<path d="M208 200 Q240 218 252 240 Q248 258 235 252 Q228 228 205 215" stroke="#1C1C1C" stroke-width="7" fill="none"/>
<!-- legs -->
<rect x="96"  y="268" width="30" height="40" rx="12" ${S}/>
<rect x="154" y="268" width="30" height="40" rx="12" ${S}/>
<!-- tail -->
<path d="M210 245 Q248 240 255 210 Q260 188 248 182" stroke="#1C1C1C" stroke-width="7" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  N – Narwhal                                              */
/* ────────────────────────────────────────────────────────── */
const narwhal = wrap(320, 240,
`<!-- body -->
<path d="M55 120 Q55 60 155 60 Q255 60 265 120 Q255 180 155 180 Q55 180 55 120 Z" ${SF}/>
<!-- tusk -->
<path d="M262 112 L318 82" stroke="#1C1C1C" stroke-width="6" fill="none"/>
<!-- tusk spiral marks -->
<line x1="275" y1="108" x2="278" y2="96" stroke="#1C1C1C" stroke-width="3"/>
<line x1="287" y1="103" x2="291" y2="91" stroke="#1C1C1C" stroke-width="3"/>
<line x1="299" y1="98"  x2="303" y2="86" stroke="#1C1C1C" stroke-width="3"/>
<!-- tail flukes -->
<path d="M58 120 L18 85 L18 155 Z" ${SF}/>
<!-- dorsal fin -->
<path d="M150 60 Q165 30 180 60" ${S} fill="#fff"/>
<!-- flipper -->
<path d="M185 135 Q205 165 200 180 Q182 168 178 145 Z" ${SF}/>
<!-- eye -->
<circle cx="232" cy="100" r="12" ${SF}/>
<circle cx="232" cy="100" r="6"  fill="#1C1C1C"/>
<!-- smile -->
<path d="M244 118 Q255 125 248 132" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- belly -->
<ellipse cx="155" cy="140" rx="75" ry="28" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  O – Owl                                                  */
/* ────────────────────────────────────────────────────────── */
const owl = wrap(260, 310,
`<!-- body -->
<ellipse cx="130" cy="210" rx="80" ry="85" ${SF}/>
<!-- head -->
<circle cx="130" cy="110" r="72" ${SF}/>
<!-- ear tufts -->
<path d="M90 55  L82 25 L105 45 Z" ${SF}/>
<path d="M170 55 L178 25 L155 45 Z" ${SF}/>
<!-- face disc -->
<path d="M72 110 Q90 65 130 65 Q170 65 188 110 Q170 148 130 150 Q90 148 72 110 Z"
  stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- eyes -->
<circle cx="108" cy="105" r="24" ${SF}/>
<circle cx="152" cy="105" r="24" ${SF}/>
<circle cx="108" cy="105" r="14" fill="#1C1C1C"/>
<circle cx="152" cy="105" r="14" fill="#1C1C1C"/>
<circle cx="112" cy="100" r="5"  fill="#fff"/>
<circle cx="156" cy="100" r="5"  fill="#fff"/>
<!-- beak -->
<path d="M121 128 L130 142 L139 128 Z" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- wings -->
<path d="M52  175 Q22  215 40  255 Q75  270 90  235 Q78  210 85  185 Z" ${SF}/>
<path d="M208 175 Q238 215 220 255 Q185 270 170 235 Q182 210 175 185 Z" ${SF}/>
<!-- feather lines body -->
<path d="M100 225 Q130 215 160 225" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M92  248 Q130 238 168 248" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- feet -->
<path d="M100 285 Q90 295 78 300" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M100 285 Q100 298 98 305" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M100 285 Q110 296 116 303" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M160 285 Q150 295 142 300" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M160 285 Q160 298 158 305" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M160 285 Q170 296 178 303" stroke="#1C1C1C" stroke-width="5" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  P – Penguin                                              */
/* ────────────────────────────────────────────────────────── */
const penguin = wrap(240, 320,
`<!-- body -->
<ellipse cx="120" cy="210" rx="72" ry="92" ${SF}/>
<!-- belly -->
<ellipse cx="120" cy="220" rx="46" ry="68" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- head -->
<circle cx="120" cy="100" r="60" ${SF}/>
<!-- face white -->
<ellipse cx="120" cy="108" rx="38" ry="42" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- eyes -->
<circle cx="104" cy="92" r="12" ${SF}/>
<circle cx="136" cy="92" r="12" ${SF}/>
<circle cx="104" cy="92" r="6"  fill="#1C1C1C"/>
<circle cx="136" cy="92" r="6"  fill="#1C1C1C"/>
<circle cx="106" cy="89" r="2.5" fill="#fff"/>
<circle cx="138" cy="89" r="2.5" fill="#fff"/>
<!-- beak -->
<path d="M112 116 L120 130 L128 116 Z" stroke="#1C1C1C" stroke-width="4" fill="#E67E22"/>
<!-- wings -->
<path d="M50  165 Q30  205 50  248 Q65  258 78  238 Q70  205 72  168 Z" ${SF}/>
<path d="M190 165 Q210 205 190 248 Q175 258 162 238 Q170 205 168 168 Z" ${SF}/>
<!-- feet -->
<ellipse cx="98"  cy="292" rx="28" ry="12" stroke="#1C1C1C" stroke-width="4" fill="#E67E22"/>
<ellipse cx="142" cy="292" rx="28" ry="12" stroke="#1C1C1C" stroke-width="4" fill="#E67E22"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  Q – Quail                                                */
/* ────────────────────────────────────────────────────────── */
const quail = wrap(260, 280,
`<!-- body -->
<ellipse cx="130" cy="190" rx="80" ry="65" ${SF}/>
<!-- head -->
<circle cx="130" cy="95" r="48" ${SF}/>
<!-- topknot plume -->
<path d="M130 50 Q118 25 112 10 Q125 22 130 46 Q135 22 148 10 Q142 25 130 50 Z" ${SF}/>
<!-- eye -->
<circle cx="148" cy="85" r="10" ${SF}/>
<circle cx="148" cy="85" r="5" fill="#1C1C1C"/>
<!-- beak -->
<path d="M162 100 L180 108 L163 112 Z" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- chest marking -->
<path d="M96 150 Q130 140 164 150 Q152 175 130 180 Q108 175 96 150 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- wing lines -->
<path d="M60 185 Q90 170 118 178" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M58 200 Q88 188 118 195" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- legs -->
<line x1="110" y1="248" x2="92"  y2="272" stroke="#1C1C1C" stroke-width="5"/>
<line x1="150" y1="248" x2="168" y2="272" stroke="#1C1C1C" stroke-width="5"/>
<!-- toes -->
<line x1="92"  y1="272" x2="72"  y2="278" stroke="#1C1C1C" stroke-width="4"/>
<line x1="92"  y1="272" x2="90"  y2="280" stroke="#1C1C1C" stroke-width="4"/>
<line x1="92"  y1="272" x2="108" y2="278" stroke="#1C1C1C" stroke-width="4"/>
<line x1="168" y1="272" x2="148" y2="278" stroke="#1C1C1C" stroke-width="4"/>
<line x1="168" y1="272" x2="168" y2="280" stroke="#1C1C1C" stroke-width="4"/>
<line x1="168" y1="272" x2="188" y2="278" stroke="#1C1C1C" stroke-width="4"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  R – Rabbit                                               */
/* ────────────────────────────────────────────────────────── */
const rabbit = wrap(240, 320,
`<!-- body -->
<ellipse cx="120" cy="225" rx="72" ry="75" ${SF}/>
<!-- belly -->
<ellipse cx="120" cy="235" rx="45" ry="50" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- head -->
<ellipse cx="120" cy="108" rx="58" ry="55" ${SF}/>
<!-- ears -->
<path d="M92 60 Q82 12 96 8 Q112 5 112 55 Z" ${SF}/>
<path d="M148 60 Q158 12 144 8 Q128 5 128 55 Z" ${SF}/>
<!-- inner ears -->
<path d="M94 56 Q88 22 98 18 Q108 16 108 52 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M146 56 Q152 22 142 18 Q132 16 132 52 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- eyes -->
<circle cx="102" cy="100" r="12" ${SF}/>
<circle cx="138" cy="100" r="12" ${SF}/>
<circle cx="102" cy="100" r="6" fill="#1C1C1C"/>
<circle cx="138" cy="100" r="6" fill="#1C1C1C"/>
<!-- nose -->
<path d="M113 118 L120 126 L127 118 Z" ${SF}/>
<!-- mouth -->
<path d="M120 126 Q108 135 104 130" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M120 126 Q132 135 136 130" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- front paws -->
<ellipse cx="84"  cy="280" rx="24" ry="16" ${SF}/>
<ellipse cx="156" cy="280" rx="24" ry="16" ${SF}/>
<!-- back feet -->
<ellipse cx="78"  cy="300" rx="32" ry="12" ${SF}/>
<ellipse cx="162" cy="300" rx="32" ry="12" ${SF}/>
<!-- fluffy tail -->
<circle cx="178" cy="248" r="18" ${SF}/>
`);

/* ────────────────────────────────────────────────────────── */
/*  S – Snail                                                */
/* ────────────────────────────────────────────────────────── */
const snail = wrap(300, 240,
`<!-- shell body -->
<circle cx="175" cy="115" r="85" ${SF}/>
<!-- shell spiral -->
<path d="M175 115 m0,-55 a55,55 0 1,0 0,110 a40,40 0 1,1 0,-80 a25,25 0 1,0 0,50 a12,12 0 1,1 0,-24" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- body -->
<path d="M90 155 Q45 148 20 160 Q10 175 20 185 Q45 178 90 180 Q130 190 175 192 Q220 190 252 185 Q260 178 252 168 Q220 162 175 165 Q140 162 120 158 Z" ${SF}/>
<!-- head -->
<circle cx="42" cy="162" r="28" ${SF}/>
<!-- eye stalks -->
<line x1="36" y1="138" x2="30" y2="112" stroke="#1C1C1C" stroke-width="4"/>
<circle cx="28" cy="110" r="7" ${SF}/>
<circle cx="28" cy="110" r="3.5" fill="#1C1C1C"/>
<line x1="48" y1="136" x2="54" y2="112" stroke="#1C1C1C" stroke-width="4"/>
<circle cx="56" cy="110" r="7" ${SF}/>
<circle cx="56" cy="110" r="3.5" fill="#1C1C1C"/>
<!-- mouth -->
<path d="M30 170 Q42 178 54 170" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- foot ripples -->
<path d="M80  178 Q130 172 180 175" stroke="#1C1C1C" stroke-width="2.5" fill="none"/>
<path d="M85  183 Q135 177 185 180" stroke="#1C1C1C" stroke-width="2.5" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  T – Tiger                                                */
/* ────────────────────────────────────────────────────────── */
const tiger = wrap(300, 300,
`<!-- body -->
<ellipse cx="150" cy="210" rx="90" ry="70" ${SF}/>
<!-- head -->
<circle cx="150" cy="110" r="70" ${SF}/>
<!-- ears -->
<path d="M90 65 L78 32 L112 52 Z" ${SF}/>
<path d="M210 65 L222 32 L188 52 Z" ${SF}/>
<!-- inner ears -->
<path d="M92 62 L84 40 L108 54 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M208 62 L216 40 L192 54 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- eyes -->
<ellipse cx="122" cy="100" rx="16" ry="18" ${SF}/>
<ellipse cx="178" cy="100" rx="16" ry="18" ${SF}/>
<ellipse cx="122" cy="100" rx="7" ry="13" fill="#1C1C1C"/>
<ellipse cx="178" cy="100" rx="7" ry="13" fill="#1C1C1C"/>
<!-- nose -->
<path d="M140 128 L150 136 L160 128 Z" ${SF}/>
<!-- mouth -->
<path d="M150 136 Q136 148 128 143" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M150 136 Q164 148 172 143" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- whiskers -->
<line x1="82"  y1="128" x2="136" y2="130" stroke="#1C1C1C" stroke-width="3"/>
<line x1="82"  y1="138" x2="136" y2="136" stroke="#1C1C1C" stroke-width="3"/>
<line x1="164" y1="130" x2="218" y2="128" stroke="#1C1C1C" stroke-width="3"/>
<line x1="164" y1="136" x2="218" y2="138" stroke="#1C1C1C" stroke-width="3"/>
<!-- stripes on head -->
<path d="M120 68 Q124 50 128 68" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M145 62 Q148 44 152 62" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M170 68 Q174 50 178 68" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- stripes on body -->
<path d="M105 190 Q110 172 118 190" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M135 185 Q140 168 148 185" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M165 185 Q170 168 178 185" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M195 190 Q200 172 208 190" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- paws -->
<ellipse cx="98"  cy="268" rx="28" ry="16" ${SF}/>
<ellipse cx="202" cy="268" rx="28" ry="16" ${SF}/>
<!-- tail -->
<path d="M232 232 Q268 215 272 180" stroke="#1C1C1C" stroke-width="7" fill="none"/>
<!-- tail stripes -->
<path d="M242 225 Q250 215 258 210" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M250 210 Q258 200 265 194" stroke="#1C1C1C" stroke-width="3" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  U – Unicorn                                              */
/* ────────────────────────────────────────────────────────── */
const unicorn = wrap(300, 300,
`<!-- body -->
<ellipse cx="150" cy="215" rx="100" ry="64" ${SF}/>
<!-- neck -->
<path d="M188 160 L205 80 L240 85 L225 165 Z" ${SF}/>
<!-- head -->
<path d="M205 80 Q228 50 255 60 Q272 80 258 98 Q242 108 225 100 Q212 92 205 80 Z" ${SF}/>
<!-- horn -->
<path d="M228 52 L240 18 L248 54 Z" stroke="#1C1C1C" stroke-width="4" fill="#fff"/>
<line x1="232" y1="48" x2="244" y2="22" stroke="#1C1C1C" stroke-width="2.5"/>
<line x1="236" y1="50" x2="246" y2="26" stroke="#1C1C1C" stroke-width="2.5"/>
<!-- ear -->
<path d="M218 55 L215 35 L228 48 Z" ${SF}/>
<!-- eye -->
<circle cx="248" cy="72" r="9"  ${SF}/>
<circle cx="248" cy="72" r="4.5" fill="#1C1C1C"/>
<!-- mane -->
<path d="M188 160 Q200 128 208 100 Q215 80 222 65" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M193 158 Q206 126 214 98 Q221 78 228 63" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M198 156 Q212 124 220 96" stroke="#1C1C1C" stroke-width="2.5" fill="none"/>
<!-- legs -->
<rect x="78"  y="258" width="26" height="40" rx="10" ${S}/>
<rect x="116" y="262" width="26" height="36" rx="10" ${S}/>
<rect x="172" y="262" width="26" height="36" rx="10" ${S}/>
<rect x="210" y="258" width="26" height="40" rx="10" ${S}/>
<!-- tail -->
<path d="M52 218 Q20 208 14 178 Q10 155 22 160 Q20 180 48 205" stroke="#1C1C1C" stroke-width="4" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  V – Vulture                                              */
/* ────────────────────────────────────────────────────────── */
const vulture = wrap(300, 300,
`<!-- body -->
<ellipse cx="150" cy="190" rx="75" ry="70" ${SF}/>
<!-- head (bald/featherless) -->
<circle cx="150" cy="88" r="42" ${SF}/>
<!-- ruff of feathers -->
<path d="M112 125 Q150 140 188 125" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- hooked beak -->
<path d="M168 95 Q195 95 200 108 Q195 120 178 115 Q175 105 168 102 Z" ${SF}/>
<!-- eye -->
<circle cx="158" cy="82" r="10" ${SF}/>
<circle cx="158" cy="82" r="5" fill="#1C1C1C"/>
<!-- nostril -->
<circle cx="188" cy="100" r="4" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- wings spread wide -->
<path d="M78  175 Q30  155 8   175 Q20  210 60  205 Q88  202 95  185 Z" ${SF}/>
<path d="M222 175 Q270 155 292 175 Q280 210 240 205 Q212 202 205 185 Z" ${SF}/>
<!-- primary feathers left -->
<path d="M36 188 L24 200" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M48 184 L38 198" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M60 180 L52 196" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- primary feathers right -->
<path d="M264 188 L276 200" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M252 184 L262 198" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M240 180 L248 196" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- tail feathers -->
<path d="M130 255 L118 282" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M150 258 L150 286" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M170 255 L182 282" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- talons -->
<line x1="128" y1="258" x2="112" y2="278" stroke="#1C1C1C" stroke-width="5"/>
<line x1="128" y1="258" x2="118" y2="282" stroke="#1C1C1C" stroke-width="5"/>
<line x1="172" y1="258" x2="188" y2="278" stroke="#1C1C1C" stroke-width="5"/>
<line x1="172" y1="258" x2="178" y2="282" stroke="#1C1C1C" stroke-width="5"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  W – Whale                                                */
/* ────────────────────────────────────────────────────────── */
const whale = wrap(320, 260,
`<!-- body -->
<path d="M40 130 Q40 60 160 58 Q280 58 288 130 Q280 200 160 200 Q40 200 40 130 Z" ${SF}/>
<!-- tail flukes -->
<path d="M42 130 L5  95 L5  165 Z" ${SF}/>
<!-- dorsal fin -->
<path d="M160 58 Q178 28 195 55" ${S} fill="#fff"/>
<!-- flipper -->
<path d="M200 148 Q235 175 228 198 Q205 185 198 162 Z" ${SF}/>
<!-- mouth / jaw line -->
<path d="M250 148 Q275 155 272 175" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- eye -->
<circle cx="240" cy="105" r="14" ${SF}/>
<circle cx="240" cy="105" r="7"  fill="#1C1C1C"/>
<!-- blowhole spray -->
<ellipse cx="160" cy="60" rx="8" ry="5" fill="#1C1C1C"/>
<path d="M155 56 Q148 38 145 28" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M160 55 Q160 36 162 26" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<path d="M165 56 Q172 38 175 28" stroke="#1C1C1C" stroke-width="3.5" fill="none"/>
<!-- belly -->
<ellipse cx="155" cy="155" rx="88" ry="32" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  X – X-ray Fish (transparent fish silhouette)            */
/* ────────────────────────────────────────────────────────── */
const xrayfish = wrap(300, 240,
`<!-- body outline -->
<ellipse cx="145" cy="118" rx="95" ry="68" ${SF}/>
<!-- tail -->
<path d="M52 118 L14 72 L14 164 Z" ${SF}/>
<!-- top fin -->
<path d="M145 50 Q168 22 190 48" ${S} fill="#fff"/>
<!-- skeleton spine -->
<line x1="55" y1="118" x2="228" y2="118" stroke="#1C1C1C" stroke-width="4.5"/>
<!-- ribs -->
<line x1="90"  y1="118" x2="82"  y2="95"  stroke="#1C1C1C" stroke-width="3"/>
<line x1="90"  y1="118" x2="82"  y2="141" stroke="#1C1C1C" stroke-width="3"/>
<line x1="115" y1="118" x2="108" y2="90"  stroke="#1C1C1C" stroke-width="3"/>
<line x1="115" y1="118" x2="108" y2="146" stroke="#1C1C1C" stroke-width="3"/>
<line x1="140" y1="118" x2="134" y2="88"  stroke="#1C1C1C" stroke-width="3"/>
<line x1="140" y1="118" x2="134" y2="148" stroke="#1C1C1C" stroke-width="3"/>
<line x1="165" y1="118" x2="160" y2="92"  stroke="#1C1C1C" stroke-width="3"/>
<line x1="165" y1="118" x2="160" y2="144" stroke="#1C1C1C" stroke-width="3"/>
<line x1="188" y1="118" x2="184" y2="98"  stroke="#1C1C1C" stroke-width="3"/>
<line x1="188" y1="118" x2="184" y2="138" stroke="#1C1C1C" stroke-width="3"/>
<!-- heart shape -->
<path d="M195 95 Q200 88 207 92 Q214 88 218 95 Q218 104 207 112 Q196 104 195 95 Z" ${SF}/>
<!-- eye socket -->
<circle cx="215" cy="100" r="16" ${SF}/>
<circle cx="215" cy="100" r="8"  fill="#1C1C1C"/>
<!-- mouth open -->
<path d="M236 112 Q245 118 238 125 Q245 125 238 132" stroke="#1C1C1C" stroke-width="4" fill="none"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  Y – Yak                                                  */
/* ────────────────────────────────────────────────────────── */
const yak = wrap(320, 300,
`<!-- shaggy body -->
<ellipse cx="160" cy="205" rx="112" ry="72" ${SF}/>
<!-- shaggy belly fringe -->
<path d="M50 240 Q60 262 72 255 Q78 268 90 260 Q96 275 108 266 Q115 278 128 268 Q136 280 150 270 Q158 282 170 272 Q178 280 190 270 Q196 278 208 268 Q216 272 222 260 Q234 268 238 255 Q248 262 255 242" stroke="#1C1C1C" stroke-width="4" fill="#fff"/>
<!-- head -->
<ellipse cx="160" cy="105" rx="70" ry="58" ${SF}/>
<!-- ears -->
<ellipse cx="95"  cy="100" rx="18" ry="28" transform="rotate(-12 95 100)" ${SF}/>
<ellipse cx="225" cy="100" rx="18" ry="28" transform="rotate(12 225 100)" ${SF}/>
<!-- horns -->
<path d="M105 72 Q88 48 75 52 Q72 62 88 68" stroke="#1C1C1C" stroke-width="6" fill="none"/>
<path d="M215 72 Q232 48 245 52 Q248 62 232 68" stroke="#1C1C1C" stroke-width="6" fill="none"/>
<!-- eyes -->
<circle cx="135" cy="95" r="12" ${SF}/>
<circle cx="185" cy="95" r="12" ${SF}/>
<circle cx="135" cy="95" r="6"  fill="#1C1C1C"/>
<circle cx="185" cy="95" r="6"  fill="#1C1C1C"/>
<!-- nose -->
<ellipse cx="160" cy="120" rx="28" ry="18" ${SF}/>
<ellipse cx="152" cy="116" rx="7"  ry="5"  fill="#1C1C1C"/>
<ellipse cx="168" cy="116" rx="7"  ry="5"  fill="#1C1C1C"/>
<!-- legs -->
<rect x="82"  y="260" width="28" height="38" rx="10" ${S}/>
<rect x="120" y="262" width="28" height="36" rx="10" ${S}/>
<rect x="172" y="262" width="28" height="36" rx="10" ${S}/>
<rect x="210" y="260" width="28" height="38" rx="10" ${S}/>
<!-- tail -->
<path d="M268 215 Q292 220 295 245" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<circle cx="296" cy="248" r="7" fill="#1C1C1C"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  Z – Zebra                                                */
/* ────────────────────────────────────────────────────────── */
const zebra = wrap(320, 300,
`<!-- body -->
<ellipse cx="158" cy="210" rx="105" ry="67" ${SF}/>
<!-- neck -->
<path d="M195 155 L210 78 L245 82 L232 160 Z" ${SF}/>
<!-- head -->
<path d="M210 78 Q232 48 258 58 Q275 78 260 96 Q244 108 228 100 Q215 90 210 78 Z" ${SF}/>
<!-- mane -->
<path d="M210 78 Q215 58 222 42 Q228 55 218 72" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- ear -->
<path d="M225 56 L222 34 L236 48 Z" ${SF}/>
<!-- eye -->
<circle cx="250" cy="68" r="9" ${SF}/>
<circle cx="250" cy="68" r="5" fill="#1C1C1C"/>
<!-- nostril -->
<path d="M264 88 Q270 92 268 98" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- body stripes (curved) -->
<path d="M90 175 Q95 158 102 175" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M118 170 Q124 152 132 170" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M148 168 Q154 150 162 168" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M178 170 Q184 152 192 170" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<path d="M208 175 Q214 158 222 175" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- neck stripes -->
<path d="M208 118 Q215 108 222 118" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M212 138 Q219 128 226 138" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- legs -->
<rect x="80"  y="258" width="28" height="40" rx="10" ${S}/>
<rect x="118" y="262" width="28" height="36" rx="10" ${S}/>
<rect x="175" y="262" width="28" height="36" rx="10" ${S}/>
<rect x="213" y="258" width="28" height="40" rx="10" ${S}/>
<!-- leg stripes -->
<line x1="80"  y1="275" x2="108" y2="275" stroke="#1C1C1C" stroke-width="4"/>
<line x1="80"  y1="285" x2="108" y2="285" stroke="#1C1C1C" stroke-width="4"/>
<line x1="175" y1="275" x2="203" y2="275" stroke="#1C1C1C" stroke-width="4"/>
<line x1="175" y1="285" x2="203" y2="285" stroke="#1C1C1C" stroke-width="4"/>
<!-- hooves -->
<rect x="80"  y="288" width="28" height="12" rx="4" stroke="#1C1C1C" stroke-width="4" fill="#555"/>
<rect x="213" y="288" width="28" height="12" rx="4" stroke="#1C1C1C" stroke-width="4" fill="#555"/>
<!-- tail -->
<path d="M55 215 Q22 210 16 185" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- tail tuft -->
<circle cx="14" cy="182" r="8" ${SF}/>
`);

/* ────────────────────────────────────────────────────────── */
/*  VEHICLE & NATURE extras for variety                     */
/* ────────────────────────────────────────────────────────── */

/* ── Car ── */
const car = wrap(320, 220,
`<!-- body lower -->
<rect x="20" y="125" width="280" height="72" rx="14" ${S}/>
<!-- body upper / cabin -->
<path d="M80 125 Q95 68 130 62 L200 62 Q228 68 240 125 Z" ${SF}/>
<!-- windscreen -->
<path d="M94 125 Q106 78 130 72 L195 72 Q212 80 218 125 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- windows -->
<path d="M100 120 Q108 85 128 78 L165 78 Q155 120 138 120 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M162 120 L165 78 Q188 82 208 120 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- wheels -->
<circle cx="80"  cy="197" r="34" ${S}/>
<circle cx="80"  cy="197" r="18" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="240" cy="197" r="34" ${S}/>
<circle cx="240" cy="197" r="18" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- headlight -->
<ellipse cx="298" cy="148" rx="14" ry="10" ${S}/>
<!-- tail light -->
<rect x="20" y="142" width="14" height="18" rx="5" ${S}/>
<!-- door -->
<rect x="155" y="130" width="2" height="62" rx="1" fill="#1C1C1C"/>
<!-- door handle -->
<rect x="174" y="156" width="20" height="6" rx="3" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
`);

/* ── Rocket ── */
const rocket = wrap(200, 340,
`<!-- body -->
<path d="M100 30 Q130 30 145 80 L152 240 Q130 252 100 254 Q70 252 48 240 L55 80 Q70 30 100 30 Z" ${SF}/>
<!-- nose cone -->
<path d="M55 80 Q68 30 100 10 Q132 30 145 80 Z" stroke="#1C1C1C" stroke-width="5" fill="#fff"/>
<!-- window -->
<circle cx="100" cy="130" r="30" ${S}/>
<circle cx="100" cy="130" r="18" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- fins left -->
<path d="M55 200 L22 255 L55 242 Z" ${SF}/>
<!-- fins right -->
<path d="M145 200 L178 255 L145 242 Z" ${SF}/>
<!-- exhaust -->
<path d="M68 252 Q60 272 55 290 Q70 278 80 295 Q92 278 100 300 Q108 278 120 295 Q130 278 145 290 Q140 272 132 252 Z" ${SF}/>
<!-- window inner cross -->
<line x1="100" y1="113" x2="100" y2="147" stroke="#1C1C1C" stroke-width="3"/>
<line x1="83"  y1="130" x2="117" y2="130" stroke="#1C1C1C" stroke-width="3"/>
<!-- stars -->
<circle cx="38"  cy="55" r="4" fill="#1C1C1C"/>
<circle cx="165" cy="80" r="5" fill="#1C1C1C"/>
<circle cx="22"  cy="115" r="3" fill="#1C1C1C"/>
`);

/* ── Sun ── */
const sun = wrap(300, 300,
`<!-- sun rays -->
<line x1="150" y1="18" x2="150" y2="45" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="150" y1="255" x2="150" y2="282" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="18"  y1="150" x2="45"  y2="150" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="255" y1="150" x2="282" y2="150" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="52"  y1="52"  x2="72"  y2="72"  stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="228" y1="228" x2="248" y2="248" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="228" y1="52"  x2="248" y2="72"  stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="52"  y1="228" x2="72"  y2="248" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<!-- sun body -->
<circle cx="150" cy="150" r="85" ${SF}/>
<!-- eyes -->
<circle cx="122" cy="138" r="12" ${SF}/>
<circle cx="122" cy="138" r="6" fill="#1C1C1C"/>
<circle cx="178" cy="138" r="12" ${SF}/>
<circle cx="178" cy="138" r="6" fill="#1C1C1C"/>
<!-- smile -->
<path d="M112 168 Q150 192 188 168" stroke="#1C1C1C" stroke-width="5" fill="none"/>
`);

/* ── House ── */
const house = wrap(300, 280,
`<!-- roof -->
<path d="M30 148 L150 30 L270 148 Z" ${SF}/>
<!-- chimney -->
<rect x="195" y="50" width="28" height="55" ${S}/>
<path d="M190 52 Q209 42 228 52" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- walls -->
<rect x="45" y="148" width="210" height="118" ${S}/>
<!-- door -->
<rect x="118" y="196" width="52" height="72" rx="6" ${S}/>
<circle cx="162" cy="232" r="5" fill="#1C1C1C"/>
<path d="M118 232 Q144 225 170 232" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- left window -->
<rect x="62"  y="170" width="55" height="48" rx="5" ${S}/>
<line x1="89"  y1="170" x2="89"  y2="218" stroke="#1C1C1C" stroke-width="3"/>
<line x1="62"  y1="194" x2="117" y2="194" stroke="#1C1C1C" stroke-width="3"/>
<!-- right window -->
<rect x="183" y="170" width="55" height="48" rx="5" ${S}/>
<line x1="210" y1="170" x2="210" y2="218" stroke="#1C1C1C" stroke-width="3"/>
<line x1="183" y1="194" x2="238" y2="194" stroke="#1C1C1C" stroke-width="3"/>
`);

/* ── Flower ── */
const flower = wrap(280, 310,
`<!-- stem -->
<line x1="140" y1="175" x2="140" y2="295" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
<!-- leaf left -->
<path d="M140 245 Q108 232 100 210 Q128 215 140 238 Z" ${SF}/>
<!-- leaf right -->
<path d="M140 220 Q172 208 180 185 Q152 192 140 215 Z" ${SF}/>
<!-- petals (8) -->
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(0   140 140)" ${SF}/>
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(45  140 140)" ${SF}/>
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(90  140 140)" ${SF}/>
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(135 140 140)" ${SF}/>
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(180 140 140)" ${SF}/>
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(225 140 140)" ${SF}/>
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(270 140 140)" ${SF}/>
<ellipse cx="140" cy="100" rx="25" ry="45" transform="rotate(315 140 140)" ${SF}/>
<!-- centre -->
<circle cx="140" cy="140" r="35" ${S}/>
<!-- centre dots -->
<circle cx="130" cy="133" r="5" fill="#1C1C1C"/>
<circle cx="150" cy="133" r="5" fill="#1C1C1C"/>
<circle cx="140" cy="148" r="5" fill="#1C1C1C"/>
`);

/* ── Airplane ── */
const airplane = wrap(320, 240,
`<!-- fuselage -->
<ellipse cx="160" cy="128" rx="130" ry="27" ${SF}/>
<!-- tail -->
<path d="M30 118 L8 118 L8 138 L30 138 Z" ${SF}/>
<!-- main wings -->
<path d="M118 128 L78 55 L148 92 Z" ${SF}/>
<path d="M118 128 L78 200 L148 163 Z" ${SF}/>
<!-- vertical tail fin -->
<path d="M42 118 L55 68 L72 86 L72 118 Z" ${SF}/>
<!-- horizontal tail fins -->
<path d="M30 118 L12 98 L55 112 Z" ${SF}/>
<path d="M30 138 L12 158 L55 144 Z" ${SF}/>
<!-- engines -->
<ellipse cx="118" cy="96"  rx="18" ry="10" ${S}/>
<ellipse cx="118" cy="162" rx="18" ry="10" ${S}/>
<!-- windows -->
<circle cx="200" cy="122" r="11" ${S}/>
<circle cx="228" cy="122" r="11" ${S}/>
<circle cx="256" cy="122" r="11" ${S}/>
<!-- nose -->
<path d="M285 118 Q310 122 312 128 Q310 134 285 138 Z" ${SF}/>
`);

/* ── Bus ── */
const bus = wrap(320, 210,
`<!-- body -->
<rect x="18" y="65" width="284" height="112" rx="12" ${S}/>
<!-- roof detail -->
<rect x="28" y="58" width="264" height="14" rx="6" ${S}/>
<!-- front face -->
<rect x="18" y="65" width="40" height="112" rx="12" ${S}/>
<!-- front windshield -->
<rect x="24" y="72" width="28" height="32" rx="4" ${S}/>
<!-- side windows -->
<rect x="72"  y="80" width="42" height="38" rx="5" ${S}/>
<rect x="124" y="80" width="42" height="38" rx="5" ${S}/>
<rect x="176" y="80" width="42" height="38" rx="5" ${S}/>
<rect x="228" y="80" width="42" height="38" rx="5" ${S}/>
<!-- door -->
<rect x="272" y="86" width="28" height="62" rx="4" ${S}/>
<line x1="286" y1="86" x2="286" y2="148" stroke="#1C1C1C" stroke-width="3"/>
<!-- headlight -->
<rect x="18" y="140" width="16" height="12" rx="4" ${S}/>
<!-- wheels -->
<circle cx="82"  cy="185" r="28" ${S}/>
<circle cx="82"  cy="185" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="238" cy="185" r="28" ${S}/>
<circle cx="238" cy="185" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
`);

/* ── Dump Truck ── */
const dumpTruck = wrap(320, 230,
`<!-- cab -->
<rect x="20" y="82" width="90" height="98" rx="10" ${S}/>
<!-- cab roof -->
<path d="M20 82 Q20 56 50 54 L106 54 L110 82 Z" ${SF}/>
<!-- cab window -->
<rect x="30" y="62" width="55" height="36" rx="4" ${S}/>
<!-- dump bed -->
<rect x="108" y="78" width="192" height="100" rx="8" ${S}/>
<!-- bed bottom plate -->
<rect x="108" y="154" width="192" height="26" rx="4" ${S}/>
<!-- bed ribs -->
<line x1="155" y1="78" x2="155" y2="180" stroke="#1C1C1C" stroke-width="3"/>
<line x1="202" y1="78" x2="202" y2="180" stroke="#1C1C1C" stroke-width="3"/>
<line x1="249" y1="78" x2="249" y2="180" stroke="#1C1C1C" stroke-width="3"/>
<!-- chassis -->
<rect x="20" y="180" width="278" height="16" rx="5" ${S}/>
<!-- headlight -->
<rect x="18" y="114" width="16" height="12" rx="3" ${S}/>
<!-- wheels -->
<circle cx="72"  cy="204" r="26" ${S}/>
<circle cx="72"  cy="204" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="200" cy="204" r="26" ${S}/>
<circle cx="200" cy="204" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="256" cy="204" r="26" ${S}/>
<circle cx="256" cy="204" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
`);

/* ── Engine / Train ── */
const trainEngine = wrap(320, 240,
`<!-- boiler -->
<ellipse cx="148" cy="128" rx="110" ry="52" ${SF}/>
<!-- cab -->
<rect x="220" y="88" width="75" height="92" rx="8" ${S}/>
<!-- cab window -->
<rect x="230" y="98" width="34" height="30" rx="4" ${S}/>
<!-- smokestack -->
<rect x="80" y="55" width="22" height="52" rx="8" ${S}/>
<path d="M68 55 L68 52 L114 52 L114 55" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- smoke puffs -->
<circle cx="84"  cy="38" r="14" ${S}/>
<circle cx="98"  cy="26" r="18" ${S}/>
<circle cx="115" cy="20" r="12" ${S}/>
<!-- front plate -->
<rect x="20" y="110" width="40" height="58" rx="6" ${S}/>
<!-- cow catcher -->
<path d="M20 155 L5 180 L60 180 L60 155 Z" ${SF}/>
<!-- wheels -->
<circle cx="82"  cy="196" r="28" ${S}/>
<circle cx="82"  cy="196" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="148" cy="196" r="28" ${S}/>
<circle cx="148" cy="196" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="214" cy="196" r="28" ${S}/>
<circle cx="214" cy="196" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="276" cy="196" r="22" ${S}/>
<circle cx="276" cy="196" r="11" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- connecting rod -->
<line x1="82" y1="185" x2="214" y2="185" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
`);

/* ── Fire Truck ── */
const fireTruck = wrap(320, 220,
`<!-- body -->
<rect x="15" y="90" width="290" height="94" rx="10" ${S}/>
<!-- cab roof -->
<path d="M15 90 Q15 60 42 58 L125 58 L128 90 Z" ${SF}/>
<!-- cab window -->
<rect x="25" y="66" width="65" height="35" rx="4" ${S}/>
<!-- ladder on top -->
<rect x="130" y="72" width="170" height="18" rx="4" ${S}/>
<line x1="155" y1="72" x2="155" y2="90" stroke="#1C1C1C" stroke-width="3"/>
<line x1="180" y1="72" x2="180" y2="90" stroke="#1C1C1C" stroke-width="3"/>
<line x1="205" y1="72" x2="205" y2="90" stroke="#1C1C1C" stroke-width="3"/>
<line x1="230" y1="72" x2="230" y2="90" stroke="#1C1C1C" stroke-width="3"/>
<line x1="255" y1="72" x2="255" y2="90" stroke="#1C1C1C" stroke-width="3"/>
<line x1="280" y1="72" x2="280" y2="90" stroke="#1C1C1C" stroke-width="3"/>
<!-- hose reel -->
<circle cx="268" cy="132" r="24" ${S}/>
<circle cx="268" cy="132" r="12" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- side compartment -->
<rect x="135" y="102" width="38" height="28" rx="4" ${S}/>
<!-- light bar -->
<rect x="20" y="56" width="105" height="10" rx="4" ${S}/>
<rect x="42" y="50" width="20" height="10" rx="4" ${S}/>
<rect x="78" y="50" width="20" height="10" rx="4" ${S}/>
<!-- headlight -->
<rect x="14" y="130" width="16" height="12" rx="3" ${S}/>
<!-- wheels -->
<circle cx="78"  cy="192" r="28" ${S}/>
<circle cx="78"  cy="192" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="232" cy="192" r="28" ${S}/>
<circle cx="232" cy="192" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
`);

/* ── Go-Kart ── */
const goKart = wrap(300, 210,
`<!-- chassis/body -->
<path d="M40 138 Q40 108 76 104 L224 104 Q260 108 260 138 L260 163 Q224 174 150 174 Q76 174 40 163 Z" ${SF}/>
<!-- nose -->
<path d="M40 138 L18 140 Q15 150 18 158 L40 155 Z" ${SF}/>
<!-- rear -->
<path d="M260 138 L282 140 Q285 150 282 158 L260 155 Z" ${SF}/>
<!-- seat -->
<rect x="120" y="86" width="60" height="40" rx="8" ${S}/>
<!-- steering wheel -->
<circle cx="110" cy="100" r="20" ${S}/>
<line x1="110" y1="80" x2="110" y2="120" stroke="#1C1C1C" stroke-width="4"/>
<line x1="90"  y1="100" x2="130" y2="100" stroke="#1C1C1C" stroke-width="4"/>
<!-- roll bar -->
<path d="M130 86 L125 54 Q150 46 175 54 L170 86" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- wheels -->
<ellipse cx="72"  cy="162" rx="20" ry="28" ${S}/>
<ellipse cx="72"  cy="162" rx="10" ry="14" stroke="#1C1C1C" stroke-width="3" fill="#888"/>
<ellipse cx="228" cy="162" rx="20" ry="28" ${S}/>
<ellipse cx="228" cy="162" rx="10" ry="14" stroke="#1C1C1C" stroke-width="3" fill="#888"/>
<ellipse cx="72"  cy="120" rx="20" ry="28" ${S}/>
<ellipse cx="228" cy="120" rx="20" ry="28" ${S}/>
`);

/* ── Helicopter ── */
const helicopter = wrap(320, 240,
`<!-- main rotor blade -->
<line x1="28" y1="55" x2="292" y2="55" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<!-- rotor hub -->
<rect x="148" y="42" width="24" height="26" rx="6" ${S}/>
<!-- body -->
<path d="M68 68 Q68 56 112 54 L245 68 Q272 80 268 130 Q245 148 160 148 Q80 148 68 130 Z" ${SF}/>
<!-- cockpit bubble -->
<ellipse cx="62" cy="112" rx="20" ry="20" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- window strip -->
<path d="M100 70 Q130 60 175 62 Q198 66 206 80 Q175 92 100 90 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- tail boom -->
<path d="M245 105 L305 90 L308 100 L305 112 L245 118 Z" ${SF}/>
<!-- tail fin vertical -->
<path d="M280 90 L286 62 L308 80 Z" ${SF}/>
<!-- tail rotor -->
<line x1="308" y1="70" x2="308" y2="132" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
<circle cx="308" cy="100" r="8" ${S}/>
<!-- skids -->
<line x1="80"  y1="148" x2="80"  y2="178" stroke="#1C1C1C" stroke-width="5"/>
<line x1="200" y1="148" x2="200" y2="178" stroke="#1C1C1C" stroke-width="5"/>
<line x1="48"  y1="178" x2="222" y2="178" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
`);

/* ── Ice Cream Truck ── */
const iceCreamTruck = wrap(320, 220,
`<!-- body -->
<rect x="18" y="75" width="284" height="108" rx="10" ${S}/>
<!-- roof -->
<rect x="28" y="62" width="264" height="18" rx="6" ${S}/>
<!-- cab front -->
<path d="M18 75 L18 142 Q35 142 45 130 L45 75 Z" ${SF}/>
<!-- cab window -->
<rect x="22" y="80" width="20" height="28" rx="3" ${S}/>
<!-- side windows -->
<rect x="58"  y="86" width="52" height="40" rx="4" ${S}/>
<rect x="120" y="86" width="52" height="40" rx="4" ${S}/>
<!-- serving window -->
<rect x="200" y="82" width="80" height="55" rx="5" ${S}/>
<!-- ice cream cone sign -->
<path d="M216 56 L222 76 L240 76 L225 90 L232 112 L216 100 L200 112 L207 90 L192 76 L210 76 Z" ${SF}/>
<!-- door -->
<rect x="55" y="120" width="42" height="65" rx="4" ${S}/>
<line x1="76" y1="120" x2="76" y2="185" stroke="#1C1C1C" stroke-width="3"/>
<!-- headlight -->
<rect x="18" y="135" width="16" height="12" rx="3" ${S}/>
<!-- wheels -->
<circle cx="75"  cy="193" r="27" ${S}/>
<circle cx="75"  cy="193" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="235" cy="193" r="27" ${S}/>
<circle cx="235" cy="193" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
`);

/* ── Jet ── */
const jet = wrap(320, 220,
`<!-- fuselage -->
<path d="M15 118 Q15 108 50 106 L270 106 Q295 108 308 118 Q295 130 270 132 L50 132 Q15 128 15 118 Z" ${SF}/>
<!-- cockpit -->
<path d="M270 106 Q295 108 308 118 Q295 130 270 132 L265 120 Z" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- left delta wing -->
<path d="M200 118 L80 58 L100 118 Z" ${SF}/>
<!-- right delta wing -->
<path d="M200 118 L80 178 L100 118 Z" ${SF}/>
<!-- vertical tail fin -->
<path d="M45 106 L38 68 L70 92 L70 106 Z" ${SF}/>
<!-- horizontal tail fins -->
<path d="M45 106 L18 88 L55 106 Z" ${SF}/>
<path d="M45 132 L18 150 L55 132 Z" ${SF}/>
<!-- engine pods -->
<ellipse cx="135" cy="72"  rx="30" ry="12" ${S}/>
<ellipse cx="135" cy="164" rx="30" ry="12" ${S}/>
<!-- engine nozzles -->
<ellipse cx="108" cy="72"  rx="12" ry="10" ${S}/>
<ellipse cx="108" cy="164" rx="12" ry="10" ${S}/>
<!-- cockpit window -->
<ellipse cx="285" cy="118" rx="14" ry="10" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
`);

/* ── Kayak ── */
const kayak = wrap(320, 200,
`<!-- hull -->
<path d="M15 108 Q55 68 160 64 Q265 68 305 108 Q265 150 160 154 Q55 150 15 108 Z" ${SF}/>
<!-- deck line -->
<path d="M15 108 Q55 100 160 98 Q265 100 305 108" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- cockpit rim -->
<ellipse cx="160" cy="108" rx="55" ry="22" ${S}/>
<!-- cockpit seat -->
<ellipse cx="160" cy="108" rx="40" ry="14" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- paddle shaft -->
<line x1="38" y1="54" x2="282" y2="54" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<!-- paddle blades -->
<ellipse cx="38"  cy="54" rx="22" ry="12" transform="rotate(-20 38 54)"  ${S}/>
<ellipse cx="282" cy="54" rx="22" ry="12" transform="rotate(-20 282 54)" ${S}/>
`);

/* ── Locomotive ── */
const locomotive = wrap(320, 240,
`<!-- boiler body -->
<rect x="28" y="98" width="210" height="80" rx="14" ${S}/>
<!-- boiler dome -->
<ellipse cx="178" cy="98" rx="28" ry="18" ${S}/>
<!-- smokestack -->
<rect x="75" y="55" width="28" height="48" rx="6" ${S}/>
<ellipse cx="89" cy="55" rx="22" ry="8" ${S}/>
<!-- smoke puffs -->
<circle cx="85"  cy="38" r="14" ${S}/>
<circle cx="98"  cy="26" r="18" ${S}/>
<circle cx="114" cy="18" r="12" ${S}/>
<!-- cab -->
<rect x="222" y="78" width="75" height="100" rx="8" ${S}/>
<rect x="230" y="88" width="38" height="32" rx="4" ${S}/>
<!-- cow catcher -->
<path d="M14 148 L28 148 L28 178 L5 178 Z" ${SF}/>
<!-- chassis -->
<rect x="14" y="175" width="285" height="18" rx="4" ${S}/>
<!-- large driving wheels -->
<circle cx="100" cy="198" r="32" ${S}/>
<circle cx="100" cy="198" r="16" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="172" cy="198" r="32" ${S}/>
<circle cx="172" cy="198" r="16" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- small front wheel -->
<circle cx="42"  cy="198" r="20" ${S}/>
<!-- rear cab wheel -->
<circle cx="258" cy="198" r="22" ${S}/>
<circle cx="258" cy="198" r="11" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- connecting rod -->
<line x1="100" y1="186" x2="172" y2="186" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
`);

/* ── Motorcycle ── */
const motorcycle = wrap(310, 230,
`<!-- rear wheel -->
<circle cx="80"  cy="175" r="48" ${S}/>
<circle cx="80"  cy="175" r="24" stroke="#1C1C1C" stroke-width="5" fill="#888"/>
<!-- front wheel -->
<circle cx="240" cy="175" r="48" ${S}/>
<circle cx="240" cy="175" r="24" stroke="#1C1C1C" stroke-width="5" fill="#888"/>
<!-- main frame -->
<path d="M80 152 L118 90 L185 90 L240 148" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<line x1="185" y1="90"  x2="185" y2="152" stroke="#1C1C1C" stroke-width="7"/>
<line x1="80"  y1="152" x2="185" y2="152" stroke="#1C1C1C" stroke-width="7"/>
<!-- engine block -->
<rect x="118" y="130" width="68" height="46" rx="8" ${S}/>
<!-- fuel tank -->
<path d="M118 90 Q150 76 185 90 L185 116 Q150 110 118 116 Z" ${SF}/>
<!-- seat -->
<path d="M110 90 Q150 78 190 90 L188 108 Q150 100 112 108 Z" ${SF}/>
<!-- front fork -->
<line x1="220" y1="90" x2="240" y2="148" stroke="#1C1C1C" stroke-width="7"/>
<!-- handlebars -->
<path d="M215 88 Q230 78 248 80 Q260 80 265 88" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- exhaust pipe -->
<path d="M118 158 Q90 162 75 155" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- headlight -->
<ellipse cx="258" cy="148" rx="16" ry="12" ${S}/>
`);

/* ── Navy Ship ── */
const navyShip = wrap(320, 240,
`<!-- hull -->
<path d="M20 168 Q20 152 42 148 L278 148 Q300 152 300 168 L285 196 L35 196 Z" ${SF}/>
<!-- deck -->
<rect x="40" y="132" width="240" height="20" rx="4" ${S}/>
<!-- superstructure bridge -->
<rect x="120" y="85" width="100" height="50" rx="6" ${S}/>
<rect x="130" y="65" width="80" height="25" rx="4" ${S}/>
<rect x="145" y="48" width="50" height="22" rx="4" ${S}/>
<!-- bridge windows -->
<rect x="127" y="92" width="20" height="16" rx="3" ${S}/>
<rect x="155" y="92" width="20" height="16" rx="3" ${S}/>
<rect x="183" y="92" width="20" height="16" rx="3" ${S}/>
<!-- mast -->
<line x1="170" y1="48" x2="170" y2="20" stroke="#1C1C1C" stroke-width="5"/>
<line x1="148" y1="32" x2="192" y2="32" stroke="#1C1C1C" stroke-width="4"/>
<!-- flag -->
<path d="M170 20 L196 26 L170 32 Z" ${SF}/>
<!-- bow cannon -->
<rect x="48" y="135" width="55" height="12" rx="4" ${S}/>
<!-- stern detail -->
<rect x="225" y="135" width="48" height="12" rx="4" ${S}/>
<!-- waterline -->
<line x1="20" y1="185" x2="300" y2="185" stroke="#1C1C1C" stroke-width="3"/>
<!-- portholes -->
<circle cx="70"  cy="160" r="8" ${S}/>
<circle cx="100" cy="160" r="8" ${S}/>
<circle cx="220" cy="160" r="8" ${S}/>
<circle cx="250" cy="160" r="8" ${S}/>
`);

/* ── Ocean Liner ── */
const oceanLiner = wrap(320, 220,
`<!-- hull -->
<path d="M10 148 Q10 135 30 130 L290 130 Q310 135 310 148 L300 186 L20 186 Z" ${SF}/>
<!-- first deck -->
<rect x="28" y="105" width="264" height="28" rx="4" ${S}/>
<!-- second deck -->
<rect x="45" y="80" width="230" height="28" rx="4" ${S}/>
<!-- bridge deck -->
<rect x="88" y="55" width="145" height="28" rx="4" ${S}/>
<!-- funnels -->
<rect x="120" y="28" width="32" height="38" rx="6" ${S}/>
<ellipse cx="136" cy="28" rx="20" ry="7" ${S}/>
<rect x="168" y="28" width="32" height="38" rx="6" ${S}/>
<ellipse cx="184" cy="28" rx="20" ry="7" ${S}/>
<!-- smoke puffs -->
<circle cx="136" cy="16" r="10" ${S}/>
<circle cx="184" cy="16" r="10" ${S}/>
<!-- portholes row 1 -->
<circle cx="55"  cy="144" r="7" ${S}/>
<circle cx="80"  cy="144" r="7" ${S}/>
<circle cx="240" cy="144" r="7" ${S}/>
<circle cx="265" cy="144" r="7" ${S}/>
<!-- portholes row 2 -->
<circle cx="65"  cy="118" r="6" ${S}/>
<circle cx="90"  cy="118" r="6" ${S}/>
<circle cx="230" cy="118" r="6" ${S}/>
<circle cx="255" cy="118" r="6" ${S}/>
<!-- bridge windows -->
<rect x="102" y="62" width="25" height="16" rx="3" ${S}/>
<rect x="148" y="62" width="25" height="16" rx="3" ${S}/>
<rect x="194" y="62" width="25" height="16" rx="3" ${S}/>
<!-- mast -->
<line x1="160" y1="55" x2="160" y2="22" stroke="#1C1C1C" stroke-width="4"/>
`);

/* ── Police Car ── */
const policeCar = wrap(320, 225,
`<!-- body lower -->
<rect x="20" y="130" width="280" height="68" rx="14" ${S}/>
<!-- body upper / cabin -->
<path d="M80 130 Q95 72 130 65 L200 65 Q228 72 240 130 Z" ${SF}/>
<!-- windscreen -->
<path d="M94 130 Q106 82 130 75 L195 75 Q212 84 218 130 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- light bar -->
<rect x="108" y="58" width="104" height="14" rx="5" ${S}/>
<rect x="118" y="50" width="28" height="12" rx="4" ${S}/>
<rect x="174" y="50" width="28" height="12" rx="4" ${S}/>
<!-- door windows -->
<path d="M100 125 Q108 88 128 80 L165 80 Q155 125 138 125 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M162 125 L165 80 Q188 85 208 125 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- badge -->
<path d="M140 152 L145 140 L160 136 L175 140 L180 152 L160 158 Z" ${SF}/>
<!-- wheels -->
<circle cx="80"  cy="202" r="34" ${S}/>
<circle cx="80"  cy="202" r="18" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="240" cy="202" r="34" ${S}/>
<circle cx="240" cy="202" r="18" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- headlight -->
<ellipse cx="298" cy="152" rx="14" ry="10" ${S}/>
<!-- tail light -->
<rect x="20" y="148" width="14" height="18" rx="5" ${S}/>
`);

/* ── Quad Bike ── */
const quadBike = wrap(300, 225,
`<!-- wheels -->
<ellipse cx="68"  cy="175" rx="32" ry="38" ${S}/>
<ellipse cx="68"  cy="175" rx="16" ry="19" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<ellipse cx="232" cy="175" rx="32" ry="38" ${S}/>
<ellipse cx="232" cy="175" rx="16" ry="19" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- frame -->
<path d="M68 148 L90 90 L210 90 L232 148" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<line x1="68" y1="148" x2="232" y2="148" stroke="#1C1C1C" stroke-width="7"/>
<!-- engine block -->
<rect x="100" y="118" width="100" height="55" rx="8" ${S}/>
<!-- seat -->
<path d="M98 90 Q150 78 202 90 L200 108 Q150 100 100 108 Z" ${SF}/>
<!-- front fender -->
<path d="M45 148 Q45 125 68 118 Q85 128 85 148 Z" ${SF}/>
<!-- rear fender -->
<path d="M255 148 Q255 125 232 118 Q215 128 215 148 Z" ${SF}/>
<!-- handlebars -->
<path d="M112 88 Q130 72 150 68 Q170 72 188 88" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- exhaust -->
<path d="M210 155 L235 148 L240 158" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
`);

/* ── Submarine ── */
const submarine = wrap(320, 210,
`<!-- hull -->
<path d="M28 105 Q28 72 80 62 L240 62 Q292 72 292 105 Q292 138 240 148 L80 148 Q28 138 28 105 Z" ${SF}/>
<!-- conning tower -->
<rect x="130" y="30" width="65" height="42" rx="8" ${S}/>
<!-- periscope -->
<line x1="158" y1="30" x2="158" y2="10" stroke="#1C1C1C" stroke-width="6"/>
<line x1="158" y1="10" x2="180" y2="10" stroke="#1C1C1C" stroke-width="6"/>
<circle cx="180" cy="10" r="6" ${S}/>
<!-- propeller -->
<ellipse cx="294" cy="88"  rx="12" ry="28" transform="rotate(15 294 88)"  ${S}/>
<ellipse cx="294" cy="122" rx="12" ry="28" transform="rotate(-15 294 122)" ${S}/>
<circle cx="292" cy="105" r="10" ${S}/>
<!-- torpedo doors -->
<ellipse cx="32" cy="90"  rx="8" ry="6" ${S}/>
<ellipse cx="32" cy="120" rx="8" ry="6" ${S}/>
<!-- windows -->
<circle cx="130" cy="105" r="18" ${S}/>
<circle cx="130" cy="105" r="10" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<circle cx="175" cy="105" r="12" ${S}/>
<circle cx="220" cy="105" r="12" ${S}/>
<!-- dive planes -->
<path d="M90 62 L70 42 L110 50 Z" ${SF}/>
<path d="M90 148 L70 168 L110 160 Z" ${SF}/>
<!-- rudder -->
<path d="M268 62 L285 42 L292 68 Z" ${SF}/>
<path d="M268 148 L285 168 L292 142 Z" ${SF}/>
`);

/* ── Truck (semi) ── */
const truck = wrap(320, 230,
`<!-- trailer -->
<rect x="115" y="78" width="192" height="118" rx="8" ${S}/>
<!-- cab -->
<path d="M20 100 Q20 72 48 68 L115 68 L115 196 L20 196 Z" ${SF}/>
<!-- cab roof fairing -->
<path d="M48 68 Q48 48 72 45 L110 45 L115 68 Z" ${SF}/>
<!-- cab window -->
<rect x="28" y="75" width="55" height="45" rx="4" ${S}/>
<!-- exhaust stack -->
<rect x="108" y="32" width="10" height="38" rx="4" ${S}/>
<!-- grille -->
<rect x="18" y="130" width="24" height="28" rx="3" ${S}/>
<line x1="22" y1="134" x2="38" y2="134" stroke="#1C1C1C" stroke-width="2"/>
<line x1="22" y1="142" x2="38" y2="142" stroke="#1C1C1C" stroke-width="2"/>
<line x1="22" y1="150" x2="38" y2="150" stroke="#1C1C1C" stroke-width="2"/>
<!-- headlight -->
<rect x="18" y="108" width="18" height="14" rx="3" ${S}/>
<!-- trailer center divider -->
<line x1="211" y1="78" x2="211" y2="196" stroke="#1C1C1C" stroke-width="3"/>
<!-- cab wheel -->
<circle cx="60"  cy="200" r="28" ${S}/>
<circle cx="60"  cy="200" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- trailer wheels -->
<circle cx="175" cy="200" r="26" ${S}/>
<circle cx="175" cy="200" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="240" cy="200" r="26" ${S}/>
<circle cx="240" cy="200" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="285" cy="200" r="26" ${S}/>
<circle cx="285" cy="200" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
`);

/* ── Unicycle ── */
const unicycle = wrap(200, 310,
`<!-- wheel -->
<circle cx="100" cy="235" r="68" ${S}/>
<circle cx="100" cy="235" r="34" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- spokes -->
<line x1="100" y1="168" x2="100" y2="302" stroke="#1C1C1C" stroke-width="3"/>
<line x1="33"  y1="235" x2="167" y2="235" stroke="#1C1C1C" stroke-width="3"/>
<line x1="52"  y1="187" x2="148" y2="283" stroke="#1C1C1C" stroke-width="3"/>
<line x1="148" y1="187" x2="52"  y2="283" stroke="#1C1C1C" stroke-width="3"/>
<!-- fork -->
<path d="M80 210 L88 165 L112 165 L120 210" stroke="#1C1C1C" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<!-- seat post -->
<line x1="100" y1="165" x2="100" y2="80" stroke="#1C1C1C" stroke-width="7"/>
<!-- seat -->
<path d="M62 80 Q100 68 138 80 L132 96 Q100 90 68 96 Z" ${SF}/>
<!-- crank arm -->
<line x1="68" y1="235" x2="132" y2="235" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<!-- pedals -->
<rect x="50"  y="228" width="18" height="14" rx="3" ${S}/>
<rect x="132" y="228" width="18" height="14" rx="3" ${S}/>
`);

/* ── Van ── */
const van = wrap(320, 215,
`<!-- body -->
<path d="M18 95 Q18 68 52 65 L275 65 Q302 75 302 108 L302 175 L18 175 Z" ${SF}/>
<!-- windscreen -->
<path d="M18 95 Q22 72 52 65 L52 105 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- side windows -->
<rect x="65"  y="72" width="55" height="42" rx="5" ${S}/>
<rect x="130" y="72" width="55" height="42" rx="5" ${S}/>
<!-- sliding door -->
<rect x="195" y="72" width="75" height="100" rx="4" ${S}/>
<line x1="232" y1="72" x2="232" y2="172" stroke="#1C1C1C" stroke-width="3"/>
<!-- door handle -->
<rect x="262" y="118" width="22" height="7" rx="3" ${S}/>
<!-- headlight -->
<ellipse cx="300" cy="128" rx="12" ry="9" ${S}/>
<!-- tail light -->
<rect x="16" y="128" width="14" height="20" rx="4" ${S}/>
<!-- wheels -->
<circle cx="80"  cy="190" r="32" ${S}/>
<circle cx="80"  cy="190" r="16" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="242" cy="190" r="32" ${S}/>
<circle cx="242" cy="190" r="16" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
`);

/* ── Wagon ── */
const wagon = wrap(300, 230,
`<!-- wagon bed -->
<rect x="48" y="95" width="212" height="90" rx="8" ${S}/>
<!-- front board -->
<rect x="48" y="95" width="18" height="90" rx="4" ${S}/>
<!-- rear board -->
<rect x="242" y="95" width="18" height="90" rx="4" ${S}/>
<!-- slats -->
<line x1="100" y1="95" x2="100" y2="185" stroke="#1C1C1C" stroke-width="3"/>
<line x1="150" y1="95" x2="150" y2="185" stroke="#1C1C1C" stroke-width="3"/>
<line x1="200" y1="95" x2="200" y2="185" stroke="#1C1C1C" stroke-width="3"/>
<!-- front axle -->
<line x1="58"  y1="185" x2="58"  y2="208" stroke="#1C1C1C" stroke-width="6"/>
<line x1="30"  y1="208" x2="86"  y2="208" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<!-- rear axle -->
<line x1="252" y1="185" x2="252" y2="208" stroke="#1C1C1C" stroke-width="6"/>
<line x1="224" y1="208" x2="280" y2="208" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<!-- wheels -->
<circle cx="40"  cy="208" r="28" ${S}/>
<circle cx="40"  cy="208" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="260" cy="208" r="28" ${S}/>
<circle cx="260" cy="208" r="14" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<!-- pull handle -->
<path d="M48 140 Q28 128 18 105 Q15 85 28 82" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
`);

/* ── Xplane / Spacecraft ── */
const xplane = wrap(320, 240,
`<!-- fuselage -->
<path d="M18 120 Q18 110 60 105 L260 105 Q295 110 300 120 Q295 130 260 135 L60 135 Q18 130 18 120 Z" ${SF}/>
<!-- nose -->
<path d="M260 105 L300 120 L260 135 L268 120 Z" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- upper delta wing -->
<path d="M220 105 L60 50 L88 105 Z" ${SF}/>
<!-- lower delta wing -->
<path d="M220 135 L60 190 L88 135 Z" ${SF}/>
<!-- canards -->
<path d="M232 108 L210 82 L230 102 Z" ${SF}/>
<path d="M232 132 L210 158 L230 118 Z" ${SF}/>
<!-- engine nozzles -->
<ellipse cx="30" cy="108" rx="14" ry="9" ${S}/>
<ellipse cx="30" cy="132" rx="14" ry="9" ${S}/>
<!-- cockpit -->
<ellipse cx="272" cy="120" rx="18" ry="12" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- vertical tail fin -->
<path d="M48 105 L38 65 L72 88 L72 105 Z" ${SF}/>
<!-- fuselage detail lines -->
<line x1="155" y1="108" x2="200" y2="108" stroke="#1C1C1C" stroke-width="2"/>
<line x1="155" y1="132" x2="200" y2="132" stroke="#1C1C1C" stroke-width="2"/>
`);

/* ── Yacht ── */
const yacht = wrap(300, 290,
`<!-- hull -->
<path d="M15 215 Q15 195 38 188 L262 188 Q285 195 285 215 L272 245 L28 245 Z" ${SF}/>
<!-- deck -->
<rect x="38" y="178" width="224" height="14" rx="4" ${S}/>
<!-- cabin -->
<rect x="98" y="148" width="105" height="35" rx="6" ${S}/>
<!-- cabin windows -->
<rect x="108" y="155" width="25" height="18" rx="3" ${S}/>
<rect x="168" y="155" width="25" height="18" rx="3" ${S}/>
<!-- mast -->
<line x1="150" y1="178" x2="150" y2="32" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<!-- boom -->
<line x1="150" y1="170" x2="260" y2="195" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<!-- mainsail -->
<path d="M150 40 L150 178 L258 192 Z" ${SF}/>
<!-- jib sail -->
<path d="M150 55 L80 178 L150 175 Z" ${SF}/>
<!-- waterline -->
<line x1="15" y1="235" x2="285" y2="235" stroke="#1C1C1C" stroke-width="3"/>
<!-- waves -->
<path d="M10 250 Q28 242 46 250 Q64 258 82 250 Q100 242 118 250" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M175 250 Q193 242 211 250 Q229 258 247 250 Q265 242 283 250" stroke="#1C1C1C" stroke-width="3" fill="none"/>
`);

/* ── Zamboni ── */
const zamboni = wrap(310, 220,
`<!-- main body box -->
<rect x="25" y="75" width="220" height="112" rx="10" ${S}/>
<!-- cab section -->
<path d="M25 75 Q25 50 55 47 L155 47 L155 75 Z" ${SF}/>
<!-- cab windows -->
<rect x="35" y="55" width="85" height="34" rx="4" ${S}/>
<!-- resurfacing unit at back -->
<rect x="240" y="100" width="52" height="65" rx="6" ${S}/>
<!-- blade -->
<rect x="240" y="162" width="52" height="10" rx="3" ${S}/>
<!-- water tank on top -->
<rect x="45" y="32" width="80" height="18" rx="5" ${S}/>
<!-- exhaust pipe -->
<rect x="148" y="30" width="12" height="32" rx="4" ${S}/>
<!-- exhaust smoke -->
<circle cx="154" cy="22" r="9" ${S}/>
<!-- headlight -->
<rect x="23" y="108" width="16" height="14" rx="3" ${S}/>
<!-- front grille -->
<rect x="23" y="130" width="16" height="30" rx="3" ${S}/>
<!-- wheels -->
<circle cx="75"  cy="197" r="26" ${S}/>
<circle cx="75"  cy="197" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="190" cy="197" r="26" ${S}/>
<circle cx="190" cy="197" r="13" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
<circle cx="260" cy="195" r="22" ${S}/>
<circle cx="260" cy="195" r="11" stroke="#1C1C1C" stroke-width="4" fill="#888"/>
`);

/* ── Apple Tree ── */
const appleTree = wrap(280, 320,
`<!-- trunk -->
<rect x="122" y="210" width="36" height="90" rx="10" ${S}/>
<!-- roots -->
<path d="M122 295 Q100 305 88 318" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M158 295 Q180 305 192 318" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- canopy -->
<circle cx="140" cy="148" r="88" ${SF}/>
<!-- apples -->
<circle cx="100" cy="138" r="15" ${S}/>
<line x1="100" y1="123" x2="100" y2="115" stroke="#1C1C1C" stroke-width="3"/>
<circle cx="170" cy="120" r="15" ${S}/>
<line x1="170" y1="105" x2="172" y2="97"  stroke="#1C1C1C" stroke-width="3"/>
<circle cx="148" cy="178" r="15" ${S}/>
<line x1="148" y1="163" x2="148" y2="155" stroke="#1C1C1C" stroke-width="3"/>
<circle cx="108" cy="175" r="13" ${S}/>
<circle cx="180" cy="162" r="13" ${S}/>
`);

/* ── Bush ── */
const bush = wrap(300, 240,
`<!-- bush body (layered bumps) -->
<circle cx="90"  cy="145" r="62" ${SF}/>
<circle cx="150" cy="130" r="72" ${SF}/>
<circle cx="210" cy="145" r="62" ${SF}/>
<circle cx="120" cy="120" r="55" ${SF}/>
<circle cx="180" cy="118" r="55" ${SF}/>
<circle cx="150" cy="108" r="58" ${SF}/>
<!-- ground base -->
<path d="M28 185 Q90 195 150 193 Q210 195 272 185" stroke="#1C1C1C" stroke-width="5" fill="none"/>
<!-- flowers -->
<circle cx="105" cy="115" r="12" ${S}/>
<circle cx="105" cy="115" r="6" fill="#1C1C1C"/>
<circle cx="175" cy="108" r="12" ${S}/>
<circle cx="175" cy="108" r="6" fill="#1C1C1C"/>
<circle cx="148" cy="90"  r="10" ${S}/>
`);

/* ── Cloud ── */
const cloud = wrap(300, 220,
`<!-- cloud puffs -->
<circle cx="105" cy="128" r="52" ${SF}/>
<circle cx="155" cy="108" r="62" ${SF}/>
<circle cx="210" cy="125" r="50" ${SF}/>
<circle cx="138" cy="148" r="48" ${SF}/>
<circle cx="178" cy="145" r="45" ${SF}/>
<!-- flat bottom fill -->
<rect x="53" y="148" width="209" height="30" rx="0" fill="#fff"/>
<line x1="53" y1="175" x2="262" y2="175" stroke="#1C1C1C" stroke-width="5"/>
<!-- raindrops -->
<line x1="95"  y1="185" x2="88"  y2="210" stroke="#1C1C1C" stroke-width="4" stroke-linecap="round"/>
<line x1="130" y1="185" x2="123" y2="210" stroke="#1C1C1C" stroke-width="4" stroke-linecap="round"/>
<line x1="165" y1="185" x2="158" y2="210" stroke="#1C1C1C" stroke-width="4" stroke-linecap="round"/>
<line x1="200" y1="185" x2="193" y2="210" stroke="#1C1C1C" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="88"  cy="213" rx="5" ry="7" ${S}/>
<ellipse cx="123" cy="213" rx="5" ry="7" ${S}/>
<ellipse cx="158" cy="213" rx="5" ry="7" ${S}/>
<ellipse cx="193" cy="213" rx="5" ry="7" ${S}/>
`);

/* ── Daisy ── */
const daisy = wrap(280, 310,
`<!-- stem -->
<line x1="140" y1="185" x2="140" y2="295" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
<!-- leaf left -->
<path d="M140 255 Q105 242 98 218 Q128 224 140 248 Z" ${SF}/>
<!-- leaf right -->
<path d="M140 228 Q175 215 182 190 Q152 198 140 222 Z" ${SF}/>
<!-- petals (12) -->
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(0   140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(30  140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(60  140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(90  140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(120 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(150 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(180 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(210 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(240 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(270 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(300 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="14" ry="42" transform="rotate(330 140 148)" ${SF}/>
<!-- centre -->
<circle cx="140" cy="148" r="30" ${S}/>
<!-- centre dots -->
<circle cx="130" cy="142" r="4" fill="#1C1C1C"/>
<circle cx="150" cy="142" r="4" fill="#1C1C1C"/>
<circle cx="140" cy="156" r="4" fill="#1C1C1C"/>
<circle cx="135" cy="134" r="3" fill="#1C1C1C"/>
<circle cx="145" cy="134" r="3" fill="#1C1C1C"/>
`);

/* ── Earth ── */
const earth = wrap(280, 280,
`<!-- globe -->
<circle cx="140" cy="140" r="118" ${SF}/>
<!-- continent shapes (simplified) -->
<path d="M80 78 Q95 65 118 68 L125 88 Q112 108 95 115 Q80 108 72 95 Z" ${SF}/>
<path d="M105 128 Q118 120 128 128 L130 162 Q122 178 110 175 Q98 165 98 148 Z" ${SF}/>
<path d="M148 72 Q162 65 175 72 L178 95 Q168 108 155 112 Q142 108 145 95 Z" ${SF}/>
<path d="M148 118 Q162 112 172 118 L175 158 Q165 180 152 182 Q138 175 140 155 Z" ${SF}/>
<!-- latitude lines -->
<path d="M22 140 Q140 122 258 140" stroke="#1C1C1C" stroke-width="2" fill="none"/>
<path d="M42 100 Q140 85 238 100" stroke="#1C1C1C" stroke-width="2" fill="none"/>
<path d="M42 180 Q140 195 238 180" stroke="#1C1C1C" stroke-width="2" fill="none"/>
<!-- equator -->
<path d="M22 140 Q140 140 258 140" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- axis -->
<line x1="140" y1="22" x2="140" y2="258" stroke="#1C1C1C" stroke-width="3"/>
`);

/* ── Garden Pot ── */
const gardenPot = wrap(280, 310,
`<!-- pot body -->
<path d="M68 168 L50 262 Q50 278 78 278 L202 278 Q230 278 230 262 L212 168 Z" ${SF}/>
<!-- pot rim -->
<ellipse cx="140" cy="168" rx="75" ry="18" ${S}/>
<!-- soil surface -->
<ellipse cx="140" cy="168" rx="68" ry="12" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- main stem -->
<line x1="140" y1="168" x2="140" y2="78" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
<!-- left branch -->
<path d="M140 120 Q108 105 88 88" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- right branch -->
<path d="M140 105 Q172 90 190 72" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- top flower -->
<circle cx="140" cy="62" r="28" ${S}/>
<circle cx="140" cy="62" r="14" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- left flower -->
<circle cx="82"  cy="80" r="20" ${S}/>
<circle cx="82"  cy="80" r="10" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- right flower -->
<circle cx="196" cy="65" r="20" ${S}/>
<circle cx="196" cy="65" r="10" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
`);

/* ── Island ── */
const island = wrap(310, 250,
`<!-- sea -->
<ellipse cx="155" cy="185" rx="145" ry="55" ${SF}/>
<!-- wave lines -->
<path d="M10 185 Q32 175 55 185 Q78 195 100 185 Q122 175 145 185" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M165 185 Q188 175 210 185 Q233 195 255 185 Q278 175 300 185" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- island ground -->
<ellipse cx="155" cy="162" rx="100" ry="38" ${SF}/>
<!-- sand hills -->
<path d="M68 162 Q100 148 130 155 Q155 160 180 152 Q210 145 242 160" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- palm trunk -->
<path d="M155 162 Q148 135 152 100" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round" fill="none"/>
<!-- palm leaves -->
<path d="M152 100 Q125 72 105 78 Q122 95 150 102 Z" ${SF}/>
<path d="M152 100 Q178 68 200 72 Q182 90 153 104 Z" ${SF}/>
<path d="M152 100 Q138 72 132 50 Q148 70 155 100 Z" ${SF}/>
<path d="M152 100 Q168 75 172 52 Q155 72 150 102 Z" ${SF}/>
<!-- coconuts -->
<circle cx="148" cy="104" r="8" ${S}/>
<circle cx="162" cy="108" r="8" ${S}/>
`);

/* ── Jungle Leaf ── */
const jungleLeaf = wrap(280, 290,
`<!-- leaf blade -->
<path d="M140 268 Q52 200 42 128 Q42 48 140 22 Q238 48 238 128 Q228 200 140 268 Z" ${SF}/>
<!-- midrib -->
<line x1="140" y1="268" x2="140" y2="22" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<!-- lateral veins left -->
<path d="M140 230 Q110 212 88 205" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 195 Q105 175 82 165" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 158 Q100 138 75 128" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 118 Q105 98  85 90"  stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 80  Q115 62 108 52"  stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- lateral veins right -->
<path d="M140 230 Q170 212 192 205" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 195 Q175 175 198 165" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 158 Q180 138 205 128" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 118 Q175 98  195 90"  stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 80  Q165 62 172 52"   stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
`);

/* ── Kite ── */
const kite = wrap(260, 320,
`<!-- kite diamond -->
<path d="M130 22 L248 128 L130 220 L12 128 Z" ${SF}/>
<!-- cross spars -->
<line x1="130" y1="22"  x2="130" y2="220" stroke="#1C1C1C" stroke-width="4"/>
<line x1="12"  y1="128" x2="248" y2="128" stroke="#1C1C1C" stroke-width="4"/>
<!-- bow ribbon -->
<path d="M90 175 Q100 165 130 160 Q160 165 170 175 Q160 188 130 192 Q100 188 90 175 Z" ${SF}/>
<!-- tail string -->
<path d="M130 220 Q145 238 130 258 Q115 278 130 298" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- tail bows -->
<ellipse cx="130" cy="250" rx="14" ry="7" transform="rotate(-15 130 250)" ${S}/>
<ellipse cx="130" cy="278" rx="14" ry="7" transform="rotate(15  130 278)" ${S}/>
<!-- flying string -->
<path d="M130 220 Q90 240 72 268" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
`);

/* ── Leaf ── */
const leaf = wrap(280, 265,
`<!-- leaf outline -->
<path d="M140 250 Q42 195 38 130 Q38 50 140 18 Q242 50 242 130 Q238 195 140 250 Z" ${SF}/>
<!-- midrib -->
<line x1="140" y1="250" x2="140" y2="18" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<!-- lateral veins left -->
<path d="M140 215 Q108 195 88 188" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 178 Q102 158 80 148" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 140 Q100 118 78 108" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 102 Q108 82  92 72"  stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 65  Q118 48 112 38"  stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- lateral veins right -->
<path d="M140 215 Q172 195 192 188" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 178 Q178 158 200 148" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 140 Q180 118 202 108" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 102 Q172 82  188 72"  stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M140 65  Q162 48 168 38"   stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
`);

/* ── Mountain ── */
const mountain = wrap(320, 260,
`<!-- back mountain left -->
<path d="M10 218 L95 58 L175 218 Z" ${SF}/>
<!-- back mountain right -->
<path d="M148 218 L248 65 L320 218 Z" ${SF}/>
<!-- front mountain -->
<path d="M68 218 L185 28 L305 218 Z" ${SF}/>
<!-- snow caps -->
<path d="M163 50 L185 28 L207 50 Q195 62 185 58 Q175 62 163 50 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M78 80 L95 58 L112 80 Q100 88 95 84 Q88 88 78 80 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<path d="M232 88 L248 65 L265 88 Q254 96 248 92 Q240 96 232 88 Z" stroke="#1C1C1C" stroke-width="3" fill="#eee"/>
<!-- ground line -->
<line x1="10" y1="218" x2="315" y2="218" stroke="#1C1C1C" stroke-width="5"/>
<!-- pine trees at base -->
<path d="M38 218 L38 195 L28 195 L40 172 L36 172 L48 150 L60 172 L56 172 L68 195 L56 195 L56 218 Z" ${SF}/>
<path d="M265 218 L265 195 L255 195 L267 172 L263 172 L275 150 L287 172 L283 172 L295 195 L283 195 L283 218 Z" ${SF}/>
`);

/* ── Nest ── */
const nest = wrap(300, 240,
`<!-- nest outer bowl -->
<path d="M28 150 Q28 118 80 108 L220 108 Q272 118 272 150 Q272 195 150 202 Q28 195 28 150 Z" ${SF}/>
<!-- inner hollow -->
<ellipse cx="150" cy="148" rx="95" ry="38" stroke="#1C1C1C" stroke-width="4" fill="#eee"/>
<!-- twig texture -->
<path d="M45 155 Q60 138 80 142 Q90 148 75 158" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M250 158 Q262 145 250 135 Q238 140 245 155" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M95 112 Q108 100 118 108" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M185 110 Q198 100 208 112" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- eggs -->
<ellipse cx="120" cy="145" rx="25" ry="18" ${SF}/>
<ellipse cx="155" cy="138" rx="25" ry="18" ${SF}/>
<ellipse cx="185" cy="148" rx="22" ry="16" ${SF}/>
<!-- supporting branches -->
<path d="M28 165 Q15 178 10 195" stroke="#1C1C1C" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M272 165 Q285 178 290 195" stroke="#1C1C1C" stroke-width="7" fill="none" stroke-linecap="round"/>
`);

/* ── Oak Tree ── */
const oakTree = wrap(300, 330,
`<!-- trunk -->
<rect x="128" y="222" width="44" height="95" rx="12" ${S}/>
<!-- roots -->
<path d="M128 310 Q108 320 92 330" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M172 310 Q192 320 208 330" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- branches -->
<path d="M150 222 Q125 195 88 185" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M150 222 Q172 195 205 182" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round"/>
<line x1="150" y1="222" x2="150" y2="180" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<!-- canopy clusters -->
<circle cx="88"  cy="165" r="52" ${SF}/>
<circle cx="150" cy="148" r="65" ${SF}/>
<circle cx="210" cy="162" r="52" ${SF}/>
<circle cx="115" cy="125" r="48" ${SF}/>
<circle cx="182" cy="120" r="48" ${SF}/>
<!-- acorns -->
<ellipse cx="118" cy="195" rx="9" ry="12" ${S}/>
<rect x="113" y="188" width="10" height="8" rx="2" ${S}/>
<ellipse cx="172" cy="190" rx="9" ry="12" ${S}/>
<rect x="167" y="183" width="10" height="8" rx="2" ${S}/>
`);

/* ── Pine Tree ── */
const pineTree = wrap(240, 330,
`<!-- trunk -->
<rect x="105" y="258" width="30" height="62" rx="8" ${S}/>
<!-- bottom tier -->
<path d="M14 258 L120 148 L226 258 Z" ${SF}/>
<!-- middle tier -->
<path d="M38 190 L120 95 L202 190 Z" ${SF}/>
<!-- top tier -->
<path d="M62 130 L120 45 L178 130 Z" ${SF}/>
<!-- snow line hints -->
<path d="M80 130 Q100 122 120 120 Q140 122 160 130" stroke="#1C1C1C" stroke-width="2" fill="none"/>
<path d="M50 190 Q85 180 120 178 Q155 180 190 190" stroke="#1C1C1C" stroke-width="2" fill="none"/>
<!-- ornament baubles -->
<circle cx="88"  cy="148" r="7" ${S}/>
<circle cx="155" cy="155" r="7" ${S}/>
<circle cx="72"  cy="210" r="7" ${S}/>
<circle cx="168" cy="215" r="7" ${S}/>
<circle cx="120" cy="200" r="7" ${S}/>
`);

/* ── Quiet Pond ── */
const quietPond = wrap(320, 240,
`<!-- pond water -->
<ellipse cx="160" cy="168" rx="148" ry="62" ${SF}/>
<!-- water shimmer -->
<path d="M42 165 Q80 155 118 165 Q156 175 194 165 Q232 155 270 165" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M55 178 Q88 170 120 178 Q152 186 185 178" stroke="#1C1C1C" stroke-width="2" fill="none"/>
<!-- lily pads -->
<ellipse cx="100" cy="162" rx="28" ry="16" ${SF}/>
<path d="M100 146 L100 162 L112 152 Z" stroke="#1C1C1C" stroke-width="3" fill="#fff"/>
<ellipse cx="210" cy="172" rx="25" ry="14" ${SF}/>
<path d="M210 158 L210 172 L222 163 Z" stroke="#1C1C1C" stroke-width="3" fill="#fff"/>
<!-- lily flowers -->
<circle cx="100" cy="155" r="8" ${S}/>
<circle cx="210" cy="162" r="8" ${S}/>
<!-- cattails left -->
<line x1="28"  y1="230" x2="28"  y2="120" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="28" cy="118" rx="6" ry="14" ${S}/>
<line x1="48"  y1="230" x2="48"  y2="130" stroke="#1C1C1C" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="48" cy="128" rx="5" ry="12" ${S}/>
<!-- cattails right -->
<line x1="278" y1="230" x2="278" y2="122" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="278" cy="120" rx="6" ry="14" ${S}/>
<line x1="298" y1="230" x2="298" y2="132" stroke="#1C1C1C" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="298" cy="130" rx="5" ry="12" ${S}/>
<!-- duck -->
<ellipse cx="160" cy="148" rx="22" ry="14" ${SF}/>
<circle  cx="178" cy="140" r="12" ${SF}/>
<path d="M185 140 L196 138 L185 144 Z" ${S}/>
`);

/* ── Rainbow ── */
const rainbow = wrap(320, 240,
`<!-- rainbow bands (closed donut-arc shapes) -->
<path d="M18 215 Q18 32 160 32 Q302 32 302 215 L278 215 Q278 58 160 58 Q42 58 42 215 Z" ${SF}/>
<path d="M42 215 Q42 58 160 58 Q278 58 278 215 L255 215 Q255 82 160 82 Q65 82 65 215 Z" ${SF}/>
<path d="M65 215 Q65 82 160 82 Q255 82 255 215 L232 215 Q232 106 160 106 Q88 106 88 215 Z" ${SF}/>
<path d="M88 215 Q88 106 160 106 Q232 106 232 215 L208 215 Q208 128 160 128 Q112 128 112 215 Z" ${SF}/>
<path d="M112 215 Q112 128 160 128 Q208 128 208 215 Z" ${SF}/>
<!-- clouds on sides -->
<circle cx="40"  cy="200" r="22" ${SF}/>
<circle cx="62"  cy="188" r="28" ${SF}/>
<circle cx="88"  cy="200" r="22" ${SF}/>
<circle cx="232" cy="200" r="22" ${SF}/>
<circle cx="258" cy="188" r="28" ${SF}/>
<circle cx="280" cy="200" r="22" ${SF}/>
`);

/* ── Tree ── */
const tree = wrap(280, 320,
`<!-- trunk -->
<rect x="120" y="215" width="40" height="95" rx="10" ${S}/>
<!-- roots -->
<path d="M120 300 Q100 310 85 320" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M160 300 Q180 310 195 320" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<!-- canopy -->
<circle cx="140" cy="145" r="90" ${SF}/>
<!-- canopy surface detail -->
<path d="M55 145 Q75 100 105 88 Q140 75 175 88 Q205 100 225 145" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- tree hole -->
<ellipse cx="140" cy="195" rx="16" ry="22" ${S}/>
<!-- branch hints -->
<path d="M140 215 Q115 200 95 188" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M140 215 Q165 200 185 188" stroke="#1C1C1C" stroke-width="5" fill="none" stroke-linecap="round"/>
`);

/* ── Umbrella ── */
const umbrella = wrap(280, 290,
`<!-- canopy dome -->
<path d="M18 145 Q18 48 140 28 Q262 48 262 145 Z" ${SF}/>
<!-- canopy ribs -->
<line x1="140" y1="28" x2="140" y2="145" stroke="#1C1C1C" stroke-width="3"/>
<path d="M140 28 Q105 55 72 80 L18 145"  stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M140 28 Q175 55 208 80 L262 145" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M140 28 Q118 62 88 105 L38 145"  stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M140 28 Q162 62 192 105 L242 145" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- scalloped edge -->
<path d="M18 145 Q34 132 52 145 Q70 158 88 145 Q106 132 124 145 Q142 158 160 145 Q178 132 196 145 Q214 158 232 145 Q250 132 262 145" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- handle shaft -->
<line x1="140" y1="145" x2="140" y2="258" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<!-- curved handle -->
<path d="M140 258 Q140 278 118 278 Q96 278 96 258" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round"/>
<!-- tip -->
<circle cx="140" cy="28" r="7" ${S}/>
`);

/* ── Vine ── */
const vine = wrap(280, 300,
`<!-- main vine -->
<path d="M140 290 Q155 260 148 228 Q142 198 162 168 Q178 138 165 108 Q152 78 168 45" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- left side branches -->
<path d="M150 240 Q118 222 95 228"  stroke="#1C1C1C" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M158 185 Q128 165 102 170" stroke="#1C1C1C" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M162 130 Q132 112 108 118" stroke="#1C1C1C" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- right side branches -->
<path d="M148 260 Q178 242 198 248" stroke="#1C1C1C" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M155 205 Q185 188 205 195" stroke="#1C1C1C" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M160 148 Q188 130 210 136" stroke="#1C1C1C" stroke-width="4" fill="none" stroke-linecap="round"/>
<!-- leaves -->
<ellipse cx="88"  cy="228" rx="18" ry="12" transform="rotate(-30 88 228)"  ${SF}/>
<ellipse cx="98"  cy="172" rx="18" ry="12" transform="rotate(-20 98 172)"  ${SF}/>
<ellipse cx="104" cy="116" rx="18" ry="12" transform="rotate(-25 104 116)" ${SF}/>
<ellipse cx="200" cy="248" rx="18" ry="12" transform="rotate(25 200 248)"  ${SF}/>
<ellipse cx="205" cy="192" rx="18" ry="12" transform="rotate(20 205 192)"  ${SF}/>
<ellipse cx="208" cy="134" rx="18" ry="12" transform="rotate(30 208 134)"  ${SF}/>
<!-- tendril -->
<path d="M165 108 Q175 90 168 72" stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M168 45 Q180 28 172 12"  stroke="#1C1C1C" stroke-width="3" fill="none" stroke-linecap="round"/>
`);

/* ── Waterfall ── */
const waterfall = wrap(300, 280,
`<!-- left cliff -->
<path d="M10 10 L10 142 Q10 155 30 158 L100 158 L100 10 Z" ${SF}/>
<!-- right cliff -->
<path d="M200 10 L200 158 L270 158 Q290 155 290 142 L290 10 Z" ${SF}/>
<!-- falling water streams -->
<path d="M100 158 Q105 190 102 225 Q100 255 108 278" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M130 158 Q135 192 132 228 Q130 258 138 278" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M155 158 Q160 195 157 232 Q155 262 162 278" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M180 158 Q185 190 182 225 Q180 255 188 278" stroke="#1C1C1C" stroke-width="8" fill="none" stroke-linecap="round"/>
<path d="M200 158 Q205 188 202 223 Q200 252 207 278" stroke="#1C1C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
<!-- pool -->
<ellipse cx="155" cy="268" rx="118" ry="20" ${SF}/>
<!-- splash ripples -->
<path d="M72 262 Q100 252 128 262 Q156 272 184 262 Q212 252 238 262" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- cliff edge details -->
<path d="M10 140 Q55 132 100 140"  stroke="#1C1C1C" stroke-width="4" fill="none"/>
<path d="M200 140 Q245 132 290 140" stroke="#1C1C1C" stroke-width="4" fill="none"/>
<!-- pool rocks -->
<ellipse cx="105" cy="272" rx="12" ry="7" ${SF}/>
<ellipse cx="208" cy="272" rx="12" ry="7" ${SF}/>
`);

/* ── Xmas Tree ── */
const xmasTree = wrap(260, 330,
`<!-- trunk -->
<rect x="108" y="268" width="44" height="55" rx="8" ${S}/>
<!-- bottom tier -->
<path d="M12 268 L130 148 L248 268 Z" ${SF}/>
<!-- middle tier -->
<path d="M38 202 L130 95 L222 202 Z" ${SF}/>
<!-- top tier -->
<path d="M62 142 L130 42 L198 142 Z" ${SF}/>
<!-- star on top -->
<path d="M130 18 L136 34 L152 34 L140 44 L144 60 L130 50 L116 60 L120 44 L108 34 L124 34 Z" ${SF}/>
<!-- garland lines -->
<path d="M78 152 Q105 142 130 148 Q155 154 182 144" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<path d="M52 215 Q90 205 130 210 Q170 215 208 205" stroke="#1C1C1C" stroke-width="3" fill="none"/>
<!-- ornament balls -->
<circle cx="88"  cy="155" r="9" ${S}/>
<circle cx="172" cy="162" r="9" ${S}/>
<circle cx="130" cy="175" r="9" ${S}/>
<circle cx="65"  cy="220" r="9" ${S}/>
<circle cx="195" cy="225" r="9" ${S}/>
<circle cx="130" cy="235" r="9" ${S}/>
`);

/* ── Yellow Sunflower ── */
const sunflower = wrap(280, 330,
`<!-- stem -->
<line x1="140" y1="188" x2="140" y2="315" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<!-- leaf left -->
<path d="M140 265 Q104 250 95 225 Q126 232 140 258 Z" ${SF}/>
<!-- leaf right -->
<path d="M140 238 Q176 224 184 198 Q154 208 140 232 Z" ${SF}/>
<!-- petals (12) -->
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(0   140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(30  140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(60  140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(90  140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(120 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(150 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(180 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(210 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(240 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(270 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(300 140 148)" ${SF}/>
<ellipse cx="140" cy="108" rx="16" ry="50" transform="rotate(330 140 148)" ${SF}/>
<!-- dark centre disc -->
<circle cx="140" cy="148" r="38" stroke="#1C1C1C" stroke-width="5" fill="#1C1C1C"/>
<!-- centre highlight dots -->
<circle cx="128" cy="140" r="5" fill="#fff"/>
<circle cx="152" cy="140" r="5" fill="#fff"/>
<circle cx="140" cy="156" r="5" fill="#fff"/>
<circle cx="128" cy="156" r="4" fill="#fff"/>
<circle cx="152" cy="156" r="4" fill="#fff"/>
<circle cx="140" cy="130" r="5" fill="#fff"/>
`);

/* ── Zinnia ── */
const zinnia = wrap(280, 310,
`<!-- stem -->
<line x1="140" y1="188" x2="140" y2="298" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
<!-- leaf left -->
<path d="M140 258 Q106 244 98 220 Q128 228 140 252 Z" ${SF}/>
<!-- leaf right -->
<path d="M140 232 Q174 218 180 194 Q152 204 140 226 Z" ${SF}/>
<!-- outer petals (8) -->
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(0   140 148)" ${SF}/>
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(45  140 148)" ${SF}/>
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(90  140 148)" ${SF}/>
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(135 140 148)" ${SF}/>
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(180 140 148)" ${SF}/>
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(225 140 148)" ${SF}/>
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(270 140 148)" ${SF}/>
<ellipse cx="140" cy="98"  rx="22" ry="55" transform="rotate(315 140 148)" ${SF}/>
<!-- inner petals (8) -->
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(22  140 148)" ${SF}/>
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(67  140 148)" ${SF}/>
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(112 140 148)" ${SF}/>
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(157 140 148)" ${SF}/>
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(202 140 148)" ${SF}/>
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(247 140 148)" ${SF}/>
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(292 140 148)" ${SF}/>
<ellipse cx="140" cy="120" rx="14" ry="32" transform="rotate(337 140 148)" ${SF}/>
<!-- centre -->
<circle cx="140" cy="148" r="28" ${S}/>
<circle cx="130" cy="142" r="5" fill="#1C1C1C"/>
<circle cx="150" cy="142" r="5" fill="#1C1C1C"/>
<circle cx="140" cy="155" r="5" fill="#1C1C1C"/>
`);

/* ────────────────────────────────────────────────────────── */
/*  EXPORTS                                                  */
/* ────────────────────────────────────────────────────────── */

export const COLORING_IMAGES = [
  { letter:'A', name:'Alligator',   category:'animals',   svg: alligator  },
  { letter:'B', name:'Butterfly',   category:'animals',   svg: butterfly  },
  { letter:'C', name:'Cat',         category:'animals',   svg: cat        },
  { letter:'D', name:'Dog',         category:'animals',   svg: dog        },
  { letter:'E', name:'Elephant',    category:'animals',   svg: elephant   },
  { letter:'F', name:'Fish',        category:'animals',   svg: fish       },
  { letter:'G', name:'Giraffe',     category:'animals',   svg: giraffe    },
  { letter:'H', name:'Horse',       category:'animals',   svg: horse      },
  { letter:'I', name:'Iguana',      category:'animals',   svg: iguana     },
  { letter:'J', name:'Jellyfish',   category:'animals',   svg: jellyfish  },
  { letter:'K', name:'Kangaroo',    category:'animals',   svg: kangaroo   },
  { letter:'L', name:'Lion',        category:'animals',   svg: lion       },
  { letter:'M', name:'Monkey',      category:'animals',   svg: monkey     },
  { letter:'N', name:'Narwhal',     category:'animals',   svg: narwhal    },
  { letter:'O', name:'Owl',         category:'animals',   svg: owl        },
  { letter:'P', name:'Penguin',     category:'animals',   svg: penguin    },
  { letter:'Q', name:'Quail',       category:'animals',   svg: quail      },
  { letter:'R', name:'Rabbit',      category:'animals',   svg: rabbit     },
  { letter:'S', name:'Snail',       category:'animals',   svg: snail      },
  { letter:'T', name:'Tiger',       category:'animals',   svg: tiger      },
  { letter:'U', name:'Unicorn',     category:'animals',   svg: unicorn    },
  { letter:'V', name:'Vulture',     category:'animals',   svg: vulture    },
  { letter:'W', name:'Whale',       category:'animals',   svg: whale      },
  { letter:'X', name:'X-ray Fish',  category:'animals',   svg: xrayfish   },
  { letter:'Y', name:'Yak',         category:'animals',   svg: yak        },
  { letter:'Z', name:'Zebra',       category:'animals',   svg: zebra      },

  { letter:'A', name:'Airplane',         category:'vehicles', svg: airplane      },
  { letter:'B', name:'Bus',              category:'vehicles', svg: bus           },
  { letter:'C', name:'Car',              category:'vehicles', svg: car           },
  { letter:'D', name:'Dump Truck',       category:'vehicles', svg: dumpTruck     },
  { letter:'E', name:'Engine',           category:'vehicles', svg: trainEngine   },
  { letter:'F', name:'Fire Truck',       category:'vehicles', svg: fireTruck     },
  { letter:'G', name:'Go-Kart',          category:'vehicles', svg: goKart        },
  { letter:'H', name:'Helicopter',       category:'vehicles', svg: helicopter    },
  { letter:'I', name:'Ice Cream Truck',  category:'vehicles', svg: iceCreamTruck },
  { letter:'J', name:'Jet',              category:'vehicles', svg: jet           },
  { letter:'K', name:'Kayak',            category:'vehicles', svg: kayak         },
  { letter:'L', name:'Locomotive',       category:'vehicles', svg: locomotive    },
  { letter:'M', name:'Motorcycle',       category:'vehicles', svg: motorcycle    },
  { letter:'N', name:'Navy Ship',        category:'vehicles', svg: navyShip      },
  { letter:'O', name:'Ocean Liner',      category:'vehicles', svg: oceanLiner    },
  { letter:'P', name:'Police Car',       category:'vehicles', svg: policeCar     },
  { letter:'Q', name:'Quad Bike',        category:'vehicles', svg: quadBike      },
  { letter:'R', name:'Rocket',           category:'vehicles', svg: rocket        },
  { letter:'S', name:'Submarine',        category:'vehicles', svg: submarine     },
  { letter:'T', name:'Truck',            category:'vehicles', svg: truck         },
  { letter:'U', name:'Unicycle',         category:'vehicles', svg: unicycle      },
  { letter:'V', name:'Van',              category:'vehicles', svg: van           },
  { letter:'W', name:'Wagon',            category:'vehicles', svg: wagon         },
  { letter:'X', name:'Xplane',           category:'vehicles', svg: xplane        },
  { letter:'Y', name:'Yacht',            category:'vehicles', svg: yacht         },
  { letter:'Z', name:'Zamboni',          category:'vehicles', svg: zamboni       },

  { letter:'A', name:'Apple Tree',   category:'nature', svg: appleTree  },
  { letter:'B', name:'Bush',         category:'nature', svg: bush       },
  { letter:'C', name:'Cloud',        category:'nature', svg: cloud      },
  { letter:'D', name:'Daisy',        category:'nature', svg: daisy      },
  { letter:'E', name:'Earth',        category:'nature', svg: earth      },
  { letter:'F', name:'Flower',       category:'nature', svg: flower     },
  { letter:'G', name:'Garden Pot',   category:'nature', svg: gardenPot  },
  { letter:'H', name:'House',        category:'nature', svg: house      },
  { letter:'I', name:'Island',       category:'nature', svg: island     },
  { letter:'J', name:'Jungle Leaf',  category:'nature', svg: jungleLeaf },
  { letter:'K', name:'Kite',         category:'nature', svg: kite       },
  { letter:'L', name:'Leaf',         category:'nature', svg: leaf       },
  { letter:'M', name:'Mountain',     category:'nature', svg: mountain   },
  { letter:'N', name:'Nest',         category:'nature', svg: nest       },
  { letter:'O', name:'Oak Tree',     category:'nature', svg: oakTree    },
  { letter:'P', name:'Pine Tree',    category:'nature', svg: pineTree   },
  { letter:'Q', name:'Quiet Pond',   category:'nature', svg: quietPond  },
  { letter:'R', name:'Rainbow',      category:'nature', svg: rainbow    },
  { letter:'S', name:'Sun',          category:'nature', svg: sun        },
  { letter:'T', name:'Tree',         category:'nature', svg: tree       },
  { letter:'U', name:'Umbrella',     category:'nature', svg: umbrella   },
  { letter:'V', name:'Vine',         category:'nature', svg: vine       },
  { letter:'W', name:'Waterfall',    category:'nature', svg: waterfall  },
  { letter:'X', name:'Xmas Tree',    category:'nature', svg: xmasTree   },
  { letter:'Y', name:'Sunflower',    category:'nature', svg: sunflower  },
  { letter:'Z', name:'Zinnia',       category:'nature', svg: zinnia     },
];

export const CATEGORIES = ['animals','vehicles','nature'];
