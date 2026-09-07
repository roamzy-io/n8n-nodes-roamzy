import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['estimate'] };

export const estimateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Calculate',
				value: 'calculate',
				action: 'Calculate the cost of a data budget',
				description: 'Project what a given number of megabytes will cost in a country at today’s per-MB rate',
				routing: { request: { method: 'POST', url: '/estimate' } },
			},
		],
		default: 'calculate',
	},
	{
		displayName: 'Country Slug',
		name: 'countrySlug',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. esim-spain',
		description: 'Country identifier from the catalog',
		displayOptions: { show },
		routing: { send: { type: 'body', property: 'country_slug' } },
	},
	{
		displayName: 'Data Budget (MB)',
		name: 'mbEstimated',
		type: 'number',
		default: 500,
		required: true,
		typeOptions: { minValue: 0 },
		description: 'How many megabytes the trip is expected to use',
		displayOptions: { show },
		routing: { send: { type: 'body', property: 'mb_estimated' } },
	},
];
