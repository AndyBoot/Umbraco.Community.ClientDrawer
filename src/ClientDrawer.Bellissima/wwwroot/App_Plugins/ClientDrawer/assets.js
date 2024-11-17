const a = [
  {
    type: "headerApp",
    name: "ClientDrawer",
    alias: "ClientDrawer.headerApp",
    elementName: "clientdrawer-header-app",
    js: () => import("./headerapp.element-DpSlpgTC.js"),
    weight: 9999,
    meta: {
      label: "ClientDrawer",
      pathname: "ClientDrawer"
    }
  }
], t = [...a], n = [
  {
    type: "modal",
    alias: "clientdrawer.modal",
    name: "Client Drawer Modal",
    js: () => import("./drawer.element-C_3bXcyA.js")
  },
  {
    type: "modal",
    alias: "clientdrawerchangelog.modal",
    name: "Client Drawer Change Log Modal",
    js: () => import("./changelog.element-227NQt5A.js")
  }
], r = [...n], o = [
  {
    type: "globalContext",
    alias: "clientdrawer.context",
    name: "ClientDrawer context",
    js: () => import("./clientdrawer.context-B1SVOomf.js")
  }
], s = [...o], l = [
  ...t,
  ...r,
  ...s
], m = (i, e) => {
  e.registerMany(l);
};
export {
  m as onInit
};
//# sourceMappingURL=assets.js.map
