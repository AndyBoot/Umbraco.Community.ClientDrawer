angular.module("umbraco").run([
    "$compile",
    "appState",
    "eventsService",
    "$http",
    "clientDrawerService",
    function ($compile, appState, eventsService, $http, clientDrawerService) {
        var title = '';
        eventsService.on("app.ready", function (e, args) {
            // console.log("app.ready", e, args);

            var scope = e.targetScope.$new();

            scope.open = open;

            clientDrawerService.getHeaderActionData().then(function (data) {
                // console.log(data);
                var iconClass = data.iconClass;
                var iconImg = data.iconImageFilePath;
                title = data.clientName;

                if (iconImg?.length > 0 && iconImg?.toLowerCase().indexOf(".svg") > 0) {
                    $http.get(iconImg, { cache: true })
                        .then(function (response) {
                            // Insert the SVG content into the element
                            // console.log(response);
                            return response.data;
                        })
                        .then(function (response) {
                            var html = getActionHTML(response, title);

                            var dom = $compile(html)(scope);
                            angular.element(".umb-app-header__actions > li:first-child").before(dom);
                        });
                }
                else if (iconImg?.length > 0) {
                    var html = getActionHTML(`<img src="` + iconImg + `" alt="` + title + `" />`, title);

                    var dom = $compile(html)(scope);
                    angular.element(".umb-app-header__actions > li:first-child").before(dom);
                }
                else if (iconClass.length > 0) {
                    var html = getActionHTML(`<umb-icon icon="` + iconClass + `"></umb-icon>`, title);

                    var dom = $compile(html)(scope);
                    angular.element(".umb-app-header__actions > li:first-child").before(dom);
                }
            });

        });

        function getActionHTML(icon, title) {
            return `<li class="umb-app-header__action">
                        <button type="button" class="umb-app-header__button btn-reset" title="` + title + `" ng-click="open()">
                            <span class="umb-app-header__action-icon umb-icon">
                                <span class="umb-icon__inner">` + icon + `</span>
                            </span>
                        </button>
                    </li>`;
        }

        function open() {
            if (title === '' || title == null) {
                alert('Client Drawer requires configuration via appsettings.json');
            }

            var showDrawer = appState.getDrawerState("showDrawer");
            appState.setDrawerState("view", "/App_Plugins/ClientDrawer/drawer.html");
            appState.setDrawerState("showDrawer", !showDrawer);
        }
    }
]);