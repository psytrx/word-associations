/*
https://api.wordassociations.net/associations/v1.0/json/search?
apikey=<API key>
 & text=<word or phrase>
 & lang=<language>
 & [type=<result type>]
 & [limit=<maximum number of results>]
 & [pos=<parts of speech>]
 & [indent=<yes or no>]
*/

import { WORDASSOCIATIONS_API_KEY } from '$env/static/private';

export async function load({ params }) {
	const associations = await getAssociations(params.query);

	return {
		locale: params.locale,
		query: params.query,
		associations
	};
}

async function getAssociations(query: string) {
	const params = new URLSearchParams({
		apikey: WORDASSOCIATIONS_API_KEY,
		text: query,
		lang: 'de',
		type: 'stimulus',
		limit: '10'
	});
	const url = `https://api.wordassociations.net/associations/v1.0/json/search?${params}`;

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error('Could not fetch associations: ' + res.statusText);
	}

	const json = await res.json();
	return json as {
		response: {
			text: string;
			items: {
				item: string;
				weight: number;
				pos: string;
			}[];
		}[];
	};
}
