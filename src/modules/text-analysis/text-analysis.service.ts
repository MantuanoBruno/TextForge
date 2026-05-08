import { count } from "console";
import { tokenize } from "./tokenizer";

export function analyzeText(text: string) {
  const words = tokenize(text);

  const frequencyMap: Record<string, number> = {};

  for (const word of words) {
    frequencyMap[word] = (frequencyMap[word] || 0) + 1;
  }

  const sorteWords = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => ({
      word,
      count,
    }));

  return {
    totalWords: words.length,
    uniqueWords: Object.keys(frequencyMap).length,
    repeatedWords: sorteWords,
  };
}
