import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['account'] };

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get the account',
				description: 'Get the account behind the token, its limits and the effective eSIM cap',
				routing: { request: { method: 'GET', url: '/me' } },
			},
			{
				name: 'Get Referral',
				value: 'getReferral',
				action: 'Get the referral link and earnings',
				description: 'Get the referral code, link and earnings — 20% of every payment by referred accounts, recurring',
				routing: { request: { method: 'GET', url: '/referral' } },
			},
		],
		default: 'get',
	},
];
