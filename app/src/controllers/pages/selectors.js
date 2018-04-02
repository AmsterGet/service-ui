import { pageNames } from './constants';

export const pageSelector = state => pageNames[state.location.type] || NO_PAGE;

export const pagePropertiesSelector = (
	{ location: { meta: { query } } },
	mapping = undefined) => {

	if (!mapping) {
		return query;
	}

	const result = {};
	for (const key of mapping) {
		if (Object.hasOwnProperty(query, key)) {
			const propertyName = mapping[key];
			result[propertyName] = query[key];
		}
	}
	return result;
}
