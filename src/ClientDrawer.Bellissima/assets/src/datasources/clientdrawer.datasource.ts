import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDataSourceResponse } from "@umbraco-cms/backoffice/repository";
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { getUmbracoClientdrawerApiV1Getdata, getUmbracoClientdrawerApiV1Getheaderactiondata } from '../api/services.gen';
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
        return await tryExecuteAndNotify(this.#host, getUmbracoClientdrawerApiV1Getdata())
    }

    async getHeaderActionData(): Promise<UmbDataSourceResponse<HeaderActionModel>> {
        return await tryExecuteAndNotify(this.#host, getUmbracoClientdrawerApiV1Getheaderactiondata())
    }
}