define(function (require) {
    var app = require('../../js/app').app;

    app.controller('datas_2', ['$scope', function ($scope) {

        global.on_load_func();

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

    }])
});
