import { newStemmer } from "snowball-stemmers";

const stemmer = newStemmer("portuguese");

export function stemPtBr(word: string): string {
  return stemmer.stem(word.toLowerCase());
}
