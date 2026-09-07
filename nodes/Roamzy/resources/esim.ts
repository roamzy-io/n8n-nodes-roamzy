import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['esim'] };

export const esimDescription: INodeProperties[] = [
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
				action: 'Get many esims',
				description: 'List the account’s eSIMs with status and balance',
				routing: {
					request: { method: 'GET', url: '/esims' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'esims' } }] },
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an esim',
				description: 'Get one eSIM with its activation details (QR payload, LPA string)',
				routing: { request: { method: 'GET', url: '=/esims/{{$parameter.esimId}}' } },
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'eSIM ID',
		name: 'esimId',
		type: 'string',
		default: '',
		required: true,
		description: 'The eSIM ID from Get Many or from the order',
		displayOptions: { show: { ...show, operation: ['get'] } },
	},
];
