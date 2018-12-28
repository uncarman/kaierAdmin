define(function (require) {

    var m = require('./app');
    var app = m.app;

    // 设置全局变量，所有页面公用
    settings = m.comm.settings;
    global = m.comm.global;
    ajax_list = []; // url 中 hash 发生变化放弃页面中未完成的ajax请求

    alert = MyAlert = m.dialog.MyAlert;
    MyMsg = m.dialog.MyMsg;
    MyCustomPop = m.dialog.MyCustomPop;
    MyAlertError = m.dialog.MyAlertError;
    MyConfirm = m.dialog.MyConfirm;

    // 替换默认console函数
    if(!settings.is_debug)
    {
        console = {
            log: function(){},
            debug: function(){},
            info: function(){},
            warn: function(){},
            error: function(){}
        }
    }

    // 判断能否使用 localStorage
    if(window.localStorage){
        settings.can_localStorage = true;
    }else{
        settings.can_localStorage = false;
    }

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    // 添加 富文本转换 filter
    app.filter('to_html', ['$sce', function ($sce) {
        return function (text) { return $sce.trustAsHtml(text); };
    }]);

    // 添加 舍去小数末尾数字（非四舍五入） filter
    app.filter('fmt_money', function(){
        return global.fmt_money
    });

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        var default_page = "dashboard";
        // 获取当前页面地址
        var url_list = window.location.href.split("#").pop();
        var page = url_list.split("/")[1];
        if(page.indexOf("?") > 0)
        {
            page = page.split("?")[0];
        }
        if(!page)
        {
            // 支付或登录后退后回到上一个页面
            var temp_session = global.read_storage('session');
            if (temp_session['from']) {
                default_page = temp_session['from'];
            }
            // 清空原来的 from
            global.set_storage_key('session', [
                {key:'from', val:''}
            ]);
            $urlRouterProvider.otherwise('/'+default_page);
        }
        else
        {
            $urlRouterProvider.otherwise('/'+default_page);
        }

        $stateProvider
        ///////////// 公共模块
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: './modules/dashboard.html?v='+version,
                controllerUrl: './modules/dashboard',
                controller: 'dashboard'
            })

            ///////////// 登录
            .state('login', {
                url: '/login',
                templateUrl: './modules/login.html?v='+version,
                controllerUrl: './modules/login',
                controller: 'loginCtrl'
            })

            ///////////// 数据表
            .state('datas_1', {
                url: '/datas_1',
                templateUrl: './modules/datas/datas_1.html?v='+version,
                controllerUrl: './modules/datas/datas_1',
                controller: 'datas_1'
            })
            .state('datas_2', {
                url: '/datas_2',
                templateUrl: './modules/datas/datas_2.html?v='+version,
                controllerUrl: './modules/datas/datas_2',
                controller: 'datas_2'
            })
            .state('datas_3', {
                url: '/datas_3',
                templateUrl: './modules/datas/datas_3.html?v='+version,
                controllerUrl: './modules/datas/datas_3',
                controller: 'datas_3'
            })

            ////////// 鸽业部门
            .state('pigeonDept_1', {
                url: '/pigeonDept_1',
                templateUrl: './modules/pigeonDept/pigeonDept_1.html?v='+version,
                controllerUrl: './modules/pigeonDept/pigeonDept_1',
                controller: 'pigeonDept_1'
            })
            .state('pigeonDept_2_1', {  // 竞价拍卖
                url: '/pigeonDept_2_1',
                templateUrl: './modules/pigeonDept/pigeonDept_2_1.html?v='+version,
                controllerUrl: './modules/pigeonDept/pigeonDept_2_1',
                controller: 'pigeonDept_2_1'
            })
            .state('pigeonDept_2_2', {  // 定价拍卖
                url: '/pigeonDept_2_2',
                templateUrl: './modules/pigeonDept/pigeonDept_2_2.html?v='+version,
                controllerUrl: './modules/pigeonDept/pigeonDept_2_2',
                controller: 'pigeonDept_2_2'
            })
            .state('pigeonDept_2_3', {  // 商城优选
                url: '/pigeonDept_2_3',
                templateUrl: './modules/pigeonDept/pigeonDept_2_3.html?v='+version,
                controllerUrl: './modules/pigeonDept/pigeonDept_2_3',
                controller: 'pigeonDept_2_3'
            })
            .state('pigeonDept_2_4', {  // 分类入口
                url: '/pigeonDept_2_4',
                templateUrl: './modules/pigeonDept/pigeonDept_2_4.html?v='+version,
                controllerUrl: './modules/pigeonDept/pigeonDept_2_4',
                controller: 'pigeonDept_2_4'
            })
            .state('pigeonDept_3', {
                url: '/pigeonDept_3',
                templateUrl: './modules/pigeonDept/pigeonDept_3.html?v='+version,
                controllerUrl: './modules/pigeonDept/pigeonDept_3',
                controller: 'pigeonDept_3'
            })

            ////////// 库存管理
            .state('stock_1', {
                url: '/stock_1',
                templateUrl: './modules/stock/stock_1.html?v='+version,
                controllerUrl: './modules/stock/stock_1',
                controller: 'stock_1'
            })
            .state('stock_2', {
                url: '/stock_2',
                templateUrl: './modules/stock/stock_2.html?v='+version,
                controllerUrl: './modules/stock/stock_2',
                controller: 'stock_2'
            })

            ////////// 财务审核
            .state('financeAudit_1', {
                url: '/financeAudit_1',
                templateUrl: './modules/financeAudit/financeAudit_1.html?v='+version,
                controllerUrl: './modules/financeAudit/financeAudit_1',
                controller: 'financeAudit_1'
            })
            .state('financeAudit_2', {
                url: '/financeAudit_2',
                templateUrl: './modules/financeAudit/financeAudit_2.html?v='+version,
                controllerUrl: './modules/financeAudit/financeAudit_2',
                controller: 'financeAudit_2'
            })
            .state('financeAudit_3', {
                url: '/financeAudit_3',
                templateUrl: './modules/financeAudit/financeAudit_3.html?v='+version,
                controllerUrl: './modules/financeAudit/financeAudit_3',
                controller: 'financeAudit_3'
            })

            ////////// 权限管理
            .state('roleAdmin_1', {
                url: '/roleAdmin_1',
                templateUrl: './modules/roleAdmin/roleAdmin_1.html?v='+version,
                controllerUrl: './modules/roleAdmin/roleAdmin_1',
                controller: 'roleAdmin_1'
            })

    }]);

    app.directive('topMenus', function() {
        return {
            restrict: 'E',
            templateUrl: './components/topmenu.html?v='+version,
            replace: true,
        }
    }).directive('pageNav', function() {
        return {
            restrict: 'E',
            templateUrl: './components/pagenav.html?v='+version,
            replace: true,
        }
    });
});
