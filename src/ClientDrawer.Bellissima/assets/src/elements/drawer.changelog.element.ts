import { LitElement, css, html, customElement, property, when } from '@umbraco-cms/backoffice/external/lit';;
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { LogEntry, Change } from "../api";
import { CHANGELOG_MODAL } from "../tokens/changelog.token";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from "@umbraco-cms/backoffice/modal";


@customElement('drawer-changelog')
export class DrawerChangeLogElement extends UmbElementMixin(LitElement) {

    @property({ type: Object }) model: LogEntry[] | null | undefined;

    #modalManagerContext?: UmbModalManagerContext;

    constructor() {
        super();

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (_instance: UmbModalManagerContext | undefined) => {
            this.#modalManagerContext = _instance;
        });
    }

    #openChangeLogPanel() {
        this.#modalManagerContext?.open(this, CHANGELOG_MODAL);
    }

    render() {

        return html`
        <uui-box headline="Change log" style="--uui-box-default-padding: 0;">
            <uui-button slot="header-actions" look="outline" compact="" @click="${this.#openChangeLogPanel}" label="View all" role="button" tabindex="0" type="button" color="default">View all</uui-button>
            ${this.model?.slice(0, 3).map(
                (log: LogEntry) => html`
                ${when(
                    log,
                    () => html`<uui-menu-item label="${log.formattedDate}" role="menu" has-children>
                                    <uui-badge slot="badge" color="default" look="placeholder">${log.friendlyDatePeriod}</uui-badge>
                                    <uui-table>
                                    ${log.changes?.map(
                                        (change: Change) => html`
                                        ${when(
                                            change,
                                            () => html`<uui-table-row>
                                                            <uui-table-cell>${change.text}</uui-table-cell>
                                                        </uui-table-row>`
                                        )}`
                                    )}
                                    </uui-table>
                                </uui-menu-item>
                                `
                )}
                `
            )}
        </uui-box>
        `
    }

    static styles = css`
        uui-table-cell {
            --uui-table-cell-padding: 5px 15px;
        }
    `
}
declare global {
    interface HTMLElementTagNameMap {
        'drawer-changelog': DrawerChangeLogElement;
    }
}