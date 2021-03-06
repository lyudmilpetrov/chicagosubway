angular.module('appChicago', ['appChicago.service', 'ngRoute', 'ngDialog', 'ngAnimate', 'ngSanitize', 'ngAudio', 'ui.select', 'ui.grid', 'ui.grid.selection', 'ui.grid.autoResize', 'ngWebworker'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/start', {
        templateUrl: 'views/start.html',
        controller: 'appChicagoCtrl'
    });
    $routeProvider.otherwise({
        templateUrl: 'views/start.html',
        controller: 'appChicagoCtrl'
    });
}])
.config(['$provide', function ($provide) {
      $provide.decorator('$interval', function ($delegate) {
        var originalCancel = $delegate.cancel;
        $delegate.cancel = function (intervalPromise) {
            var retValue = originalCancel(intervalPromise);
            if (retValue && intervalPromise) {
                intervalPromise.cancelled = true;
            };
            return retValue;
        };
        return $delegate;
    });
}])
.controller('appChicagoCtrl',
['$scope', '$http', '$location', '$rootScope', '$timeout', '$route', '$interval', 'ngDialog', 'ngAudio', 'dataSource', 'words', 'dateFilter', 'getTime', 'getLine', 'getLineID', 'getPath', 'message', 'Webworker', 'getTimeTable', 'addTime', 'getMultipleTimeTable', 'caching',
    function ($scope, $http, $location, $rootScope, $timeout, $route, $interval, ngDialog, ngAudio, dataSource, words, dateFilter, getTime, getLine, getLineID, getPath, message, Webworker, getTimeTable, addTime, getMultipleTimeTable, caching) {
    if (typeof $scope.w == 'undefined') {
        caching.setCache('localStorage', 'red', JSON.stringify(red), false);
        $scope.red = caching.getCache('localStorage', 'red');
        caching.setCache('localStorage', 'blue', JSON.stringify(blue), false);
        $scope.blue = caching.getCache('localStorage', 'blue');
        caching.setCache('localStorage', 'brown', JSON.stringify(brown), false);
        $scope.brown = caching.getCache('localStorage', 'brown');
        caching.setCache('localStorage', 'green', JSON.stringify(green), false);
        $scope.green = caching.getCache('localStorage', 'green');
        caching.setCache('localStorage', 'orange', JSON.stringify(orange), false);
        $scope.orange = caching.getCache('localStorage', 'orange');
        caching.setCache('localStorage', 'purple', JSON.stringify(purple), false);
        $scope.purple = caching.getCache('localStorage', 'purple');
        caching.setCache('localStorage', 'pink', JSON.stringify(pink), false);
        $scope.pink = caching.getCache('localStorage', 'pink');
        caching.setCache('localStorage', 'yellow', JSON.stringify(yellow), false);
        $scope.yellow = caching.getCache('localStorage', 'yellow');
        caching.setCache('localStorage', 'variables', JSON.stringify(variables), false);
        $scope.v = caching.getCache('localStorage', 'variables');
        $scope.w = words('English');
        var tD0 = {};
        var tD1 = {};
        var tD2 = {};
        tD0.data = [{[$scope.w.timeTable.header0]: 1,
     [$scope.w.timeTable.header1]: 'x',
     [$scope.w.timeTable.header2]: 'x',
      [$scope.w.timeTable.header3]: 1,
      [$scope.w.timeTable.header4]: 1}];
        tD0.columnDefs = [
  { name: $scope.w.timeTable.header0 },
   { name: $scope.w.timeTable.header1 },
   { name: $scope.w.timeTable.header2 },
   { name: $scope.w.timeTable.header3 },
   { name: $scope.w.timeTable.header4 }
        ];
        tD1.data = tD0.data;
        tD1.columnDefs = tD0.columnDefs1;
        tD2.data = tD0.data;
        tD2.columnDefs = tD0.columnDefs1;
        $scope.gridOpts0 = tD0;
        $scope.gridOpts1 = tD1;
        $scope.gridOpts2 = tD2;
        $scope.Table0Header = $scope.w.timeTable.info[0];
        $scope.Table1Header = $scope.w.timeTable.info[0];
        $scope.Table2Header = $scope.w.timeTable.info[0];
        $scope.effects = {};
        $scope.effects.t = $scope.w.typeEffect;
        $scope.effects.s = $scope.w.soundEffect;
        $scope.soundIcon = $scope.effects.s.gF;
        $scope.soundIconTF = $scope.effects.s.o;
        $scope.iconSoundChange = function () {
            $scope.soundIconTF = !$scope.soundIconTF;
            if ($scope.soundIconTF) {
                $scope.soundIcon = $scope.effects.s.gT;
            } else {
                $scope.soundIcon = $scope.effects.s.gF;
            };
        };
        $scope.text = message('messageStr', $scope.w.message, $scope.effects.t.s, $interval, $scope, ngAudio, $scope.effects.s.f, $scope.effects.s.s, $scope.soundIconTF, $scope.effects.s.v, $scope.text);
        $scope.startLine = 'None';
        $scope.startStop = 'None';
        $scope.endLine = 'None';
        $scope.endStop = 'None';
        $scope.lMB = [{ name: $scope.w.b.a, id: 1 }];
        $scope.lMBS = { value: $scope.lMB[0] };
        $scope.lME = $scope.v.All;
        $scope.v.All[0].name = $scope.w.e.a;
        $scope.lMES = { value: $scope.lME[0] };
        $scope.unclickedImageDim = variables.imgN;
        $scope.clickedImageDim = variables.imgB;
        $scope.updateTime = function () {
            $timeout(function () {
                $scope.theclock = (dateFilter(new Date(getTime(-(5 * 60)).t), 'hh:mm:ss'));
                $scope.updateTime();
            }, 1000);
        };
        $scope.updateDate = function () {
            var d = new Date();
            var yr = d.getFullYear();
            var m = ('00' + (d.getMonth() + 1).toString()).substring(('00' + (d.getMonth() + 1).toString()).length - 2);
            var dd = ('00' + d.getDate().toString()).substring(('00' + d.getDate().toString()).length - 2);
            var ddd = dd.toString() + '/' + m.toString() + '/' + yr.toString();
            return ddd;
        };
        $scope.theclock = $scope.updateTime();
        $scope.thedate = $scope.updateDate();
        $scope.endLanes = {};
        function localReturnLoadedVariables(v) {
            rlvep: {
                switch (v) {
                    case 'Red':
                        return $scope.red;
                        break rlvep;
                    case 'Blue':
                        return $scope.blue;
                        break rlvep;
                    case 'Brown':
                        return $scope.brown;
                        break rlvep;
                    case 'Green':
                        return $scope.green;
                        break rlvep;
                    case 'Orange':
                        return $scope.orange;
                        break rlvep;
                    case 'Purple':
                        return $scope.purple;
                        break rlvep;
                    case 'Pink':
                        return $scope.pink;
                        break rlvep;
                    case 'Yellow':
                        return $scope.yellow;
                        break rlvep;
                    default:
                        return $scope.red;
                        break rlvep;
                };
            };
        };
        function localUpdateTable(tempPath) {
            // Hide tables
            $scope.w.tt0 = true;
            $scope.w.tt1 = true;
            $scope.w.tt2 = true;
            $scope.Table0Header = $scope.w.timeTable.info[0];
            $scope.Table1Header = $scope.w.timeTable.info[0];
            $scope.Table2Header = $scope.w.timeTable.info[0];
            var counterObj = tempPath.obj.length;
            timeTable: {
                var ct = $scope.theclock;
                var rc = 5;
                var tt = 2;
                switch (counterObj) {
                    case 1:
                        if (tempPath['obj'] != 'undefined') {
                            var s0 = tempPath.obj[0].sp['STOP_NAME'];
                            var ww0 = Webworker.create(getTimeTable);
                            ww0.run(s0, ct, rc, localReturnLoadedVariables(tempPath.obj[0].sl)).then(function (r) {
                                //http://mattslocum.github.io/ng-webworker/demo/
                                var timeArray = [];
                                for (var i = 0; i < r.t.length; i++) {
                                    var timeObject = {};
                                    timeObject[$scope.w.timeTable.header0] = i + 1;
                                    timeObject[$scope.w.timeTable.header1] = r.t[i];
                                    timeObject[$scope.w.timeTable.header2] = addTime(r.t[i], Math.round(tempPath.obj[0].ts));
                                    timeObject[$scope.w.timeTable.header3] = tempPath.obj[0].sn;
                                    timeObject[$scope.w.timeTable.header4] = Math.round(tempPath.obj[0].ts);
                                    timeArray.push(timeObject);
                                };
                                $scope.gridOpts0.data = timeArray;
                                $scope.w.tt0 = false;
                            });
                            break timeTable;
                        };
                    case 2:
                        $scope.Table0Header = $scope.w.timeTable.info[1];
                        $scope.Table1Header = $scope.w.timeTable.info[2];
                        var s0 = tempPath.obj[0].sp['STOP_NAME'];
                        var ww0 = Webworker.create(getTimeTable);
                        ww0.run(s0, ct, rc, localReturnLoadedVariables(tempPath.obj[0].sl)).then(function (r) {
                            //http://mattslocum.github.io/ng-webworker/demo/
                            var timeArray = [];
                            for (var i = 0; i < r.t.length; i++) {
                                var timeObject = {};
                                timeObject[$scope.w.timeTable.header0] = i + 1;
                                timeObject[$scope.w.timeTable.header1] = r.t[i];
                                timeObject[$scope.w.timeTable.header2] = addTime(r.t[i], Math.round(tempPath.obj[0].ts));
                                timeObject[$scope.w.timeTable.header3] = tempPath.obj[0].sn;
                                timeObject[$scope.w.timeTable.header4] = Math.round(tempPath.obj[0].ts);
                                timeArray.push(timeObject);
                            };
                            $scope.gridOpts0.data = timeArray;
                            $scope.w.tt0 = false;
                            // Second table
                            var tempArrST1 = [];
                            for (var x = 0; x < $scope.gridOpts0.data.length; x++) {
                                tempArrST1.push(addTime($scope.gridOpts0.data[x]['Arrival'], tt));
                            };
                            // Second table initializing
                            var s1 = tempPath.obj[1].sp['STOP_NAME'];
                            var ww1 = Webworker.create(getMultipleTimeTable);
                            //console.log((new Date).toISOString().replace(/z|t/gi,' ').trim());
                            ww1.run(s1, rc, localReturnLoadedVariables(tempPath.obj[1].sl), tempArrST1).then(function (r) {
                                var timeArray = [];
                                for (var i = 0; i < r.t.length; i++) {
                                    var timeObject = {};
                                    timeObject[$scope.w.timeTable.header0] = i + 1;
                                    timeObject[$scope.w.timeTable.header1] = r.t[i];
                                    timeObject[$scope.w.timeTable.header2] = addTime(r.t[i], Math.round(tempPath.obj[1].ts));
                                    timeObject[$scope.w.timeTable.header3] = tempPath.obj[1].sn;
                                    timeObject[$scope.w.timeTable.header4] = Math.round(tempPath.obj[1].ts);
                                    timeArray.push(timeObject);
                                };
                                $scope.gridOpts1.data = timeArray;
                                $scope.w.tt1 = false;
                            });
                        });
                        break timeTable;
                    case 3:
                        $scope.Table0Header = $scope.w.timeTable.info[1];
                        $scope.Table1Header = $scope.w.timeTable.info[3];
                        $scope.Table2Header = $scope.w.timeTable.info[4];
                        var s0 = tempPath.obj[0].sp['STOP_NAME'];
                        var ww0 = Webworker.create(getTimeTable);
                        ww0.run(s0, ct, rc, localReturnLoadedVariables(tempPath.obj[0].sl)).then(function (r) {
                            var timeArray = [];
                            for (var i = 0; i < r.t.length; i++) {
                                var timeObject = {};
                                timeObject[$scope.w.timeTable.header0] = i + 1;
                                timeObject[$scope.w.timeTable.header1] = r.t[i];
                                timeObject[$scope.w.timeTable.header2] = addTime(r.t[i], Math.round(tempPath.obj[0].ts));
                                timeObject[$scope.w.timeTable.header3] = tempPath.obj[0].sn;
                                timeObject[$scope.w.timeTable.header4] = Math.round(tempPath.obj[0].ts);
                                timeArray.push(timeObject);
                            };
                            $scope.gridOpts0.data = timeArray;
                            $scope.w.tt0 = false;
                            // Second table
                            var tempArrST1 = [];
                            for (var x = 0; x < $scope.gridOpts0.data.length; x++) {
                                tempArrST1.push(addTime($scope.gridOpts0.data[x]['Arrival'], tt));
                            };
                            // Second table initializing
                            var s1 = tempPath.obj[1].sp['STOP_NAME'];
                            var ww1 = Webworker.create(getMultipleTimeTable);
                            //console.log((new Date).toISOString().replace(/z|t/gi,' ').trim());
                            ww1.run(s1, rc, localReturnLoadedVariables(tempPath.obj[1].sl), tempArrST1).then(function (r) {
                                var timeArray = [];
                                for (var i = 0; i < r.t.length; i++) {
                                    var timeObject = {};
                                    timeObject[$scope.w.timeTable.header0] = i + 1;
                                    timeObject[$scope.w.timeTable.header1] = r.t[i];
                                    timeObject[$scope.w.timeTable.header2] = addTime(r.t[i], Math.round(tempPath.obj[1].ts));
                                    timeObject[$scope.w.timeTable.header3] = tempPath.obj[1].sn;
                                    timeObject[$scope.w.timeTable.header4] = Math.round(tempPath.obj[1].ts);
                                    timeArray.push(timeObject);
                                };
                                $scope.gridOpts1.data = timeArray;
                                $scope.w.tt1 = false;
                                // Third table
                                var tempArrST2 = [];
                                for (var x = 0; x < $scope.gridOpts1.data.length; x++) {
                                    tempArrST2.push(addTime($scope.gridOpts1.data[x]['Arrival'], tt));
                                };
                                // Third table initializing
                                var s2 = tempPath.obj[2].sp['STOP_NAME'];
                                var ww2 = Webworker.create(getMultipleTimeTable);
                                ww2.run(s2, rc, localReturnLoadedVariables(tempPath.obj[2].sl), tempArrST2).then(function (r) {
                                    var timeArray = [];
                                    for (var i = 0; i < r.t.length; i++) {
                                        var timeObject = {};
                                        timeObject[$scope.w.timeTable.header0] = i + 1;
                                        timeObject[$scope.w.timeTable.header1] = r.t[i];
                                        timeObject[$scope.w.timeTable.header2] = addTime(r.t[i], Math.round(tempPath.obj[1].ts));
                                        timeObject[$scope.w.timeTable.header3] = tempPath.obj[1].sn;
                                        timeObject[$scope.w.timeTable.header4] = Math.round(tempPath.obj[1].ts);
                                        timeArray.push(timeObject);
                                    };
                                    $scope.gridOpts2.data = timeArray;
                                    $scope.w.tt2 = false;
                                });
                            });
                        });
                        break timeTable;
                    default:
                        break timeTable;
                };
            };
            // console.log(tempPath.obj);
        };
        function localUpdateFrontEnd() {
            if (Object.keys($scope.endLanes).length == 0) {
                var dialog = ngDialog.open({
                    template: '<h3 style="color:red;text-align:center"><b>' + $scope.w.mCES + '</b></h3>',
                    plain: true,
                    showClose: false,
                    overlay: true,
                    closeByDocument: true,
                    closeByEscape: true,
                    cache: false,
                    trapFocus: false,
                    preserveFocus: false,
                    resolve: {
                        cl: function cl() {
                            setTimeout(function () {
                                ngDialog.close(ngDialog.getOpenDialogs()[0]);
                            }, $scope.w.WTC);
                        }
                    }
                });
            }
            else {
                if ($scope.startStop != 'None') {
                    if ($scope.endLanes.lanes[0] != 'None') {
                        $scope.endStop = $scope.endLanes.name;
                        $scope.endLine = $scope.endLanes.lanes;
                        var obj = {};
                        obj.sl = $scope.startLine;
                        obj.el = $scope.endLine;
                        obj.ss = $scope.startStop;
                        obj.es = $scope.endStop;
                        var path = getPath(obj, variables, $scope.w);
                        $scope.text = message('messageStr', path.sentence, $scope.effects.t.s, $interval, $scope, ngAudio, $scope.effects.s.f, $scope.effects.s.s, $scope.soundIconTF, $scope.effects.s.v, $scope.text);
                        localUpdateTable(path);
                    };
                } else {
                    if (Object.keys($scope.endLanes).length > 0) {
                        var dialog = ngDialog.open({
                            template: '<h3 style="color:red;text-align:center"><b>' + $scope.w.mCSS + '</b></h3>',
                            plain: true,
                            showClose: false,
                            overlay: true,
                            closeByDocument: true,
                            closeByEscape: true,
                            cache: false,
                            trapFocus: false,
                            preserveFocus: false,
                            resolve: {
                                cl: function cl() {
                                    setTimeout(function () {
                                        ngDialog.close(ngDialog.getOpenDialogs()[0]);
                                    }, $scope.w.WTC);
                                }
                            }
                        });
                    };
                };
            };
        }
        $scope.selectStart = function (i) {
            $scope.startStop = i.name;
            if (i.name != $scope.w.b.a && $scope.endLanes != $scope.w.e.a) {
                localUpdateFrontEnd();
            };
        };
        $scope.selectEnd = function (i) {
            $scope.endLanes = i;
            localUpdateFrontEnd();
        };
        $scope.clickImage = function (e) {
            var lineID = (e.currentTarget.id.toString()).replace('Line', '');
            for (var x = 0; x < variables.Transfers.All.length; x++) {
                if (lineID == variables.Transfers.All[x]) {
                    $('#' + variables.Transfers.All[x] + 'Txt').css('font-size', '20px');
                    $('#' + variables.Transfers.All[x] + 'Txt').css('text-decoration', 'underline');
                }
                else {
                    $('#' + variables.Transfers.All[x] + 'Txt').css('font-size', '18px');
                    $('#' + variables.Transfers.All[x] + 'Txt').css('text-decoration', '');
                };
            };
            $scope.startLine = lineID;
            var lineObj = variables[lineID];
            $scope.startStop = variables[lineID][0]['STATION_NAME'];
            $scope.lMB = getLineID(getLine(lineObj, 'STATION_NAME'), 1);
            $scope.lMBS = { value: $scope.lMB[0] };
        };
        $scope.$watch('online', function (newStatus) {
        });
    };
}]);