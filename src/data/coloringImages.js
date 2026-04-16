/**
 * data/coloringImages.js
 *
 * SVG illustrations for A–Z coloring pages.
 * Data is now managed in imageMap.js — edit that file to add or change illustrations.
 * Individual SVG files live in src/assets/svgs/.
 */
export { IMAGE_MAP as COLORING_IMAGES } from './imageMap.js';

// Legacy inline SVGs kept for reference — not exported, not used at runtime.
/* eslint-disable */
function wrap(w, h, content) { return content; }

/* ── stroke helpers ──────────────────────────────────── */
// Outlined white-fill shape (fillable region)
const S  = 'stroke="#1C1C1C" stroke-width="8" stroke-linejoin="round" stroke-linecap="round" fill="#fff"';
// Stroke only, no fill (decorative lines)
const SN = 'stroke="#1C1C1C" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"';

/* ────────────────────────────────────────────────────── */
/*  A – Apple                                            */
/* ────────────────────────────────────────────────────── */
const apple = wrap(320, 280, `
<path d="M160 78 Q172 54 183 46" ${SN}/>
<ellipse cx="192" cy="52" rx="26" ry="12" transform="rotate(-25 192 52)" ${S}/>
<circle cx="160" cy="178" r="98" ${S}/>
<path d="M130 92 Q160 80 190 92" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  B – Ball                                             */
/* ────────────────────────────────────────────────────── */
const ball = wrap(320, 280, `
<circle cx="160" cy="148" r="120" ${S}/>
<path d="M48 108 Q118 98 160 148 Q202 198 272 188" ${SN}/>
<path d="M48 188 Q118 178 160 148 Q202 118 272 108" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  C – Cat                                              */
/* ────────────────────────────────────────────────────── */
const cat = wrap(320, 280, `
<polygon points="72,72 96,28 128,88" ${S}/>
<polygon points="248,72 224,28 192,88" ${S}/>
<circle cx="160" cy="160" r="112" ${S}/>
<ellipse cx="122" cy="148" rx="18" ry="24" ${S}/>
<ellipse cx="198" cy="148" rx="18" ry="24" ${S}/>
<ellipse cx="122" cy="154" rx="9" ry="16" fill="#1C1C1C" stroke="none"/>
<ellipse cx="198" cy="154" rx="9" ry="16" fill="#1C1C1C" stroke="none"/>
<polygon points="160,186 150,200 170,200" ${S}/>
<path d="M150 200 Q138 216 128 210" ${SN}/>
<path d="M170 200 Q182 216 192 210" ${SN}/>
<line x1="98" y1="200" x2="38" y2="192" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="98" y1="212" x2="38" y2="212" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="222" y1="200" x2="282" y2="192" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="222" y1="212" x2="282" y2="212" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
`);

/* ────────────────────────────────────────────────────── */
/*  D – Dog                                              */
/* ────────────────────────────────────────────────────── */
const dog = wrap(320, 280, `
<ellipse cx="78" cy="170" rx="42" ry="68" transform="rotate(-8 78 170)" ${S}/>
<ellipse cx="242" cy="170" rx="42" ry="68" transform="rotate(8 242 170)" ${S}/>
<circle cx="160" cy="138" r="105" ${S}/>
<ellipse cx="160" cy="196" rx="52" ry="38" ${S}/>
<circle cx="148" cy="186" r="8" fill="#1C1C1C" stroke="none"/>
<circle cx="172" cy="186" r="8" fill="#1C1C1C" stroke="none"/>
<path d="M140 210 Q160 228 180 210" ${SN}/>
<circle cx="122" cy="118" r="18" ${S}/>
<circle cx="198" cy="118" r="18" ${S}/>
<circle cx="122" cy="118" r="8" fill="#1C1C1C" stroke="none"/>
<circle cx="198" cy="118" r="8" fill="#1C1C1C" stroke="none"/>
`);

/* ────────────────────────────────────────────────────── */
/*  E – Elephant                                         */
/* ────────────────────────────────────────────────────── */
const elephant = wrap(320, 280, `
<rect x="72" y="224" width="36" height="50" rx="12" ${S}/>
<rect x="120" y="228" width="36" height="48" rx="12" ${S}/>
<rect x="172" y="228" width="36" height="48" rx="12" ${S}/>
<ellipse cx="158" cy="168" rx="108" ry="78" ${S}/>
<ellipse cx="236" cy="136" rx="50" ry="60" ${S}/>
<circle cx="252" cy="110" r="54" ${S}/>
<path d="M272 148 Q308 172 306 204 Q303 228 283 224" ${SN}/>
<circle cx="266" cy="96" r="10" ${S}/>
<circle cx="266" cy="96" r="4" fill="#1C1C1C" stroke="none"/>
<path d="M50 154 Q30 162 28 182" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  F – Fish                                             */
/* ────────────────────────────────────────────────────── */
const fish = wrap(320, 280, `
<path d="M268 140 L312 88 L312 192 Z" ${S}/>
<ellipse cx="152" cy="140" rx="118" ry="80" ${S}/>
<path d="M112 65 Q155 42 195 62" ${SN}/>
<path d="M130 215 Q155 238 178 215" ${SN}/>
<circle cx="78" cy="128" r="22" ${S}/>
<circle cx="78" cy="128" r="9" fill="#1C1C1C" stroke="none"/>
<path d="M42 148 Q36 140 42 132" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  G – Giraffe                                          */
/* ────────────────────────────────────────────────────── */
const giraffe = wrap(320, 280, `
<rect x="68" y="252" width="30" height="24" rx="8" ${S}/>
<rect x="112" y="256" width="30" height="22" rx="8" ${S}/>
<rect x="158" y="256" width="30" height="22" rx="8" ${S}/>
<rect x="202" y="252" width="30" height="24" rx="8" ${S}/>
<ellipse cx="148" cy="192" rx="98" ry="72" ${S}/>
<rect x="198" y="85" width="52" height="120" rx="18" ${S}/>
<ellipse cx="244" cy="68" rx="40" ry="30" ${S}/>
<path d="M228 40 L224 18" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<circle cx="224" cy="14" r="7" fill="#1C1C1C" stroke="none"/>
<path d="M254 40 L258 18" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<circle cx="258" cy="14" r="7" fill="#1C1C1C" stroke="none"/>
<circle cx="256" cy="62" r="10" ${S}/>
<circle cx="256" cy="62" r="4" fill="#1C1C1C" stroke="none"/>
<path d="M270 90 Q280 102 275 114" ${SN}/>
<circle cx="120" cy="178" r="16" ${S}/>
<circle cx="168" cy="205" r="13" ${S}/>
<circle cx="215" cy="128" r="13" ${S}/>
<path d="M52 185 Q34 195 30 218" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  H – House                                            */
/* ────────────────────────────────────────────────────── */
const house = wrap(320, 280, `
<rect x="148" y="20" width="24" height="42" rx="4" ${S}/>
<path d="M30 155 L160 30 L290 155 Z" ${S}/>
<rect x="48" y="148" width="224" height="128" rx="6" ${S}/>
<rect x="132" y="202" width="56" height="74" rx="6" ${S}/>
<rect x="68" y="170" width="52" height="52" rx="8" ${S}/>
<rect x="200" y="170" width="52" height="52" rx="8" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  I – Ice Cream                                        */
/* ────────────────────────────────────────────────────── */
const icecream = wrap(320, 280, `
<path d="M118 162 L160 268 L202 162 Z" ${S}/>
<circle cx="160" cy="116" r="62" ${S}/>
<circle cx="122" cy="88" r="40" ${S}/>
<circle cx="198" cy="88" r="40" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  J – Jellyfish                                        */
/* ────────────────────────────────────────────────────── */
const jellyfish = wrap(320, 280, `
<path d="M55 148 Q55 42 160 42 Q265 42 265 148 Q240 132 220 148 Q200 132 180 148 Q160 132 140 148 Q120 132 100 148 Z" ${S}/>
<path d="M100 148 Q95 185 88 215 Q82 240 90 252" ${SN}/>
<path d="M125 148 Q120 190 118 222" ${SN}/>
<path d="M152 148 Q150 194 152 228" ${SN}/>
<path d="M178 148 Q182 194 180 228" ${SN}/>
<path d="M205 148 Q212 185 215 217" ${SN}/>
<path d="M228 148 Q238 185 245 210 Q250 228 242 240" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  K – Kite                                             */
/* ────────────────────────────────────────────────────── */
const kite = wrap(320, 280, `
<path d="M160 18 L298 148 L160 258 L22 148 Z" ${S}/>
<line x1="160" y1="18" x2="160" y2="258" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<line x1="22" y1="148" x2="298" y2="148" stroke="#1C1C1C" stroke-width="6" stroke-linecap="round"/>
<path d="M160 258 Q178 268 185 278" ${SN}/>
<ellipse cx="196" cy="272" rx="14" ry="8" transform="rotate(-15 196 272)" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  L – Lion                                             */
/* ────────────────────────────────────────────────────── */
const lion = wrap(320, 280, `
<circle cx="160" cy="152" r="130" ${S}/>
<circle cx="160" cy="152" r="88" ${S}/>
<path d="M120 70 Q130 56 148 60" ${SN}/>
<path d="M200 70 Q190 56 172 60" ${SN}/>
<ellipse cx="122" cy="140" rx="17" ry="22" ${S}/>
<ellipse cx="198" cy="140" rx="17" ry="22" ${S}/>
<ellipse cx="122" cy="146" rx="8" ry="14" fill="#1C1C1C" stroke="none"/>
<ellipse cx="198" cy="146" rx="8" ry="14" fill="#1C1C1C" stroke="none"/>
<ellipse cx="160" cy="182" rx="38" ry="28" ${S}/>
<circle cx="148" cy="175" r="6" fill="#1C1C1C" stroke="none"/>
<circle cx="172" cy="175" r="6" fill="#1C1C1C" stroke="none"/>
<path d="M148 194 Q160 206 172 194" ${SN}/>
<line x1="124" y1="183" x2="76" y2="174" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="124" y1="192" x2="76" y2="192" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="196" y1="183" x2="244" y2="174" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="196" y1="192" x2="244" y2="192" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
`);

/* ────────────────────────────────────────────────────── */
/*  M – Moon                                             */
/* ────────────────────────────────────────────────────── */
const moon = wrap(320, 280, `
<path d="M160 28 C252 28 298 82 298 140 C298 198 252 252 160 252 C196 234 216 192 216 140 C216 88 196 46 160 28 Z" ${S}/>
<circle cx="244" cy="82" r="14" ${S}/>
<circle cx="218" cy="220" r="10" ${S}/>
<circle cx="268" cy="168" r="9" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  N – Nest                                             */
/* ────────────────────────────────────────────────────── */
const nest = wrap(320, 280, `
<ellipse cx="115" cy="168" rx="35" ry="24" ${S}/>
<ellipse cx="160" cy="152" rx="35" ry="24" ${S}/>
<ellipse cx="205" cy="168" rx="35" ry="24" ${S}/>
<path d="M55 182 Q52 244 160 250 Q268 244 265 182 Q240 164 215 175 Q190 158 160 155 Q130 158 105 175 Q80 164 55 182 Z" ${S}/>
<path d="M75 198 Q110 190 145 198 Q178 206 210 198" ${SN}/>
<path d="M88 220 Q125 210 160 220 Q195 230 232 220" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  O – Owl                                              */
/* ────────────────────────────────────────────────────── */
const owl = wrap(320, 280, `
<rect x="40" y="252" width="240" height="22" rx="10" ${S}/>
<ellipse cx="160" cy="168" rx="88" ry="102" ${S}/>
<circle cx="160" cy="138" r="62" ${S}/>
<polygon points="125,80 110,48 146,84" ${S}/>
<polygon points="195,80 210,48 174,84" ${S}/>
<circle cx="138" cy="130" r="28" ${S}/>
<circle cx="182" cy="130" r="28" ${S}/>
<circle cx="138" cy="130" r="12" fill="#1C1C1C" stroke="none"/>
<circle cx="182" cy="130" r="12" fill="#1C1C1C" stroke="none"/>
<polygon points="160,153 150,170 170,170" ${S}/>
<path d="M72 182 Q52 202 58 232" ${SN}/>
<path d="M248 182 Q268 202 262 232" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  P – Pig                                              */
/* ────────────────────────────────────────────────────── */
const pig = wrap(320, 280, `
<ellipse cx="128" cy="78" rx="36" ry="32" ${S}/>
<ellipse cx="192" cy="78" rx="36" ry="32" ${S}/>
<circle cx="160" cy="152" r="118" ${S}/>
<ellipse cx="160" cy="195" rx="52" ry="38" ${S}/>
<ellipse cx="147" cy="190" rx="9" ry="11" ${S}/>
<ellipse cx="173" cy="190" rx="9" ry="11" ${S}/>
<circle cx="147" cy="190" r="5" fill="#1C1C1C" stroke="none"/>
<circle cx="173" cy="190" r="5" fill="#1C1C1C" stroke="none"/>
<circle cx="122" cy="130" r="16" ${S}/>
<circle cx="198" cy="130" r="16" ${S}/>
<circle cx="122" cy="130" r="7" fill="#1C1C1C" stroke="none"/>
<circle cx="198" cy="130" r="7" fill="#1C1C1C" stroke="none"/>
<path d="M140 215 Q160 232 180 215" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  Q – Queen's Crown                                    */
/* ────────────────────────────────────────────────────── */
const crown = wrap(320, 280, `
<path d="M40 252 L40 152 L90 82 L140 162 L160 97 L180 162 L230 82 L280 152 L280 252 Z" ${S}/>
<circle cx="90" cy="82" r="18" ${S}/>
<circle cx="160" cy="97" r="18" ${S}/>
<circle cx="230" cy="82" r="18" ${S}/>
<line x1="40" y1="212" x2="280" y2="212" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
<line x1="40" y1="232" x2="280" y2="232" stroke="#1C1C1C" stroke-width="7" stroke-linecap="round"/>
`);

/* ────────────────────────────────────────────────────── */
/*  R – Rainbow                                          */
/* ────────────────────────────────────────────────────── */
const rainbow = wrap(320, 280, `
<path d="M42 205 A118 118 0 0 0 278 205 L260 205 A100 100 0 0 1 60 205 Z" ${S}/>
<path d="M60 205 A100 100 0 0 0 260 205 L242 205 A82 82 0 0 1 78 205 Z" ${S}/>
<path d="M78 205 A82 82 0 0 0 242 205 L224 205 A64 64 0 0 1 96 205 Z" ${S}/>
<path d="M96 205 A64 64 0 0 0 224 205 L206 205 A46 46 0 0 1 114 205 Z" ${S}/>
<path d="M114 205 A46 46 0 0 0 206 205 L188 205 A28 28 0 0 1 132 205 Z" ${S}/>
<ellipse cx="52" cy="218" rx="58" ry="40" ${S}/>
<circle cx="26" cy="210" r="28" ${S}/>
<circle cx="82" cy="202" r="24" ${S}/>
<ellipse cx="268" cy="218" rx="58" ry="40" ${S}/>
<circle cx="294" cy="210" r="28" ${S}/>
<circle cx="238" cy="202" r="24" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  S – Sun                                              */
/* ────────────────────────────────────────────────────── */
const sun = wrap(320, 280, `
<polygon points="160,15 148,55 172,55" ${S}/>
<polygon points="255,55 224,82 240,102" ${S}/>
<polygon points="295,148 255,136 255,160" ${S}/>
<polygon points="255,241 240,194 224,214" ${S}/>
<polygon points="160,281 172,241 148,241" ${S}/>
<polygon points="65,241 80,214 64,194" ${S}/>
<polygon points="25,148 65,160 65,136" ${S}/>
<polygon points="65,55 80,102 64,82" ${S}/>
<circle cx="160" cy="148" r="84" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  T – Train                                            */
/* ────────────────────────────────────────────────────── */
const train = wrap(320, 280, `
<circle cx="255" cy="44" r="18" ${S}/>
<circle cx="272" cy="28" r="13" ${S}/>
<circle cx="284" cy="16" r="9" ${S}/>
<rect x="242" y="62" width="24" height="32" rx="6" ${S}/>
<rect x="200" y="90" width="88" height="84" rx="10" ${S}/>
<rect x="218" y="106" width="52" height="44" rx="8" ${S}/>
<rect x="32" y="138" width="256" height="86" rx="14" ${S}/>
<rect x="146" y="150" width="44" height="66" rx="8" ${S}/>
<rect x="54" y="154" width="50" height="38" rx="8" ${S}/>
<circle cx="32" cy="182" r="14" ${S}/>
<circle cx="72" cy="238" r="36" ${S}/>
<circle cx="72" cy="238" r="16" ${S}/>
<circle cx="168" cy="238" r="36" ${S}/>
<circle cx="168" cy="238" r="16" ${S}/>
<circle cx="254" cy="238" r="32" ${S}/>
<circle cx="254" cy="238" r="14" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  U – Umbrella                                         */
/* ────────────────────────────────────────────────────── */
const umbrella = wrap(320, 280, `
<path d="M160 32 Q42 32 42 132 Q78 112 105 132 Q132 112 160 132 Q188 112 215 132 Q242 112 278 132 Q278 32 160 32 Z" ${S}/>
<line x1="160" y1="132" x2="160" y2="248" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<path d="M160 248 Q160 276 140 276 Q120 276 120 256" ${SN}/>
<line x1="105" y1="72" x2="160" y2="132" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="215" y1="72" x2="160" y2="132" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="42" y1="132" x2="160" y2="132" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
<line x1="278" y1="132" x2="160" y2="132" stroke="#1C1C1C" stroke-width="5" stroke-linecap="round"/>
`);

/* ────────────────────────────────────────────────────── */
/*  V – Volcano                                          */
/* ────────────────────────────────────────────────────── */
const volcano = wrap(320, 280, `
<path d="M20 264 L128 68 L192 68 L300 264 Z" ${S}/>
<ellipse cx="160" cy="68" rx="44" ry="24" ${S}/>
<path d="M136 68 Q125 100 132 145 Q138 185 122 222" ${SN}/>
<path d="M184 68 Q195 100 188 145 Q182 185 198 222" ${SN}/>
<path d="M126 55 Q145 46 160 50 Q175 46 194 55" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  W – Whale                                            */
/* ────────────────────────────────────────────────────── */
const whale = wrap(320, 280, `
<path d="M262 108 L296 68 Q300 86 286 106 Z" ${S}/>
<path d="M262 172 L296 212 Q300 194 286 174 Z" ${S}/>
<path d="M38 140 Q38 68 130 52 Q210 38 262 140 Q210 242 130 228 Q38 212 38 140 Z" ${S}/>
<circle cx="80" cy="120" r="18" ${S}/>
<circle cx="80" cy="120" r="8" fill="#1C1C1C" stroke="none"/>
<path d="M50 154 Q65 170 85 164" ${SN}/>
<path d="M105 52 Q95 25 88 12" ${SN}/>
<path d="M116 48 Q108 20 108 5" ${SN}/>
<path d="M126 46 Q122 18 128 5" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  X – Xylophone                                        */
/* ────────────────────────────────────────────────────── */
const xylophone = wrap(320, 280, `
<rect x="32" y="218" width="256" height="18" rx="8" ${S}/>
<rect x="46" y="88" width="38" height="138" rx="8" ${S}/>
<rect x="98" y="105" width="38" height="121" rx="8" ${S}/>
<rect x="150" y="120" width="38" height="106" rx="8" ${S}/>
<rect x="202" y="135" width="38" height="91" rx="8" ${S}/>
<rect x="254" y="150" width="22" height="76" rx="8" ${S}/>
<line x1="72" y1="42" x2="88" y2="82" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<circle cx="68" cy="34" r="16" ${S}/>
<line x1="248" y1="42" x2="232" y2="82" stroke="#1C1C1C" stroke-width="8" stroke-linecap="round"/>
<circle cx="252" cy="34" r="16" ${S}/>
`);

/* ────────────────────────────────────────────────────── */
/*  Y – Yak                                              */
/* ────────────────────────────────────────────────────── */
const yak = wrap(320, 280, `
<rect x="72" y="224" width="30" height="52" rx="10" ${S}/>
<rect x="115" y="228" width="30" height="50" rx="10" ${S}/>
<rect x="180" y="228" width="30" height="50" rx="10" ${S}/>
<rect x="222" y="224" width="30" height="52" rx="10" ${S}/>
<path d="M55 188 Q55 118 160 112 Q265 118 265 188 Q250 200 235 190 Q220 202 205 190 Q190 202 175 190 Q160 202 145 190 Q130 202 115 190 Q100 200 85 190 Q70 200 55 188 Z" ${S}/>
<rect x="215" y="108" width="50" height="82" rx="16" ${S}/>
<ellipse cx="258" cy="92" rx="46" ry="36" ${S}/>
<path d="M238 60 Q228 38 215 30" ${SN}/>
<circle cx="214" cy="28" r="7" fill="#1C1C1C" stroke="none"/>
<path d="M278 60 Q288 38 300 30" ${SN}/>
<circle cx="300" cy="28" r="7" fill="#1C1C1C" stroke="none"/>
<circle cx="272" cy="85" r="10" ${S}/>
<circle cx="272" cy="85" r="5" fill="#1C1C1C" stroke="none"/>
<ellipse cx="232" cy="82" rx="12" ry="18" ${S}/>
<ellipse cx="295" cy="106" rx="15" ry="11" ${S}/>
<path d="M55 178 Q32 182 28 202" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  Z – Zebra                                            */
/* ────────────────────────────────────────────────────── */
const zebra = wrap(320, 280, `
<rect x="72" y="222" width="30" height="54" rx="10" ${S}/>
<rect x="115" y="226" width="30" height="52" rx="10" ${S}/>
<rect x="175" y="226" width="30" height="52" rx="10" ${S}/>
<rect x="218" y="222" width="30" height="54" rx="10" ${S}/>
<ellipse cx="155" cy="180" rx="108" ry="75" ${S}/>
<rect x="208" y="88" width="52" height="108" rx="16" ${S}/>
<ellipse cx="255" cy="72" rx="44" ry="34" ${S}/>
<path d="M210 88 Q218 66 226 88 Q234 62 242 88 Q250 66 258 88" ${SN}/>
<ellipse cx="242" cy="42" rx="12" ry="18" ${S}/>
<circle cx="268" cy="64" r="10" ${S}/>
<circle cx="268" cy="64" r="5" fill="#1C1C1C" stroke="none"/>
<path d="M280 80 Q292 88 288 98" ${SN}/>
<path d="M96 124 L89 173 Q102 177 104 166 L112 121 Z" ${S}/>
<path d="M130 113 L124 172 Q137 176 140 165 L148 113 Z" ${S}/>
<path d="M163 110 L159 170 Q172 172 175 161 L179 110 Z" ${S}/>
<path d="M197 113 L195 170 Q208 170 211 159 L215 115 Z" ${S}/>
<path d="M48 170 Q28 177 22 198" ${SN}/>
`);

/* ────────────────────────────────────────────────────── */
/*  Export                                               */
/* ────────────────────────────────────────────────────── */
const _LEGACY_COLORING_IMAGES = [
  { letter: 'A', name: 'Apple',       svg: apple      },
  { letter: 'B', name: 'Ball',        svg: ball       },
  { letter: 'C', name: 'Cat',         svg: cat        },
  { letter: 'D', name: 'Dog',         svg: dog        },
  { letter: 'E', name: 'Elephant',    svg: elephant   },
  { letter: 'F', name: 'Fish',        svg: fish       },
  { letter: 'G', name: 'Giraffe',     svg: giraffe    },
  { letter: 'H', name: 'House',       svg: house      },
  { letter: 'I', name: 'Ice Cream',   svg: icecream   },
  { letter: 'J', name: 'Jellyfish',   svg: jellyfish  },
  { letter: 'K', name: 'Kite',        svg: kite       },
  { letter: 'L', name: 'Lion',        svg: lion       },
  { letter: 'M', name: 'Moon',        svg: moon       },
  { letter: 'N', name: 'Nest',        svg: nest       },
  { letter: 'O', name: 'Owl',         svg: owl        },
  { letter: 'P', name: 'Pig',         svg: pig        },
  { letter: 'Q', name: 'Crown',       svg: crown      },
  { letter: 'R', name: 'Rainbow',     svg: rainbow    },
  { letter: 'S', name: 'Sun',         svg: sun        },
  { letter: 'T', name: 'Train',       svg: train      },
  { letter: 'U', name: 'Umbrella',    svg: umbrella   },
  { letter: 'V', name: 'Volcano',     svg: volcano    },
  { letter: 'W', name: 'Whale',       svg: whale      },
  { letter: 'X', name: 'Xylophone',   svg: xylophone  },
  { letter: 'Y', name: 'Yak',         svg: yak        },
  { letter: 'Z', name: 'Zebra',       svg: zebra      },
];
