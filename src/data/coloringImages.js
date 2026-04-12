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

  { letter:'C', name:'Car',         category:'vehicles',  svg: car        },
  { letter:'R', name:'Rocket',      category:'vehicles',  svg: rocket     },

  { letter:'S', name:'Sun',         category:'nature',    svg: sun        },
  { letter:'F', name:'Flower',      category:'nature',    svg: flower     },
  { letter:'H', name:'House',       category:'nature',    svg: house      },
];

export const CATEGORIES = ['animals','vehicles','nature'];
