import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

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
    
    // register them here. 
    extensionRegistry.registerMany(manifests);
};
