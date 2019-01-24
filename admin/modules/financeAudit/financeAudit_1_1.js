define(function (require) {
    var app = require('../../js/app').app;

    app.controller('financeAudit_1_1', ['$scope', function ($scope) {

        global.on_load_func($scope);

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        // 当前页面默认值
        let datas = {
            opt: {
                query: "", // 商品列表
                state: 100, // 全部
            }
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        // 收款列表
        $scope.ajax_data = function() {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.financeReceiveList,
                _param: {
                    page: $scope.datas.cur_page,
                    query: $scope.datas.opt.query,
                    state: $scope.datas.opt.state
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.get_datas_callback = function(data) {
            var total_page = data.data.total_page;
            $scope.$apply(function(){
                $scope.ajax_loading = false;
                $scope.datas.dataList = data.data.items;
                $scope.datas.pageList = []
                for(var i = 1; i<=total_page; i++) {
                    $scope.datas.pageList.push(i);
                }
            });
        };

        // 确认收款
        $scope.finance_confirm = function ($scope, item, state) {
            var txt = (state == 2 ? "收款?" : "打回?")
            MyConfirm({
                showTitleBtn: false,
                txtTitle: "确认"+txt+"?",
                txtContent: "<div style='text-align: center; margin-bottom: 20px;'>是否确认"+txt+"款项 "+item.pay_money+"元 </div>",
                _OK: function(obj){
                    $scope.finance_receive_state(item, state);
                    obj.hide();
                },
                _Cancel: function(obj){},
                isBtnOkHide: false,
                isBtnCancelHide: false,
            });
        };
        $scope.finance_receive_state = function (item, state) {
            $scope.ajax_finance_receive_state(item, state)
                .then($scope.finance_receive_state_callback)
                .catch($scope.ajax_catch);
        };
        $scope.ajax_finance_receive_state = function (item, state) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.financeReceiveState,
                _param: {
                    pk: item.pk,
                    state: state
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.finance_receive_state_callback = function (data) {
            $scope.reset_datas($scope);
        };



        ////// 执行函数
        $scope.get_datas($scope);

    }])
});
