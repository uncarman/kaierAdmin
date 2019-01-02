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
}