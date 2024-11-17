import { html as v, unsafeHTML as f, css as _, property as D, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalToken as E, UMB_MODAL_MANAGER_CONTEXT as H } from "@umbraco-cms/backoffice/modal";
import { CLIENT_DRAWER_CONTEXT_TOKEN as N } from "./clientdrawer.context-B1SVOomf.js";
import { UmbHeaderAppButtonElement as y } from "@umbraco-cms/backoffice/components";
const M = new E(
  "clientdrawer.modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var I = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, w = (e, t, n, i) => {
  for (var r = i > 1 ? void 0 : i ? $(t, n) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (r = (i ? o(t, n, r) : o(r)) || r);
  return i && r && I(t, n, r), r;
}, m = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, p = (e, t, n) => (m(e, t, "read from private field"), n ? n.call(e) : t.get(e)), h = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, C = (e, t, n, i) => (m(e, t, "write to private field"), i ? i.call(e, n) : t.set(e, n), n), A = (e, t, n) => (m(e, t, "access private method"), n), s, d, l, u;
let c = class extends y {
  constructor() {
    super(), h(this, l), h(this, s, void 0), h(this, d, void 0), this.iconClass = "", this.iconImg = "", this.iconSvg = "", this.clientName = "", this.headerButtonMode = "", this.currentEnvironmentName = "", this.consumeContext(N, (e) => {
      C(this, s, e), this.observe(e.headerAction, (t) => {
        this.headerAction = t;
      });
    }), this.consumeContext(H, (e) => {
      C(this, d, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), p(this, s) != null && p(this, s).getHeaderActionData();
  }
  getActionInnerHtml(e, t, n) {
    switch (e) {
      case "IconAndEnvironmentName":
        return `<span class="umb-badge umb-badge--success umb-badge--m mode--IconAndEnvironmentName">${t} ${n}</span>`;
      case "EnvironmentName":
        return `<span class="umb-badge umb-badge--success umb-badge--m mode--EnvironmentName">${n}</span>`;
      default:
        return `${t}`;
    }
  }
  render() {
    var n, i, r, a, o, g, b;
    this.iconClass = ((n = this.headerAction) == null ? void 0 : n.iconClass) ?? "", this.iconImg = ((i = this.headerAction) == null ? void 0 : i.iconImageFilePath) ?? "", this.iconSvg = ((r = this.headerAction) == null ? void 0 : r.iconSVG) ?? "", this.clientName = ((a = this.headerAction) == null ? void 0 : a.clientName) ?? "", this.headerButtonMode = ((o = this.headerAction) == null ? void 0 : o.headerButtonMode) ?? "Icon", this.currentEnvironmentName = ((g = this.headerAction) == null ? void 0 : g.currentEnvironmentName) ?? "";
    let e = "";
    this.iconSvg.length > 0 ? e = `<uui-icon>${this.iconSvg}</umb-icon>` : ((b = this.iconImg) == null ? void 0 : b.length) > 0 ? e = `<img src="${this.iconImg}" alt="${this.clientName}" />` : this.iconClass.length > 0 && (e = `<uui-icon icon="${this.iconClass}"></umb-icon>`);
    const t = this.getActionInnerHtml(this.headerButtonMode, e, this.currentEnvironmentName);
    return this.headerButtonMode === "Icon" ? v`
            <uui-button look="primary" label="Client Drawer" id="ClientDrawerHeaderApp" compact="" pristine="" type="button" color="default" @click=${A(this, l, u)}>
				${f(t)}
			</uui-button>
            ` : v`
              <button type="button" label="Client Drawer" id="ClientDrawerHeaderApp" @click=${A(this, l, u)}>
                ${f(t)}
              </button>
            `;
  }
};
s = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
u = function() {
  var e;
  (e = p(this, d)) == null || e.open(this, M);
};
c.styles = _`
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
    `;
w([
  D({ type: Object })
], c.prototype, "headerAction", 2);
c = w([
  x("clientdrawer-header-app")
], c);
const B = c;
export {
  c as ClientDrawerHeaderApp,
  B as default
};
//# sourceMappingURL=headerapp.element-DpSlpgTC.js.map
