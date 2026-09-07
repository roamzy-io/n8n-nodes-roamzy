import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['paymentOption'] };

export const paymentOptionDescription: INodeProperties[] = [
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
				action: 'Get many payment options',
				description: 'Get the stablecoin + network combinations currently accepted, with the code to pass when creating an order',
				routing: {
					request: { method: 'GET', url: '/payment-options' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'options' } }] },
				},
			},
		],
		default: 'getAll',
	},
];
