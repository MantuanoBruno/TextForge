import { join } from "path";

function filtraOcorrencias(paragrafo) {
  return Object.keys(paragrafo)
    .filter((palavra) => paragrafo[palavra] > 1)
    .map((palavra) => `${palavra} (${paragrafo[palavra]} vezes)`);
}

function montaSaidaArquivo(listaPalavras) {
  let textoFinal = "";

  listaPalavras.forEach((paragrafo, indice) => {
    const duplicada = filtraOcorrencias(paragrafo);

    if (duplicada.length > 0) {
      textoFinal += `palavras duplicadas no parágrafo ${
        indice + 1
      }: ${duplicada.join(", ")} \n`;
    }
  });

  return textoFinal;
}

export { montaSaidaArquivo };
