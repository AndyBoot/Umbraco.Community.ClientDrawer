import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

// load up the manifests here.
import { manifests as headerAppManifests } from './manifests/headerapp.manifest.ts';
import { manifests as modalManifests } from './manifests/modal.manifest.ts';
import { manifests as contextManifests } from './manifests/context.manifest.ts';

const manifests: Array<ManifestTypes> = [
    ...headerAppManifests,
    ...modalManifests,
    ...contextManifests
];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    
    // register them here. 
    extensionRegistry.registerMany(manifests);
};
