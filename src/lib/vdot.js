// PaceGuru iOS uses this same 20.0–85.0 VDOT lookup table. Values are seconds per kilometre.
const VDOT_TABLE = {
  '16': [446.25, 435.0, 424.38, 413.12, 403.12, 392.5, 381.88, 371.88, 361.88, 352.5, 344.38, 334.38, 325.62, 316.88, 308.75, 300.62, 293.12, 286.25, 279.38, 273.12, 266.88, 261.25, 255.62, 250.62, 245.0, 240.62, 235.62, 231.25, 226.88, 222.5, 218.75, 215.0, 211.25, 207.5, 204.38, 200.62, 197.5, 194.38, 191.25, 188.75, 185.62, 183.12, 180.62, 178.12, 175.62, 173.12, 170.62, 168.75, 166.25, 164.38, 161.88, 160.0, 158.12, 156.25, 154.38, 152.5, 113.75, 148.75, 147.5, 145.62, 144.38, 142.5, 141.25, 140.0, 138.75, 136.88],
  '30': [466.67, 455.0, 443.67, 432.33, 421.33, 410.33, 399.67, 389.0, 378.67, 368.67, 358.67, 349.0, 339.67, 331.0, 323.0, 315.0, 307.67, 300.33, 293.67, 287.0, 281.0, 275.0, 269.33, 263.67, 258.33, 253.33, 248.67, 244.0, 239.33, 235.0, 231.0, 227.0, 223.0, 219.33, 215.67, 212.33, 209.0, 205.67, 202.67, 199.33, 196.67, 193.67, 191.0, 188.33, 185.67, 183.0, 180.67, 178.33, 176.0, 173.67, 171.33, 169.33, 167.33, 165.33, 163.33, 161.33, 159.33, 157.67, 156.0, 154.33, 152.33, 150.67, 149.0, 147.67, 146.0, 144.67],
  '50': [508.8, 489.8, 472.4, 456.2, 440.8, 426.6, 413.4, 401.0, 389.4, 378.4, 368.0, 358.2, 349.0, 340.2, 331.8, 324.0, 316.4, 309.2, 302.4, 295.8, 289.6, 283.6, 277.8, 272.2, 267.0, 262.0, 257.0, 252.4, 247.8, 243.6, 239.4, 235.2, 231.4, 227.6, 224.0, 220.4, 217.0, 213.8, 210.6, 207.4, 204.6, 201.6, 198.8, 196.0, 193.4, 190.8, 188.4, 185.8, 183.6, 181.2, 179.0, 176.8, 174.6, 172.6, 170.6, 168.6, 166.8, 164.8, 163.0, 161.2, 159.6, 157.8, 156.2, 154.6, 153.0, 151.4],
  '100': [528.3, 508.7, 490.7, 473.9, 458.0, 443.3, 429.6, 416.8, 404.8, 393.4, 382.6, 372.3, 362.6, 353.4, 344.6, 336.3, 328.4, 320.9, 313.7, 306.9, 300.3, 294.1, 288.1, 282.4, 276.9, 271.6, 266.5, 261.6, 257.0, 264.4, 248.1, 243.9, 239.9, 236.0, 232.2, 228.6, 225.1, 221.7, 218.4, 215.2, 212.2, 209.2, 206.3, 203.5, 200.8, 198.1, 195.5, 193.1, 190.6, 188.3, 186.0, 183.8, 181.6, 179.5, 177.4, 175.4, 173.5, 171.6, 169.7, 167.9, 166.1, 164.4, 162.7, 161.1, 159.4, 157.9],
  '211': [555.34, 534.82, 515.9, 498.08, 481.63, 466.13, 451.67, 438.16, 425.41, 413.13, 401.23, 390.66, 380.61, 371.04, 361.98, 353.31, 345.06, 337.24, 329.7, 322.54, 315.67, 309.08, 302.77, 296.75, 290.92, 285.38, 280.02, 274.85, 269.87, 265.09, 260.49, 256.08, 251.77, 247.64, 243.66, 239.77, 236.07, 232.42, 228.96, 225.55, 222.28, 219.1, 216.02, 213.04, 210.14, 207.3, 204.6, 201.94, 199.34, 196.82, 194.41, 192.04, 189.71, 187.44, 185.26, 183.12, 181.04, 179.0, 177.06, 175.11, 173.22, 171.37, 169.61, 167.86, 166.15, 164.49],
  '422': [574.48, 555.99, 538.93, 523.28, 506.22, 490.58, 476.36, 462.14, 447.92, 435.12, 411.35, 400.92, 391.02, 381.61, 372.63, 364.1, 355.94, 348.15, 340.68, 333.55, 326.7, 320.16, 313.85, 307.81, 302.0, 296.39, 291.01, 285.82, 280.82, 276.0, 271.34, 266.83, 262.5, 258.3, 254.22, 250.29, 246.47, 242.8, 239.22, 235.74, 232.37, 229.13, 225.95, 222.87, 219.88, 216.97, 214.15, 211.4, 208.72, 206.11, 203.58, 201.11, 198.7, 196.35, 194.08, 191.85, 189.67, 187.56, 185.5, 183.48, 181.49, 179.57, 177.68, 175.85, 174.05, 172.3],
};

export const VDOT_MIN = 20;
export const VDOT_MAX = 85;

export const RACE_EVENTS = [
  { key: '16', label: '1 英里', distanceKm: 1.6 },
  { key: '30', label: '3 公里', distanceKm: 3 },
  { key: '50', label: '5 公里', distanceKm: 5 },
  { key: '100', label: '10 公里', distanceKm: 10 },
  { key: '211', label: '半程马拉松', distanceKm: 21.0975 },
  { key: '422', label: '马拉松', distanceKm: 42.195 },
];

function valuesFor(key) {
  return VDOT_TABLE[key] || null;
}

export function getRaceEvent(key) {
  return RACE_EVENTS.find((event) => event.key === key) || null;
}

export function getPaceForVdot(vdot, key) {
  const values = valuesFor(key);
  if (!values || !Number.isFinite(vdot) || vdot < VDOT_MIN || vdot > VDOT_MAX) return null;

  const index = vdot - VDOT_MIN;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);

  if (lower === upper) return values[lower] ?? null;
  if (lower < 0 || upper >= values.length) return null;

  return values[lower] + (values[upper] - values[lower]) * (index - lower);
}

export function getFinishTimeForVdot(vdot, key) {
  const event = getRaceEvent(key);
  const pace = getPaceForVdot(vdot, key);
  return event && pace ? pace * event.distanceKm : null;
}

export function getVdotForRace(key, finishTimeSeconds) {
  const event = getRaceEvent(key);
  const values = valuesFor(key);
  if (!event || !values || !Number.isFinite(finishTimeSeconds) || finishTimeSeconds <= 0) return null;

  const targetPace = finishTimeSeconds / event.distanceKm;
  const minPace = Math.min(...values);
  const maxPace = Math.max(...values);
  if (targetPace < minPace || targetPace > maxPace) return null;

  for (let index = 0; index < values.length - 1; index += 1) {
    const current = values[index];
    const next = values[index + 1];
    const isInRange = (current <= targetPace && targetPace <= next)
      || (next <= targetPace && targetPace <= current);

    if (isInRange) {
      const ratio = current === next ? 0 : (targetPace - current) / (next - current);
      return VDOT_MIN + index + ratio;
    }
  }

  return Math.abs(targetPace - values.at(-1)) < 0.001 ? VDOT_MAX : null;
}

export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '—';
  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = total % 60;

  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    : `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function formatPace(secondsPerKm) {
  return `${formatDuration(secondsPerKm)} /公里`;
}
