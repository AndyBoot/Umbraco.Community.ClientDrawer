import { LitElement, css, html, customElement, property, when } from '@umbraco-cms/backoffice/external/lit';;
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { EnvironmentModel } from "../api";
import './drawer.environment.element';


@customElement('drawer-environments')
export class DrawerEnvironmentsElement extends UmbElementMixin(LitElement) {

    @property({ type: Object }) model: EnvironmentModel[] | null | undefined;

    render() {
        
        return html`
          ${this.model?.map(
              (env: EnvironmentModel) => html`
                ${when(
                  env,
                  () => html`<drawer-environment-box .model="${env}"></drawer-environment-box>`
                )}
                `
          )}
        `
    }

    static styles = css`
        
    `
}
declare global {
    interface HTMLElementTagNameMap {
        'drawer-environments': DrawerEnvironmentsElement;
    }
}