define(function (require) {
    var app = require('../../js/app').app;

    app.controller('financeAudit_1_3', ['$scope', function ($scope) {

        global.on_load_func($scope);

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);
        });

        $scope.$on('$destroy', function () {
            // pass
        });

        // 当前页面默认值
        var datas = {
            cur_acckind: 0,  // 默认保证金账户
            opt: {
                state: "100",  // 默认全部
            },
            query: "",
        };
        $scope.datas = { ...settings.default_datas, ...datas };

        // 点击, 切换分类, 获取选中分类内数据
        $scope.change_acckind = function (c) {
            $scope.datas.cur_acckind = c;
            $scope.get_datas($scope);
        }

        $scope.get_datas = function ($scope) {
            $scope.ajax_data()
                .then($scope.get_datas_callback)
                .catch($scope.ajax_catch);

        }
        $scope.ajax_data = function () {
            var param = {
                _method: 'get',
                _url: settings.ajax_func.financeAccountList,
                _param: {
                    kind: $scope.datas.cur_acckind
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.get_datas_callback = function (data) {
            var total_page = data.data.total_page;
            $scope.$apply(function(){
                $scope.ajax_loading = false;
                $scope.datas.dataList = data.data.items;
                $scope.datas.pageList = []
                for(var i = 1; i<=total_page; i++) {
                    $scope.datas.pageList.push(i);
                }
            });
        }


        // 启/停账号
        $scope.account_ch_confirm = function ($scope, item, state) {
            var txt = (state == 1 ? "启动?" : "停止?")
            MyConfirm({
                showTitleBtn: false,
                txtTitle: "确认"+txt+"?",
                txtContent: "<div style='text-align: center; margin-bottom: 20px;'>是否确认"+txt+"账号 </div>",
                _OK: function(obj){
                    $scope.account_ch_state(item, state);
                    obj.hide();
                },
                _Cancel: function(obj){},
                isBtnOkHide: false,
                isBtnCancelHide: false,
            });
        };
        $scope.account_ch_state = function (item, state) {
            $scope.ajax_account_ch_state(item, state)
                .then($scope.account_ch_state_callback)
                .catch($scope.ajax_catch);
        };
        $scope.ajax_account_ch_state = function (item, state) {
            var param = {
                _method: 'post',
                _url: settings.ajax_func.financeAccountState,
                _param: {
                    pk: item.pk,
                    state: state
                }
            };
            return global.return_promise($scope, param);
        };
        $scope.account_ch_state_callback = function (data) {
            $scope.reset_datas($scope);
        };


        // 编辑账号
        $scope.item_create = function () {
            $scope.datas.selected_item = {
                pk: 0,
            };
            $("#itemDetail").modal("show");
        };
        $scope.item_edit = function ($scope, item) {
            $scope.datas.selected_item = item;
            $("#itemDetail").modal("show");
        };

        $scope.ajax_item_update = function() {
            var g = $scope.datas.selected_item;
            var param = {
                _method: 'post',
                _url: settings.ajax_func.financeAccount,
                _param: {
                    pk: g.pk,
                    kind: g.kind,
                    name: g.name,
                    bankno: g.bankno,
                    bankname: g.bankname,
                }
            };
            return global.return_promise($scope, param);
        }
        $scope.item_update_callback = function (data) {
            $scope.reset_datas($scope);
            $('#bannerEdit').modal('hide');
        }

        ////// 执行函数
        $scope.get_datas($scope);
    }])
});
