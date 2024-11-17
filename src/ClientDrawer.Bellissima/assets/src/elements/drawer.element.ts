import { html, customElement, state, css, property } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { ClientDrawerModalData, ClientDrawerModalValue } from "../tokens/drawer.token";
import './drawer.environments.element';
import './drawer.changelog.element';
import './drawer.systeminfo.element';
import { ClientDrawerContext, CLIENT_DRAWER_CONTEXT_TOKEN } from "../contexts/clientdrawer.context";
import { DataModel } from "../api";



@customElement('client-drawer-modal')
export class ClientDrawerModalElement extends UmbModalBaseElement<ClientDrawerModalData, ClientDrawerModalValue> {

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

    @state()
    content: string = '';

    #handleClose() {
        this.modalContext?.reject();
    }

    static styles = css`

        uui-button {
            color: red;
        }

        #FooterInfoVersion {
            padding-left: 32px;
        }

        #Modules {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
    `;

    render() {

        return html`
            <umb-body-layout headline=${this.drawer?.heading}>
                <div id="Modules">
                    ${this.drawer?.environments?.length || 0 > 0 ? html`
                        <div class="module">
                            <drawer-environments .model="${this.drawer?.environments}"></drawer-environments>
                        </div>
                    ` : ''}
                    ${this.drawer?.changeLog?.length || 0 > 0 ? html`
                        <div class="module">
                            <drawer-changelog .model="${this.drawer?.changeLog}"></drawer-changelog>
                        </div>
                    ` : ''}
                    ${this.drawer?.systemInformation.enabled && this.drawer?.systemInformation.assemblies.length > 0 ? html`
                        <div class="module">
                            <drawer-systeminfo .model="${this.drawer?.systemInformation}"></drawer-systeminfo>
                        </div>
                    ` : ''}
                </div>
                <div slot="footer-info" id="FooterInfoVersion">
                    ${this.drawer?.primaryAssembly?.version ? html`
                        Version ${this.drawer?.primaryAssembly?.version}
                    ` : ''}
                </div>
                <div slot="actions">
                    <uui-button id="close" label="Close" @click="${this.#handleClose}" look="primary">Close</uui-button>
                </div>
            </umb-body-layout>
        `;
    }
}

export default ClientDrawerModalElement;