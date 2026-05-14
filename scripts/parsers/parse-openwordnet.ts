import fs from "fs";
import path from "path";

const filePath = path.resolve("data/openwordnet/own-pt-wordsenses.ttl");

const content = fs.readFileSync(filePath, "utf-8");

// -----------------------------------
// MAPAS
// -----------------------------------

const synsetMap: Record<string, string[]> = {};

const wordSenseLabels: Record<string, string> = {};

// -----------------------------------
// LABELS
// -----------------------------------

const labelRegex =
  /wordsense-(\d+-\w-\d+)\s+a\s+owns:WordSense\s*;\s*rdfs:label\s+"([^"]+)"/g;

for (const match of content.matchAll(labelRegex)) {
  const wordSenseId = match[1];

  const label = match[2].toLowerCase().trim();

  wordSenseLabels[wordSenseId] = label;
}

// -----------------------------------
// SYNSETS
// -----------------------------------

const synsetRegex = /synset-(\d+-\w)\s+owns:containsWordSense\s+([\s\S]*?)\./g;

for (const match of content.matchAll(synsetRegex)) {
  const synsetId = match[1];

  const sensesBlock = match[2];

  const wordSenseMatches = [...sensesBlock.matchAll(/wordsense-(\d+-\w-\d+)/g)];

  const labels = wordSenseMatches
    .map((m) => wordSenseLabels[m[1]])
    .filter(Boolean);

  synsetMap[synsetId] = labels;
}

// -----------------------------------
// THESAURUS
// -----------------------------------

const thesaurus: Record<string, string[]> = {};

for (const labels of Object.values(synsetMap)) {
  for (const word of labels) {
    const synonyms = labels.filter((label) => label !== word);

    if (!Array.isArray(thesaurus[word])) {
      thesaurus[word] = [];
    }

    thesaurus[word].push(...synonyms);

    thesaurus[word] = Array.from(new Set(thesaurus[word]));
  }
}

// -----------------------------------
// OUTPUT
// -----------------------------------

const outputPath = path.resolve("src/data/pt-BR/openwordnet-synonyms.json");

fs.writeFileSync(outputPath, JSON.stringify(thesaurus, null, 2));

console.log("OpenWordnet thesaurus generated.");
