import openWordnetSynonyms from "../../../data/pt-BR/openwordnet-synonyms.json";

import { normalizeWord } from "./synonym-normalizer";

const synonymMap: Record<string, string[]> = {};

for (const [word, rawSynonyms] of Object.entries(openWordnetSynonyms)) {
  if (!Array.isArray(rawSynonyms)) {
    continue;
  }

  const normalized = normalizeWord(word);

  if (!Array.isArray(synonymMap[normalized])) {
    synonymMap[normalized] = [];
  }

  synonymMap[normalized].push(...rawSynonyms);

  synonymMap[normalized] = Array.from(new Set(synonymMap[normalized]));
}

export { synonymMap };
