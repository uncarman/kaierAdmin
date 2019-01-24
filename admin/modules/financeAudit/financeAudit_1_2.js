define(function (require) {
    var app = require('../../js/app').app;

    app.controller('financeAudit_1_2', ['$scope', function ($scope) {

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
                _url: settings.ajax_func.financeGiveList,
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


        // 查看详细
        $scope.item_view = function($scope, item) {
            $scope.datas.item_view_type = "view";
            $scope.datas.selected_item = item;
            $scope.ajax_item_detail(item.pk)
                .then($scope.item_view_callback)
                .catch($scope.ajax_catch);
        }
        $scope.ajax_item_detail = function (id) {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.financeGiveInfo,
                _param: {
                    pk: id,
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.item_view_callback = function (data) {
            $("#itemDetail").modal("show");
        };

        // 确认汇款
        $scope.finance_confirm = function ($scope, item, state) {
            var txt = (state == 1 ? "完成?" : "取消?")
            MyConfirm({
                showTitleBtn: false,
                txtTitle: "确认"+txt+"?",
                txtContent: "<div style='text-align: center; margin-bottom: 20px;'>是否确认"+txt+"款项 "+item.pay_money+"元 </div>",
                _OK: function(obj){
                    $scope.finance_give_state(item, state);
                    obj.hide();
                },
                _Cancel: function(obj){},
                isBtnOkHide: false,
                isBtnCancelHide: false,
            });
        };
        $scope.finance_give_state = function (item, state) {
            $scope.ajax_finance_give_state(item, state)
                .then($scope.finance_give_state_callback)
                .catch($scope.ajax_catch);
        };
        $scope.ajax_finance_give_state = function (item, state) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.financeGiveState,
                _param: {
                    pk: item.pk,
                    state: state
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.finance_give_state_callback = function (data) {
            $scope.reset_datas($scope);
        };



        ////// 执行函数
        $scope.get_datas($scope);
    }])
});
