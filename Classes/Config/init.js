(function(){
    Game.MineType = getMineType();
    if(typeof(Storage)!=="undefined") {
        if (localStorage.firstScore == null) localStorage.firstScore = 0;
        if (localStorage.secondScore == null) localStorage.secondScore = 0;
        if (localStorage.thirdScore == null) localStorage.thirdScore = 0;
        if (localStorage.yourScore == null) localStorage.yourScore = 0;
    } else {
        console.error("Sorry! No web storage support..");
    }
    console.log("Execute.");
})();