/**
 * Har qanday kiritilgan Telegram qiymatini to'g'ri 'https://t.me/...' havolasiga aylantiradi
 * Masalan:
 * - '@izzatulloh_devm' -> 'https://t.me/izzatulloh_devm'
 * - 'izzatulloh_devm' -> 'https://t.me/izzatulloh_devm'
 * - 't.me/izzatulloh_devm' -> 'https://t.me/izzatulloh_devm'
 * - 'https://t.me/izzatulloh_devm' -> 'https://t.me/izzatulloh_devm'
 */
export const formatTelegramUrl = (input) => {
  if (!input) return '';
  let clean = input.trim();
  
  if (clean.startsWith('@')) {
    return `https://t.me/${clean.substring(1)}`;
  }
  if (clean.startsWith('https://t.me/')) {
    return clean;
  }
  if (clean.startsWith('http://t.me/')) {
    return `https://t.me/${clean.substring('http://t.me/'.length)}`;
  }
  if (clean.startsWith('t.me/')) {
    return `https://${clean}`;
  }
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    return `https://t.me/${clean}`;
  }
  return clean;
};

/**
 * Ko'rinish uchun (@username) formatga keltiradi
 */
export const getTelegramHandle = (input) => {
  if (!input) return '';
  let clean = input.trim();
  clean = clean.replace('https://t.me/', '')
               .replace('http://t.me/', '')
               .replace('t.me/', '');
  if (clean.startsWith('@')) {
    return clean;
  }
  return `@${clean}`;
};

/**
 * GitHub yoki tashqi havolalarga avtomatik https:// qo'shish
 */
export const formatExternalUrl = (url, defaultPrefix = 'https://github.com/') => {
  if (!url) return '';
  let clean = url.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  if (clean.startsWith('github.com/')) {
    return `https://${clean}`;
  }
  return `${defaultPrefix}${clean}`;
};
