var NUMBER_OF_ROUNDS = 6;
var Round = [
    [ // Round 1
        {type: global.Tag.Rock,    x: 100, y: 290},
        {type: global.Tag.Rock,    x: 260, y: 90},
        {type: global.Tag.Rock,    x: 470, y: 250},
        {type: global.Tag.Rock,    x: 610, y: 370},
        {type: global.Tag.Gold,    x: 100, y: 210},
        {type: global.Tag.Gold,    x: 140, y: 340},
        {type: global.Tag.Gold,    x: 170, y: 140},
        {type: global.Tag.Gold,    x: 200, y: 300},
        {type: global.Tag.Gold,    x: 300, y: 180},
        {type: global.Tag.Gold,    x: 410, y: 170},
        {type: global.Tag.Gold,    x: 530, y: 100},
        {type: global.Tag.Gold,    x: 530, y: 230},
        {type: global.Tag.Gold,    x: 590, y: 310},
        {type: global.Tag.Gold,    x: 660, y: 250}
    ],
    [ // Round 2
        {type: global.Tag.Rock,    x: 90,  y: 240},
        {type: global.Tag.Rock,    x: 280, y: 210},
        {type: global.Tag.Rock,    x: 440, y: 240},
        {type: global.Tag.Rock,    x: 520, y: 340},
        {type: global.Tag.Gold,    x: 30,  y: 110},
        {type: global.Tag.Gold,    x: 110, y: 170},
        {type: global.Tag.Gold,    x: 170, y: 240},
        {type: global.Tag.Gold,    x: 230, y: 380},
        {type: global.Tag.Gold,    x: 290, y: 80},
        {type: global.Tag.Gold,    x: 380, y: 110},
        {type: global.Tag.Gold,    x: 490, y: 300},
        {type: global.Tag.Gold,    x: 540, y: 240},
        {type: global.Tag.Gold,    x: 630, y: 110},
        {type: global.Tag.Gold,    x: 690, y: 250}
    ],
    [ // Round 3
        {type: global.Tag.Rock,    x: 90,  y: 250},
        {type: global.Tag.Rock,    x: 280, y: 260},
        {type: global.Tag.Rock,    x: 440, y: 240},
        {type: global.Tag.Rock,    x: 620, y: 280},
        {type: global.Tag.Rock,    x: 180, y: 140},
        {type: global.Tag.Rock,    x: 390, y: 120},
        {type: global.Tag.Rock,    x: 540, y: 140},
        {type: global.Tag.Gold,    x: 130, y: 30},
        {type: global.Tag.Gold,    x: 210, y: 70},
        {type: global.Tag.Gold,    x: 370, y: 40},
        {type: global.Tag.Gold,    x: 430, y: 80},
        {type: global.Tag.Gold,    x: 590, y: 80},
        {type: global.Tag.Gold,    x: 630, y: 110},
        
        {type: global.Tag.Pig,    x: 50,  y: 280,    x2: 50,  y2: 300},
        {type: global.Tag.Pig,    x: 90,  y: 320,    x2: 90,  y2: 350},
        {type: global.Tag.Pig,    x: 550, y: 200,    x2: 550, y2: 200},
        {type: global.Tag.Pig,    x: 550, y: 310,    x2: 550, y2: 310},
        {type: global.Tag.Diamond,    x: 170, y: 90}
    ],
    [ // Round 4
        {type: global.Tag.Rock,    x: 90,  y: 150},
        {type: global.Tag.Rock,    x: 180, y: 210},
        {type: global.Tag.Rock,    x: 340, y: 240},
        {type: global.Tag.Rock,    x: 520, y: 230},
        {type: global.Tag.Rock,    x: 600, y: 100},
        {type: global.Tag.Gold,    x: 110, y: 20},
        {type: global.Tag.Gold,    x: 200, y: 110},
        {type: global.Tag.Gold,    x: 320, y: 120},
        {type: global.Tag.Gold,    x: 410, y: 150},
        {type: global.Tag.Gold,    x: 630, y: 90},
        {type: global.Tag.Pig,    x: 50,  y: 300,    x2: 50, y2: 300}, // Not right
        {type: global.Tag.Pig,    x: 90,  y: 340,    x2: 90, y2: 350},
        {type: global.Tag.Pig,    x: 550, y: 240,    x2: 550, y2: 200},
        {type: global.Tag.Pig,    x: 550, y: 310,    x2: 550, y2: 310}, // Not right
        {type: global.Tag.Diamond,    x: 210, y: 20},
        {type: global.Tag.Diamond,    x: 400, y: 70},
        {type: global.Tag.Diamond,    x: 580, y: 20}
    ],
    [ // Round 5
        {type: global.Tag.Gold,    x: 70,  y: 50},
        {type: global.Tag.Gold,    x: 150, y: 170},
        {type: global.Tag.Gold,    x: 300, y: 30},
        {type: global.Tag.Gold,    x: 450, y: 150},
        {type: global.Tag.Gold,    x: 650, y: 200},
        {type: global.Tag.Pig, x: 50,  y: 280,    x2: 50,  y2: 280}, // Not right
        {type: global.Tag.Pig, x: 450, y: 350,    x2: 450, y2: 350},
        {type: global.Tag.Pig, x: 550, y: 210,    x2: 550, y2: 210},
        {type: global.Tag.Pig, x: 100, y: 240,    x2: 100, y2: 240}, // Not right
        {type: global.Tag.Pig, x: 80,  y: 310,    x2: 80,  y2: 310},
        {type: global.Tag.Bone,   x: 150, y: 300},
        {type: global.Tag.Bone,   x: 370, y: 260},
        {type: global.Tag.Bone,   x: 540, y: 300},
        {type: global.Tag.Bomb,   x: 240, y: 210},
        {type: global.Tag.Bomb,   x: 500, y: 260}
    ],
    [ // Round 6
        {type: global.Tag.Gold,    x: 60,  y: 50},
        {type: global.Tag.Gold,    x: 490, y: 130},
        {type: global.Tag.Gold,    x: 550, y: 80},
        {type: global.Tag.Gold,    x: 650, y: 320},
        {type: global.Tag.Diamond,    x: 30,  y: 330},
        {type: global.Tag.Diamond,    x: 150, y: 240},
        {type: global.Tag.Diamond,    x: 280, y: 100},
        {type: global.Tag.Diamond,    x: 380, y: 150},
        {type: global.Tag.Bone,    x: 150, y: 300},
        {type: global.Tag.Bone,    x: 370, y: 260},
        {type: global.Tag.Bone,    x: 540, y: 300},
        {type: global.Tag.Bomb,    x: 100, y: 290},
        {type: global.Tag.Bomb,    x: 230, y: 160},
        {type: global.Tag.Bomb,    x: 440, y: 210},
        {type: global.Tag.Bomb,    x: 590, y: 260}
    ],
];

var NUMBER_OF_MISSIONS = 3;

Mission = [
    {
        round: Round,
        image: s_mission4,
        props: ["Milk", "Clock", "Sleep", "Lighter", "Smaller", "Longer"]
    },
    {
        round: Round,
        image: s_mission2,
        props: ["Bump", "Bigger", "Scan", "Sort", "Shift", "Quick"]
    },
    {
        round: Round,
        image: s_mission3,
        props: ["Frozen", "Reverse", "Silent", "Thunder", "Alarm", "Bone"]
    }
];