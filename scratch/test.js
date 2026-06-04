import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';

const TEMPLE_LAT = 13.6288;
const TEMPLE_LON = 79.4192;
const TEMPLE_ALT = 152;
const IST_OFFSET = 330;

const observer = new Observer(TEMPLE_LAT, TEMPLE_LON, TEMPLE_ALT);

// Test some dates that are known to have major festivals:
const dates = [
  new Date('2026-04-14'), // Tamil New Year
  new Date('2026-04-23'), // Hanuman Jayanti
  new Date('2026-05-14'), // Purnima
  new Date('2026-09-04'), // Krishna Janmashtami
  new Date('2026-06-02'), // Today
];

for (const d of dates) {
  const p = getPanchangam(d, observer, { timezoneOffset: IST_OFFSET });
  console.log(`Date: ${d.toISOString().split('T')[0]}`);
  console.log(`  Festivals:`, p.festivals);
}
