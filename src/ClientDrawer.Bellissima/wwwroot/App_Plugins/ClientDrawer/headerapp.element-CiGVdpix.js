import { html as f, unsafeHTML as v, css as _, property as D, customElement as x } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalToken as E, UMB_MODAL_MANAGER_CONTEXT as H } from "@umbraco-cms/backoffice/modal";
import { CLIENT_DRAWER_CONTEXT_TOKEN as N } from "./clientdrawer.context-CA343ZoY.js";
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
var I = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, A = (e, t, i, n) => {
  for (var r = n > 1 ? void 0 : n ? $(t, i) : t, a = e.length - 1, o; a >= 0; a--)
    (o = e[a]) && (r = (n ? o(t, i, r) : o(r)) || r);
  return n && r && I(t, i, r), r;
}, u = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
}, w = (e, t, i) => (u(e, t, "read from private field"), i ? i.call(e) : t.get(e)), h = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, b = (e, t, i, n) => (u(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i), C = (e, t, i) => (u(e, t, "access private method"), i), c, d, l, p;
let s = class extends y {
  constructor() {
    super(), h(this, l), h(this, c, void 0), h(this, d, void 0), this.iconClass = "", this.iconImg = "", this.iconSvg = "", this.clientName = "", this.headerButtonMode = "", this.currentEnvironmentName = "", this.consumeContext(N, (e) => {
      e && (b(this, c, e), this.observe(e.headerAction, (t) => {
        this.headerAction = t;
      }), w(this, c).getHeaderActionData());
    }), this.consumeContext(H, (e) => {
      b(this, d, e);
    });
  }
  connectedCallback() {
    super.connectedCallback();
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
    var i, n, r, a, o, m, g;
    this.iconClass = ((i = this.headerAction) == null ? void 0 : i.iconClass) ?? "", this.iconImg = ((n = this.headerAction) == null ? void 0 : n.iconImageFilePath) ?? "", this.iconSvg = ((r = this.headerAction) == null ? void 0 : r.iconSVG) ?? "", this.clientName = ((a = this.headerAction) == null ? void 0 : a.clientName) ?? "", this.headerButtonMode = ((o = this.headerAction) == null ? void 0 : o.headerButtonMode) ?? "Icon", this.currentEnvironmentName = ((m = this.headerAction) == null ? void 0 : m.currentEnvironmentName) ?? "";
    let e = "";
    this.iconSvg.length > 0 ? e = `<uui-icon>${this.iconSvg}</uui-icon>` : ((g = this.iconImg) == null ? void 0 : g.length) > 0 ? e = `<img src="${this.iconImg}" alt="${this.clientName}" />` : this.iconClass.length > 0 && (e = `<uui-icon icon="${this.iconClass}"></uui-icon>`);
    const t = this.getActionInnerHtml(this.headerButtonMode, e, this.currentEnvironmentName);
    return this.headerButtonMode === "Icon" ? f`
            <uui-button look="primary" label="Client Drawer" id="ClientDrawerHeaderApp" compact="" pristine="" type="button" color="default" @click=${C(this, l, p)}>
				${v(t)}
			</uui-button>
            ` : f`
              <button type="button" label="Client Drawer" id="ClientDrawerHeaderApp" @click=${C(this, l, p)}>
                ${v(t)}
              </button>
            `;
  }
};
c = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
p = function() {
  var e;
  (e = w(this, d)) == null || e.open(this, M);
};
s.styles = [_`
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
            min-width: fit-content;
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
            white-space: nowrap;
            min-width: fit-content;
        }
        #ClientDrawerHeaderApp .umb-badge.mode--IconAndEnvironmentName {
            padding: 4px 15px 4px 4px;
        }
        #ClientDrawerHeaderApp .umb-badge img {
            width: 26px;
            margin-right: 6px;
        }
    `];
A([
  D({ type: Object })
], s.prototype, "headerAction", 2);
s = A([
  x("clientdrawer-header-app")
], s);
const B = s;
export {
  s as ClientDrawerHeaderApp,
  B as default
};
//# sourceMappingURL=headerapp.element-CiGVdpix.js.map
