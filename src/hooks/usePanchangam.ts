/**
 * usePanchangam.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Custom React hook that computes accurate daily Panchangam data using the
 * @ishubhamx/panchangam-js library (Swiss Ephemeris precision, offline-first,
 * 98.64% accuracy vs Drik Panchang).
 *
 * Conforms to Telugu calendar conventions, providing full Telugu translation
 * of all terms (tithi, nakshatra, yoga, karana, vara, ritu, ayana, samvatsara, masa)
 * and detailed timings (Sunrise, Sunset, Moonrise, Moonset, Auspicious timings,
 * Rahu, Yama, Gulika, Durmuhurtha, Varjyam, Amrita Gadiyalu, Shraddha Tithi).
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getPanchangam,
  Observer,
  tithiNames,
  nakshatraNames,
  yogaNames,
  dayNames,
  masaNames,
} from '@ishubhamx/panchangam-js';

// ── Temple GPS coordinates ──────────────────────────────────────────────────
const TEMPLE_LAT = 13.6288;   // Tirupati, Andhra Pradesh
const TEMPLE_LON = 79.4192;
const TEMPLE_ALT = 152;       // metres above sea level
const IST_OFFSET = 330;        // UTC+5:30 in minutes

// ── Singleton Observer ──────────────────────────────────────────────────────
let _observer: InstanceType<typeof Observer> | null = null;
function getObserver() {
  if (!_observer) {
    _observer = new Observer(TEMPLE_LAT, TEMPLE_LON, TEMPLE_ALT);
  }
  return _observer;
}

// ── Telugu Translation Dictionaries ─────────────────────────────────────────
const teluguTithis: Record<string, string> = {
  prathama: 'పాడ్యమి', pratipada: 'పాడ్యమి', dwitiya: 'విదియ', tritiya: 'తదియ',
  chaturthi: 'చవితి', panchami: 'पंचमी', shashthi: 'షష్ఠి', saptami: 'సప్తమి',
  ashtami: 'అష్టమి', navami: 'నవమి', dashami: 'దశమి', ekadashi: 'ఏకాదశి',
  dwadashi: 'ద్వాదశి', trayodashi: 'త్రయోదశి', chaturdashi: 'చతుర్దశి',
  purnima: 'పౌర్ణమి', amavasya: 'అమావాస్య'
};

const teluguNakshatras: Record<string, string> = {
  ashwini: 'అశ్విని', bharani: 'భరణి', krittika: 'కృత్తిక', rohini: 'రోహిణి',
  mrigashira: 'మృగశిర', ardra: 'ఆరుద్ర', punarvasu: 'పునర్వసు', pushya: 'పుష్యమి',
  pushyami: 'పుష్యమి', ashlesha: 'ఆశ్లేష', magha: 'మఖ', purvaphalguni: 'పూర్వఫాల్గుణి',
  poorvaphalguni: 'పూర్వఫాల్గుణి', uttaraphalguni: 'ఉత్తరాఫాల్గుణి', hasta: 'హస్త',
  chitra: 'చిత్త', swati: 'స్వాతి', vishakha: 'విశాఖ', anuradha: 'అనూరాధ',
  jyeshtha: 'జ్యేష్ఠ', mula: 'మూల', purvaashadha: 'పూర్వాషాఢ', poorvashadha: 'పూర్వాషాఢ',
  uttaraashadha: 'ఉత్తరాషాఢ', uttarashadha: 'ఉత్తరాషాఢ', shravana: 'శ్రవణం',
  dhanishta: 'ధనిష్ఠ', shatabhisha: 'శతభిషం', purvabhadrapada: 'పూర్వాభాద్ర',
  poorvabhadra: 'పూర్వాభాద్ర', uttarabhadrapada: 'ఉత్తరాభాద్ర', uttarabhadra: 'ఉత్తరాభాద్ర',
  revati: 'రేవతి'
};

const teluguYogas: Record<string, string> = {
  vishkumbha: 'విష్కంబం', priti: 'ప్రీతి', ayushman: 'ఆయుష్మాన్', saubhagya: 'సౌభాగ్యం',
  shobhana: 'శోభనం', atiganda: 'అతిగండం', sukarma: 'సుకర్మ', dhriti: 'ధృతి',
  shoola: 'శూలం', ganda: 'గండం', vriddhi: 'వృద్ధి', dhruva: 'ధ్రువ',
  vyaghata: 'వ్యాఘాతం', harshana: 'హర్షణం', vajra: 'వజ్రం', siddhi: 'సిద్ధి',
  vyatipata: 'వ్యతీపాతం', variyan: 'వరియాన్', parigha: 'పరిఘం', shiva: 'శివం',
  siddha: 'సిద్ధం', sadhya: 'సాధ్యం', shubha: 'శుభం', shukla: 'శుక్లం',
  brahma: 'బ్రహ్మం', indra: 'ఇంద్రం', vaidhriti: 'వైధృతి'
};

const teluguKaranas: Record<string, string> = {
  bava: 'బవ', balava: 'బాలవ', kaulava: 'కౌలవ', taitila: 'తైతుల',
  gara: 'గరజ', vanija: 'వణిజ', vishti: 'విష్టి (భద్ర)', bhadra: 'విష్టి (భద్ర)',
  shakuni: 'శకుని', chatushpada: 'చతుష్పాద', naga: 'నాగ', kimstughna: 'కింస్తుఘ్నం'
};

const teluguSamvatsaras: Record<string, string> = {
  prabhava: 'ప్రభవ', vibhava: 'విభవ', shukla: 'శుక్ల', pramodoota: 'ప్రమోదూత',
  prajothpatthi: 'ప్రజోత్పత్తి', angirasa: 'ఆంగీరస', srimukha: 'శ్రీముఖ', bhava: 'భావ',
  yuva: 'యువ', dhatri: 'ధాతృ', eeswara: 'ఈశ్వర', bahudhanya: 'బహుధాన్య',
  pramadi: 'ప్రమాది', vikrama: 'విక్రమ', vrusha: 'వృష', vishu: 'వృష',
  chitrabhanu: 'చిత్రభాను', swabhantu: 'స్వభాను', tarana: 'తారణ', parthiva: 'పార్థివ',
  vyaya: 'వ్యయ', sarvajittu: 'సర్వజిత్తు', sarvadhari: 'సర్వధారి', virodhi: 'విరోధి',
  vikruthi: 'వికృతి', khara: 'ఖర', nandana: 'నందన', vijaya: 'విజయ', jaya: 'జయ',
  manmadha: 'మన్మధ', durmukhi: 'దుర్ముఖి', hevilambi: 'హేవిలంబి', vilambi: 'విళంబి',
  vikari: 'వికారి', sarvari: 'శార్వరి', plava: 'ప్లవ', shubhakruthu: 'శుభకృతు',
  shobhakruthu: 'శోభకృతు', krodhi: 'క్రోధి', vishwavasu: 'విశ్వావసు', parabhava: 'పరాభవ',
  plavanga: 'ప్လవంగ', keelaka: 'కీలక', saumya: 'సౌమ్య', sadharana: 'సాధారణ',
  virodhikruthu: 'విరోధికృతు', paridhavi: 'పారిధావి', pramadicha: 'ప్రమాదీచ',
  ananda: 'ఆనంద', rakshasa: 'రాక్షస', nala: 'నల', pingala: 'పింగల',
  kalayukti: 'కాలయుక్తి', siddharthich: 'సిద్ధార్థి', siddharthi: 'సిద్ధార్థి',
  raudri: 'రౌద్రి', raudra: 'రౌద్రి', durmati: 'దుర్మతి', dundubhi: 'దుందుభి',
  rudhirodgari: 'రుధిరోద్గారి', raktakshi: 'రక్తాక్షి', krodhana: 'క్రోధన', akshaya: 'అక్షయ'
};

const teluguMasas: Record<string, string> = {
  chaitra: 'చైత్ర', vaishakha: 'వైశాఖ', jyeshtha: 'జ్యేష్ఠ', ashadha: 'ఆషాఢ',
  shravana: 'శ్రావణ', bhadrapada: 'భాద్రపద', ashvina: 'ఆశ్వయుజ', kartika: 'కార్తీక',
  margashirsha: 'మార్గశిర', pausha: 'పుష్య', magha: 'మాఘ', phalguni: 'ఫాల్గుణ'
};

const teluguRutus: Record<string, string> = {
  vasanta: 'వసంత', grishma: 'గ్రీష్మ', varsha: 'వర్ష', sharad: 'శరద్',
  hemanta: 'హేమంత', shishira: 'శిశిర'
};

const teluguAyanas: Record<string, string> = {
  uttarayana: 'ఉత్తరాయణం', dakshinayana: 'దక్షిణాయణం'
};

const teluguVaras: Record<string, string> = {
  sunday: 'ఆదివారము', monday: 'సోమవారము', tuesday: 'మంగళవారము', wednesday: 'బుధవారము',
  thursday: 'గురువారము', friday: 'శుక్రవారము', saturday: 'శనివారము'
};

const sanskritVaras: Record<string, string> = {
  sunday: 'భాను వాసరః', monday: 'ఇందు వాసరః', tuesday: 'భౌమ వాసరః', wednesday: 'సౌమ్య వాసరః',
  thursday: 'గురు వాసరః', friday: 'భృగు వాసరః', saturday: 'స్థిర వాసరః'
};

const englishSanskritVaras: Record<string, string> = {
  sunday: 'Bhanu Vaasarah', monday: 'Indu Vaasarah', tuesday: 'Bhauma Vaasarah', wednesday: 'Saumya Vaasarah',
  thursday: 'Guru Vaasarah', friday: 'Bhrigu Vaasarah', saturday: 'Sthira Vaasarah'
};

// ── Translation Helper Functions ───────────────────────────────────────────
function translateLimbName(nameOrIndex: string | number, type: 'tithi' | 'nakshatra' | 'yoga' | 'karana', isTelugu: boolean): string {
  const nameStr = String(nameOrIndex).trim();
  if (!isTelugu) return nameStr;

  const key = nameStr.toLowerCase().replace(/\s+/g, '');
  switch (type) {
    case 'tithi':
      return teluguTithis[key] || nameStr;
    case 'nakshatra':
      return teluguNakshatras[key] || nameStr;
    case 'yoga':
      return teluguYogas[key] || nameStr;
    case 'karana':
      return teluguKaranas[key] || nameStr;
    default:
      return nameStr;
  }
}

// ── Formatting Date as "HH:MM AM/PM" ─────────────────────────────────────────
function fmtTime(d: Date | null | string): string {
  if (!d) return '—';
  const dateObj = typeof d === 'string' ? new Date(d) : d;
  return dateObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
}

// ── Time range format ───────────────────────────────────────────────────────
function fmtRange(start: Date | string | null, end: Date | string | null): string {
  if (!start || !end) return '—';
  return `${fmtTime(start)} – ${fmtTime(end)}`;
}

// ── Format single time with Telugu prefix (ఉ., మ., సా., రా.) ────────────────
function formatTimeTelugu(date: Date | string | null): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Convert to IST representation
  const localTime = new Date(d.getTime());
  const hour = localTime.getHours();
  let prefix = '';
  
  if (hour >= 4 && hour < 12) prefix = 'ఉ. ';
  else if (hour >= 12 && hour < 16) prefix = 'మ. ';
  else if (hour >= 16 && hour < 20) prefix = 'సా. ';
  else prefix = 'రా. ';

  const hh = String(localTime.getHours() % 12 || 12).padStart(2, '0');
  const mm = String(localTime.getMinutes()).padStart(2, '0');
  return `${prefix}${hh}:${mm}`;
}

// ── Format range with Telugu prefixes ───────────────────────────────────────
function formatRangeTelugu(start: Date | string | null, end: Date | string | null): string {
  if (!start || !end) return '—';
  const sStr = formatTimeTelugu(start);
  const eStr = formatTimeTelugu(end);
  
  // Strip the prefix of the end time if they are same to make it clean, or keep both
  const sParts = sStr.split(' ');
  const eParts = eStr.split(' ');
  
  if (sParts[0] === eParts[0] && sParts.length > 1 && eParts.length > 1) {
    return `${sStr} నుండి ${eParts[1]} వరకు`;
  }
  return `${sStr} నుండి ${eStr} వరకు`;
}

// ── Format transitions (e.g. "Shasthi until 06:24 AM, thereafter Saptami") ──
function formatLimbList(items: any[], type: 'tithi' | 'nakshatra' | 'yoga' | 'karana', isTelugu: boolean): string {
  if (!items || items.length === 0) return '—';
  
  return items.map((item, idx) => {
    const name = translateLimbName(item.name || item.index, type, isTelugu);
    const end = item.endTime ? new Date(item.endTime) : null;
    
    if (!end || idx === items.length - 1) {
      return name;
    }
    
    const timeStr = isTelugu ? formatTimeTelugu(end) : fmtTime(end);
    return isTelugu ? `${name} ${timeStr} వరకు` : `${name} until ${timeStr}`;
  }).join(isTelugu ? ', తదుపరి ' : ', thereafter ');
}

// ── Hook Types ──────────────────────────────────────────────────────────────
export interface PanchangamData {
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  vara: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKalam: string;
  gulikaKalam: string;
  yamagandaKalam: string;
  masa: string;
  paksha: string;
  festivals: string[];
  pakshaTithi: string;
  
  // Telugu Specific / Exact Image Layout variables
  gregorianDateString: string; // "22-05-2026"
  monthDayVaraHeaderTe: string; // "మే - శుక్రవారము"
  sanskritVaraHeaderTe: string; // "భృగు వాసరః"
  sanskritVaraHeaderEn: string; // "Bhrigu Vaasarah"
  samvatsaraName: string; // "Parabhava"
  samvatsaraNameTe: string; // "శ్రీ పరాభవ నామ సంవత్సరం"
  masaNameTe: string; // "అధిక జ్యేష్ఠ మాసం"
  rituName: string; // "Grishma"
  rituNameTe: string; // "గ్రీష్మ ఋతువు"
  ayanaName: string; // "Uttarayana"
  ayanaNameTe: string; // "ఉత్తరాయణం"
  
  // Limbs in Telugu
  tithiTe: string;
  nakshatraTe: string;
  yogaTe: string;
  karanaTe: string;
  
  // Detailed times in Telugu
  sunriseTe: string;
  sunsetTe: string;
  moonriseTe: string;
  moonsetTe: string;
  rahuKalamTe: string;
  yamagandaKalamTe: string;
  
  // Auspicious/Inauspicious variables
  auspiciousTimings: string;
  auspiciousTimingsTe: string;
  durmuhurtham: string;
  durmuhurthamTe: string;
  varjyam: string;
  varjyamTe: string;
  amritaGadiyalu: string;
  amritaGadiyaluTe: string;
  shraddhaTithi: string;
  shraddhaTithiTe: string;

  loading: boolean;
  error: string | null;
  lastFetched: Date | null;
}

// ── Core calculation function ───────────────────────────────────────────────
function calculate(date: Date): Omit<PanchangamData, 'loading' | 'error' | 'lastFetched'> {
  const observer = getObserver();
  const p = getPanchangam(date, observer, { timezoneOffset: IST_OFFSET });

  // Get raw elements from library or fallback
  const tithiRaw = safeName(tithiNames, p.tithi);
  const nakshatraRaw = safeName(nakshatraNames, p.nakshatra);
  const yogaRaw = safeName(yogaNames, p.yoga);
  const karanaRaw = typeof p.karana === 'string' ? p.karana : safeName([], 0);
  const varaIndex = p.vara ?? date.getDay();
  const varaRaw = safeName(dayNames, varaIndex);
  
  const masaRaw = p.masa?.name ?? safeName(masaNames, p.masa?.index ?? 0);
  const pakshaRaw = p.paksha ?? '';
  const rituRaw = p.ritu ?? '';
  const ayanaRaw = p.ayana ?? '';
  const samvatsaraRaw = p.samvat?.samvatsara ?? '';

  // Sunrise/Sunset & Moonrise/Moonset
  const sunrise = fmtTime(p.sunrise);
  const sunset = fmtTime(p.sunset);
  const moonrise = fmtTime(p.moonrise);
  const moonset = fmtTime(p.moonset);

  const sunriseTe = formatTimeTelugu(p.sunrise);
  const sunsetTe = formatTimeTelugu(p.sunset);
  const moonriseTe = formatTimeTelugu(p.moonrise);
  const moonsetTe = formatTimeTelugu(p.moonset);

  // Inauspicious Timings
  const rahuKalam = fmtRange(p.rahuKalamStart, p.rahuKalamEnd);
  const rahuKalamTe = formatRangeTelugu(p.rahuKalamStart, p.rahuKalamEnd);
  
  const gulikaKalam = p.gulikaKalam ? fmtRange(p.gulikaKalam.start, p.gulikaKalam.end) : '—';
  
  const yamagandaKalam = p.yamagandaKalam ? fmtRange(p.yamagandaKalam.start, p.yamagandaKalam.end) : '—';
  const yamagandaKalamTe = p.yamagandaKalam ? formatRangeTelugu(p.yamagandaKalam.start, p.yamagandaKalam.end) : '—';

  // Transitions for the 4 limbs (e.g. "Shashthi until 12:06 PM, thereafter Saptami")
  const tithiTe = formatLimbList(p.tithis || [], 'tithi', true);
  const nakshatraTe = formatLimbList(p.nakshatras || [], 'nakshatra', true);
  const yogaTe = formatLimbList(p.yogas || [], 'yoga', true);
  const karanaTe = formatLimbList(p.karanas || [], 'karana', true);

  const tithiEn = formatLimbList(p.tithis || [], 'tithi', false);
  const nakshatraEn = formatLimbList(p.nakshatras || [], 'nakshatra', false);
  const yogaEn = formatLimbList(p.yogas || [], 'yoga', false);
  const karanaEn = formatLimbList(p.karanas || [], 'karana', false);

  // Header helpers
  const dayNameLower = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
  const monthNameTe = ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబరు', 'అక్టోబరు', 'నవంబరు', 'డిసెంబరు'][date.getMonth()];
  
  const monthDayVaraHeaderTe = `${monthNameTe} - ${teluguVaras[dayNameLower] || ''}`;
  const sanskritVaraHeaderTe = sanskritVaras[dayNameLower] || '';
  const sanskritVaraHeaderEn = englishSanskritVaras[dayNameLower] || '';

  // Samvatsara, Masa, Ritu, Ayana translations
  const samvatsaraName = samvatsaraRaw;
  const samvatsaraKey = samvatsaraRaw.toLowerCase().replace(/\s+/g, '');
  const samvatsaraNameTe = `శ్రీ ${teluguSamvatsaras[samvatsaraKey] || samvatsaraRaw} నామ సంవత్సరం`;
  
  const isAdhika = p.masa?.isAdhika ?? false;
  const masaKey = masaRaw.toLowerCase().replace(/\s+/g, '');
  const masaBaseTe = teluguMasas[masaKey] || masaRaw;
  const masaNameTe = `${isAdhika ? 'అధిక ' : ''}${masaBaseTe} మాసం`;

  const rituName = rituRaw;
  const rituKey = rituRaw.toLowerCase().replace(/\s+/g, '');
  const rituNameTe = `${teluguRutus[rituKey] || rituRaw} ఋతువు`;

  const ayanaName = ayanaRaw;
  const ayanaKey = ayanaRaw.toLowerCase().replace(/\s+/g, '');
  const ayanaNameTe = teluguAyanas[ayanaKey] || ayanaRaw;

  // Auspicious Timings: Abhijit + Good Gowri Day slots
  const auspiciousSlots: { start: Date; end: Date }[] = [];
  if (p.abhijitMuhurta?.start && p.abhijitMuhurta?.end) {
    auspiciousSlots.push({ start: new Date(p.abhijitMuhurta.start), end: new Date(p.abhijitMuhurta.end) });
  }
  if (p.gowri?.day) {
    p.gowri.day.forEach((slot: any) => {
      if (slot.rating === 'good' || slot.name === 'Amrita' || slot.name === 'Shubha' || slot.name === 'Laabha' || slot.name === 'Dhana') {
        auspiciousSlots.push({ start: new Date(slot.startTime), end: new Date(slot.endTime) });
      }
    });
  }

  // Sort and remove overlapping / duplicate slots roughly
  const sortedAuspicious = auspiciousSlots.sort((a, b) => a.start.getTime() - b.start.getTime());
  
  const auspiciousTimings = sortedAuspicious.length > 0 
    ? sortedAuspicious.map(s => fmtRange(s.start, s.end)).join(', ') 
    : '—';
    
  const auspiciousTimingsTe = sortedAuspicious.length > 0
    ? sortedAuspicious.map(s => formatRangeTelugu(s.start, s.end)).join(', ')
    : '—';

  // Durmuhurtham
  const durmuhurtham = p.durMuhurta && p.durMuhurta.length > 0
    ? p.durMuhurta.map((d: any) => fmtRange(d.start, d.end)).join(', ')
    : '—';
    
  const durmuhurthamTe = p.durMuhurta && p.durMuhurta.length > 0
    ? p.durMuhurta.map((d: any) => formatRangeTelugu(d.start, d.end)).join(' తిరిగి ')
    : '—';

  // Varjyam
  const varjyam = p.varjyam && p.varjyam.length > 0
    ? p.varjyam.map((v: any) => fmtRange(v.start, v.end)).join(', ')
    : '—';
    
  const varjyamTe = p.varjyam && p.varjyam.length > 0
    ? p.varjyam.map((v: any) => formatRangeTelugu(v.start, v.end)).join(', ')
    : '—';

  // Amrita Gadiyalu
  const amritaGadiyalu = p.amritKalam && p.amritKalam.length > 0
    ? p.amritKalam.map((a: any) => fmtRange(a.start, a.end)).join(', ')
    : '—';
    
  const amritaGadiyaluTe = p.amritKalam && p.amritKalam.length > 0
    ? p.amritKalam.map((a: any) => formatRangeTelugu(a.start, a.end)).join(', ')
    : '—';

  // Shraddha Tithi (active around 01:30 PM IST = 08:00 AM UTC)
  const midday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0));
  const activeTithiObj = (p.tithis || []).find((t: any) => {
    const start = new Date(t.startTime);
    const end = new Date(t.endTime);
    return midday >= start && midday <= end;
  }) || p.tithis?.[0] || { name: tithiRaw };

  const pakshaPrefixEn = pakshaRaw === 'Shukla' ? 'Shukla ' : 'Krishna ';
  const pakshaPrefixTe = pakshaRaw === 'Shukla' ? 'శుద్ధ ' : 'బహుళ ';
  const tithiNameTranslatedTe = translateLimbName(activeTithiObj.name, 'tithi', true);

  const shraddhaTithi = `${pakshaPrefixEn}${activeTithiObj.name}`;
  const shraddhaTithiTe = `${pakshaPrefixTe}${tithiNameTranslatedTe}`;

  const gregorianDateString = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

  const festivals = (p.festivals ?? []).map((f: { name?: string }) =>
    typeof f === 'string' ? f : (f.name ?? '')
  ).filter(Boolean);

  const pakshaTithi = `${pakshaRaw} – ${tithiRaw}`;

  return {
    tithi: tithiEn,
    nakshatra: nakshatraEn,
    yoga: yogaEn,
    karana: karanaEn,
    vara: varaRaw,
    sunrise,
    sunset,
    moonrise,
    moonset,
    rahuKalam,
    gulikaKalam,
    yamagandaKalam,
    masa: masaRaw,
    paksha: pakshaRaw,
    festivals,
    pakshaTithi,

    gregorianDateString,
    monthDayVaraHeaderTe,
    sanskritVaraHeaderTe,
    sanskritVaraHeaderEn,
    samvatsaraName,
    samvatsaraNameTe,
    masaNameTe,
    rituName,
    rituNameTe,
    ayanaName,
    ayanaNameTe,
    
    tithiTe,
    nakshatraTe,
    yogaTe,
    karanaTe,
    
    sunriseTe,
    sunsetTe,
    moonriseTe,
    moonsetTe,
    rahuKalamTe,
    yamagandaKalamTe,
    
    auspiciousTimings,
    auspiciousTimingsTe,
    durmuhurtham,
    durmuhurthamTe,
    varjyam,
    varjyamTe,
    amritaGadiyalu,
    amritaGadiyaluTe,
    shraddhaTithi,
    shraddhaTithiTe,
  };
}

// ── Safe name extractor ─────────────────────────────────────────────────────
function safeName(arr: unknown[], idx: number): string {
  const item = arr[idx];
  if (typeof item === 'string') return item;
  if (item && typeof item === 'object' && 'name' in item) {
    return String((item as { name: unknown }).name);
  }
  return String(item ?? '—');
}

// ── Hook ────────────────────────────────────────────────────────────────────
export function usePanchangam(date: Date): PanchangamData {
  const [data, setData] = useState<PanchangamData>({
    tithi: '',
    nakshatra: '',
    yoga: '',
    karana: '',
    vara: '',
    sunrise: '—',
    sunset: '—',
    moonrise: '—',
    moonset: '—',
    rahuKalam: '—',
    gulikaKalam: '—',
    yamagandaKalam: '—',
    masa: '',
    paksha: '',
    festivals: [],
    pakshaTithi: '',
    
    gregorianDateString: '',
    monthDayVaraHeaderTe: '',
    sanskritVaraHeaderTe: '',
    sanskritVaraHeaderEn: '',
    samvatsaraName: '',
    samvatsaraNameTe: '',
    masaNameTe: '',
    rituName: '',
    rituNameTe: '',
    ayanaName: '',
    ayanaNameTe: '',
    
    tithiTe: '',
    nakshatraTe: '',
    yogaTe: '',
    karanaTe: '',
    
    sunriseTe: '—',
    sunsetTe: '—',
    moonriseTe: '—',
    moonsetTe: '—',
    rahuKalamTe: '—',
    yamagandaKalamTe: '—',
    
    auspiciousTimings: '—',
    auspiciousTimingsTe: '—',
    durmuhurtham: '—',
    durmuhurthamTe: '—',
    varjyam: '—',
    varjyamTe: '—',
    amritaGadiyalu: '—',
    amritaGadiyaluTe: '—',
    shraddhaTithi: '',
    shraddhaTithiTe: '',

    loading: true,
    error: null,
    lastFetched: null,
  });

  const fetchData = useCallback(() => {
    try {
      const result = calculate(date);
      setData({
        ...result,
        loading: false,
        error: null,
        lastFetched: new Date(),
      });
    } catch (err) {
      console.error('[usePanchangam] Calculation error:', err);
      setData(prev => ({
        ...prev,
        loading: false,
        error: 'Unable to calculate Panchangam. Please try again.',
        lastFetched: new Date(),
      }));
    }
  }, [date]);

  useEffect(() => {
    const timeout = setTimeout(fetchData, 0);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  useEffect(() => {
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (!isToday) return;

    const midnight = new Date();
    midnight.setHours(24, 0, 30, 0);
    const msUntilMidnight = midnight.getTime() - Date.now();

    const timer = setTimeout(() => {
      fetchData();
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [date, fetchData]);

  return data;
}
