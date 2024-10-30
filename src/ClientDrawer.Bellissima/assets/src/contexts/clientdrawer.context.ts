import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { OpenAPI, DataModel, HeaderActionModel } from '../api/index.js';

import { ClientDrawerRespository } from "../repositories/clientdrawer.respository";

export class ClientDrawerContext extends UmbControllerBase {

    #repository: ClientDrawerRespository;

    #drawer = new UmbObjectState<DataModel | undefined>(undefined);
    public readonly drawer = this.#drawer.asObservable();

    #headerAction = new UmbObjectState<HeaderActionModel | undefined>(undefined);
    public readonly headerAction = this.#headerAction.asObservable();

    constructor(host: UmbControllerHost) {
        super(host);

        this.provideContext(CLIENT_DRAWER_CONTEXT_TOKEN, this);
        this.#repository = new ClientDrawerRespository(this);

        this.consumeContext(UMB_AUTH_CONTEXT, (_auth) => {
            const umbOpenApi = _auth.getOpenApiConfiguration();
            OpenAPI.TOKEN = umbOpenApi.token;
            OpenAPI.BASE = umbOpenApi.base;
            OpenAPI.WITH_CREDENTIALS = umbOpenApi.withCredentials;
        });
    }

    async getData() {
        const { data } = await this.#repository.getData();

        if (data) {
            this.#drawer.setValue(data);
        }
    }

    async getHeaderActionData() {
        const { data } = await this.#repository.getHeaderActionData();

        if (data) {
            this.#headerAction.setValue(data);
        }
    }
}

export default ClientDrawerContext;

export const CLIENT_DRAWER_CONTEXT_TOKEN =
    new UmbContextToken<ClientDrawerContext>(ClientDrawerContext.name);