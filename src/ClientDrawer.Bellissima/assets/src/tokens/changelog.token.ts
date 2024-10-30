import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export interface ClientDrawerChangeLogModalData {
}

export interface ClientDrawerChangeLogModalValue {
}

export const CHANGELOG_MODAL = new UmbModalToken<ClientDrawerChangeLogModalData, ClientDrawerChangeLogModalValue>(
    "clientdrawerchangelog.modal",
    {
        modal: {
            type: 'sidebar',
            size: 'large'
        }
    }
);