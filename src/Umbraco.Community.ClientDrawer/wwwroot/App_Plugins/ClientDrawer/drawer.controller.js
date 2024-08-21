// https://github.com/umbraco/Umbraco-CMS/commit/da7dacd6f2e610f085026cd325c0e86a9ff76763
// https://github.com/umbraco/Umbraco-CMS/blob/v13/contrib/src/Umbraco.Web.UI.Client/src/views/common/drawers/help/help.html
(function () {
    "use strict";

    function ClientDrawerController($scope, localizationService, eventsService, appState, notificationsService, editorService, clientDrawerService) {

        var vm = this;
        var evts = [];
        vm.title = "";
        vm.subtitle = "";
        vm.systemInfoDisplay = false;
        vm.labels = {};
        vm.labels.copiedSuccessInfo = "";
        vm.labels.copySuccessStatus = "";
        vm.labels.copiedErrorInfo = "";
        vm.labels.copyErrorStatus = "";

        vm.changeLogEntries = []
        vm.simplifiedChangeLogEntries = [];
        vm.environments = [];
        vm.systemInfo = [];

        clientDrawerService.getData().then(function (data) {
            // console.log(data);
            vm.title = data.heading;
            if (data.primaryAssembly.name !== "") {
                vm.subtitle = "Version" + " " + data.primaryAssembly.version;
                vm.systemInfo.push({ name: data.primaryAssembly.name, data: data.primaryAssembly.version });
            }
            vm.environments = data.environments;
            vm.systemInformationEnabled = data.systemInformation.enabled;
            vm.changeLogEntries = data.changeLog;

            vm.changeLogEntries.forEach(function (group) {
                group.changes.forEach(function (change) {
                    vm.simplifiedChangeLogEntries.push({
                        date: group.formattedDate,
                        change: change
                    });
                });
            });
            data.systemInformation.assemblies.forEach(function (assembly) {
                vm.systemInfo.push({ name: assembly.name, data: assembly.version });
            });

            if (vm.systemInfo.length === 0) {
                vm.systemInformationEnabled = false;
            }
        });

        vm.closeDrawer = closeDrawer;
        vm.copyInformation = copyInformation;
        vm.openChangeLogPanel = openChangeLogPanel;

        vm.nodeName = '';

        function oninit() {

            //Set help dashboard messages
            var labelKeys = [
                "speechBubbles_copySuccessMessage",
                "general_success",
                "speechBubbles_cannotCopyInformation",
                "general_error"
            ];
            localizationService.localizeMany(labelKeys).then(function (resp) {
                [
                    vm.labels.copiedSuccessInfo,
                    vm.labels.copySuccessStatus,
                    vm.labels.copiedErrorInfo,
                    vm.labels.copyErrorStatus
                ] = resp;
            });
        }

        function openChangeLogPanel() {
            //closeDrawer();
            //setTimeout(function () {
            //    eventsService.emit('drawerClosed');
            //}, 10);
            //
            //var unbind = eventsService.on('drawerClosed', function () {
            //    unbind();
            //    appState.setDrawerState("view", "/App_Plugins/ClientDrawer/changelog.html");
            //    appState.setDrawerState("showDrawer", true);
            //});

            const editor = {
                view: "/App_Plugins/ClientDrawer/changelog.html",
                id: 123,
                submit: function () {
                    editorService.close();
                },
                close: function () {
                    editorService.close();
                }
            };
            editorService.open(editor);
        }

        function closeDrawer() {
            appState.setDrawerState("showDrawer", false);
        }


        function copyInformation() {
            //Write start and end text for table formatting in github issues
            let copyStartText = "<html>\n<body>\n<!--StartFragment-->\n\nCategory | Data\n-- | --\n";
            let copyEndText = "\n<!--EndFragment-->\n</body>\n</html>";

            let copyText = copyStartText;
            vm.systemInfo.forEach(function (info) {
                copyText += info.name + " | " + info.data + "\n";
            });

            copyText += copyEndText;

            // Check if copyText is only start + end text
            // if it is something went wrong and we will not copy to clipboard
            let emptyCopyText = copyStartText + copyEndText;
            if (copyText !== emptyCopyText) {
                notificationsService.success(vm.labels.copySuccessStatus, vm.labels.copiedSuccessInfo);
                navigator.clipboard.writeText(copyText);
            }
            else {
                notificationsService.error(vm.labels.copyErrorStatus, vm.labels.copiedErrorInfo);
            }
        }

        function getPlatform() {
            return window.navigator.platform;
        }

        $scope.$on('$destroy', function () {
            for (var e in evts) {
                eventsService.unsubscribe(evts[e]);
            }
        });

        oninit();
    }

    angular.module("umbraco").controller("ClientDrawer.Controller", ClientDrawerController);

})();