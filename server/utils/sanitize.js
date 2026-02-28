const he = require('he');

function sanitizeString(s) {
  if (s === undefined || s === null) return s;
  return he.encode(String(s));
}

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const out = Array.isArray(obj) ? [] : {};
  for (const k in obj) {
    const v = obj[k];
    if (typeof v === 'string') out[k] = sanitizeString(v);
    else if (typeof v === 'object') out[k] = sanitizeObject(v);
    else out[k] = v;
  }
  return out;
}

module.exports = { sanitizeString, sanitizeObject };
