import { LitElement, css, html, customElement, property } from '@umbraco-cms/backoffice/external/lit';;
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { EnvironmentModel } from "../api";

/** ns-box */
@customElement('drawer-environment-box')
export class DrawerEnvironmentBoxElement extends UmbElementMixin(LitElement) {

    @property({ type: Object }) model: EnvironmentModel | undefined;

    render() {
        return html`
          <div id="ClientDrawerEnvironmentBox" class="${this.model?.isCurrent ? 'is-current' : ''}">
            <uui-icon name="${this.model?.iconClass}" class="icon"></uui-icon>
            <div class="title">
                <div class="t">
                    <span>${this.model?.name}</span>
                    ${this.model?.isCurrent ? html`<uui-badge color="positive" look="primary">Current</uui-badge>` : ''}
                </div>
                <small>
                    <a href="${this.model?.primaryUrl}" target="_blank" rel="noopener" class="link--text">${this.model?.primaryUrl}</a>
                </small>
            </div>
            ${!this.model?.disableUmbracoUrl ? html`
              <a href="${this.model?.umbracoUrl}" target="_blank" title="Open '${this.model?.name}' Umbraco CMS backoffice" rel="noopener" class="umbraco-logo">
                <uui-icon name="icon-umbraco"></uui-icon>
              </a>` : ''
            }
        </div>
        `
    }

    static styles = [UmbTextStyles, css`
        #ClientDrawerEnvironmentBox {
            background: #fff;
            border-radius: 3px;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .16);
            display: block;
            margin-bottom: 5px;
            overflow: hidden;
            padding: 10px 20px 10px 10px;
            position: relative;
            display: flex;
            align-items: center;
            gap: 9px;
        }

        #ClientDrawerEnvironmentBox .icon {
            font-size: 36px;
            color: var(--uui-color-danger);
        }

        #ClientDrawerEnvironmentBox.is-current .icon {
            color: var(--uui-color-positive-emphasis);
        }

        #ClientDrawerEnvironmentBox .title {
            color: #000;
            display: block;
            font-size: 15px;
            font-weight: 700;
            flex: 1;
            word-break: break-word;
        }

        #ClientDrawerEnvironmentBox .title .t{
            display: flex;
            align-items: center;
            gap: 5px;
        }

        #ClientDrawerEnvironmentBox .title uui-badge{
            position: static;
        }

        #ClientDrawerEnvironmentBox .title small {
            font-weight: 500;
        }

        #ClientDrawerEnvironmentBox .umbraco-logo {
            display: flex;
        }

        #ClientDrawerEnvironmentBox .umbraco-logo uui-icon {
            color: #1b264f;
            font-size: 24px;
        }
    `
    ]
}
declare global {
    interface HTMLElementTagNameMap {
        'drawer-environment-box': DrawerEnvironmentBoxElement;
    }
}