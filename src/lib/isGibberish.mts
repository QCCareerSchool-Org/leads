export const isGibberish = (input: string): boolean => {
  // Keep letters for analysis
  const letters = (input || '').replace(/[^A-Za-z]/gu, '');
  const n = letters.length;
  const stripped = (input || '').replace(/[^A-Za-z ]/gu, '');

  // 1) Don’t judge short strings; and whitelist normal Title-Case names
  if (n < 8) {
    return false;
  }
  if (/^[A-Z][a-z]+(?:[ '-][A-Z][a-z]+)*$/u.test(input)) {
    return false;
  }

  // Basic counts
  const upper = (letters.match(/[A-Z]/gu) ?? []).length;
  const vowels = (letters.match(/[AEIOUaeiou]/gu) ?? []).length;

  const upperRatio = upper / n;
  const vowelRatio = vowels / n;

  // Case alternation rate
  let flips = 0;
  for (let i = 1; i < n; i++) {
    const prevU = letters[i - 1] === letters[i - 1].toUpperCase();
    const curU = letters[i] === letters[i].toUpperCase();
    if (prevU !== curU) {
      flips++;
    }
  }
  const flipRatio = flips / (n - 1);

  // Longest consonant run
  let run = 0;
  let maxRun = 0;
  for (const ch of stripped) {
    if (/[AEIOUaeiou ]/u.test(ch)) {
      run = 0;
    } else {
      run++;
      if (run > maxRun) {
        maxRun = run;
      }
    }
  }

  // Check the length penalty
  const lenPen = lengthPenalty(input);
  if (lenPen >= 999) {
    return true; // hard reject
  }

  // Fire if at least two signals trip
  let signals = 0;
  if (upperRatio > 0.35 && upperRatio < 0.85) { signals++; } // lots of mixed case
  if (flipRatio > 0.40) { signals++; } // alternating case
  if (vowelRatio < 0.25) { signals++; } // very few vowels
  if (maxRun >= 5) { signals++; } // long consonant streak
  signals += lenPen;

  return signals >= 3;
};

const letterRe = /\p{L}/u;

const countLetters = (s: string): number => {
  let n = 0;
  for (const ch of Array.from(s.normalize('NFC'))) {
    if (letterRe.test(ch)) { n += 1; }
  }
  return n;
};

const lengthPenalty = (name: string): number => {
  const normalized = name.normalize('NFC');

  const total = countLetters(normalized);
  const parts = normalized.split(/[ '\u2019-]+/u).filter(Boolean);

  let penalty = 0;

  // Whole-name thresholds
  if (total > 60) {
    return 999; // effectively "reject"
  }
  if (total > 40) {
    penalty += 2;
  } else if (total > 30) {
    penalty += 1;
  }

  // Per-part thresholds
  for (const p of parts) {
    const len = countLetters(p);
    if (len > 30) {
      return 999; // reject a single extreme token
    }
    if (len > 25) {
      penalty += 2;
    } else if (len > 20) {
      penalty += 1;
    }
  }

  // Many-name parts is unusual
  if (parts.length > 4) {
    penalty += 1;
  }

  return penalty; // 0 = fine, higher = more suspicious
};
