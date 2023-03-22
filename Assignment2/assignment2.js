let cpusequence = [];
let humansequence = [];
let flash;
let cputurn;
let humanturn;
let buttonclicks = 0;
let highscore =10;
let timer = 400;
let failtimer;
/* these are all the variables and constants declared for the cod
*/ 


const red = document.querySelector("#red");
const green = document.querySelector("#green");
const blue = document.querySelector("#blue");
const yellow = document.querySelector("#yellow");
const start = document.querySelector("#start");
const gamestart = document.querySelector("#gameindicator");

start.addEventListener('click', (event) => {play();});

  function play() {
    cpusequence = [];
    humansequence = [];
    flash = 0;
    humanturn = 1;
    timer = 400;
    buttonclicks = 0;
    document.getElementById("rightscore").innerHTML = humanturn;
    gamestart.style.backgroundColor = "lightgreen";
    for (counter = 0; counter < 10; counter++) {
      cpusequence.push(Math.floor(Math.random() * 4) + 1);
      console.log(cpusequence[counter])
    }
    cputurn = true;
    setTimeout(gameTurn, 300)
  }

  function gameTurn() {
    if (flash == humanturn) {
      cputurn = false;
      clearColor();
      failtimer = setInterval(gameFail,6000);  // this is longer than 5 seconds to accommodatex for the time used for displaying the flashing lights
      //gamestart.style.backgroundColor = "blue";
    }
    //this is how the CPU shows its random generated light sequence to the player, it is done with this statement
    if (cputurn) {
      clearColor();
    //gamestart.style.backgroundColor = "blue";
      setTimeout(() => {
        if (cpusequence[flash] == 1){ setTimeout(() => {green.style.backgroundColor = "lightgreen";
        setTimeout(gameTurn,timer);}, timer);
        flash++;}
        else if (cpusequence[flash] == 2){ setTimeout(() => {red.style.backgroundColor = "tomato";
        setTimeout(gameTurn,timer);}, timer);
        flash++;}
        else if (cpusequence[flash] == 3){ setTimeout(() => {yellow.style.backgroundColor = "yellow";
        setTimeout(gameTurn,timer);}, timer);
        flash++;}
        else if (cpusequence[flash] == 4){ setTimeout(() => {blue.style.backgroundColor = "lightskyblue";
        setTimeout(gameTurn,timer);}, timer);
        flash++;}
      }, timer);

      
    }
    // these two statements are used by the games failstate, ut just flashes all the lights at once
  }
  function clearColor() {
    green.style.backgroundColor = "darkgreen";
    red.style.backgroundColor = "darkred";
    yellow.style.backgroundColor = "goldenrod";
    blue.style.backgroundColor = "darkblue";
  }
  
  function flashColor() {
    green.style.backgroundColor = "lightgreen";
    red.style.backgroundColor = "tomato";
    yellow.style.backgroundColor = "yellow";
    blue.style.backgroundColor = "lightskyblue";
  }
  //these four event listers are how the user interacts with the game to let the computer know what buttons they pressed
  green.addEventListener('click', (event) => {
      humansequence.push(1);
      buttonclicks++;
      check();
      green.style.backgroundColor = "lightgreen";
        setTimeout(() => {clearColor();}, 300);
      })
  
  red.addEventListener('click', (event) => {
    humansequence.push(2);
    buttonclicks++;
      check();
      red.style.backgroundColor = "tomato";
       setTimeout(() => {clearColor();}, 300);
      })
  
  yellow.addEventListener('click', (event) => {
    humansequence.push(3);
    buttonclicks++;
      check();
      yellow.style.backgroundColor = "yellow";setTimeout(() => {clearColor();}, 300);
      })
  
  blue.addEventListener('click', (event) => {
    humansequence.push(4);
    buttonclicks++;
      check();
      blue.style.backgroundColor = "lightskyblue";
        setTimeout(() => {clearColor();}, 300);
      })

      //this statement triggers the failstate if the incorrect button is pressed, the game is then ended and the lights flash 5 times to let the player know
  function check() {
    if (humansequence[humansequence.length - 1] !== cpusequence[humansequence.length - 1]){
      //gamestart.style.backgroundColor = "red";
      gameFail();
    }
    if ((humansequence[humansequence.length - 1] == cpusequence[humansequence.length - 1])) {
    clearInterval(failtimer);
    failtimer = setInterval(gameFail,5200); 

    }

    //this if statement checks to see if the last button pressed was correct and if the amount of buttons pressed is equal to the amount flashed
    // if it is then the turn is progressed and the temporary values are updated so they can be used again
     if ((humansequence[humansequence.length - 1] == cpusequence[humansequence.length - 1])&&(humanturn==buttonclicks)) {
      clearInterval(failtimer);
      stoptimer = true;
      humansequence = [];
      cputurn = true;
      flash = 0; 
      humanturn++;
      buttonclicks=0;
      //gamestart.style.backgroundColor = "green";
      if(humanturn == 5){
        timer = timer-50;
      }
      if(humanturn == 9){
        timer = timer-50;
      }
      if(humanturn == 13){
        timer = timer-50;
      }
      if(humanturn == 17){  // the speedups are hardcoded because i wanted it to be possible to keep playing
                            // automating this would eventually make the game unbeatable thats why it caps at 50ms 
        timer = timer-50;
      }
      if(humanturn == 21){
        timer = timer-50;
      }
      if(humanturn == 25){
        timer = timer-50;
      }
      if(humanturn == 29){
        timer = timer-50;
      }
      document.getElementById("rightscore").innerHTML = humanturn;
      setTimeout(gameTurn,timer);
    }
}
/* this is the games failstate
when the wrong button is pressed , this ends the game and flashes every light to let the player know the game has ended */
function gameFail(){
  gamestart.style.backgroundColor = "red";
  clearInterval(failtimer);
  if(document.getElementById("rightscore").innerHTML>highscore){
highscore =humanturn;
    document.getElementById("leftscore").innerHTML = humanturn;;
    }
  
      setTimeout(()=>{flashColor();
        setTimeout(clearColor,300)},0);
        setTimeout(()=>{flashColor();
          setTimeout(clearColor,300)},500);
          setTimeout(()=>{flashColor();
            setTimeout(clearColor,300)},1000);
            setTimeout(()=>{flashColor();
              setTimeout(clearColor,300)},1500);
              setTimeout(()=>{flashColor();
                setTimeout(clearColor,300)},2000);
}
