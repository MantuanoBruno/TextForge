import { loadPtBrSynonyms } from "./synonym-loader";

import { stemPtBr } from "../language/stemmers/ptbr-stemmer";

const synonyms = loadPtBrSynonyms();

export async function getSynonyms(word: string): Promise<string[]> {
  const stem = stemPtBr(word);
  const localSynonyms = synonyms[stem as keyof typeof synonyms];

  if (!localSynonyms) {
    return [];
  }

  return localSynonyms.slice(0, 5);
}
