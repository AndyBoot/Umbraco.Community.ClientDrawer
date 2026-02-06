import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecute } from '@umbraco-cms/backoffice/resources';
import { V1Service } from '../api/sdk.gen';
import { DataModel, HeaderActionModel } from "../api";

export interface IClientDrawerDataSource {
    getData(): Promise<UmbDataSourceResponse<DataModel>>;
    getHeaderActionData(): Promise<UmbDataSourceResponse<HeaderActionModel>>;
}

export class ClientDrawerDataSource implements IClientDrawerDataSource {
    #host: UmbControllerHost;

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async getData(): Promise<UmbDataSourceResponse<DataModel>> {
        return await tryExecute(this.#host, V1Service.getUmbracoClientdrawerApiV1Getdata())
    }

    async getHeaderActionData(): Promise<UmbDataSourceResponse<HeaderActionModel>> {
        return await tryExecute(this.#host, V1Service.getUmbracoClientdrawerApiV1Getheaderactiondata())
    }
}