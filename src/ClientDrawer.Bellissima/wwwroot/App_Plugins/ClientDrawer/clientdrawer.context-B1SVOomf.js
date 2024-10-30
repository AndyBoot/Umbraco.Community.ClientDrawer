var _ = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var d = (t, e, r) => (_(t, e, "read from private field"), r ? r.call(t) : e.get(t)), u = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, h = (t, e, r, n) => (_(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
import { UmbControllerBase as N } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as I } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as A } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as P } from "@umbraco-cms/backoffice/auth";
import { tryExecuteAndNotify as S } from "@umbraco-cms/backoffice/resources";
class D extends Error {
  constructor(e, r, n) {
    super(n), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class U extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class B {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, n) => {
      this._resolve = r, this._reject = n;
      const s = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(o));
      }, a = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(o));
      }, i = (o) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(o);
      };
      return Object.defineProperty(i, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(i, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(i, "isCancelled", {
        get: () => this._isCancelled
      }), e(s, a, i);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, r) {
    return this.promise.then(e, r);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new U("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class j {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const r = this._fns.indexOf(e);
    r !== -1 && (this._fns = [...this._fns.slice(0, r), ...this._fns.slice(r + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const R = {
  BASE: "",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "1.0",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new j(),
    response: new j()
  }
}, E = (t) => typeof t == "string", w = (t) => E(t) && t !== "", g = (t) => t instanceof Blob, O = (t) => t instanceof FormData, L = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, $ = (t) => {
  const e = [], r = (s, a) => {
    e.push(`${encodeURIComponent(s)}=${encodeURIComponent(String(a))}`);
  }, n = (s, a) => {
    a != null && (a instanceof Date ? r(s, a.toISOString()) : Array.isArray(a) ? a.forEach((i) => n(s, i)) : typeof a == "object" ? Object.entries(a).forEach(([i, o]) => n(`${s}[${i}]`, o)) : r(s, a));
  };
  return Object.entries(t).forEach(([s, a]) => n(s, a)), e.length ? `?${e.join("&")}` : "";
}, F = (t, e) => {
  const r = t.ENCODE_PATH || encodeURI, n = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (a, i) => {
    var o;
    return (o = e.path) != null && o.hasOwnProperty(i) ? r(String(e.path[i])) : a;
  }), s = t.BASE + n;
  return e.query ? s + $(e.query) : s;
}, V = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (n, s) => {
      E(s) || g(s) ? e.append(n, s) : e.append(n, JSON.stringify(s));
    };
    return Object.entries(t.formData).filter(([, n]) => n != null).forEach(([n, s]) => {
      Array.isArray(s) ? s.forEach((a) => r(n, a)) : r(n, s);
    }), e;
  }
}, T = async (t, e) => typeof e == "function" ? e(t) : e, G = async (t, e) => {
  const [r, n, s, a] = await Promise.all([
    T(e, t.TOKEN),
    T(e, t.USERNAME),
    T(e, t.PASSWORD),
    T(e, t.HEADERS)
  ]), i = Object.entries({
    Accept: "application/json",
    ...a,
    ...e.headers
  }).filter(([, o]) => o != null).reduce((o, [l, c]) => ({
    ...o,
    [l]: String(c)
  }), {});
  if (w(r) && (i.Authorization = `Bearer ${r}`), w(n) && w(s)) {
    const o = L(`${n}:${s}`);
    i.Authorization = `Basic ${o}`;
  }
  return e.body !== void 0 && (e.mediaType ? i["Content-Type"] = e.mediaType : g(e.body) ? i["Content-Type"] = e.body.type || "application/octet-stream" : E(e.body) ? i["Content-Type"] = "text/plain" : O(e.body) || (i["Content-Type"] = "application/json")), new Headers(i);
}, k = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : E(t.body) || g(t.body) || O(t.body) ? t.body : JSON.stringify(t.body);
}, M = async (t, e, r, n, s, a, i) => {
  const o = new AbortController();
  let l = {
    headers: a,
    body: n ?? s,
    method: e.method,
    signal: o.signal
  };
  t.WITH_CREDENTIALS && (l.credentials = t.CREDENTIALS);
  for (const c of t.interceptors.request._fns)
    l = await c(l);
  return i(() => o.abort()), await fetch(r, l);
}, W = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (E(r))
      return r;
  }
}, z = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((n) => e.includes(n)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, J = (t, e) => {
  const n = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (n)
    throw new D(t, e, n);
  if (!e.ok) {
    const s = e.status ?? "unknown", a = e.statusText ?? "unknown", i = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new D(
      t,
      e,
      `Generic Error: status: ${s}; status text: ${a}; body: ${i}`
    );
  }
}, H = (t, e) => new B(async (r, n, s) => {
  try {
    const a = F(t, e), i = V(e), o = k(e), l = await G(t, e);
    if (!s.isCancelled) {
      let c = await M(t, e, a, o, i, l, s);
      for (const v of t.interceptors.response._fns)
        c = await v(c);
      const x = await z(c), q = W(c, e.responseHeader), C = {
        url: a,
        ok: c.ok,
        status: c.status,
        statusText: c.statusText,
        body: q ?? x
      };
      J(e, C), r(C.body);
    }
  } catch (a) {
    n(a);
  }
}), K = () => H(R, {
  method: "GET",
  url: "/umbraco/clientdrawer/api/v1/getdata",
  errors: {
    401: "The resource is protected and requires an authentication token"
  }
}), X = () => H(R, {
  method: "GET",
  url: "/umbraco/clientdrawer/api/v1/getheaderactiondata",
  errors: {
    401: "The resource is protected and requires an authentication token"
  }
});
var f;
class Q {
  constructor(e) {
    u(this, f, void 0);
    h(this, f, e);
  }
  async getData() {
    return await S(d(this, f), K());
  }
  async getHeaderActionData() {
    return await S(d(this, f), X());
  }
}
f = new WeakMap();
var y;
class Y extends N {
  constructor(r) {
    super(r);
    u(this, y, void 0);
    h(this, y, new Q(this));
  }
  async getData() {
    return d(this, y).getData();
  }
  async getHeaderActionData() {
    return d(this, y).getHeaderActionData();
  }
}
y = new WeakMap();
var p, m, b;
class Z extends N {
  constructor(r) {
    super(r);
    u(this, p, void 0);
    u(this, m, void 0);
    u(this, b, void 0);
    h(this, m, new A(void 0)), this.drawer = d(this, m).asObservable(), h(this, b, new A(void 0)), this.headerAction = d(this, b).asObservable(), this.provideContext(ee, this), h(this, p, new Y(this)), this.consumeContext(P, (n) => {
      const s = n.getOpenApiConfiguration();
      R.TOKEN = s.token, R.BASE = s.base, R.WITH_CREDENTIALS = s.withCredentials;
    });
  }
  async getData() {
    const { data: r } = await d(this, p).getData();
    r && d(this, m).setValue(r);
  }
  async getHeaderActionData() {
    const { data: r } = await d(this, p).getHeaderActionData();
    r && d(this, b).setValue(r);
  }
}
p = new WeakMap(), m = new WeakMap(), b = new WeakMap();
const ee = new I(Z.name);
export {
  ee as CLIENT_DRAWER_CONTEXT_TOKEN,
  Z as ClientDrawerContext,
  Z as default
};
//# sourceMappingURL=clientdrawer.context-B1SVOomf.js.map
