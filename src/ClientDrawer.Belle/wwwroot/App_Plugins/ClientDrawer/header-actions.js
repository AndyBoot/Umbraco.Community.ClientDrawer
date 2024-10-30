angular.module("umbraco").run([
    "$compile",
    "appState",
    "eventsService",
    "$http",
    "clientDrawerService",
    function ($compile, appState, eventsService, $http, clientDrawerService) {
        var title = '';
        var headerButtonMode = 'Icon';
        var currentEnvironmentName = '';
        eventsService.on("app.ready", function (e, args) {

            if (angular.element(".client-drawer__header-action").length > 0) {
                return;
            }

            var scope = e.targetScope.$new();

            scope.open = open;

            clientDrawerService.getHeaderActionData().then(function (data) {
                // console.log(data);
                var iconClass = data.iconClass;
                var iconImg = data.iconImageFilePath;
                var iconSvg = data.iconSVG;
                title = data.clientName;
                headerButtonMode = data.headerButtonMode;
                currentEnvironmentName = data.currentEnvironmentName;

                if (iconSvg.length > 0) {
                    var html = getActionHTML(iconSvg, title, headerButtonMode, currentEnvironmentName);

                    var dom = $compile(html)(scope);
                    angular.element(".umb-app-header__actions > li:first-child").before(dom);
                }
                else if (iconImg?.length > 0) {
                    var html = getActionHTML(`<img src="` + iconImg + `" alt="` + title + `" />`, title, headerButtonMode, currentEnvironmentName);

                    var dom = $compile(html)(scope);
                    angular.element(".umb-app-header__actions > li:first-child").before(dom);
                }
                else if (iconClass.length > 0) {
                    var html = getActionHTML(`<umb-icon icon="` + iconClass + `"></umb-icon>`, title, headerButtonMode, currentEnvironmentName);

                    var dom = $compile(html)(scope);
                    angular.element(".umb-app-header__actions > li:first-child").before(dom);
                }
            });

        });

        function getActionHTML(icon, title, headerButtonMode, currentEnvironmentName) {
            var html = `
                <li class="umb-app-header__action client-drawer__header-action">
                    <button type="button" class="umb-app-header__button btn-reset" title="` + title + `" ng-click="open()">
            `;
            switch (headerButtonMode) {
                case 'IconAndEnvironmentName':
                    html += `<span class="umb-badge umb-badge--success umb-badge--m mode--IconAndEnvironmentName">` + icon + currentEnvironmentName + `</span>`;
                    break;
                case 'EnvironmentName':
                    html += `<span class="umb-badge umb-badge--success umb-badge--m mode--EnvironmentName">` + currentEnvironmentName + `</span>`;
                    break;
                default:
                case 'Icon':
                    html += `<span class="umb-app-header__action-icon umb-icon">
                                <span class="umb-icon__inner">` + icon + `</span>
                            </span>`;
                    break;
            }

            html += `</button></li>`;

            return html;
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