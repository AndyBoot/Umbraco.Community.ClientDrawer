import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { client } from './api/client.gen.js';

// load up the manifests here.
import { manifests as headerAppManifests } from './manifests/headerapp.manifest.ts';
import { manifests as modalManifests } from './manifests/modal.manifest.ts';
import { manifests as contextManifests } from './manifests/context.manifest.ts';

const manifests: any[] = [
    ...headerAppManifests,
    ...modalManifests,
    ...contextManifests
];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    
    // Configure OpenAPI client with Umbraco auth
    _host.consumeContext(UMB_AUTH_CONTEXT, async (authContext) => {
        const config = authContext?.getOpenApiConfiguration();
        
        client.setConfig({
            auth: config?.token ?? undefined,
            baseUrl: config?.base ?? '',
            credentials: config?.credentials ?? 'same-origin',
        });
    });
    
    // register them here. 
    extensionRegistry.registerMany(manifests);
};
