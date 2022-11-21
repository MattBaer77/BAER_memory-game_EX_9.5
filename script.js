let startButton = document.getElementsByClassName("startGameButton")[0];
let cardInput = document.getElementById("cardInput")

let numberOfCards;

startButton.addEventListener('submit', function(e){
  e.preventDefault();
  numberOfCards = cardInput.value;
  console.log(numberOfCards)
  if (e.target.tagName === "FORM") {
    if (numberOfCards < 2) {
      console.log("Select More Cards")
    }
  
    else if (numberOfCards % 2 !== 0) {
      console.log("Select An Even Number of Cards")
    }
    else {
      console.log("Valid Number Of Cards")
      cardMatchGame(numberOfCards);
      startButton.remove();
    }
  }
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}




function cardMatchGame (numberOfCards) {

  const gameContainer = document.getElementById("game");
  const subHeading = document.getElementById("subHead")

  // THIS IS FROM WHEN YOU TRIED TO DO IT WITH JUST NUMBERS, BUT THAT ENDED UP BEING MORE COMPLICATED AS YOU HAD TO COORILATE THEM TO SOME MISC VISUAL ATTRIBUTE, SO YOU DECIDED TO GENERATE RENDOM RGB COLORS.
  // const cardSet = [];

  // for (
  //   let i = 0;
  //   i < numberOfCards / 2;
  //   i++
  // ) {
  //   cardSet.push(i);
  //   cardSet.push(i);
  // }

  const COLORS = []

  function randomCOLORSInRGBGenerator (num){
    let uniqueColors = num / 2
    for (
      let i = 0;
      i < uniqueColors;
      i++
    ) {
      let newR = Math.floor(Math.random()* 255)+1;
      let newG = Math.floor(Math.random()* 255)+1;
      let newB = Math.floor(Math.random()* 255)+1;
      let newColor = `rgb(${newR},${newG},${newB})`;
      COLORS.push(newColor);
      COLORS.push(newColor);
    }
  }

  randomCOLORSInRGBGenerator(numberOfCards);


    
  // MATT USE NUMBERS TO GENERATE RANDOM COLORS, THEN SORT THEM INTO PAIRED COLOR ARRAY, COLORS WILL STILL CHANGE THE BACKGROUND COLOR OF THE CARDS AND YOU CAN GENERATE A LOT OF THEM

  //ORIGINAL COLORS ARRAY
  // const COLORS = [
  //   "rgb(255,0,0)",
  //   "rgb(255,0,0)",
  //   "blue",
  //   "blue",
  //   "green",
  //   "green",
  //   "orange",
  //   "orange",
  //   "purple",
  //   "purple",
  // ];
  //ORIGINAL COLORS ARRAY

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card


  // REWRITING THIS FUNCTION TO ALSO GET A UNIQUE ID TO CHECK FOR DUPLICAES
  // function createDivsForColors(colorArray) {
  //   for (let color of colorArray) {
  //     // create a new div
  //     const newDiv = document.createElement("div");

  //     // give it a class attribute for the value we are looping over
  //     newDiv.classList.add(color);

  //     // call a function handleCardClick when a div is clicked on
  //     newDiv.addEventListener("click", handleCardClick);

  //     // append the div to the element with an id of game
  //     gameContainer.append(newDiv);
  //   }
  // }
  //  REWRITING THIS FUNCTION TO ALSO GET A UNIQUE ID TO CHECK FOR DUPLICAES

  function createDivsForColors(colorArray) {
    for (
    let i = 0;
    i < colorArray.length;
    i ++
    ) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(colorArray[i]);
      newDiv.classList.add([i])

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  let cardsPicked = 0
  let previousCard = []
  let numClicks = 0;
  let unmatched = 0;
  let secondsElapsedSinceLoad = 0;

  let bestCounter = document.createElement("h2");
  let visibleCounter = document.createElement("h2");

  function createBestShower() {
    bestCounter.classList.add('bestCounter');
    if (localStorage.getItem("bestScore")) {
      bestCounter.textContent = localStorage.getItem("bestScore");
    }
    else {bestCounter.textContent = "No Best Score Yet"}
    subHeading.append(bestCounter);
  }

  function createClickCounter() {
    visibleCounter.classList.add('yourCounter');
    visibleCounter.textContent = numClicks;
    subHeading.append(visibleCounter);
  }

  function countUp(){
    let times = 0;
    let timer = setInterval(function(){
      times++
      secondsElapsedSinceLoad = times;
      if(unmatched === 3) {
        clearInterval(timer);
      }
    },1000)
  }

  createBestShower();

  createClickCounter();

  // TODO: Implement this function!
  function handleCardClick(event) {
    let clickedCard = event.target;
    let changeToColor = clickedCard.classList[0]
    let allDivs = document.getElementsByTagName('div');

    function changeColor(){
      clickedCard.style.backgroundColor = changeToColor;
    }

    function resetCards(){
      for (item of allDivs) {
        if(item.getAttribute("class") !== "beenMatched") {
        item.style.backgroundColor = "";
        cardsPicked = 0;
        }
        previousCard = []
      }
    }

    function setToMatch(){
      clickedCard.setAttribute("class", "beenMatched")
      previousCard.setAttribute("class", "beenMatched")
    }

    function cardsPickedIncramentUp() {
      cardsPicked = cardsPicked + 1;
    }

    function cardsPickedReset() {
      cardsPicked = 0;
    }

    function updatePrevious() {
      previousCard = clickedCard;
    }

    function calcUnMatchedRemain() {
      let counter = 0
      for (
        i = 0;
        i < allDivs.length;
        i ++
      )
      {
        if (allDivs[i].classList[0] !== "beenMatched") {
          counter = counter + 1;
        }
        unmatched = counter
      }
    }

    function countClicks() {
      numClicks = numClicks + 1;
      visibleCounter.textContent = numClicks;
    }

    function gameEnd() {
      console.log("You Win!")
      console.log(`It took you ${numClicks} tries!`)
      console.log(`It took you ${secondsElapsedSinceLoad} seconds!`)
      if (!localStorage.getItem("bestScore")) {
        localStorage.setItem("bestScore", numClicks);
      }
      else if (localStorage.getItem("bestScore") > numClicks) {
        localStorage.setItem("bestScore", numClicks);
      }
      const newGameForm = document.createElement("form");
      newGameForm.classList.add('newGameForm')
      const newGameButton = document.createElement("button");
      newGameButton.textContent = "a g a i n";
      newGameButton.classList.add('newGame');
      newGameButton.addEventListener('click', function(e){
        e.preventDefault();
        newGameButton.remove();
        removeAllChildNodes(gameContainer);
        removeAllChildNodes(subHeading);
        cardMatchGame(numberOfCards);
      })
      document.body.append(newGameForm);
      newGameForm.append(newGameButton);
    }

    //TIMER FROM PREVIOUS HOMEWORK (DIDNT USE setTimeout)
    function countDownReset(time){
      let timer = setInterval(function(){
        time--;
        if(time <= 0){
          clearInterval(timer);
          resetCards();
        }
        else {
        }

      },1000)
    }
    //TIMER FROM PREVIOUS HOMEWORK (DIDNT USE setTimeout)

    calcUnMatchedRemain();
    console.log(unmatched);
    console.log("You picked: ", clickedCard);
    console.log("Your last pick was:", previousCard);
    console.log("This is pick number: ", cardsPicked);

    if (cardsPicked > 1) {} // If there are two cards currently picked / animating - so you cannot pick more than 2

    else if (clickedCard.className === "beenMatched"){ // If the card has already been matched.
      console.log("Invalid Pick on 1")
      console.log("");
    }

    else if (cardsPicked === 0) {
      cardsPickedIncramentUp();
      changeColor();
      updatePrevious();
      console.log("first pick");
      console.log(previousCard);
      console.log("");
    }

    else if (clickedCard.classList[1] === previousCard.classList[1]) {
      console.log("Invalid Pick on 2");
    }

    else if ((clickedCard.classList[0] === previousCard.classList[0])) {
      cardsPickedIncramentUp();
      changeColor();
      setToMatch();
      cardsPickedReset();
      countClicks();
      console.log(unmatched);
      if (unmatched === 5) {gameEnd()};
      console.log(previousCard)
      console.log("")
    }
    else {
    cardsPickedIncramentUp()
    changeColor()
    countDownReset(1)
    countClicks()
    console.log(previousCard)
    console.log("")
    }
    
  }

  countUp();
  console.log(unmatched);

  // when the DOM loads
  createDivsForColors(shuffledColors);

}

/* */