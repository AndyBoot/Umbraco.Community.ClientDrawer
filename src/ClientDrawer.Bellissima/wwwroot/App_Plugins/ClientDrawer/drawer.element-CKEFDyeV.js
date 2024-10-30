import { LitElement as y, html as n, css as h, property as d, customElement as v, when as b, state as k } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalToken as G, UMB_MODAL_MANAGER_CONTEXT as H, UmbModalBaseElement as R } from "@umbraco-cms/backoffice/modal";
import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { UmbTextStyles as F } from "@umbraco-cms/backoffice/style";
import { CLIENT_DRAWER_CONTEXT_TOKEN as X } from "./clientdrawer.context-B1SVOomf.js";
var Z = Object.defineProperty, J = Object.getOwnPropertyDescriptor, V = (t, e, r, o) => {
  for (var i = o > 1 ? void 0 : o ? J(e, r) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (i = (o ? l(e, r, i) : l(i)) || i);
  return o && i && Z(e, r, i), i;
};
let f = class extends _(y) {
  render() {
    var t, e, r, o, i, a, l, u, c;
    return n`
          <div id="ClientDrawerEnvironmentBox" class="${(t = this.model) != null && t.isCurrent ? "is-current" : ""}">
            <uui-icon name="${(e = this.model) == null ? void 0 : e.iconClass}" class="icon"></uui-icon>
            <div class="title">
                <div class="t">
                    <span>${(r = this.model) == null ? void 0 : r.name}</span>
                    ${(o = this.model) != null && o.isCurrent ? n`<uui-badge color="positive" look="primary">Current</uui-badge>` : ""}
                </div>
                <small>
                    <a href="${(i = this.model) == null ? void 0 : i.primaryUrl}" target="_blank" rel="noopener" class="link--text">${(a = this.model) == null ? void 0 : a.primaryUrl}</a>
                </small>
            </div>
            ${(l = this.model) != null && l.disableUmbracoUrl ? "" : n`
              <a href="${(u = this.model) == null ? void 0 : u.umbracoUrl}" target="_blank" title="Open '${(c = this.model) == null ? void 0 : c.name}' Umbraco CMS backoffice" rel="noopener" class="umbraco-logo">
                <uui-icon name="icon-umbraco"></uui-icon>
              </a>`}
        </div>
        `;
  }
};
f.styles = [
  F,
  h`
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
];
V([
  d({ type: Object })
], f.prototype, "model", 2);
f = V([
  v("drawer-environment-box")
], f);
var K = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, z = (t, e, r, o) => {
  for (var i = o > 1 ? void 0 : o ? Q(e, r) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (i = (o ? l(e, r, i) : l(i)) || i);
  return o && i && K(e, r, i), i;
};
let w = class extends _(y) {
  render() {
    var t;
    return n`
          ${(t = this.model) == null ? void 0 : t.map(
      (e) => n`
                ${b(
        e,
        () => n`<drawer-environment-box .model="${e}"></drawer-environment-box>`
      )}
                `
    )}
        `;
  }
};
w.styles = h`
        
    `;
z([
  d({ type: Object })
], w.prototype, "model", 2);
w = z([
  v("drawer-environments")
], w);
const Y = new G(
  "clientdrawerchangelog.modal",
  {
    modal: {
      type: "sidebar",
      size: "large"
    }
  }
);
var q = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, j = (t, e, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ee(e, r) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (i = (o ? l(e, r, i) : l(i)) || i);
  return o && i && q(e, r, i), i;
}, D = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, te = (t, e, r) => (D(t, e, "read from private field"), r ? r.call(t) : e.get(t)), I = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, re = (t, e, r, o) => (D(t, e, "write to private field"), o ? o.call(t, r) : e.set(t, r), r), ie = (t, e, r) => (D(t, e, "access private method"), r), g, C, S;
let x = class extends _(y) {
  constructor() {
    super(), I(this, C), I(this, g, void 0), this.consumeContext(H, (t) => {
      re(this, g, t);
    });
  }
  render() {
    var t;
    return n`
        <uui-box headline="Change log" style="--uui-box-default-padding: 0;">
            <uui-button slot="header-actions" look="outline" compact="" @click="${ie(this, C, S)}" label="View all" role="button" tabindex="0" type="button" color="default">View all</uui-button>
            ${(t = this.model) == null ? void 0 : t.slice(0, 3).map(
      (e) => n`
                ${b(
        e,
        () => {
          var r;
          return n`<uui-menu-item label="${e.formattedDate}" role="menu" has-children>
                                    <uui-badge slot="badge" color="default" look="placeholder">${e.friendlyDatePeriod}</uui-badge>
                                    <uui-table>
                                    ${(r = e.changes) == null ? void 0 : r.map(
            (o) => n`
                                        ${b(
              o,
              () => n`<uui-table-row>
                                                            <uui-table-cell>${o.text}</uui-table-cell>
                                                        </uui-table-row>`
            )}`
          )}
                                    </uui-table>
                                </uui-menu-item>
                                `;
        }
      )}
                `
    )}
        </uui-box>
        `;
  }
};
g = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakSet();
S = function() {
  var t;
  (t = te(this, g)) == null || t.open(this, Y);
};
x.styles = h`
        uui-table-cell {
            --uui-table-cell-padding: 5px 15px;
        }
    `;
j([
  d({ type: Object })
], x.prototype, "model", 2);
x = j([
  v("drawer-changelog")
], x);
var oe = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, E = (t, e, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ae(e, r) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (i = (o ? l(e, r, i) : l(i)) || i);
  return o && i && oe(e, r, i), i;
};
let m = class extends _(y) {
  constructor() {
    super(...arguments), this.isVisible = !1;
  }
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  render() {
    var t;
    return n`
            <uui-box headline="System Information" style="" @click="${this.toggleVisibility}">
             ${this.isVisible ? n`
                <uui-table>
                    <uui-table-head>
                        <uui-table-head-cell>Assembly</uui-table-head-cell>
                        <uui-table-head-cell>Version</uui-table-head-cell>
                    </uui-table-head>
                    ${(t = this.model) == null ? void 0 : t.assemblies.map(
      (e) => n`
                        ${b(
        e,
        () => n`
                                <uui-table-row>
                                    <uui-table-cell>${e.name}</uui-table-cell>
                                    <uui-table-cell>${e.version}</uui-table-cell>
                                </uui-table-row>
                            `
      )}
                        `
    )}
                </uui-table>
             ` : n``}
                
            </uui-box>
        `;
  }
};
m.styles = h`
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
    `;
E([
  d({ type: Object })
], m.prototype, "model", 2);
E([
  d({ type: Boolean })
], m.prototype, "isVisible", 2);
m = E([
  v("drawer-systeminfo")
], m);
var le = Object.defineProperty, ne = Object.getOwnPropertyDescriptor, O = (t, e, r, o) => {
  for (var i = o > 1 ? void 0 : o ? ne(e, r) : e, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (i = (o ? l(e, r, i) : l(i)) || i);
  return o && i && le(e, r, i), i;
}, M = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, N = (t, e, r) => (M(t, e, "read from private field"), r ? r.call(t) : e.get(t)), U = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, se = (t, e, r, o) => (M(t, e, "write to private field"), o ? o.call(t, r) : e.set(t, r), r), de = (t, e, r) => (M(t, e, "access private method"), r), p, $, W;
let s = class extends R {
  constructor() {
    super(), U(this, $), U(this, p, void 0), this.content = "", this.consumeContext(X, (t) => {
      se(this, p, t), this.observe(t.drawer, (e) => {
        this.drawer = e, console.log(this.drawer);
      });
    });
  }
  connectedCallback() {
    super.connectedCallback(), N(this, p) != null && N(this, p).getData();
  }
  render() {
    var t, e, r, o, i, a, l, u, c, P, T, B, A, L;
    return n`
            <umb-body-layout headline=${(t = this.drawer) == null ? void 0 : t.heading}>
                <div id="Modules">
                    ${(r = (e = this.drawer) == null ? void 0 : e.environments) != null && r.length ? n`
                        <div class="module">
                            <drawer-environments .model="${(o = this.drawer) == null ? void 0 : o.environments}"></drawer-environments>
                        </div>
                    ` : ""}
                    ${(a = (i = this.drawer) == null ? void 0 : i.changeLog) != null && a.length ? n`
                        <div class="module">
                            <drawer-changelog .model="${(l = this.drawer) == null ? void 0 : l.changeLog}"></drawer-changelog>
                        </div>
                    ` : ""}
                    ${(u = this.drawer) != null && u.systemInformation.enabled && ((c = this.drawer) == null ? void 0 : c.systemInformation.assemblies.length) > 0 ? n`
                        <div class="module">
                            <drawer-systeminfo .model="${(P = this.drawer) == null ? void 0 : P.systemInformation}"></drawer-systeminfo>
                        </div>
                    ` : ""}
                </div>
                <div slot="footer-info" id="FooterInfoVersion">
                    ${(B = (T = this.drawer) == null ? void 0 : T.primaryAssembly) != null && B.version ? n`
                        Version ${(L = (A = this.drawer) == null ? void 0 : A.primaryAssembly) == null ? void 0 : L.version}
                    ` : ""}
                </div>
                <div slot="actions">
                    <uui-button id="close" label="Close" @click="${de(this, $, W)}" look="primary">Close</uui-button>
                </div>
            </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakSet();
W = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
s.styles = h`

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
O([
  d({ type: Object })
], s.prototype, "drawer", 2);
O([
  k()
], s.prototype, "content", 2);
s = O([
  v("client-drawer-modal")
], s);
const ve = s;
export {
  s as ClientDrawerModalElement,
  ve as default
};
//# sourceMappingURL=drawer.element-CKEFDyeV.js.map
