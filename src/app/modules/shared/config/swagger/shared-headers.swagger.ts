export const sharedHeadersSwagger = {
	global: {
		'X-RateLimit-Limit: 100': {
			description: 'The max calls by minute limit control',
			type: 'number',
		},
		'X-RateLimit-Remaining : 99': {
			description: 'Remaining calls in this time period',
			type: 'number',
		},
		'X-RateLimit-Reset: 1556970499': {
			description: 'Time until next RateLimit reset',
			type: 'number',
		},
	},
	findByCriteria: {
		'page:1': {
			description: 'Current page of the record set',
			type: 'number',
		},
		'count:100': {
			description: 'Total count of records',
			type: 'number',
		},
		'limit:10': {
			description: 'Max number of records returned',
			type: 'number',
		},
	},
};
