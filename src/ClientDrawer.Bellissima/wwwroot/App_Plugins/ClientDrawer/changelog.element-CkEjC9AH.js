import { html as u, when as m, css as v, property as C, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as w } from "@umbraco-cms/backoffice/modal";
import { CLIENT_DRAWER_CONTEXT_TOKEN as g } from "./clientdrawer.context-CA343ZoY.js";
var E = Object.defineProperty, y = Object.getOwnPropertyDescriptor, p = (e, t, a, l) => {
  for (var i = l > 1 ? void 0 : l ? y(t, a) : t, o = e.length - 1, c; o >= 0; o--)
    (c = e[o]) && (i = (l ? c(t, a, i) : c(i)) || i);
  return l && i && E(t, a, i), i;
}, h = (e, t, a) => {
  if (!t.has(e))
    throw TypeError("Cannot " + a);
}, d = (e, t, a) => (h(e, t, "read from private field"), a ? a.call(e) : t.get(e)), b = (e, t, a) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, a);
}, D = (e, t, a, l) => (h(e, t, "write to private field"), l ? l.call(e, a) : t.set(e, a), a), $ = (e, t, a) => (h(e, t, "access private method"), a), r, s, f;
let n = class extends w {
  constructor() {
    super(), b(this, s), b(this, r, void 0), this.consumeContext(g, (e) => {
      e && (D(this, r, e), this.observe(e.drawer, (t) => {
        this.drawer = t;
      }));
    });
  }
  connectedCallback() {
    super.connectedCallback(), d(this, r) != null && d(this, r).getData();
  }
  render() {
    var t;
    var e = [];
    return (t = this.drawer) == null || t.changeLog.forEach(function(a) {
      var l;
      (l = a == null ? void 0 : a.changes) == null || l.forEach(function(i) {
        e.push({
          date: a.formattedDate,
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
                    ${e.map(
      (a) => u`
                        ${m(
        a,
        () => u`
                                <uui-table-row>
                                    <uui-table-cell>${a.date}</uui-table-cell>
                                    <uui-table-cell>${a.change.text}</uui-table-cell>
                                    <uui-table-cell>
                                        ${a.change.link ? u`<a href="${a.change.link}" target="_blank">${a.change.link}</a>` : u`<span>&nbsp;</span>`}
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
r = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
f = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
};
n.styles = v`
        uui-table-cell {
            --uui-table-cell-padding: 5px 15px;
        }
    `;
p([
  C({ type: Object })
], n.prototype, "drawer", 2);
n = p([
  _("client-drawer-change-log-modal")
], n);
const L = n;
export {
  n as ClientDrawerChangeLogModalElement,
  L as default
};
//# sourceMappingURL=changelog.element-CkEjC9AH.js.map
