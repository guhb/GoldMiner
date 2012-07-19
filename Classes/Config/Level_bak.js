var NUMBER_OF_ROUNDS = 6;
var Round = [
    { // Round 1
        rocks:[
            cc.Point(100,290),
            cc.Point(260,90),
            cc.Point(470,250),
            cc.Point(610,370)
        ],
        golds:[
            cc.Point(100,210),
            cc.Point(140,340),
            cc.Point(170,140),
            cc.Point(200,300),
            cc.Point(300,180),
            cc.Point(410,170),
            cc.Point(530,100),
            cc.Point(530,230),
            cc.Point(590,310),
            cc.Point(660,250)
        ],
        pigs:[],
        diamonds:[],
        bones:[],
        bombs:[]
    },
    { // Round 2
        rocks:[
			cc.Point(90,240),
			cc.Point(280,210),
			cc.Point(440,240),
			cc.Point(520,340)
        ],
        golds:[
			cc.Point(30,110),
			cc.Point(110,170),
			cc.Point(170,240),
			cc.Point(230,380),
			cc.Point(290,80),
			cc.Point(380,110),
			cc.Point(490,300),
			cc.Point(540,240),
			cc.Point(630,110),
			cc.Point(690,250)
        ],
        pigs:[],
        diamonds:[],
        bones:[],
        bombs:[]
    },
    { // Round 3
        rocks:[
			cc.Point(90,250),
			cc.Point(280,260),
			cc.Point(440,240),
			cc.Point(620,280),
			cc.Point(180,140),
			cc.Point(390,120),
			cc.Point(540,140)
        ],
        golds:[
			cc.Point(130,30),
			cc.Point(210,70),
			cc.Point(370,40),
            cc.Point(430,80),
			cc.Point(590,80),
			cc.Point(630,110)
        ],
        pigs:[
            {
                pos: cc.Point(50,280),
                run: cc.Point(50,300)
            },
            {
                pos: cc.Point(90,320),
                run: cc.Point(90,350)
            },
            {
                pos: cc.Point(550,200),
                run: cc.Point(550,200)
            },
            {
                pos: cc.Point(550,310),
                run: cc.Point(550,310)
            }
        ],
        diamonds:[
            cc.ccp(170,90))
        ],
        bones:[],
        bombs:[]
    },
    { // Round 4
        rocks:[
			cc.Point(90,150),
			cc.Point(180,210),
			cc.Point(340,240),
			cc.Point(520,230),
			cc.Point(600,100)
        ],
        golds:[
			cc.Point(110,20),
			cc.Point(200,110),
			cc.Point(320,120),
			cc.Point(410,150),
			cc.Point(630,90)
        ],
        pigs:[
            {
                pos: cc.Point(50,300),
                run: cc.Point(50,300) // Not right
            },
            {
                pos: cc.Point(90,340),
                run: cc.Point(90,350)
            },
            {
                pos: cc.Point(550,240),
                run: cc.Point(550,200)
            },
            {
                pos: cc.Point(550,310),
                run: cc.Point(550,310) // Not right
            }
        ],
        diamonds:[
			cc.Point(210,20),
			cc.Point(400,70),
			cc.Point(580,20)
        ],
        bones:[],
        bombs:[]
    },
    { // Round 5
        rocks:[],
        golds:[
			cc.Point(70,50),
			cc.Point(150,170),
			cc.Point(300,30),
			cc.Point(450,150),
			cc.Point(650,200)
        ],
        pigs:[
            {
                pos: cc.Point(50,280),
                run: cc.Point(50,280) // Not right
            },
            {
                pos: cc.Point(450,350),
                run: cc.Point(450,350)
            },
            {
                pos: cc.Point(550,210),
                run: cc.Point(550,210)
            },
            {
                pos: cc.Point(100,240),
                run: cc.Point(100,240) // Not right
            },
            {
                pos: cc.Point(80,310),
                run: cc.Point(80,310)
            }
        ],
        diamonds:[],
        bones:[
            cc.Point(150,300),
			cc.Point(370,260),
			cc.Point(540,300)
        ],
        bombs:[
            cc.Point(240,210),
			cc.Point(500,260)
        ]
    },
    { // Round 6
        rocks:[],
        golds:[
			cc.Point(60,50),
			cc.Point(490,130),
			cc.Point(550,80),
			cc.Point(650,320)
        ],
        pigs:[],
        diamonds:[
        	cc.Point(30,330),
            cc.Point(150,240),
			cc.Point(280,100),
            cc.Point(380,150)
        ],
        bones:[
            cc.Point(150,300),
			cc.Point(370,260),
			cc.Point(540,300)
        ],
        bombs:[
			cc.Point(100,290),
			cc.Point(230,160),
			cc.Point(440,210),
			cc.Point(590,260)
        ]
    },
]