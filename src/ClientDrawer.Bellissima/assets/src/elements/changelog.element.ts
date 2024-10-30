import { html, customElement, css, property, when } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { ClientDrawerChangeLogModalData, ClientDrawerChangeLogModalValue } from "../tokens/changelog.token";
import { ClientDrawerContext, CLIENT_DRAWER_CONTEXT_TOKEN } from "../contexts/clientdrawer.context";
import { DataModel, Change } from "../api";


@customElement('client-drawer-change-log-modal')
export class ClientDrawerChangeLogModalElement extends UmbModalBaseElement<ClientDrawerChangeLogModalData, ClientDrawerChangeLogModalValue> {

    #clientDrawerContext?: ClientDrawerContext;

    @property({ type: Object })
    drawer?: DataModel;

    constructor() {
        super();

        this.consumeContext(CLIENT_DRAWER_CONTEXT_TOKEN, (_instance) => {
            this.#clientDrawerContext = _instance;

            this.observe(_instance.drawer, (_drawer) => {
                this.drawer = _drawer;
            });
        });
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.#clientDrawerContext != null) {
            this.#clientDrawerContext.getData();
        }
    }

    #handleClose() {
        this.modalContext?.reject();
    }

    render() {
        var simplifiedChangeLogEntries: { date: string | null | undefined; change: Change; }[] = [];
        this.drawer?.changeLog.forEach(function (group) {
            group?.changes?.forEach(function (change) {
                simplifiedChangeLogEntries.push({
                    date: group.formattedDate,
                    change: change
                });
            });
        });


        return html`
            <umb-body-layout headline="Change log">
                <uui-table>
                    <uui-table-column style="width:20%;"></uui-table-column>
                    <uui-table-column style=""></uui-table-column>
                    <uui-table-column style=""></uui-table-column>
                    <uui-table-head>
                        <uui-table-head-cell>Date</uui-table-head-cell>
                        <uui-table-head-cell>Changes</uui-table-head-cell>
                        <uui-table-head-cell>Link</uui-table-head-cell>
                    </uui-table-head>
                    ${simplifiedChangeLogEntries.map(
                        (entry: any) => html`
                        ${when(
                            entry,
                            () => html`
                                <uui-table-row>
                                    <uui-table-cell>${entry.date}</uui-table-cell>
                                    <uui-table-cell>${entry.change.text}</uui-table-cell>
                                    <uui-table-cell>
                                        ${entry.change.link
                                            ? html`<a href="${entry.change.link}" target="_blank">${entry.change.link}</a>`
                                            : html`<span>&nbsp;</span>`
                                        }
                                    </uui-table-cell>
                                </uui-table-row>
                            `
                        )}
                    `
                    )}
                </uui-table>
                <div slot="actions">
                    <uui-button id="close" label="Close" @click="${this.#handleClose}" look="primary">Close</uui-button>
                </div>
            </umb-body-layout>
        `;
    }

    static styles = css`
        uui-table-cell {
            --uui-table-cell-padding: 5px 15px;
        }
    `
}

export default ClientDrawerChangeLogModalElement;