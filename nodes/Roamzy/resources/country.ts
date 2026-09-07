import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['country'] };

export const countryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many countries',
				description: 'Get many countries — the full catalog, many 193, with the per-MB and per-GB rate in USD',
				routing: {
					request: { method: 'GET', url: '/catalog' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'countries' } }] },
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a country',
				description: 'Get one country’s rate and coverage snapshot',
				routing: {
					request: { method: 'GET', url: '=/countries/{{$parameter.countrySlug}}' },
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Country Slug',
		name: 'countrySlug',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. esim-japan',
		description: 'Country identifier from the catalog, always “esim-” followed by the country name',
		displayOptions: { show: { ...show, operation: ['get'] } },
	},
];
