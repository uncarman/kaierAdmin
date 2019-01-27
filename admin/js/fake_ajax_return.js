var fake_data = {
	"user" : {
		code: 0,
		data: {
			"name": "sam"
		}
	},

    "login" : {
        code: 0,
        data: {
            "token": "token-12345"
        }
    },

    "getLoginCode" : {
        code: 0,
        data: {
            "code_identity": "code_identity-12345"
        }
    },

	"getList": {
        code: 0,
        kind: "auction",
        offset:10,
		total: 103,
        data: [
        	{
                oid:123,
				state:123,
				timestamp:122222222222,
				cost:123,
				freight:123,
				carriage:123,
				address:"收款人地址1",
				name:"收款人姓名1",
        	},
            {
                oid:124,
                state:124,
                timestamp:123242342432342,
                cost:124,
                freight:124,
                carriage:124,
                address:"收款人地址2",
                name:"收款人姓名2",
            }
		]
	},
    "getList2": {
        code: 0,
        kind: "auction",
        offset:0,
        total: 0,
        data: []
    },

    "/api/backend/v1/base/upload": {
        code: 0,
        data: {
            "url": "http://cdn.iciba.com/news/word/20181225.jpg"
        }
    },

    "/api/backend/v1/mall/goods": {
        code: 0,
        data: {
            pk : 1,
            thumbnail: "http://cdn.iciba.com/news/word/20181225.jpg",
            posters: [
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                },
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                },
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                }
            ],
            gid: "12345",
            name: "阿萨德法师法师法师法1234",
            price: 12.34,
            deadline: 1546479922704,
            selltype: "代理",
            transtype: "自付",
            sid: 1234,
            count: 10,
            info: "PGgxPmFhYWFhPC9oMT4=",
            minicode: "http://cdn.iciba.com/news/word/20181225.jpg",
        }
    },
    "/api/backend/v1/mall/goods/list": {
        code: 0,
        data: {
            total_num:"123",
            total_page:"13",
            page:"3",
            items:[
                {
                    "pk":"1",
                    "gid":"编号111",
                    "name":"商品名111",
                    "thumbnail":"缩略图111",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":0
                },
                {
                    "pk":"2",
                    "gid":"编号111",
                    "name":"商品名111",
                    "thumbnail":"缩略图111",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":0
                },
                {
                    "pk":"3",
                    "gid":"编号333",
                    "name":"商品名333",
                    "thumbnail":"缩略图333",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":1
                }
            ]
        }
    },
    "/api/backend/v1/mall/goods": {
        code: 0,
        data: {
            pk : 1,
            thumbnail: "http://cdn.iciba.com/news/word/20181225.jpg",
            posters: [
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                },
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                },
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                }
            ],
            gid: "12345",
            name: "阿萨德法师法师法师法1234",
            price: 12.34,
            selltype: "代理",
            transtype: "包邮",
            sid: 123,
            count:10,
            testpic: "http://cdn.iciba.com/news/word/20181225.jpg",
            minicode: "http://cdn.iciba.com/news/word/20181225.jpg",
        },
    },
    "/api/backend/v1/mall/pigeon/list": {
        code: 0,
        data: {
            total_num:"123",
            total_page:"13",
            page:"3",
            items:[
                {
                    "pk":"1",
                    "gid":"编号111",
                    "name":"商品名111",
                    "thumbnail":"缩略图111",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":0,
                    "kind": 1
                },
                {
                    "pk":"2",
                    "gid":"编号111",
                    "name":"商品名111",
                    "thumbnail":"缩略图111",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":0,
                    "kind": 0
                },
                {
                    "pk":"3",
                    "gid":"编号333",
                    "name":"商品名333",
                    "thumbnail":"缩略图333",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":1,
                    "kind": 1
                }
            ]
        }
    },
    "/api/backend/v1/mall/pigeon": {
        code: 0,
        data: {
            pk : 1,
            thumbnail: "http://cdn.iciba.com/news/word/20181225.jpg",
            posters: [
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                },
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                },
                {
                    kind:0,
                    url: "http://cdn.iciba.com/news/word/20181225.jpg",
                }
            ],
            gid: "12345",
            name: "阿萨德法师法师法师法1234",
            price: 12.34,
            sex: 0,
            testpic: "http://cdn.iciba.com/news/word/20181225.jpg",
            minicode: "http://cdn.iciba.com/news/word/20181225.jpg",
        }
    },

    "/api/backend/v1/mall/auction/list": {
        code: 0,
        data: {
            total_num:"123",
            total_page:"13",
            page:"3",
            items:[
                {
                    "pk":"1",
                    "gid":"编号111",
                    "name":"商品名111",
                    "cover":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":0,
                    "kind": 1
                },
                {
                    "pk":"2",
                    "gid":"编号111",
                    "name":"商品名111",
                    "cover":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":0,
                    "kind": 0
                },
                {
                    "pk":"3",
                    "gid":"编号333",
                    "name":"商品名333",
                    "cover":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    "count":"5",
                    "state":1,
                    "kind": 1
                }
            ]
        }
    },
    "api/backend/v1/mall/auction/state": {
        code: 0,
        data: {},
    },
    "/api/backend/v1/mall/auction": {
        code: 0,
        data: {},
    },
    "/api/backend/v1/mall/auction/pigeon/list": {
        code: 0,
        data: [
            {
                sn:1,
                pk:11,
                gid:123,
                price: 112,
                offer:333,
                state:1
            },
            {
                sn:2,
                pk:11,
                gid:124,
                price: 112,
                offer:333,
                state:0
            }
        ],
    },
    "/api/backend/v1/mall/pigeons": {
        code: 0,
        data: [
            {
                gid:123,
                thumbnail: "http://cdn.iciba.com/news/word/20181225.jpg",
                name:"鸽子的商品标题显示在这里1",
            },
            {
                gid:124,
                thumbnail: "http://cdn.iciba.com/news/word/20181225.jpg",
                name:"鸽子的商品标题显示在这里2",
            }
        ],
    },
    "/api/backend/v1/mall/static/pigeon/list": {
        code: 0,
        data: {
            total_num:"123",
            total_page:"13",
            page:"3",
            items:[
                {
                    "pk":"1",
                    "gid":"123",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    "state":0,
                },
                {
                    "pk":"2",
                    "gid":"124",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    "state":0,
                },
                {
                    "pk":"3",
                    "gid":"编号333",
                    "name":"商品名333",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    "state":1,
                }
            ]
        }
    },

    "/api/backend/v1/mall/suggest/goods/list":{
        code: 0,
        data: {
            total_num:"123",
            total_page:"13",
            page:"3",
            items:[
                {
                    "pk":"1",
                    "gid":"123",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    count:"1",
                    "state":1,
                },
                {
                    "pk":"2",
                    "gid":"124",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    count:"2",
                    "state":0,
                },
                {
                    "pk":"3",
                    "gid":"编号333",
                    "name":"商品名333",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"序号",
                    count:"3",
                    "state":1,
                }
            ]
        }
    },
    "/api/backend/v1/mall/goods/list":{
        code: 0,
        data: {
            total_num:"123",
            total_page:"13",
            page:"3",
            items:[
                {
                    "pk":"1",
                    "gid":"123",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    count:"1",
                    "state":1,
                },
                {
                    "pk":"2",
                    "gid":"124",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    count:"2",
                    "state":0,
                },
                {
                    "pk":"3",
                    "gid":"编号333",
                    "name":"商品名333",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    count:"3",
                    "state":1,
                }
            ]
        }
    },


    "/api/backend/v1/mall/cat/list":{
        code: 0,
        data: [
            {
                pk: 1,
                name: "保健",
                "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
            },
            {
                pk: 2,
                name: "食品",
                "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
            },
            {
                pk: 3,
                name: "器物",
                "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
            }
        ]
    },
    "/api/backend/v1/mall/cat/goods/list":{
        code: 0,
        data: {
            total_num:"123",
            total_page:"13",
            page:"3",
            items:[
                {
                    "pk":"1",
                    "gid":"123",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"1",
                    count:"1",
                    "state":1,
                },
                {
                    "pk":"2",
                    "gid":"124",
                    "name":"商品名111",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"2",
                    count:"2",
                    "state":0,
                },
                {
                    "pk":"3",
                    "gid":"编号333",
                    "name":"商品名333",
                    "thumbnail":"http://cdn.iciba.com/news/word/20181225.jpg",
                    "price":123,
                    sn:"3",
                    count:"3",
                    "state":1,
                }
            ]
        }
    },


    "/api/backend/v1/mall/banner/list": {
        data: [
            {
                pk:1,
                name: "阿萨德发卡上的发生",
                "poster": "http://cdn.iciba.com/news/word/20181225.jpg",
                "sn": 123,
                click: 123,
                kind: 'pigeon',   // 'bidding', 'goods', 'web'
                url: "http://cdn.iciba.com/"
            },
            {
                pk:2,
                name: "阿萨德发卡上的发生2",
                "poster": "http://cdn.iciba.com/news/word/20181225.jpg",
                "sn": 222,
                click: 125,
                kind: 'bidding',   // 'bidding', 'goods', 'web'
                url: "http://cdn.iciba.com/"
            }
        ]
    },


    "/api/backend/v1/store/pigeon/list": {
	    data: {
            total_num: 12345,
            total_page: 12,
            page: 2,
            items: [
                {
                    pk:1,
                    gid: 123,
                    name: "啥打法是否对",
                    blood: "asdf",
                    thumbnail: "http://cdn.iciba.com/news/word/20181225.jpg",
                    ctime: 1234455,
                    kind: 1,
                    sex: 1,
                    star: 1.2
                },
                {
                    pk:2,
                    gid: 124,
                    name: "啥打法是否对2",
                    blood: "asdf22",
                    thumbnail: "http://cdn.iciba.com/news/word/20181225.jpg",
                    ctime: 1234455,
                    kind: 3,
                    sex: 0,
                    star: 1.2
                }
            ]
        }
    },

    "/api/backend/v1/store/blood/list":{
	    data: ["aaa", "bbb", "ccc"],
    },

    "/api/backend/v1/store/goods/list": {
	    data:{
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    sid: 123,
                    name: "物品名字123",
                    count: 12,
                    location: "物品位置231",
                    weight:123,
                    capacity:122,
                    price:12.4,
                    thumbnail:"http://cdn.iciba.com/news/word/20181225.jpg"
                },
                {
                    pk: 2,
                    sid: 124,
                    name: "物品名字124",
                    count: 12,
                    location: "物品位置234",
                    weight:123,
                    capacity:122,
                    price:12.4,
                    thumbnail:"http://cdn.iciba.com/news/word/20181225.jpg"
                }
            ]
        },
    },

    "/api/backend/v1/store/goods/record": {
        data:{
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    oid: 1,
                    date: "2019年3月20日20:00",
                    price:12.4,
                    count: 12,
                    phone: 15821130654,
                },
                {
                    oid: 2,
                    date: "2019年3月20日20:00",
                    price:12.4,
                    count: 12,
                    phone: 15821130654,
                }
            ]
        },
    },


    "/api/backend/v1/finance/receive/list": {
        data:{
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    date: "2019年3月20日20:00",
                    kind: "保证金",
                    creater: "人名字123",
                    pay_money: 12,
                    pics: [
                        {
                            kind:0,
                            url: "http://cdn.iciba.com/news/word/20181225.jpg",
                        },
                        {
                            kind:0,
                            url: "http://cdn.iciba.com/news/word/20181225.jpg",
                        },
                    ],
                    state:0,
                },
                {
                    pk: 2,
                    date: "2019年3月20日21:00",
                    kind: "拍卖款",
                    creater: "人名字133",
                    pay_money: 122,
                    pics: [
                        {
                            kind:0,
                            url: "http://cdn.iciba.com/news/word/20181225.jpg",
                        },
                        {
                            kind:0,
                            url: "http://cdn.iciba.com/news/word/20181225.jpg",
                        },
                    ],
                    state:1,
                }
            ]
        },
    },

    "/api/backend/v1/finance/give/list": {
        data:{
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    date: "2019年3月20日20:00",
                    kind: "保证金",
                    creater: "人名字123",
                    receiver: "receiver人民",
                    apply_money: 120,
                    pay_money: 12,
                    name: "户主名字",
                    bankno: "1212121",
                    bankname: "中国人民银行",
                    state:0,
                },
                {
                    pk: 2,
                    date: "2019年3月20日20:00",
                    kind: "保证金",
                    creater: "人名字125",
                    receiver: "receiver人民2",
                    apply_money: 140,
                    pay_money: 14,
                    name: "户主名字2",
                    bankno: "12121222222221",
                    bankname: "中国人民银行1",
                    state:1,
                }
            ]
        },
    },

    "/api/backend/v1/finance/give/info": {
	    data: {
            pk: 1,
            date: "2019年3月20日20:00",
            kind: "保证金",
            creater: "人名字123",
            receiver: "receiver人民",
            apply_money: 120,
            pay_money: 12,
            name: "户主名字",
            bankno: "1212121",
            bankname: "中国人民银行",
            state:0,
        }
    },

    "/api/backend/v1/finance/account/list": {
        data: {
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    name: "户主名字",
                    bankno: "1212121",
                    bankname: "中国人民银行",
                    state:0,
                },
                {
                    pk: 2,
                    name: "户主名字2",
                    bankno: "1212121",
                    bankname: "中国人民银行",
                    state:1,
                }
            ]
        }
    },

    "/api/backend/v1/business/user/list":{
        data: {
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    avatar: "http://cdn.iciba.com/news/word/20181225.jpg",
                    phone: 15821130111,
                    name: "户主名字",
                    spend: 123,
                    kind: "类型1",
                    ctime: "2018-12-28 12:11:07",
                    vialotion: 4,
                    order:2,
                },
                {
                    pk: 1,
                    avatar: "http://cdn.iciba.com/news/word/20181225.jpg",
                    phone: 15821130111,
                    name: "户主名字2",
                    spend: 111,
                    kind: "类型2",
                    ctime: "2018-12-28 12:11:07",
                    vialotion: 1,
                    order:0,
                }
            ]
        }
    },

    "/api/backend/v1/business/user/address": {
        data: [
            {
                phone: 15821130111,
                name: "户主名字2",
                area: "浙江省-杭州市-西湖区",
                street: "万塘路18号",
            }
        ]
    },

    "/api/backend/v1/business/user/order/list": {
        data: {
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    oid: 15821130111,
                    ctime: "2018-12-28 12:11:07",
                    price: 121,
                    state: 1,
                }
            ]
        }
    },

    "/api/backend/v1/business/order/list": {
        data: {
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    oid: 15821130111,
                    phone: 15811111111,
                    count: 5,
                    ctime: "2018-12-28 12:11:07",
                    price: 121,
                    origin: "网站",
                    kind: 1,
                    state: 1,
                }
            ]
        }
    },

    "/api/backend/v1/business/order":{
        data: {
            pk: 1,
            oid: 15821130111,
            phone: 15811111111,
            count: 5,
            ctime: "2018-12-28 12:11:07",
            price: 121,
            origin: "网站",
            kind: 1,
            state: 1,
            freight: 123,
            paytype: "线下支付",
            address: {
                name: "老王",
                phone: 15988888888,
                area: "浙江省-杭州市-西湖区",
                street: "万塘路18号",
            },
            carriage: "暂无",
            items: [
                {
                    price: 2,
                    count: 5,
                    gid: 121121,
                    name: "拍卖鸽子的商品标题在此处"
                }
            ]
        }
    },

    "/api/backend/v1/business/consignment/list":{
        data: {
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    oid: 15821130111,
                    phone: 15811111111,
                    name: "老王",
                    address: "李家村",
                    count: 1,
                    kind: 1,
                }
            ]
        }
    },

    "/api/backend/v1/business/consignment":{
        data: {
            pk: 1,
            oid: 15821130111,
            phone: 15811111111,
            name: "老王",
            address: "李家村",
            count: 1,
            kind: 1,
            items: [
                {
                    count: 1,
                    gid:123,
                    name: "商品1",
                    location: "仓库1"
                }
            ]
        }
    },

    "/api/backend/v1/business/vialotion/list": {
        data: {
            total_num: 123,
            total_page: 12,
            page:2,
            items: [
                {
                    pk: 1,
                    kind: 1,
                    target: 15821130111,
                    date: "2018-12-28 12:11:07",
                    phone: 15811111111,
                    price: 121,
                    deadline: "2018-12-30 12:11:07",
                    vialotion: 0,
                    state: 1,
                },
                {
                    pk: 2,
                    kind: 1,
                    target: 15821130111,
                    date: "2018-12-28 12:11:07",
                    phone: 15811111111,
                    price: 121,
                    deadline: "2018-12-30 12:11:07",
                    vialotion: 1,
                    state: 1,
                }
            ]
        }
    }
}