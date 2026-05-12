import { tokenize } from "./tokenizer";
import { getSynonyms } from "./synonyms/synonym.service";
import { stemPtBr } from "./language/stemmers/ptbr-stemmer";

export async function analyzeText(text: string) {
  const words = tokenize(text);

  const frequencyMap: Record<
    string,
    {
      count: number;
      originalWords: string[];
    }
  > = {};

  for (const word of words) {
    const stem = stemPtBr(word);

    if (!frequencyMap[stem]) {
      frequencyMap[stem] = {
        count: 0,
        originalWords: [],
      };
    }

    frequencyMap[stem].count++;

    frequencyMap[stem].originalWords.push(word);
  }

  const sortedWords = await Promise.all(
    Object.entries(frequencyMap)

      .filter(([_, data]) => data.count > 1)

      .sort((a, b) => b[1].count - a[1].count)

      .map(async ([stem, data]) => {
        const mostCommonWord = data.originalWords[0];

        return {
          word: mostCommonWord,

          stem,

          count: data.count,

          percentage: Number(((data.count / words.length) * 100).toFixed(2)),

          synonyms: await getSynonyms(mostCommonWord),
        };
      })
  );

  return {
    totalWords: words.length,
    uniqueWords: Object.keys(frequencyMap).length,
    repeatedWords: sortedWords,
    extractedText: text,
  };
}
