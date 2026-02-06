var u = (a, t, e) => {
  if (!t.has(a))
    throw TypeError("Cannot " + e);
};
var r = (a, t, e) => (u(a, t, "read from private field"), e ? e.call(a) : t.get(a)), i = (a, t, e) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, e);
}, s = (a, t, e, l) => (u(a, t, "write to private field"), l ? l.call(a, e) : t.set(a, e), e);
import { UmbControllerBase as D } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as y } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as m } from "@umbraco-cms/backoffice/observable-api";
import { tryExecute as w } from "@umbraco-cms/backoffice/resources";
import { c as g } from "./index-BuI3tihL.js";
class b {
  static getUmbracoClientdrawerApiV1Getdata(t) {
    return ((t == null ? void 0 : t.client) ?? g).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/clientdrawer/api/v1/getdata",
      ...t
    });
  }
  static getUmbracoClientdrawerApiV1Getheaderactiondata(t) {
    return ((t == null ? void 0 : t.client) ?? g).get({
      security: [
        {
          scheme: "bearer",
          type: "http"
        }
      ],
      url: "/umbraco/clientdrawer/api/v1/getheaderactiondata",
      ...t
    });
  }
}
var c;
class C {
  constructor(t) {
    i(this, c, void 0);
    s(this, c, t);
  }
  async getData() {
    return await w(r(this, c), b.getUmbracoClientdrawerApiV1Getdata());
  }
  async getHeaderActionData() {
    return await w(r(this, c), b.getUmbracoClientdrawerApiV1Getheaderactiondata());
  }
}
c = new WeakMap();
var n;
class A extends D {
  constructor(e) {
    super(e);
    i(this, n, void 0);
    s(this, n, new C(this));
  }
  async getData() {
    return r(this, n).getData();
  }
  async getHeaderActionData() {
    return r(this, n).getHeaderActionData();
  }
}
n = new WeakMap();
var d, o, h;
class p extends D {
  constructor(e) {
    super(e);
    i(this, d, void 0);
    i(this, o, void 0);
    i(this, h, void 0);
    s(this, o, new m(void 0)), this.drawer = r(this, o).asObservable(), s(this, h, new m(void 0)), this.headerAction = r(this, h).asObservable(), this.provideContext(f, this), s(this, d, new A(this));
  }
  async getData() {
    const { data: e } = await r(this, d).getData();
    e && r(this, o).setValue(e);
  }
  async getHeaderActionData() {
    const { data: e } = await r(this, d).getHeaderActionData();
    e && r(this, h).setValue(e);
  }
}
d = new WeakMap(), o = new WeakMap(), h = new WeakMap();
const f = new y(p.name);
export {
  f as CLIENT_DRAWER_CONTEXT_TOKEN,
  p as ClientDrawerContext,
  p as default
};
//# sourceMappingURL=clientdrawer.context-CA343ZoY.js.map
