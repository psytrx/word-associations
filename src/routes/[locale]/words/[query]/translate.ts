const posTranslations = {
  noun: 'Nomen',
  verb: 'Verb',
  adjective: 'Adjektiv',
  adverb: 'Adverb'
};

export function translatePos(pos: string) {
  return posTranslations[pos] || pos;
}
