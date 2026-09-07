import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RoamzyApi implements ICredentialType {
	name = 'roamzyApi';

	displayName = 'Roamzy API';

	icon: Icon = { light: 'file:../icons/roamzy.svg', dark: 'file:../icons/roamzy.dark.svg' };

	documentationUrl = 'https://github.com/roamzy-io/n8n-nodes-roamzy?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'A Roamzy API token (rk_live_…). Create one in the dashboard at https://roamzy.io, or mint one instantly without an account using this node’s Session → Create Anonymous operation.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://roamzy.io/api/v1',
			url: '/me',
			method: 'GET',
		},
	};
}
