import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export interface ClientDrawerModalData {
}

export interface ClientDrawerModalValue {
}

export const CLIENTDRAWER_MODAL = new UmbModalToken<ClientDrawerModalData, ClientDrawerModalValue>(
    "clientdrawer.modal",
    {
        modal: {
            type: 'sidebar',
            size: 'small'
        }
    }
);