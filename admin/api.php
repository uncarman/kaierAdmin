<?php

$_act = $_GET['act'];

$default_res = [
    "code" => 0,
];


if(strpos($_act,'mall/goods/list') !== false) {
    $res = $default_res;
    $res["data"] = [
        "total_num"  => 123,
        "total_page" => 13,
        "page" => 2,
        "items" => []
    ];
    $res["data"]["items"] = [
        [
            pk => 123,
            state => 123,
            thumbnail => "thumbnail",
            gid => 123,
            price => 123,
            count => 123,
            state => 1,
            name => "啥时发斯蒂芬1"
        ],
        [
            pk => 123,
            state => 123,
            thumbnail => "thumbnail",
            gid => 123,
            price => 123,
            count => 123,
            state => 1,
            name => "啥时发斯蒂芬2"
        ]
    ];
}
else if($_act == "getList") {
    $res = $default_res;
    $res["offset"] = 10;
    $res["total"] = 104;
    $res["data"] = [
        [
            oid => 123,
            state => 123,
            timestamp => 122222222222,
            cost => 123,
            freight => 123,
            carriage => 123,
            address => "收款人地址1",
            name => "收款人姓名1",
        ],
        [
            oid => 124,
            state => 124,
            timestamp => 123242342432342,
            cost => 124,
            freight => 124,
            carriage => 124,
            address => "收款人地址2",
            name => "收款人姓名2",
        ]
    ];
}
echo json_encode($res);

?>