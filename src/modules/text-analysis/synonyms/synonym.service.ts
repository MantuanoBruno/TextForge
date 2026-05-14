import { synonymMap } from "./synonym-loader";

import { normalizeWord } from "./synonym-normalizer";

export function getSynonyms(word: string): string[] {
  const normalized = normalizeWord(word);

  return synonymMap[normalized] || [];
}
