import fs from "fs";
import path from "path";

import { stemPtBr } from "../src/modules/text-analysis/language/stemmers/ptbr-stemmer";

const rawFilePath = path.resolve("src/data/raw/thesaurus.txt");

const outputPath = path.resolve("src/data/pt-BR/synonyms.json");

const rawContent = fs.readFileSync(rawFilePath, "utf-8");

const lines = rawContent.split(/\r?\n/).filter(Boolean);

const thesaurus: Record<string, string[]> = {};

for (const line of lines) {
  const words = line.split("|").map((word) => word.trim().toLowerCase());

  const mainWord = words[0];

  const stem = stemPtBr(mainWord);

  const synonyms = words.slice(1);

  if (!thesaurus[stem]) {
    thesaurus[stem] = [];
  }

  thesaurus[stem].push(...synonyms);
}

fs.writeFileSync(outputPath, JSON.stringify(thesaurus, null, 2));

console.log("Thesaurus generated successfully");
