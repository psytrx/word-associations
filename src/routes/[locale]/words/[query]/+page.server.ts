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

interface AssociationsResponseItem {
	text: string;
	items: {
		item: string;
		weight: number;
		pos: string;
	}[];
}

const posLimits = {
	verb: 5,
	noun: 10,
	adjective: 7
};

export async function load({ params }) {
	const associations = await getAssociations(params.query);
	const groupedByPos = groupByPos(associations);

	groupedByPos['verb']?.forEach((item) => {
		item.item = item.item.toLowerCase();
	});
	groupedByPos['adjective']?.forEach((item) => {
		item.item = item.item.toLowerCase();
	});

	Object.entries(groupedByPos).forEach(([key, items]) => {
		groupedByPos[key] = items
			.sort((a, b) => b.weight - a.weight)
			.slice(0, posLimits[key as keyof typeof posLimits]);
	});

	return {
		locale: params.locale,
		query: params.query,
		groupedByPos
	};
}

function groupByPos(item: AssociationsResponseItem) {
	// const groups = [{ key: 'foo', items: associations.items }];

	const groups: Record<string, AssociationsResponseItem['items']> = {};
	item.items.forEach((item) => {
		const groupItems = groups[item.pos] || [];
		groupItems.push(item);
		groups[item.pos] = groupItems;
	});

	return groups;
}

async function getAssociations(query: string) {
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
