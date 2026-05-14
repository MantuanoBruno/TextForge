import { stemPtBr } from "../language/stemmers/ptbr-stemmer";

export function normalizeWord(word: string) {
  return stemPtBr(word.toLowerCase().trim());
}
