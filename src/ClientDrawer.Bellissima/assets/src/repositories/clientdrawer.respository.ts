import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { ClientDrawerDataSource } from "../datasources/clientdrawer.datasource";

export class ClientDrawerRespository extends UmbControllerBase {

    #dataSource: ClientDrawerDataSource;

    constructor(host: UmbControllerHost) {
        super(host);
        this.#dataSource = new ClientDrawerDataSource(this);
    }

    async getData() {
        return this.#dataSource.getData();
    }

    async getHeaderActionData() {
        return this.#dataSource.getHeaderActionData();
    }

}