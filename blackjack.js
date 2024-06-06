var dealersum = 0;
var yoursum = 0;

var dealeracecount=0;
var youracecount=0; 

var hidden;
var deck;

var canhit = true; //allows the player to draw while yoursum<=21

window.onload = function(){
    builddeck();
    shuffledeck();
    startgame();
}

function builddeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for(let i=0;i<types.length;i++)
    {
        for(let j=0;j<values.length;j++)
        {
            deck.push(values[j]+"-"+types[i]);//A-C --> K-C, A-D-->K-D and so on
        }
    }
    //console.log(deck);
}

function shuffledeck(){
    for(let i=0;i<deck.length;i++)
    {
        let j = Math.floor(Math.random()*deck.length);
        let temp = deck[i];
        deck[i]=deck[j];
        deck[j]=temp;
    }
    console.log(deck);
}

function startgame(){
    hidden = deck.pop();
    dealersum+=getvalue(hidden);

    dealeracecount+=checkace(hidden);
    // console.log(hidden);
    // console.log(dealersum);

    while(dealersum<17){
        let cardImg = document.createElement("img");
        let card=deck.pop();
        cardImg.src="./cards/"+card+".png";
        dealersum+=getvalue(card);
        dealeracecount+=checkace(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealersum);

    for(let i=0;i<2;i++)
    {
        let cardImg = document.createElement("img");
        let card=deck.pop();
        cardImg.src="./cards/"+card+".png";
        yoursum+=getvalue(card);
        youracecount+=checkace(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yoursum);

    updateScores(); // Update scores after initial dealing

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("new-game").addEventListener("click", newgame);
}

function newgame(){
    location.reload();
}

function hit()
{
    if(!canhit)
    {
        return;
    }

    let cardImg = document.createElement("img");
    let card=deck.pop();
    cardImg.src="./cards/"+card+".png";
    yoursum+=getvalue(card);
    youracecount+=checkace(card);
    document.getElementById("your-cards").append(cardImg);

    updateScores(); // Update scores after each hit

    if(reduceace(yoursum,youracecount)>21){
        canhit=false;
        stay(); // If player busts, automatically call stay
    }
}

function stay(){
    dealersum = reduceace(dealersum,dealeracecount);
    yoursum = reduceace(yoursum,youracecount);

    canhit=false;
    document.getElementById("hidden").src = "./cards/"+hidden+".png";

    let message ="";
    if(yoursum>21){
        message="You Lose!";
    }
    else if(dealersum>21)
    {
        message = "You Win!";
    }
    else if(yoursum ==dealersum)
    {
        message = "Tie!";
    }
    else if(yoursum>dealersum)
    {
        message ="You Win!";
    }
    else if(yoursum<dealersum)
    {
        message = "You Lose!";
    }
    document.getElementById("dealer-sum").innerText = dealersum;
    document.getElementById("your-sum").innerText = yoursum;
    document.getElementById("results").innerText = message;
}

function updateScores() {
    document.getElementById("your-sum").innerText = yoursum;
    document.getElementById("dealer-sum").innerText = dealersum - getvalue(hidden); // Excluding hidden card score
}

function getvalue(card){
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)){
        if(value=="A"){
            return 11;
        }
        return 10;
    }

    return parseInt(value);
}

function checkace(card)
{
    if(card[0]=="A"){
        return 1;
    }
    return 0;
}

function reduceace(playersum, playeracecount){
    while(playersum>21 && playeracecount>0)
    {
        playersum-=10;
        playeracecount-=1;
    }
    return playersum;
}
