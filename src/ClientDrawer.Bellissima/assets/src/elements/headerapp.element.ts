import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { LitElement, html, css, customElement, property, unsafeHTML } from "@umbraco-cms/backoffice/external/lit";
import { CLIENTDRAWER_MODAL } from "../tokens/drawer.token";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from "@umbraco-cms/backoffice/modal";
import { ClientDrawerContext, CLIENT_DRAWER_CONTEXT_TOKEN } from "../contexts/clientdrawer.context";
import { HeaderActionModel } from "../api";

@customElement('clientdrawer-headerapp')
export class ClientDrawerHeaderApp extends UmbElementMixin(LitElement) {

    #clientDrawerContext?: ClientDrawerContext;

    @property({ type: Object })
    headerAction?: HeaderActionModel;

    #modalManagerContext?: UmbModalManagerContext;

    iconClass: string = '';
    iconImg: string = '';
    iconSvg: string = '';
    clientName: string = '';
    headerButtonMode: string = '';
    currentEnvironmentName: string = '';

    constructor() {
        super()

        this.consumeContext(CLIENT_DRAWER_CONTEXT_TOKEN, (_instance) => {
            this.#clientDrawerContext = _instance;

            this.observe(_instance.headerAction, (_headerAction) => {
                this.headerAction = _headerAction;
            });
        });

        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (_instance: UmbModalManagerContext | undefined) => {
            this.#modalManagerContext = _instance;
        });
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (this.#clientDrawerContext != null) {
            this.#clientDrawerContext.getHeaderActionData();
        }
    }

    #buttonClick() {
        this.#modalManagerContext?.open(this, CLIENTDRAWER_MODAL);
    }

    getActionInnerHtml(headerButtonMode: string | undefined, iconHtml: string, currentEnvironmentName: string) {
        switch (headerButtonMode) {
            case 'IconAndEnvironmentName':
                return `<span class="umb-badge umb-badge--success umb-badge--m mode--IconAndEnvironmentName">${iconHtml} ${currentEnvironmentName}</span>`;
            case 'EnvironmentName':
                return `<span class="umb-badge umb-badge--success umb-badge--m mode--EnvironmentName">${currentEnvironmentName}</span>`;
            default:
                return `${iconHtml}`;
        }
    }

    render() {

        this.iconClass = this.headerAction?.iconClass ?? '';
        this.iconImg = this.headerAction?.iconImageFilePath ?? '';
        this.iconSvg = this.headerAction?.iconSVG ?? '';
        this.clientName = this.headerAction?.clientName ?? '';
        this.headerButtonMode = this.headerAction?.headerButtonMode ?? 'Icon';
        this.currentEnvironmentName = this.headerAction?.currentEnvironmentName ?? '';

        let iconHtml = ``;

        if (this.iconSvg.length > 0) {
            iconHtml = `<uui-icon>${this.iconSvg}</umb-icon>`;
        } else if (this.iconImg?.length > 0) {
            iconHtml = `<img src="${this.iconImg}" alt="${this.clientName}" />`;
        } else if (this.iconClass.length > 0) {
            iconHtml = `<uui-icon icon="${this.iconClass}"></umb-icon>`;
        }

        //console.log({ 'this.headerAction': this.headerAction, 'iconImg': this.iconImg, 'iconHtml': iconHtml });

        const innerHtml = this.getActionInnerHtml(this.headerButtonMode, iconHtml, this.currentEnvironmentName);

        if (this.headerButtonMode === 'Icon') {
            return html`
            <uui-button look="primary" label="Client Drawer" id="ClientDrawerHeaderApp" compact="" pristine="" type="button" color="default" @click=${this.#buttonClick}>
				${unsafeHTML(innerHtml)}
			</uui-button>
            `;
        }
        else {
            return html`
              <button type="button" label="Client Drawer" id="ClientDrawerHeaderApp" @click=${this.#buttonClick}>
                ${unsafeHTML(innerHtml)}
              </button>
            `;
        }
    }

    static styles = css`
        :host {
            line-height: normal;
        }
        button#ClientDrawerHeaderApp {
            background: 0 0;
            border: none;
            cursor: pointer;
            margin: 0;
            padding: 0;
            max-height: 100%;
            height: 33px;
            display: inline-flex;
            align-items: center;
        }
        button#ClientDrawerHeaderApp:hover {
            opacity: 0.9;
        }
        uui-button#ClientDrawerHeaderApp {
            font-size: 18px;
        }
        uui-button#ClientDrawerHeaderApp img {
            display: inline-block;
            vertical-align: middle;
            width: 1.15em;
            height: auto;
        }
        uui-button#ClientDrawerHeaderApp svg {
            fill: currentColor;
        }
        #ClientDrawerHeaderApp .umb-badge {
            font-weight: 100;
            padding: 4px 15px;
            font-size: 16px;
            background-color: var(--uui-color-positive-emphasis);
            color: #fff;
            align-items: center;
            justify-content: center;
            display: inline-flex;
            border-radius: 100px;
        }
        #ClientDrawerHeaderApp .umb-badge.mode--IconAndEnvironmentName {
            padding: 4px 15px 4px 4px;
        }
        #ClientDrawerHeaderApp .umb-badge img {
            width: 26px;
            margin-right: 6px;
        }
    `
}


export default ClientDrawerHeaderApp;

declare global {
    interface HtmlElementTagNameMap {
        'ClientDrawer-headerapp': ClientDrawerHeaderApp
    }
}