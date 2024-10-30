import { ManifestGlobalContext } from "@umbraco-cms/backoffice/extension-registry";

const contexts: Array<ManifestGlobalContext> = [
    {
        type: 'globalContext',
        alias: 'clientdrawer.context',
        name: 'ClientDrawer context',
        js: () => import('../contexts/clientdrawer.context')
    }
]

export const manifests = [...contexts];