import type { ManifestModal } from "@umbraco-cms/backoffice/modal";

const modals: Array<ManifestModal> = [{
        type: 'modal',
        alias: 'clientdrawer.modal',
        name: 'Client Drawer Modal',
        js: () => import('../elements/drawer.element'),
    },
    {
        type: 'modal',
        alias: 'clientdrawerchangelog.modal',
        name: 'Client Drawer Change Log Modal',
        js: () => import('../elements/changelog.element'),
    }]

export const manifests = [...modals];