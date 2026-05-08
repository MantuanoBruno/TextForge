import { stopwords } from "./stopwords";

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .filter((word) => !stopwords.includes(word));

  //.replace(/[^\p{L}\s]/gu, "")
}
