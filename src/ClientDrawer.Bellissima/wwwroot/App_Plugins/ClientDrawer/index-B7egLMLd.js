import { UMB_AUTH_CONTEXT as J } from "@umbraco-cms/backoffice/auth";
const F = {
  bodySerializer: (r) => JSON.stringify(
    r,
    (t, e) => typeof e == "bigint" ? e.toString() : e
  )
}, G = ({
  onRequest: r,
  onSseError: t,
  onSseEvent: e,
  responseTransformer: a,
  responseValidator: i,
  sseDefaultRetryDelay: l,
  sseMaxRetryAttempts: c,
  sseMaxRetryDelay: n,
  sseSleepFn: o,
  url: f,
  ...s
}) => {
  let u;
  const x = o ?? ((d) => new Promise((p) => setTimeout(p, d)));
  return { stream: async function* () {
    let d = l ?? 3e3, p = 0;
    const j = s.signal ?? new AbortController().signal;
    for (; !j.aborted; ) {
      p++;
      const z = s.headers instanceof Headers ? s.headers : new Headers(s.headers);
      u !== void 0 && z.set("Last-Event-ID", u);
      try {
        const S = {
          redirect: "follow",
          ...s,
          body: s.serializedBody,
          headers: z,
          signal: j
        };
        let m = new Request(f, S);
        r && (m = await r(f, S));
        const y = await (s.fetch ?? globalThis.fetch)(m);
        if (!y.ok)
          throw new Error(
            `SSE failed: ${y.status} ${y.statusText}`
          );
        if (!y.body)
          throw new Error("No body in SSE response");
        const w = y.body.pipeThrough(new TextDecoderStream()).getReader();
        let O = "";
        const E = () => {
          try {
            w.cancel();
          } catch {
          }
        };
        j.addEventListener("abort", E);
        try {
          for (; ; ) {
            const { done: L, value: V } = await w.read();
            if (L)
              break;
            O += V;
            const k = O.split(`

`);
            O = k.pop() ?? "";
            for (const M of k) {
              const _ = M.split(`
`), T = [];
              let I;
              for (const b of _)
                if (b.startsWith("data:"))
                  T.push(b.replace(/^data:\s*/, ""));
                else if (b.startsWith("event:"))
                  I = b.replace(/^event:\s*/, "");
                else if (b.startsWith("id:"))
                  u = b.replace(/^id:\s*/, "");
                else if (b.startsWith("retry:")) {
                  const B = Number.parseInt(
                    b.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(B) || (d = B);
                }
              let C, D = !1;
              if (T.length) {
                const b = T.join(`
`);
                try {
                  C = JSON.parse(b), D = !0;
                } catch {
                  C = b;
                }
              }
              D && (i && await i(C), a && (C = await a(C))), e == null || e({
                data: C,
                event: I,
                id: u,
                retry: d
              }), T.length && (yield C);
            }
          }
        } finally {
          j.removeEventListener("abort", E), w.releaseLock();
        }
        break;
      } catch (S) {
        if (t == null || t(S), c !== void 0 && p >= c)
          break;
        const m = Math.min(
          d * 2 ** (p - 1),
          n ?? 3e4
        );
        await x(m);
      }
    }
  }() };
}, Q = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, X = (r) => {
  switch (r) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, K = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, P = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: a,
  value: i
}) => {
  if (!t) {
    const n = (r ? i : i.map((o) => encodeURIComponent(o))).join(X(a));
    switch (a) {
      case "label":
        return `.${n}`;
      case "matrix":
        return `;${e}=${n}`;
      case "simple":
        return n;
      default:
        return `${e}=${n}`;
    }
  }
  const l = Q(a), c = i.map((n) => a === "label" || a === "simple" ? r ? n : encodeURIComponent(n) : $({
    allowReserved: r,
    name: e,
    value: n
  })).join(l);
  return a === "label" || a === "matrix" ? l + c : c;
}, $ = ({
  allowReserved: r,
  name: t,
  value: e
}) => {
  if (e == null)
    return "";
  if (typeof e == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${t}=${r ? e : encodeURIComponent(e)}`;
}, H = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: a,
  value: i,
  valueOnly: l
}) => {
  if (i instanceof Date)
    return l ? i.toISOString() : `${e}=${i.toISOString()}`;
  if (a !== "deepObject" && !t) {
    let o = [];
    Object.entries(i).forEach(([s, u]) => {
      o = [
        ...o,
        s,
        r ? u : encodeURIComponent(u)
      ];
    });
    const f = o.join(",");
    switch (a) {
      case "form":
        return `${e}=${f}`;
      case "label":
        return `.${f}`;
      case "matrix":
        return `;${e}=${f}`;
      default:
        return f;
    }
  }
  const c = K(a), n = Object.entries(i).map(
    ([o, f]) => $({
      allowReserved: r,
      name: a === "deepObject" ? `${e}[${o}]` : o,
      value: f
    })
  ).join(c);
  return a === "label" || a === "matrix" ? c + n : n;
}, Y = /\{[^{}]+\}/g, Z = ({ path: r, url: t }) => {
  let e = t;
  const a = t.match(Y);
  if (a)
    for (const i of a) {
      let l = !1, c = i.substring(1, i.length - 1), n = "simple";
      c.endsWith("*") && (l = !0, c = c.substring(0, c.length - 1)), c.startsWith(".") ? (c = c.substring(1), n = "label") : c.startsWith(";") && (c = c.substring(1), n = "matrix");
      const o = r[c];
      if (o == null)
        continue;
      if (Array.isArray(o)) {
        e = e.replace(
          i,
          P({ explode: l, name: c, style: n, value: o })
        );
        continue;
      }
      if (typeof o == "object") {
        e = e.replace(
          i,
          H({
            explode: l,
            name: c,
            style: n,
            value: o,
            valueOnly: !0
          })
        );
        continue;
      }
      if (n === "matrix") {
        e = e.replace(
          i,
          `;${$({
            name: c,
            value: o
          })}`
        );
        continue;
      }
      const f = encodeURIComponent(
        n === "label" ? `.${o}` : o
      );
      e = e.replace(i, f);
    }
  return e;
}, ee = ({
  baseUrl: r,
  path: t,
  query: e,
  querySerializer: a,
  url: i
}) => {
  const l = i.startsWith("/") ? i : `/${i}`;
  let c = (r ?? "") + l;
  t && (c = Z({ path: t, url: c }));
  let n = e ? a(e) : "";
  return n.startsWith("?") && (n = n.substring(1)), n && (c += `?${n}`), c;
};
function te(r) {
  const t = r.body !== void 0;
  if (t && r.bodySerializer)
    return "serializedBody" in r ? r.serializedBody !== void 0 && r.serializedBody !== "" ? r.serializedBody : null : r.body !== "" ? r.body : null;
  if (t)
    return r.body;
}
const re = async (r, t) => {
  const e = typeof t == "function" ? await t(r) : t;
  if (e)
    return r.scheme === "bearer" ? `Bearer ${e}` : r.scheme === "basic" ? `Basic ${btoa(e)}` : e;
}, W = ({
  allowReserved: r,
  array: t,
  object: e
} = {}) => (i) => {
  const l = [];
  if (i && typeof i == "object")
    for (const c in i) {
      const n = i[c];
      if (n != null)
        if (Array.isArray(n)) {
          const o = P({
            allowReserved: r,
            explode: !0,
            name: c,
            style: "form",
            value: n,
            ...t
          });
          o && l.push(o);
        } else if (typeof n == "object") {
          const o = H({
            allowReserved: r,
            explode: !0,
            name: c,
            style: "deepObject",
            value: n,
            ...e
          });
          o && l.push(o);
        } else {
          const o = $({
            allowReserved: r,
            name: c,
            value: n
          });
          o && l.push(o);
        }
    }
  return l.join("&");
}, ae = (r) => {
  var e;
  if (!r)
    return "stream";
  const t = (e = r.split(";")[0]) == null ? void 0 : e.trim();
  if (t) {
    if (t.startsWith("application/json") || t.endsWith("+json"))
      return "json";
    if (t === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (a) => t.startsWith(a)
    ))
      return "blob";
    if (t.startsWith("text/"))
      return "text";
  }
}, se = (r, t) => {
  var e, a;
  return t ? !!(r.headers.has(t) || (e = r.query) != null && e[t] || (a = r.headers.get("Cookie")) != null && a.includes(`${t}=`)) : !1;
}, ne = async ({
  security: r,
  ...t
}) => {
  for (const e of r) {
    if (se(t, e.name))
      continue;
    const a = await re(e, t.auth);
    if (!a)
      continue;
    const i = e.name ?? "Authorization";
    switch (e.in) {
      case "query":
        t.query || (t.query = {}), t.query[i] = a;
        break;
      case "cookie":
        t.headers.append("Cookie", `${i}=${a}`);
        break;
      case "header":
      default:
        t.headers.set(i, a);
        break;
    }
  }
}, U = (r) => ee({
  baseUrl: r.baseUrl,
  path: r.path,
  query: r.query,
  querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : W(r.querySerializer),
  url: r.url
}), N = (r, t) => {
  var a;
  const e = { ...r, ...t };
  return (a = e.baseUrl) != null && a.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = v(r.headers, t.headers), e;
}, ie = (r) => {
  const t = [];
  return r.forEach((e, a) => {
    t.push([a, e]);
  }), t;
}, v = (...r) => {
  const t = new Headers();
  for (const e of r) {
    if (!e)
      continue;
    const a = e instanceof Headers ? ie(e) : Object.entries(e);
    for (const [i, l] of a)
      if (l === null)
        t.delete(i);
      else if (Array.isArray(l))
        for (const c of l)
          t.append(i, c);
      else
        l !== void 0 && t.set(
          i,
          typeof l == "object" ? JSON.stringify(l) : l
        );
  }
  return t;
};
class q {
  constructor() {
    this.fns = [];
  }
  clear() {
    this.fns = [];
  }
  eject(t) {
    const e = this.getInterceptorIndex(t);
    this.fns[e] && (this.fns[e] = null);
  }
  exists(t) {
    const e = this.getInterceptorIndex(t);
    return !!this.fns[e];
  }
  getInterceptorIndex(t) {
    return typeof t == "number" ? this.fns[t] ? t : -1 : this.fns.indexOf(t);
  }
  update(t, e) {
    const a = this.getInterceptorIndex(t);
    return this.fns[a] ? (this.fns[a] = e, t) : !1;
  }
  use(t) {
    return this.fns.push(t), this.fns.length - 1;
  }
}
const oe = () => ({
  error: new q(),
  request: new q(),
  response: new q()
}), ce = W({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), le = {
  "Content-Type": "application/json"
}, R = (r = {}) => ({
  ...F,
  headers: le,
  parseAs: "auto",
  querySerializer: ce,
  ...r
}), de = (r = {}) => {
  let t = N(R(), r);
  const e = () => ({ ...t }), a = (f) => (t = N(t, f), e()), i = oe(), l = async (f) => {
    const s = {
      ...t,
      ...f,
      fetch: f.fetch ?? t.fetch ?? globalThis.fetch,
      headers: v(t.headers, f.headers),
      serializedBody: void 0
    };
    s.security && await ne({
      ...s,
      security: s.security
    }), s.requestValidator && await s.requestValidator(s), s.body !== void 0 && s.bodySerializer && (s.serializedBody = s.bodySerializer(s.body)), (s.body === void 0 || s.serializedBody === "") && s.headers.delete("Content-Type");
    const u = U(s);
    return { opts: s, url: u };
  }, c = async (f) => {
    const { opts: s, url: u } = await l(f), x = {
      redirect: "follow",
      ...s,
      body: te(s)
    };
    let g = new Request(u, x);
    for (const h of i.request.fns)
      h && (g = await h(g, s));
    const A = s.fetch;
    let d = await A(g);
    for (const h of i.response.fns)
      h && (d = await h(d, g, s));
    const p = {
      request: g,
      response: d
    };
    if (d.ok) {
      const h = (s.parseAs === "auto" ? ae(d.headers.get("Content-Type")) : s.parseAs) ?? "json";
      if (d.status === 204 || d.headers.get("Content-Length") === "0") {
        let w;
        switch (h) {
          case "arrayBuffer":
          case "blob":
          case "text":
            w = await d[h]();
            break;
          case "formData":
            w = new FormData();
            break;
          case "stream":
            w = d.body;
            break;
          case "json":
          default:
            w = {};
            break;
        }
        return s.responseStyle === "data" ? w : {
          data: w,
          ...p
        };
      }
      let y;
      switch (h) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          y = await d[h]();
          break;
        case "stream":
          return s.responseStyle === "data" ? d.body : {
            data: d.body,
            ...p
          };
      }
      return h === "json" && (s.responseValidator && await s.responseValidator(y), s.responseTransformer && (y = await s.responseTransformer(y))), s.responseStyle === "data" ? y : {
        data: y,
        ...p
      };
    }
    const j = await d.text();
    let z;
    try {
      z = JSON.parse(j);
    } catch {
    }
    const S = z ?? j;
    let m = S;
    for (const h of i.error.fns)
      h && (m = await h(S, d, g, s));
    if (m = m || {}, s.throwOnError)
      throw m;
    return s.responseStyle === "data" ? void 0 : {
      error: m,
      ...p
    };
  }, n = (f) => (s) => c({ ...s, method: f }), o = (f) => async (s) => {
    const { opts: u, url: x } = await l(s);
    return G({
      ...u,
      body: u.body,
      headers: u.headers,
      method: f,
      onRequest: async (g, A) => {
        let d = new Request(g, A);
        for (const p of i.request.fns)
          p && (d = await p(d, u));
        return d;
      },
      url: x
    });
  };
  return {
    buildUrl: U,
    connect: n("CONNECT"),
    delete: n("DELETE"),
    get: n("GET"),
    getConfig: e,
    head: n("HEAD"),
    interceptors: i,
    options: n("OPTIONS"),
    patch: n("PATCH"),
    post: n("POST"),
    put: n("PUT"),
    request: c,
    setConfig: a,
    sse: {
      connect: o("CONNECT"),
      delete: o("DELETE"),
      get: o("GET"),
      head: o("HEAD"),
      options: o("OPTIONS"),
      patch: o("PATCH"),
      post: o("POST"),
      put: o("PUT"),
      trace: o("TRACE")
    },
    trace: n("TRACE")
  };
}, fe = de(R({
  baseUrl: "https://localhost:44315"
})), ue = [
  {
    type: "headerApp",
    name: "ClientDrawer",
    alias: "ClientDrawer.headerApp",
    elementName: "clientdrawer-header-app",
    js: () => import("./headerapp.element-B6rnD-JF.js"),
    weight: 9999,
    meta: {
      label: "ClientDrawer",
      pathname: "ClientDrawer"
    }
  }
], he = [...ue], pe = [
  {
    type: "modal",
    alias: "clientdrawer.modal",
    name: "Client Drawer Modal",
    js: () => import("./drawer.element-CFPtVlAx.js")
  },
  {
    type: "modal",
    alias: "clientdrawerchangelog.modal",
    name: "Client Drawer Change Log Modal",
    js: () => import("./changelog.element-u927YJbZ.js")
  }
], ye = [...pe], be = [
  {
    type: "globalContext",
    alias: "clientdrawer.context",
    name: "ClientDrawer context",
    js: () => import("./clientdrawer.context-DKrZAK61.js")
  }
], me = [...be], we = [
  ...he,
  ...ye,
  ...me
], je = (r, t) => {
  r.consumeContext(J, async (e) => {
    const a = e == null ? void 0 : e.getOpenApiConfiguration();
    fe.setConfig({
      auth: (a == null ? void 0 : a.token) ?? void 0,
      baseUrl: (a == null ? void 0 : a.base) ?? "",
      credentials: (a == null ? void 0 : a.credentials) ?? "same-origin"
    });
  }), t.registerMany(we);
};
export {
  fe as c,
  je as o
};
//# sourceMappingURL=index-B7egLMLd.js.map
