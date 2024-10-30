import { LitElement, css, html, customElement, property, when } from '@umbraco-cms/backoffice/external/lit';;
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { SystemInformationModel, AssemblyModel } from "../api";

@customElement('drawer-systeminfo')
export class DrawerSystemInfoElement extends UmbElementMixin(LitElement) {

    @property({ type: Object }) model: SystemInformationModel | null | undefined;

    @property({ type: Boolean }) isVisible = false;

    toggleVisibility() {
        this.isVisible = !this.isVisible;
    }

    render() {
        return html`
            <uui-box headline="System Information" style="" @click="${this.toggleVisibility}">
             ${this.isVisible ? html`
                <uui-table>
                    <uui-table-head>
                        <uui-table-head-cell>Assembly</uui-table-head-cell>
                        <uui-table-head-cell>Version</uui-table-head-cell>
                    </uui-table-head>
                    ${this.model?.assemblies.map(
                        (ass: AssemblyModel) => html`
                        ${when(
                            ass,
                            () => html`
                                <uui-table-row>
                                    <uui-table-cell>${ass.name}</uui-table-cell>
                                    <uui-table-cell>${ass.version}</uui-table-cell>
                                </uui-table-row>
                            `
                        )}
                        `
                    )}
                </uui-table>
             ` : html``}
                
            </uui-box>
        `
    }

    static styles = css`
        uui-box {
            background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMzYwLjEyNCAyNTUuNTEzTDE0OC41MzUgNDIyLjQ0MmwuMDAyLTMzMy44NjJ6Ij48L3BhdGg+PC9zdmc+");
            background-repeat: no-repeat;
            background-size: 15px;
            background-position: 8px 16px;
            padding-left: 15px;
            cursor: pointer;
            --uui-box-default-padding: 0;
        }

        uui-table-cell {
            --uui-table-cell-padding: 5px 15px;
        }
    `
}
declare global {
    interface HTMLElementTagNameMap {
        'drawer-systeminfo': DrawerSystemInfoElement;
    }
}