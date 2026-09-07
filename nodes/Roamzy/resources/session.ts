import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['session'] };

export const sessionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Create Anonymous',
				value: 'create',
				action: 'Create an anonymous session',
				description:
					'Create an account and API token with no signup. The token is shown once — store it in a Roamzy API credential. Anonymous accounts have tighter limits until claimed via the returned claim URL.',
				routing: {
					request: {
						method: 'POST',
						url: '/anon-session',
						body: { user_agent_hint: 'n8n-nodes-roamzy' },
					},
				},
			},
		],
		default: 'create',
	},
	{
		displayName: 'Referral Code',
		name: 'referralCode',
		type: 'string',
		default: '',
		placeholder: 'e.g. a1b2c3d4',
		description: 'Optional referral code to attribute the new account to',
		displayOptions: { show },
		routing: { send: { type: 'body', property: 'ref', value: '={{$value || undefined}}' } },
	},
];
