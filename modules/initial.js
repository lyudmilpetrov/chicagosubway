angular.module('appChicago.service', [])
.factory('message', function () {
        return function (elem, sent, sec, $interval, $scope, ngAudio, audioPath, soundSpeed, playSound, soundVolume, ssProcess, t) {
            var ee = $('#' + elem);
            var tempSent = ' ';
            ee.html(tempSent);
            var counter = sent.length;
            var i = 0;
            var c = 0;
            //var t;
            if (t) {
                $interval.cancel(t);
            };
                t = $interval(
                    function () {
                        tempSent = tempSent + sent.charAt(i);
                        if (playSound) {
                            if (c == soundSpeed || c == 0) {
                                $scope.sound = ngAudio.load(audioPath);
                                $scope.sound.volume = soundVolume;
                                $scope.sound.play();
                                c = 1;
                            };
                            c++;
                        };
                        i++;
                        ee.html(tempSent);
                    }, sec, counter, false);
        };
})
.factory('dataSource', ['$http', function ($http) {
        return {
            get: function (file, callback, transform) {
                $http.get(
                    file,
                    { transformResponse: transform }
                ).
                success(function (data, status) {
                    console.log("Request succeeded");
                    callback(data);
                    //console.log(data);
                }).
                error(function (data, status) {
                    console.log("Request failed " + status);
                });
            }
        };
    }])
.directive("slidingshow", function () {
     function link($scope, element, attributes) {
         var expression = attributes.slidingshow;
         var duration = (attributes.slideShowDuration || "fast");
         if (!$scope.$eval(expression)) { element.hide(); }
         $scope.$watch(expression, function (newValue, oldValue) {
             if (newValue === oldValue) { return; }
             if (newValue) {
                 element.stop(true, true).slideDown(duration);
             } else { element.stop(true, true).slideUp(duration); }
         });
     };
     return ({ link: link, restrict: "A" });
})
.factory('words', [function () {
    var bg = {
        title: 'Чикаго',
        message: 'Следва твойта информация',
        b: { id: 'bSelect', w: 'Начална спирка', s: 'Натисни икона за спирка', a: 'Ативирай начална спирка' },
        e: { id: 'eSelect', w: 'Крайна спирка', s: 'Натисни икона за спирка', a: 'Ативирай крайна спирка' },
        mCSS: 'Избери начална спирка',
        mCES: 'Избери крайна спирка',
        timeTable: {
            info: ['Разписание по-долу', 'Разписание по-долу до първия трансфер', 'Разписание по-долу от трансфер до крайна спирка', 'Разписание по-долу от първи трансфер до втори', 'Разписание по-долу до крайна спирка'],
            header0: '#',
            header1: 'Departure',
            header2: 'Arrival',
            header3: 'Stops',
            header4: 'Minutes',
        },
        l: [
            { w: 'Червена линия', i: 'Red' },
            { w: 'Синя линия', i: 'Blue' },
            { w: 'Кафява линия', i: 'Brown' },
            { w: 'Зелена линия', i: 'Green' },
            { w: 'Оранжева линия', i: 'Orange' },
            { w: 'Лилява линия', i: 'Purple' },
            { w: 'Розова линия', i: 'Pink' },
            { w: 'Жълта линия', i: 'Yellow' }
        ]
    };
    var engUSA = {
        title: 'Chicago',
        message: 'Your information follows',
        b: { id: 'bSelect', w: 'Begining stop', s: 'Click line for stops', a: 'Choose beginning station, by clicking one of the lines' },
        e: { id: 'eSelect', w: 'End stop', s: 'Click line for stops', a: 'Choose end stations' },
        mCSS: 'Choose your starting stop',
        mCES: 'Choose your ending stop',
        timeTable: {
            info: ['Time schedule below', 'Time schedule below up to first transfer', 'Time schedule below from transfer to final destination', 'Time schedule below from first to second transfer', 'Time schedule below to final destination'],
            header0: '#',
            header1: 'Departure',
            header2: 'Arrival',
            header3: 'Stops',
            header4: 'Minutes',
        },
        l: [
            { w: 'Red line', i: 'Red' },
            { w: 'Blue line', i: 'Blue' },
            { w: 'Brown line', i: 'Brown' },
            { w: 'Green line', i: 'Green' },
            { w: 'Orange line', i: 'Orange' },
            { w: 'Purple line', i: 'Purple' },
            { w: 'Pink line', i: 'Pink' },
            { w: 'Yellow line', i: 'Yellow'}
            ]
        };
    var spanish = {
        title: 'Chicago',
        message: 'Su información siga',
        b: { id: 'bSelect', w: 'Parada de comienzo', s: 'Haga clic en la línea para las paradas', a: 'Activar parada que comienza' },
        e: { id: 'eSelect', w: 'Parada final', s: 'Haga clic en la línea para las paradas', a: 'Activar tope final' },
        mCSS: 'Elija su parada inicial',
        mCES: 'Elija su parada final',
        timeTable: {
            info: ['Calendario abajo', 'Horario por debajo hasta la primera transferencia', 'Horario debajo de traslado a destino final', 'Horario por debajo de la primera a segunda transferencia', 'Horario a continuación a destino final'],
            header0: '#',
            header1: 'Salida',
            header2: 'Llegada',
            header3: 'Paradas',
            header4: 'Minutos',
        },
        l: [
            { w: 'línea Roja', i: 'Red' },
            { w: 'línea Azul', i: 'Blue' },
            { w: 'línea Marrón', i: 'Brown' },
            { w: 'línea Verde', i: 'Green' },
            { w: 'línea Naranja', i: 'Orange' },
            { w: 'línea Púrpura', i: 'Purple' },
            { w: 'línea Rosado', i: 'Pink' },
            { w: 'línea Amarillo', i: 'Yellow' }
        ]
    };
    var soundEffect = { f: '../audio/b5.wav', s: 5, o: false, v: 1, gF: ' glyphicon-volume-off', gT: ' glyphicon-volume-down' };
    var typeEffect = { s: 35 };
    var modalWTC = 1500;
    var tTbl0 = true;
    var tTbl1 = true;
    var tTbl2 = true;
    return function (lang) {
        switch (lang) {
            case 'English':
                engUSA.soundEffect = soundEffect;
                engUSA.typeEffect = typeEffect;
                engUSA.WTC = modalWTC;
                engUSA.tt0 = tTbl0;
                engUSA.tt1 = tTbl1;
                engUSA.tt2 = tTbl2;
                return engUSA;
                break;
            case 'Български':
                bg.soundEffect = soundEffect;
                bg.typeEffect = typeEffect;
                bg.WTC = modalWTC;
                bg.tt0 = tTbl0;
                bg.tt1 = tTbl1;
                bg.tt2 = tTbl2;
                return bg;
                break;
            case 'Español':
                spanish.soundEffect = soundEffect;
                spanish.typeEffect = typeEffect;
                spanish.WTC = modalWTC;
                spanish.tt0 = tTbl0;
                spanish.tt1 = tTbl1;
                spanish.tt2 = tTbl2;
                return spanish;
                break;
            default:
                return engUSA;
        };
    };
}])
.factory('getTime', [function () {
    return function (offsetInMinutes) {
        var d = new Date();
        var localTime = d.getTime();
        var localOffset = d.getTimezoneOffset() * 60000;
        var utc = localTime + localOffset;
        var nd = new Date(utc + (offsetInMinutes * 60000));
        var endDate = nd.toLocaleString();
        var timeObject = {
            t: nd,
            lst: endDate
        };
        return timeObject;
    };
}])
.factory('addTime', function () {
    return function (timeString, minutesToAdd) {
        var millisecondsToAdd = minutesToAdd * 60 * 1000;
        var d = new Date();
        var tObj = timeString.split(':');
        d.setSeconds(tObj[2]);
        d.setMinutes(tObj[1]);
        d.setHours(tObj[0]);
        var dd = Date.parse(d);
        var nd = new Date(dd + millisecondsToAdd);
        var hour = '' + nd.getHours(); if (hour.length == 1) { hour = '0' + hour; }
        var minute = '' + nd.getMinutes(); if (minute.length == 1) { minute = '0' + minute; }
        second = '' + nd.getSeconds(); if (second.length == 1) { second = '0' + second; }
        return hour + ':' + minute + ':' + second;
        };
    })
.factory('getLine', [function () {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    };
    return function (a, f) {
        var tempArr = [];
        var tempUniqueArr = [];
        for (v in a) {
            tempArr.push(a[v][f]);
        };
        tempUniqueArr = tempArr.filter(onlyUnique);
        return tempUniqueArr;
    };
}])
.factory('getLineID', [function () {
    return function (a,s) {
        var tempArr = [];
        var i = s;
        for (var x = 0; x < a.length; x++) {
            var obj = {};
            obj.id = i;
            obj.name = a[x];
            tempArr.push(obj);
            i += 1;
        };
        return tempArr;
    };
}])
.factory('getPath', [function () {
    function oneWordSignalPlural(c, s, p) {
        if (c >= 1) {
            return p;
        } else {
            return s;
        };
    };
    function directionWorld(d) {
        switch (d) {
            case 'S':
                return 'South';
                break;
            case 'E':
                return 'East';
                break;
            case 'W':
                return 'West';
                break;
            case 'N':
                return 'North';
                break;
            default:
                return 'None';
        };
    };
    function singlePluralStr(c,f,l) {
        switch (c) {
            case 0:
                return f + ' are zero ' + l + 's';
                break;
            case 1:
                return f + ' is only one ' + l + '';
                break;
            case 2:
                return f + ' are two ' + l + 's';
                break;
            case 3:
                return f + ' are three ' + l + 's';
                break;
            case 4:
                return f + ' are four ' + l + 's';
                break;
            case 5:
                return f + ' are five ' + l + 's';
                break;
            case 6:
                return f + ' are six ' + l + 's';
                break;
            case 7:
                return f + ' are seven ' + l + 's';
                break;
            default:
                return f + ' are ' + c + l + 's';
                break;
        };
    };
    return function (i, v, lang) {
        var path = {};
        path.sentence = '';
        path.obj = [];
        // Selfcontained function unlinked
        function localFunctionReassignLine(startLine, endLines, startStop, endStop) {
            var r = {};
            r.transferCount = 2;
            r.rel = endLines[0];
            r.walk = 'None';
            breakpoint: {
                // Fisrt check if these are the same stops, if success exit if not enter in second
                for (var i = 0; i < endLines.length; i++) {
                    for (var x = 0; x < v.Mapping[startLine][endLines[i]].length; x++) {
                        if (v.Mapping[startLine][endLines[i]][x].split(':')[0] == startStop) {
                            if (v.Mapping[startLine][endLines[i]][x].split(':')[1] == endStop) {
                                r.transferCount = 0;
                                r.rel = endLines[i];
                                r.walk = 'Yes';
                                break breakpoint;
                            }
                        };
                    };
                };
                // Second check if the stops are on the same line, if not enter third loop
                for (var i = 0; i < endLines.length; i++) {
                    if (endLines[i] == startLine) {
                        r.transferCount = 0;
                        r.rel = endLines[i];
                        r.walk = 'None';
                        break breakpoint;
                    };
                };
                // Third check if the transfers is one else is two
                for (var i = 0; i < endLines.length; i++) {
                    for (var x = 0; x < v.Transfers[startLine].t.length; x++) {
                        if (endLines[i] == v.Transfers[startLine].t[x]) {
                            r.transferCount = 1;
                            r.rel = endLines[i];
                            r.walk = 'None';
                            break breakpoint;
                        };
                    };
                };
            };
            return r;
        };
        // Selfcontained function unlinked
        function localFunctionGetEnterStop(exitLine, exitStop, enterLine) {
            // Return enterStop
            var enterStop = [];
            for (var x = 0; x < v.Mapping[exitLine][enterLine].length; x++) {
                var r = (v.Mapping[exitLine][enterLine][x]).split(':');
                if (exitStop == r[0]) {
                    for (var y = 0; y < v[enterLine].length; y++) {
                        if (v[enterLine][y]['STATION_NAME'] == r[1]) {
                            enterStop.push(v[enterLine][y]);
                        };
                    };
                };
            };
            return enterStop;
        };
        // Selfcontained function unlinked
        function localFunctionGetTranferPoint(startLine, startStop, endLine) {
            var objLocalLocal = {};
            if ((startStop).length == 2) {
                var objLocalLocal0 = {};
                var stopsCounterLocal0 = 0;
                var timeCounterLocal0 = 0;
                var directionsLocal0 = [];
                var objLocalLocal1 = {};
                var stopsCounterLocal1 = 0;
                var timeCounterLocal1 = 0;
                var directionsLocal1 = [];
                var counterStart0 = startStop[0]['ORDER'];
                var counterStart1 = startStop[1]['ORDER'];
                // Double line go in bought directions
                // Going forward
                path0: {
                    for (var x = counterStart0; x < v[startLine].length; x++) {
                        stopsCounterLocal0 += 1;
                        timeCounterLocal0 += v[startLine][x]['DISTANCE'];
                        var direction = {};
                        direction = { id: stopsCounterLocal0 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                        directionsLocal0.push(direction);
                        for (var z = 0; z < v[startLine][x]['TRANSFER'].length; z++) {
                            if (endLine == v[startLine][x]['TRANSFER'][z]) {
                                objLocalLocal0 = { sl: startLine, el: endLine, ss: startStop[0]['STATION_NAME'], es: i.es, sp: startStop[0], tr: 1, tp: v[startLine][x], sn: stopsCounterLocal0, ts: timeCounterLocal0, dp: directionsLocal0 };
                                break path0;
                            };
                        };
                    };
                };
                path1: {
                    for (var x = counterStart1; x < v[startLine].length; x++) {
                        stopsCounterLocal1 += 1;
                        timeCounterLocal1 += v[startLine][x]['DISTANCE'];
                        var direction = {};
                        direction = { id: stopsCounterLocal1 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                        directionsLocal1.push(direction);
                        for (var z = 0; z < v[startLine][x]['TRANSFER'].length; z++) {
                            if (endLine == v[startLine][x]['TRANSFER'][z]) {
                                objLocalLocal1 = { sl: startLine, el: endLine, ss: startStop[1]['STATION_NAME'], es: i.es, sp: startStop[1], tr: 1, tp: v[startLine][x], sn: stopsCounterLocal1, ts: timeCounterLocal1, dp: directionsLocal1 };
                                break path1;
                            };
                        };
                    };
                };
                if (typeof objLocalLocal0.sl == 'undefined') {
                    // on path0 transfer was not reached
                    objLocalLocal = objLocalLocal1;
                } else {
                    if (typeof objLocalLocal1.sl == 'undefined') {
                        // on path1 transfer was not reached
                        objLocalLocal = objLocalLocal0;
                    } else {
                        // Both have transfers, then compare by time traveled 
                        if (objLocalLocal0.ts <= objLocalLocal1.ts) {
                            objLocalLocal = objLocalLocal0;
                        } else {
                            objLocalLocal = objLocalLocal1;
                        };
                    };
                };
            }
            else {
                // One line go forward till DOUBLE is reached and split
                var objLocalLocal0 = {};
                var stopsCounterLocal0 = 0;
                var timeCounterLocal0 = 0;
                var directionsLocal0 = [];
                var objLocalLocal1 = {};
                var stopsCounterLocal1 = 0;
                var timeCounterLocal1 = 0;
                var directionsLocal1 = [];
                var switchingPointLoop = [];
                var counterStart0 = startStop[0]['ORDER'];
                //The process gets you to the first double, but meanwhile check if tansfer is reached
                path1: {
                        path2: {
                            for (var x = counterStart0; x < v[startLine].length; x++) {
                                if (v[startLine][x]['DOUBLE'] == 'N') {
                                    // Adding to 0
                                    stopsCounterLocal0 += 1;
                                    timeCounterLocal0 += v[startLine][x]['DISTANCE'];
                                    var direction0 = {};
                                    direction0 = { id: stopsCounterLocal0 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                    directionsLocal0.push(direction0);
                                    // Adding to 1
                                    stopsCounterLocal1 += 1;
                                    timeCounterLocal1 += v[startLine][x]['DISTANCE'];
                                    var direction1 = {};
                                    direction1 = { id: stopsCounterLocal1 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                    directionsLocal1.push(direction1);
                                    // Checking if the transfer is reached
                                    for (var z = 0; z < v[startLine][x]['TRANSFER'].length; z++) {
                                        if (endLine == v[startLine][x]['TRANSFER'][z]) {
                                            objLocalLocal0 = { sl: startLine, el: endLine, ss: startStop[0]['STATION_NAME'], es: i.es, sp: startStop[0], tr: 1, tp: v[startLine][x], sn: stopsCounterLocal0, ts: timeCounterLocal0, dp: directionsLocal0 };
                                            // It will default to objLocalLocal0
                                            break path1;
                                        };
                                    };
                                } else {
                                    // Double is reached get first double and exit 
                                    // Selfcontained process to get the first double
                                    for (var z = 0; z < v[startLine].length; z++) {
                                        if (v[startLine][x]['STATION_NAME'] == v[startLine][z]['STATION_NAME']) {
                                            switchingPointLoop.push(v[i.sl][z]);
                                        };
                                    };
                                    // Adding to 0
                                    stopsCounterLocal0 += 1;
                                    timeCounterLocal0 += v[startLine][x]['DISTANCE'];
                                    var direction0 = {};
                                    direction0 = { id: stopsCounterLocal0 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                    directionsLocal0.push(direction0);
                                    // Adding to 1
                                    stopsCounterLocal1 += 1;
                                    timeCounterLocal1 += v[startLine][x]['DISTANCE'];
                                    var direction1 = {};
                                    direction1 = { id: stopsCounterLocal1 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                    directionsLocal1.push(direction1);
                                    break path2;
                                };
                            };
                        };

                    //Now you need to split the road by going forward from first double [1] to end and from first double [0] into the loop
                        path21: {
                            for (var x = switchingPointLoop[1]['ORDER'] - 1; x < v[startLine].length; x++) {
                                for (var z = 0; z < v[startLine][x]['TRANSFER'].length; z++) {
                                    if (endLine == v[startLine][x]['TRANSFER'][z]) {
                                        objLocalLocal0 = { sl: startLine, el: endLine, ss: startStop[0]['STATION_NAME'], es: i.es, sp: startStop[0], tr: 1, tp: v[startLine][x], sn: stopsCounterLocal0, ts: timeCounterLocal0, dp: directionsLocal0 };
                                        break path21;
                                    };
                                };
                                stopsCounterLocal0 += 1;
                                timeCounterLocal0 += v[startLine][x]['DISTANCE'];
                                var direction0 = {};
                                direction0 = { id: stopsCounterLocal0 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                directionsLocal0.push(direction0);
                            };
                        };
                        path22: {
                            for (var x = switchingPointLoop[0]['ORDER'] - 1; x < v[startLine].length; x++) {
                                for (var z = 0; z < v[startLine][x]['TRANSFER'].length; z++) {
                                    if (endLine == v[startLine][x]['TRANSFER'][z]) {
                                        objLocalLocal1 = { sl: startLine, el: endLine, ss: startStop[0]['STATION_NAME'], es: i.es, sp: startStop[0], tr: 1, tp: v[startLine][x], sn: stopsCounterLocal1, ts: timeCounterLocal1, dp: directionsLocal1, re: switchingPointLoop[0] };
                                        break path22;
                                    };
                                };
                                stopsCounterLocal1 += 1;
                                timeCounterLocal1 += v[startLine][x]['DISTANCE'];
                                var direction1 = {};
                                direction1 = { id: stopsCounterLocal1 - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                directionsLocal1.push(direction1);
                            };
                        };
                };
                if (typeof objLocalLocal0.sl == 'undefined') {
                    // Going forward did not reach the tranfer from [1] to end
                    // Defaulting to to path 22 or objLocalLocal1
                    objLocalLocal = objLocalLocal1;
                } else {
                    if (typeof objLocalLocal1.sl == 'undefined') {
                        // Going into loop did not reach the transferfrom [0]
                        // Defaulting to path 21 or objLocalLocal0
                        objLocalLocal = objLocalLocal0;
                    } else {
                        // Both have transfers, then compare by time traveled 
                        if (objLocalLocal0.ts <= objLocalLocal1.ts) {
                            objLocalLocal = objLocalLocal0;
                        } else {
                            objLocalLocal = objLocalLocal1;
                        };
                    };
                };
            };
            return objLocalLocal;
        };
        // Selfcontained function unlinked
        function localFunctionGetOneLinePath(startLine, startStop, endLine, endStop) {
            var stopsCounter = 0;
            var timeCounter = 0;
            var directions = [];
            var markerStart = localFunctionLoadMarker(startLine, startStop);
            var markerEnd = localFunctionLoadMarker(endLine, endStop);
            var r = {};
            // Entering zero transfer it is on the same line
            if ((markerStart).length == 2 && (markerEnd).length == 2) {
                // It means it is on one straight line | 2[0]-2[0] or 2[1]-2[1] it depends on direction forward or backward 
                // Declaring local variables for loopinG
                var counterOrderStart0 = markerStart[0]['ORDER'];
                var counterOrderStart1 = markerStart[1]['ORDER'];
                var counterOrderEnd0 = markerEnd[0]['ORDER'];
                var counterOrderEnd1 = markerEnd[1]['ORDER'];
                // Check if go forward or backward
                if (counterOrderStart0 < counterOrderEnd0) {
                    // Going forward
                    for (var x = counterOrderStart0; x < counterOrderEnd0; x++) {
                        stopsCounter += 1;
                        timeCounter += v[startLine][x]['DISTANCE'];
                        var direction = {};
                        direction = { id: stopsCounter - 1, d: v[startLine][x]['DIRECTION_ID'] };
                        directions.push(direction);
                    };
                    // Sentence here
                    r = { sl: startLine, el: endLine, ss: startStop, es: endStop, sp: markerStart[0], tr: 0, sn: stopsCounter, ts: timeCounter, dp: directions };
                }
                else {
                    // Going backward
                    for (var x = counterOrderStart1; x < counterOrderEnd1; x++) {
                        stopsCounter += 1;
                        timeCounter += v[startLine][x]['DISTANCE'];
                        var direction = {};
                        direction = { id: stopsCounter - 1, d: v[startLine][x]['DIRECTION_ID'] };
                        directions.push(direction);
                    };
                    r = { sl: startLine, el: endLine, ss: startStop, es: endStop, sp: markerStart[1], tr: 0, sn: stopsCounter, ts: timeCounter, dp: directions };
                };
            }
            else {
                if ((markerStart).length == 2) {
                    // It means it is from double to single stop, which is on the loop, so solution is only going forward, so using only [0]
                    // 2[0]-1[0]
                    // Declaring local variables for loopinG
                    var counterOrderStart0 = markerStart[0]['ORDER'];
                    var counterOrderEnd0 = markerEnd[0]['ORDER'];
                    // Going forward
                    for (var x = counterOrderStart0; x < counterOrderEnd0; x++) {
                        stopsCounter += 1;
                        timeCounter += v[startLine][x]['DISTANCE'];
                        var direction = {};
                        direction = { id: stopsCounter - 1, d: v[startLine][x]['DIRECTION_ID'] };
                        directions.push(direction);
                    };
                    r = { sl: startLine, el: endLine, ss: startStop, es: endStop, sp: markerStart[0], tr: 0, sn: stopsCounter, ts: timeCounter, dp: directions };
                } else {
                    if ((markerEnd).length == 2) {
                        // It means it is from loop to double, so the only way is to go forward from [0] to [1]
                        // 1[0]-2[1]
                        // Declaring local variables for loopinG
                        var counterOrderStart0 = markerStart[0]['ORDER'];
                        var counterOrderEnd1 = markerEnd[1]['ORDER'];
                        // Going forward
                        for (var x = counterOrderStart0; x < counterOrderEnd1; x++) {
                            stopsCounter += 1;
                            timeCounter += v[startLine][x]['DISTANCE'];
                            var direction = {};
                            direction = { id: stopsCounter - 1, d: v[startLine][x]['DIRECTION_ID'] };
                            directions.push(direction);
                        };
                        r = { sl: startLine, el: endLine, ss: startStop, es: endStop, sp: markerStart[0], tr: 0, sn: stopsCounter, ts: timeCounter, dp: directions };
                    } else {
                        // It means you are on the loop and have to go to the loop 1-1. The only way is to go around the full loop till DOUBLE is reached and from there travel forward
                        // 1[0]-DOUBLE[0]-1[0]
                        // Declaring local variables for looping
                        var counterOrderStart0 = markerStart[0]['ORDER'];
                        var counterOrderEnd0 = markerEnd[0]['ORDER'];
                        var switchingPointLoop = [];
                        for (var x = counterOrderStart0; x < v[startLine].length; x++) {
                            if (v[startLine][x]['DOUBLE'] == 'N') {
                                stopsCounter += 1;
                                timeCounter += v[startLine][x]['DISTANCE'];
                                var direction = {};
                                direction = { id: stopsCounter - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                directions.push(direction);
                            } else {
                                // Exit loop register it, essential to grab the first from the double
                                // Selfcontained process
                                for (var z = 0; z < v[startLine].length; z++) {
                                    if (v[startLine][x]['STATION_NAME'] == v[startLine][z]['STATION_NAME']) {
                                        switchingPointLoop.push(v[startLine][z]);
                                    };
                                };
                                stopsCounter += 1;
                                timeCounter += v[startLine][x]['DISTANCE'];
                                var direction = {};
                                direction = { id: stopsCounter - 1, d: v[startLine][x]['DIRECTION_ID'] };
                                directions.push(direction);
                                // Need to loop from first double to the loop
                                // Declaring local variables for loopinG
                                var counterOrderStart01 = switchingPointLoop[0]['ORDER'];
                                // Going forward
                                for (var y = counterOrderStart01; y < counterOrderEnd0; y++) {
                                    stopsCounter += 1;
                                    timeCounter += v[startLine][y]['DISTANCE'];
                                    var direction = {};
                                    direction = { id: stopsCounter - 1, d: v[startLine][y]['DIRECTION_ID'] };
                                    directions.push(direction);
                                };
                                r = { sl: startLine, el: endLine, ss: startStop, es: endStop, sp: markerStart[0], tr: 0, sn: stopsCounter, ts: timeCounter, dp: directions, re: switchingPointLoop };
                                break;
                            };
                        };
                    };
                };
            };
            return r;
        };
        // Selfcontained function unlinked
        function localFunctionLoadMarker(lineStr, stopStr) {
            var r = [];
            for (var x = 0; x < v[lineStr].length; x++) {
                if (v[lineStr][x]['STATION_NAME'] == stopStr) {
                    r.push(v[lineStr][x]);
                };
            };
            return r;
        };
        // First step reassign and get transfer counts
        var startingPoint = localFunctionReassignLine(i.sl, i.el, i.ss, i.es);
        var br = '<br />';
        var sentence = '';
        exitPoint: {
            var transferCount = startingPoint.transferCount;
            var endLine = startingPoint.rel;
            if (transferCount == 0) {
                // It is on the same line so get data
                if (startingPoint.walk == 'None') {
                    var r0 = localFunctionGetOneLinePath(i.sl, i.ss, endLine, i.es);
                    sentence = 'Well, you are lucky, stay on the ' + r0.sl.toLowerCase() + ' line.';
                    sentence += br;
                    sentence += 'So you will need to start from stop ' + r0.sp['STOP_NAME'] + ', travelling ' + directionWorld(r0.dp[0].d) + '.';
                    sentence += br;
                    sentence += singlePluralStr(r0.sn, 'There', ' stop') + ' ahead.';
                    sentence += br;
                    sentence += 'Average traveling time is around ' + Math.round(r0.ts) + ' minutes for ' + r0.sn + oneWordSignalPlural(r0.sn, ' stop', ' stops') + '.';
                    path.sentence = sentence;
                    path.obj.push(r0);
                } else {
                    sentence = 'You are very lucky, the stop is right next to you...';
                    sentence += br;
                    sentence += 'Just walk from stop - ' + i.ss + ' to ' + i.es + ',' + br;
                    sentence += 'using the transfer corridor that takes you from line ' + i.sl + ' to ' + i.el + '.';
                    path.sentence = sentence;
                };
            } else {
                if (transferCount == 1) {
                     // It is one transfer so first call function to find transfer point
                    var r0 = localFunctionGetTranferPoint(i.sl, localFunctionLoadMarker(i.sl, i.ss), endLine);
                    if (r0.tp['STATION_NAME'] == i.ss) {
                        var enterStop = localFunctionGetEnterStop(i.sl, i.ss, endLine)[0]['STATION_NAME'];
                        var r1 = localFunctionGetOneLinePath(endLine, enterStop, endLine, i.es);
                        sentence = 'It is better to transfer to ' + r1.el.toLowerCase() + ' line to ' + r1.ss + ' stop.';
                        sentence += br;
                        sentence += 'So you will need to start from stop ' + r1.sp['STOP_NAME'] + ', travelling ' + directionWorld(r1.dp[0].d) + '.';
                        sentence += br;
                        sentence += singlePluralStr(r1.sn, 'There', ' stop') + ' ahead.';
                        sentence += br;
                        sentence += 'Average traveling time is around ' + Math.round(r1.ts) + ' minutes for ' + r1.sn + oneWordSignalPlural(r1.sn, ' stop', ' stops') + '.';
                        path.sentence = sentence;
                        path.obj.push(r1);
                    } else {
                        var enterStop = localFunctionGetEnterStop(i.sl, r0.tp['STATION_NAME'], endLine)[0]['STATION_NAME'];
                        var r1 = localFunctionGetOneLinePath(endLine, enterStop, endLine, i.es);
                        sentence = 'Well, you will have to transfer from ' + r0.sl.toLowerCase() + ' line to '
     + r0.el.toLowerCase() + ' line.';
                        sentence += br;
                        sentence += 'So you will need to start from stop ' + r0.sp['STOP_NAME'] + ', travelling ' + directionWorld(r0.dp[0].d) + ' to transfer stop ' + r0.tp['STATION_NAME'] + '.';
                        sentence += br;
                        sentence += 'Until you reach transfer point, you will have to go through ' + r0.sn + oneWordSignalPlural(r0.sn, ' stop', ' stops');
                        sentence += br;
                        sentence += 'From transfer stop ' + r0.tp['STATION_NAME'] + ' on ' + r0.sl.toLowerCase() + ' line, walk to stop ' + enterStop.toLowerCase() + ' on ' + r0.el.toLowerCase() + ' line.';
                        sentence += br;
                        sentence += 'From stop ' + enterStop.toLowerCase() + ' on ' + r0.el.toLowerCase() + ' line, you will need to travel ' + directionWorld(r1.dp[0].d) + ' to your final destination at ' + r1.es + ' stop. Traveling another ' + r1.sn + oneWordSignalPlural(r1.sn, ' stop', ' stops');
                        sentence += br;
                        sentence += 'Average traveling time is around ' + (5 + Math.round(r0.ts) + Math.round(r1.ts)) + ' minutes for ' + (r0.sn + r1.sn) + oneWordSignalPlural((r0.sn + r1.sn), ' stop', ' stops') + '.';
                        path.sentence = sentence;
                        path.obj.push(r0);
                        path.obj.push(r1);
                    }
                } else {
                    // All lines are the most 1 transfer. Only if they try to reach Purple and Yellow they will be two because need to go through Red
                    var r0 = localFunctionGetTranferPoint(i.sl, localFunctionLoadMarker(i.sl, i.ss), 'Red');
                    var enterStop1 = localFunctionGetEnterStop(i.sl, r0.tp['STATION_NAME'], 'Red');
                    var r1 = localFunctionGetTranferPoint('Red', enterStop1, endLine);
                    var enterStop2 = localFunctionGetEnterStop('Red', r1.tp['STATION_NAME'], endLine)[0]['STATION_NAME'];
                    var r2 = localFunctionGetOneLinePath(endLine, enterStop2, endLine, i.es);
                    sentence = 'Unfortunately, you will have to transfer twice, first going from ' + r0.sl.toLowerCase() + ' line to red line, then from red to ' + endLine.toLowerCase() + ' line.';
                    sentence += br;
                    sentence += 'So you will need to start from stop ' + r0.sp['STOP_NAME'] + ', travelling ' + directionWorld(r0.dp[0].d) + ' to transfer stop ' + r0.tp['STATION_NAME'] + '.';
                    sentence += br;
                    sentence += 'Until you reach transfer point, you will have to go through ' + r0.sn + oneWordSignalPlural(r0.sn, ' stop', ' stops') + '.';
                    sentence += br;
                    sentence += 'From transfer stop ' + r0.tp['STATION_NAME'] + ' on ' + r0.sl.toLowerCase() + ' line, walk to stop ' + enterStop1[0]['STATION_NAME'].toLowerCase() + ' on red line.';
                    sentence += br;
                    sentence += 'From there, you will need to travel ' + directionWorld(r1.dp[0].d) + ' to your second and final transfer ' + r1.ss + ' stop, passing another ' + r1.sn + oneWordSignalPlural(r1.sn, ' stop', ' stops') + '.';
                    sentence += br;
                    sentence += 'From transfer stop ' + r1.tp['STATION_NAME'] + ' on red line, walk to stop ' + enterStop2.toLowerCase() + ' on ' + endLine.toLowerCase() + ' line.';
                    sentence += br;
                    sentence += 'From stop ' + enterStop2.toLowerCase() + ' on ' + endLine.toLowerCase() + ' line, you will need to travel ' + directionWorld(r2.dp[0].d) + ' to your final destination at ' + i.es + ' stop, traveling last ' + r2.sn + oneWordSignalPlural(r2.sn, ' stop', ' stops') + '.';
                    sentence += br;
                    sentence += 'Average traveling time is around ' + (10 + Math.round(r0.ts) + Math.round(r1.ts) + Math.round(r2.ts)) + ' minutes for ' + (r0.sn + r1.sn + r2.sn) + oneWordSignalPlural((r0.sn + r1.sn + r2.sn), ' stop', ' stops') + '.';
                    path.sentence = sentence;
                    path.obj.push(r0);
                    path.obj.push(r1);
                    path.obj.push(r2);
                };
            };
            return path;
        };
    };
}])
.factory('getTimeTable', function () {
    return function (s, t, c, v) {
        var r = {};
        r.t = [];
        var l = v[s].tad.length;
        var pc = 1;
            for (var i = 0; i < l; i++) {
                if (Date.parse('01/01/2011 ' + v[s].tad[i]) > Date.parse('01/01/2011 ' + t)) {
                    if (pc > c) {
                        return r;
                        break;
                       }
                    else {
                        r.t.push(v[s].tad[i]);
                    };
                    pc++;
                };
            };
         };
})
.factory('getMultipleTimeTable', function () {
        return function (s, c, v, a) {
           var r = {};
            r.t = [];
            var l = v[s].tad.length;
            for (var x = 0; x < a.length; x++) {
                bp: {
                    for (var i = 0; i < l; i++) {
                            if (Date.parse('01/01/2011 ' + v[s].tad[i]) > Date.parse('01/01/2011 ' + a[x])) {
                                r.t.push(v[s].tad[i]);
                                break bp;
                      };
                    };
                };
            };
            return r;
        };
})
.factory('caching', function () {
        //http://www.w3schools.com/html/html5_webstorage.asp
        return {
            setCache: function (s, k, v, o) {
                c: {
                    var r = {};
                    //window.localStorage - stores data with no expiration date
                    //window.sessionStorage - stores data for one session (data is lost when the browser tab is closed)
                    if (typeof (window[s]) !== 'undefined') {
                        r.s = 'Y';
                        if (o) {
                            window[s].removeItem(k);
                            window[s].setItem(k, v);
                        } else {
                            if (typeof (window[s][k]) == 'undefined') {
                                window[s].setItem(k, v);
                            };
                        };
                        r.f = 'N'
                        return r;
                        break c;
                    } else {
                        r.s = 'N';
                        return r;
                        break c;
                    };
                };
            },
            getCache: function (s, k) {
                c: {
                    if (typeof (window[s][k]) !== 'undefined') {
                        return JSON.parse(window[s][k]);
                        break c;
                    } else {
                        return false;
                        break c;
                    };
                };
            }
        };
})
.run(['$window', '$rootScope', function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
        });
    }, false);
    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
        });
    }, false);
}])