import { WORDASSOCIATIONS_API_KEY } from '$env/static/private';

export interface AssociationsResponseItem {
  text: string;
  items: {
    item: string;
    weight: number;
    pos: string;
  }[];
}

export async function getAssociations(query: string) {
  const params = new URLSearchParams({
    apikey: WORDASSOCIATIONS_API_KEY,
    text: query,
    lang: 'de',
    type: 'stimulus',
    limit: '100'
  });
  const url = `https://api.wordassociations.net/associations/v1.0/json/search?${params}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Could not fetch associations: ' + res.statusText);
  }

  const json = await res.json();
  const items = json as {
    response: AssociationsResponseItem[];
  };
  return items.response[0];
}
