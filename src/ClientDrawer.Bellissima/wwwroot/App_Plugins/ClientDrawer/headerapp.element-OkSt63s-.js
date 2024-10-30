import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { LitElement as x, html as v, unsafeHTML as f, css as D, property as E, customElement as N } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalToken as H, UMB_MODAL_MANAGER_CONTEXT as M } from "@umbraco-cms/backoffice/modal";
import { CLIENT_DRAWER_CONTEXT_TOKEN as y } from "./clientdrawer.context-B1SVOomf.js";
const I = new H(
  "clientdrawer.modal",
  {
    modal: {
      type: "sidebar",
      size: "small"
    }
  }
);
var $ = Object.defineProperty, k = Object.getOwnPropertyDescriptor, w = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? k(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (r = (n ? o(t, i, r) : o(r)) || r);
  return n && r && $(t, i, r), r;
}, m = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
}, p = (e, t, i) => (m(e, t, "read from private field"), i ? i.call(e) : t.get(e)), h = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, C = (e, t, i, n) => (m(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i), A = (e, t, i) => (m(e, t, "access private method"), i), s, d, l, u;
let c = class extends _(x) {
  constructor() {
    super(), h(this, l), h(this, s, void 0), h(this, d, void 0), this.iconClass = "", this.iconImg = "", this.iconSvg = "", this.clientName = "", this.headerButtonMode = "", this.currentEnvironmentName = "", this.consumeContext(y, (e) => {
      C(this, s, e), this.observe(e.headerAction, (t) => {
        this.headerAction = t;
      });
    }), this.consumeContext(M, (e) => {
      C(this, d, e);
    });
  }
  connectedCallback() {
    super.connectedCallback(), p(this, s) != null && p(this, s).getHeaderActionData();
  }
  getActionInnerHtml(e, t, i) {
    switch (e) {
      case "IconAndEnvironmentName":
        return `<span class="umb-badge umb-badge--success umb-badge--m mode--IconAndEnvironmentName">${t} ${i}</span>`;
      case "EnvironmentName":
        return `<span class="umb-badge umb-badge--success umb-badge--m mode--EnvironmentName">${i}</span>`;
      default:
        return `${t}`;
    }
  }
  render() {
    var i, n, r, a, o, g, b;
    this.iconClass = ((i = this.headerAction) == null ? void 0 : i.iconClass) ?? "", this.iconImg = ((n = this.headerAction) == null ? void 0 : n.iconImageFilePath) ?? "", this.iconSvg = ((r = this.headerAction) == null ? void 0 : r.iconSVG) ?? "", this.clientName = ((a = this.headerAction) == null ? void 0 : a.clientName) ?? "", this.headerButtonMode = ((o = this.headerAction) == null ? void 0 : o.headerButtonMode) ?? "Icon", this.currentEnvironmentName = ((g = this.headerAction) == null ? void 0 : g.currentEnvironmentName) ?? "";
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
  (e = p(this, d)) == null || e.open(this, I);
};
c.styles = D`
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
  E({ type: Object })
], c.prototype, "headerAction", 2);
c = w([
  N("clientdrawer-headerapp")
], c);
const L = c;
export {
  c as ClientDrawerHeaderApp,
  L as default
};
//# sourceMappingURL=headerapp.element-OkSt63s-.js.map
