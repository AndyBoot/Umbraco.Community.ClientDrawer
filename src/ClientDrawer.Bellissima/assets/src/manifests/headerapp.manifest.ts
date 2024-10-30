import type { ManifestHeaderApp } from "@umbraco-cms/backoffice/extension-registry";

const headerApps: Array<ManifestHeaderApp> = [
    {
        type: 'headerApp',
        name: 'ClientDrawer',
        alias: 'ClientDrawer.headerApp',
        elementName: 'clientdrawer-headerapp',
        js: () => import('../elements/headerapp.element'),
        weight: 9999,
        meta: {
            label: 'ClientDrawer',
            pathname: 'ClientDrawer'
        }
    }
]

export const manifests = [...headerApps];