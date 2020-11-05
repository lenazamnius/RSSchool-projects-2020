const yandexAPIKey = 'trnsl.1.1.20200504T064520Z.e1d33f74b883176a.a15696bdad0036d0f2f9a019f51db4f0ae1cf1b0';

export default async function translateInput(word) {
  const requestTranslate = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexAPIKey}&text=${word}&lang=en`;
  const responseTranslate = await fetch(`${requestTranslate}`);
  const translatedWord = await responseTranslate.json();

  return translatedWord;
}
