import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { countryDescription } from './resources/country';
import { estimateDescription } from './resources/estimate';
import { paymentOptionDescription } from './resources/paymentOption';
import { orderDescription } from './resources/order';
import { esimDescription } from './resources/esim';
import { accountDescription } from './resources/account';
import { sessionDescription } from './resources/session';

export class Roamzy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Roamzy',
		name: 'roamzy',
		icon: { light: 'file:../../icons/roamzy.svg', dark: 'file:../../icons/roamzy.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Price and buy a global eSIM — 193 countries, billed per megabyte, paid in USDT/USDC — and track orders and eSIMs',
		defaults: { name: 'Roamzy' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'roamzyApi',
				required: true,
				// Catalog, estimates, payment options and anonymous sessions are public
				// endpoints; only the account-bound resources need a token.
				displayOptions: { show: { resource: ['order', 'esim', 'account'] } },
			},
		],
		requestDefaults: {
			baseURL: 'https://roamzy.io/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Country', value: 'country' },
					{ name: 'eSIM', value: 'esim' },
					{ name: 'Estimate', value: 'estimate' },
					{ name: 'Order', value: 'order' },
					{ name: 'Payment Option', value: 'paymentOption' },
					{ name: 'Session', value: 'session' },
				],
				default: 'country',
			},
			...accountDescription,
			...countryDescription,
			...esimDescription,
			...estimateDescription,
			...orderDescription,
			...paymentOptionDescription,
			...sessionDescription,
		],
	};
}
