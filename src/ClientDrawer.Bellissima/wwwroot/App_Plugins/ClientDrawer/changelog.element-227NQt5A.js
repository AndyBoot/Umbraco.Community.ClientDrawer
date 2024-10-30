import { html as u, when as m, css as v, property as C, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as w } from "@umbraco-cms/backoffice/modal";
import { CLIENT_DRAWER_CONTEXT_TOKEN as g } from "./clientdrawer.context-B1SVOomf.js";
var E = Object.defineProperty, y = Object.getOwnPropertyDescriptor, p = (a, t, e, l) => {
  for (var i = l > 1 ? void 0 : l ? y(t, e) : t, o = a.length - 1, c; o >= 0; o--)
    (c = a[o]) && (i = (l ? c(t, e, i) : c(i)) || i);
  return l && i && E(t, e, i), i;
}, h = (a, t, e) => {
  if (!t.has(a))
    throw TypeError("Cannot " + e);
}, d = (a, t, e) => (h(a, t, "read from private field"), e ? e.call(a) : t.get(a)), b = (a, t, e) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, e);
}, D = (a, t, e, l) => (h(a, t, "write to private field"), l ? l.call(a, e) : t.set(a, e), e), $ = (a, t, e) => (h(a, t, "access private method"), e), n, s, f;
let r = class extends w {
  constructor() {
    super(), b(this, s), b(this, n, void 0), this.consumeContext(g, (a) => {
      D(this, n, a), this.observe(a.drawer, (t) => {
        this.drawer = t;
      });
    });
  }
  connectedCallback() {
    super.connectedCallback(), d(this, n) != null && d(this, n).getData();
  }
  render() {
    var t;
    var a = [];
    return (t = this.drawer) == null || t.changeLog.forEach(function(e) {
      var l;
      (l = e == null ? void 0 : e.changes) == null || l.forEach(function(i) {
        a.push({
          date: e.formattedDate,
          change: i
        });
      });
    }), u`
            <umb-body-layout headline="Change log">
                <uui-table>
                    <uui-table-column style="width:20%;"></uui-table-column>
                    <uui-table-column style=""></uui-table-column>
                    <uui-table-column style=""></uui-table-column>
                    <uui-table-head>
                        <uui-table-head-cell>Date</uui-table-head-cell>
                        <uui-table-head-cell>Changes</uui-table-head-cell>
                        <uui-table-head-cell>Link</uui-table-head-cell>
                    </uui-table-head>
                    ${a.map(
      (e) => u`
                        ${m(
        e,
        () => u`
                                <uui-table-row>
                                    <uui-table-cell>${e.date}</uui-table-cell>
                                    <uui-table-cell>${e.change.text}</uui-table-cell>
                                    <uui-table-cell>
                                        ${e.change.link ? u`<a href="${e.change.link}" target="_blank">${e.change.link}</a>` : u`<span>&nbsp;</span>`}
                                    </uui-table-cell>
                                </uui-table-row>
                            `
      )}
                    `
    )}
                </uui-table>
                <div slot="actions">
                    <uui-button id="close" label="Close" @click="${$(this, s, f)}" look="primary">Close</uui-button>
                </div>
            </umb-body-layout>
        `;
  }
};
n = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
f = function() {
  var a;
  (a = this.modalContext) == null || a.reject();
};
r.styles = v`
        uui-table-cell {
            --uui-table-cell-padding: 5px 15px;
        }
    `;
p([
  C({ type: Object })
], r.prototype, "drawer", 2);
r = p([
  _("client-drawer-change-log-modal")
], r);
const L = r;
export {
  r as ClientDrawerChangeLogModalElement,
  L as default
};
//# sourceMappingURL=changelog.element-227NQt5A.js.map
