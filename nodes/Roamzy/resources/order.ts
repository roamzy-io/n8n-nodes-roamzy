import type { INodeProperties } from 'n8n-workflow';

const show = { resource: ['order'] };

export const orderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an order',
				description:
					'Reserve an eSIM and create a stablecoin invoice. Returns the payment URL; the eSIM is issued once the invoice is paid.',
				routing: { request: { method: 'POST', url: '/orders' } },
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an order',
				description: 'Poll an order’s payment and provisioning status',
				routing: { request: { method: 'GET', url: '=/orders/{{$parameter.orderId}}' } },
			},
		],
		default: 'create',
	},
	{
		displayName: 'Country Slug',
		name: 'countrySlug',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. esim-spain',
		description: 'Country the eSIM will be used in first (the eSIM itself works in all 193 countries)',
		displayOptions: { show: { ...show, operation: ['create'] } },
		routing: { send: { type: 'body', property: 'country_slug' } },
	},
	{
		displayName: 'Top-Up Amount (USDT)',
		name: 'amountUsdt',
		type: 'number',
		default: 20,
		required: true,
		typeOptions: { minValue: 20, maxValue: 1000, numberPrecision: 0 },
		description: 'Whole USDT to load onto the eSIM. Minimum is 20; the balance never expires and is billed per megabyte.',
		displayOptions: { show: { ...show, operation: ['create'] } },
		routing: { send: { type: 'body', property: 'amount_usdt' } },
	},
	{
		displayName: 'Pay Currency Code',
		name: 'payCurrency',
		type: 'string',
		default: '',
		placeholder: 'e.g. usdttrc20',
		description:
			'Stablecoin + network code from Payment Option → Get Many (e.g. usdttrc20, usdcsol, usdtton). Leave empty to default to USDT on TRON.',
		displayOptions: { show: { ...show, operation: ['create'] } },
		routing: { send: { type: 'body', property: 'pay_currency', value: '={{$value || undefined}}' } },
	},
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		default: '',
		required: true,
		description: 'The order ID returned by Create',
		displayOptions: { show: { ...show, operation: ['get'] } },
	},
];
