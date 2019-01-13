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
    }

}