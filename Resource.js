//image
var s_logo = "Resources/logo.png";
var s_gameOver = "Resources/gameOver.png";
var s_menuTitle = "Resources/menuTitle.png";
var s_flare = "Resources/flare.jpg";
var s_explosion = "Resources/explosion.png";
var s_explode1 = "Resources/explode1.jpg";
var s_explode2 = "Resources/explode2.jpg";
var s_explode3 = "Resources/explode3.jpg";

var s_background = "Resources/background.png";
var s_background1 = "Resources/background1.png";
var s_background2 = "Resources/background2.png";
var s_background3 = "Resources/background3.png";
var s_start_menu = "Resources/start_menu.png";
var s_hook = "Resources/hook.png";
var s_hook_long = "Resources/hook_long.png";
var s_big_rock = "Resources/big_rock.png";
var s_small_rock = "Resources/small_rock.png";
var s_big_gold = "Resources/big_gold.png";
var s_small_gold = "Resources/small_gold.png";
var s_pig = "Resources/pig.png";
var s_big_diamond = "Resources/big_diamond.png";
var s_small_diamond = "Resources/small_diamond.png";
var s_bone = "Resources/bone.png";
var s_bomb = "Resources/bomb.png";
var s_milk = "Resources/milk.png";
var s_clock = "Resources/clock.png";
var s_money_tree = "Resources/money_tree.png";
var s_rich = "Resources/rich.png";
var s_accept = "Resources/accept.png";
var s_bg = "Resources/welcome.png";
var s_gamebg = "Resources/gamebg.png";
var s_array1 = "Resources/array1.png";
var s_array2 = "Resources/array2.png";
var s_array3 = "Resources/array3.png";
var s_array1_big = "Resources/array1_big.png";
var s_array2_big = "Resources/array2_big.png";
var s_array3_big = "Resources/array3_big.png";
var s_animals = "Resources/animals.png";
var s_dog = "Resources/dog.png";
var s_cow = "Resources/cow.png";
var s_sheep = "Resources/sheep.png";
var s_boy = "Resources/boy.png";
var s_backbig = "Resources/backbig.png";
var s_back = "Resources/back.png";
var s_about = "Resources/about.png";
var s_failedbg = "Resources/failedbg.png";
var s_replay = "Resources/replay.png";
var s_replaybig = "Resources/replaybig.png";
var s_exit = "Resources/exit.png";
var s_exitbig = "Resources/exitbig.png";
var s_board = "Resources/board.png";
var s_mission1 = "Resources/mission1.png";
var s_mission2 = "Resources/mission2.png";
var s_mission3 = "Resources/mission3.png";
var s_mission4 = "Resources/mission4.png";
var s_mission_bg = "Resources/missionbg.png";
var s_middle_gold = "Resources/middle_gold.png";
var s_middle_gold = "Resources/middle_gold.png";
var s_mission_ruler = "Resources/missionruler.png";
var s_shopbg = "Resources/shopbg.png";
var s_nextgame = "Resources/nextgame.png";
var s_nextgamebig = "Resources/nextgamebig.png";
var s_milk1 = "Resources/milk1.png";
var s_milk2 = "Resources/milk2.png";
var s_stonebook = "Resources/stonebook.png";
var s_bonebook = "Resources/bonebook.png";
var s_aim = "Resources/aim.png";
var s_burst = "Resources/burst.png";

//music
var s_bgMusic = "Resources/Music/bgMusic";
var s_mainMainMusic = "Resources/Music/mainMainMusic";

//effect
var s_buttonEffect = "Resources/Music/buttonEffet";
var s_explodeEffect = "Resources/Music/explodeEffect";
var s_fireEffect = "Resources/Music/fireEffect";
var s_shipDestroyEffect = "Resources/Music/shipDestroyEffect";

var s_explosion_plist = "Resources/explosion.plist";

var g_ressources = [
    //image
    {type:"image", src:s_bg},
	{type:"image", src:s_boy},
	{type:"image", src:s_sheep},
	{type:"image", src:s_animals},
	{type:"image", src:s_cow},
	{type:"image", src:s_about},
	{type:"image", src:s_dog},
	{type:"image", src:s_back},
	{type:"image", src:s_backbig},
	{type:"image", src:s_failedbg},
	{type:"image", src:s_replaybig},
	{type:"image", src:s_replay},
	{type:"image", src:s_board},
    {type:"image", src:s_logo},
    {type:"image", src:s_gameOver},
    {type:"image", src:s_menuTitle},
    {type:"image", src:s_flare},
    {type:"image", src:s_explosion},
    {type:"image", src:s_explode1},
    {type:"image", src:s_explode2},
    {type:"image", src:s_explode3},
    
	{type:"image", src:s_milk1},
    {type:"image", src:s_milk2},
    {type:"image", src:s_bonebook},
    {type:"image", src:s_stonebook},
    {type:"image", src:s_aim},
	
    {type:"image", src:s_background},
    {type:"image", src:s_background1},
    {type:"image", src:s_background2},
    {type:"image", src:s_background3},
    {type:"image", src:s_start_menu},
    {type:"image", src:s_hook},
    {type:"image", src:s_hook_long},
    {type:"image", src:s_big_rock},
    {type:"image", src:s_small_rock},
    {type:"image", src:s_big_gold},
    {type:"image", src:s_middle_gold},
    {type:"image", src:s_small_gold},
    {type:"image", src:s_pig},
    {type:"image", src:s_big_diamond},
    {type:"image", src:s_small_diamond},
    {type:"image", src:s_bone},
    {type:"image", src:s_bomb},
    {type:"image", src:s_milk},
    {type:"image", src:s_clock},
    {type:"image", src:s_money_tree},
    {type:"image", src:s_rich},
    {type:"image", src:s_accept},
    {type:"image", src:s_mission1},
    {type:"image", src:s_mission2},
    {type:"image", src:s_mission3},
    {type:"image", src:s_mission4},
    {type:"image", src:s_mission_bg},
    {type:"image", src:s_mission_ruler},
    {type:"image", src:s_shopbg},
    {type:"image", src:s_nextgame},
    {type:"image", src:s_nextgamebig},
    
    //plist
    {type:"plist", src:s_explosion_plist},

    //music
    {type:"bgm", src:s_bgMusic},
    {type:"bgm", src:s_mainMainMusic},

    //effect
    {type:"effect", src:s_buttonEffect},
    {type:"effect", src:s_explodeEffect},
    {type:"effect", src:s_fireEffect},
    {type:"effect", src:s_shipDestroyEffect}
];
