import { getAssociations, type AssociationsResponseItem } from './wordassociations';

const posLimits = {
	verb: 5,
	noun: 10,
	adjective: 7
};

const lowercaseGroups = ['verb', 'adjective', 'adverb'];

export async function load({ params }) {
	const associations = await getAssociations(params.query);
	const groupedByPos = groupByPos(associations);

	lowercaseGroups.forEach((key) => {
		groupedByPos[key]?.forEach((item) => {
			item.item = item.item.toLowerCase();
		});
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
