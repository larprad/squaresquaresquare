// Global variables

let clickCount = 0;
let maxClicks;
let gameMode = "";
let sliderInitValue = "?";
let gameActive = false;
let squares = 0;
let color1 = "rgba(0, 255, 155, 0.99)"
let color2 = "rgba(255,0,155, 0.99)"
let color1count = 0;
let color2count = 0;
let openedDiv = [];
let level;
let backgroundTuto = "url('./art/tuto.svg')";
let backgroundColor = "rgb(40, 40, 40)";

// Creating grid area from user input value
const createCustomGrid = () => {
    const squareHeight = slider_asset.value;
    console.log("Generating a Square with " + squareHeight + " squares on the sides.")
    custom_Grid.innerHTML = "#squarecontent {display: grid; grid-template: repeat(" + squareHeight + ", 1fr) / repeat(" + squareHeight + ", 1fr)}";
}

// Generating an number square divs in a grid layout
const createDivsInSquare = (gamemode) => {
    createCustomGrid();
    squarebox.style.backgroundImage = "none";
    squarebox.style.background = backgroundColor;
    number = slider_asset.value;
    removeAllChildren(masterSquare);
    console.log("Creating " + number*number + " square(s)!")
    for (let j = 0; j < number; j++) {
        for (let i = 0; i < number; i++) {
            let myDiv = document.createElement("div");
            let idNumber = "x" + i + "y" + j;
            myDiv.setAttribute("id", idNumber);
            myDiv.setAttribute("class", "littleSquare flex");
            myDiv.style.backgroundColor = generateColor();
            myDiv.style.fontSize = 35/number + "vw"
            masterSquare.appendChild(myDiv);
            setDivContent(myDiv, 100);
        }
    }
}

//Draw squares of the same color than the clicked div
const playColor = mouseEvent => {
    if(gameActive) {
        const divId = getDivId(mouseEvent);
        const divContent = document.getElementById(divId).innerHTML;
        console.log(divId + " have been clicked!");
        if(divId.includes("x")) {    
            const x = getCoord(divId)[0];
            const y = getCoord(divId)[1];
            console.log ("x & y coord: " + x + " | " + y);
            let sideDivs = getSideDivs(x, y, divContent);
            bicolor(mouseEvent, sideDivs, divId);
            winCondition();  
        } else {
            console.log("But it does nothing!") // If user clicks between two divs
        }
    }
}

const bicolor = (mouseEvent, sideDivs, divId) => {
    const divColor = document.getElementById(divId).style.backgroundColor;
    switch(mouseEvent.type) {
        case "mouseover":
            console.log("I am here")
            sideDivs.norm.forEach(x => document.getElementById(x) ? document.getElementById(x).style.border = 50/slider_asset.value + "px solid " + lighten(switchTwoColor(document.getElementById(x).style.backgroundColor)) : null);
            document.getElementById(divId).style.border = 80/slider_asset.value + "px dashed " + lighten(switchTwoColor(divColor));
            document.getElementById(divId).style.zIndex = "5";
            break
        case "mouseout" :
            sideDivs.norm.forEach(x => document.getElementById(x) ? document.getElementById(x).style.border = "none" : null)
            document.getElementById(divId).style.border = "none";
            document.getElementById(divId).style.zIndex = "1";
            break
        case "click" :
            gameMode == "bicolor" ? clickCount += 1 : clickCount -= 1;
            click_counter.innerHTML = clickCount;
            sideDivs.norm.forEach(x => {
                if(document.getElementById(x)) { 
                    document.getElementById(x).style.backgroundColor = switchTwoColor(document.getElementById(x).style.backgroundColor, true);
                    divStateChange(x);
                } else {
                    null;
                }
            });
            divStateChange(divId);
            document.getElementById(divId).style.backgroundColor = switchTwoColor(divColor, true);
            sideDivs.opposite.forEach(x => document.getElementById(x) ? document.getElementById(x).style.border = 50/slider_asset.value + "px solid " + lighten(switchTwoColor(document.getElementById(x).style.backgroundColor)) : null);
            document.getElementById(divId).style.border = 80/slider_asset.value + "px dashed " + lighten(divColor);
            break
        case "default" :
            console.log("Unknown mouse event.")
            break;
    }   
}

const initGame = () => {
    clickCount = 0;
    color2count = 0;
    color1count = 0;
    displayDiv(prompt,"none");
    click_counter.innerHTML = clickCount;
    createDivsInSquare(gameMode);
}

const resetGame = () => {
    initGame();
    gameMode = "";
    gameActive = false;
    initSquareBox();
    displaySquareBox(false);
    buttonActive(bicolor_button, 0);
    buttonActive(challenge_button, 0);
    buttonActive(go_button, 0);
    reduceSlider(0);
    reduceChallenge(0);
    scaleDiv(bicolor_button, 1);
    scaleDiv(challenge_button, 1);
    displayDiv(clickDiv, "none");
    hideDisplayedDivs();
    document.getElementById("sliderDiv").style.transform = "translateY(0px)"
    for (let i = 0; i < challengeDivButtons.children.length; i++) {
        buttonSelected(challengeDivButtons.children[i], false);
    }
}

const restart = () => {
    initGame();
    gameActive = true;
    gameMode == "challenge" ? clickCount = maxClicks : null;
    click_counter.innerHTML = clickCount;
}

const selectMode = mouseEvent => {
    button = getDivId(mouseEvent);
    switch(button) {
        case "bicolor" :
            gameMode = "bicolor";
            displaySquareBox(true);
            displayDiv(sliderdiv, "flex");
            displayDiv(reset_button, "flex");
            scaleDiv(challenge_button, 0);
            buttonActive(bicolor_button, 1);
            clickPrompt.innerHTML = "Clicks";
            break
        case "challenge" :
            gameMode = "challenge";
            displaySquareBox(true);
            displayDiv(reset_button, "flex");
            displayDiv(challengeDiv, "flex");
            scaleDiv(bicolor_button, 0);
            buttonActive(challenge_button, 1);
            clickPrompt.innerHTML = "Clicks left";
            break
    }
}

const selectDifficulty = (mouseEvent) => {
    const difficulty = getDivId(mouseEvent);
    console.log(difficulty + " selected");
    for (let i = 0; i < challengeDivButtons.children.length; i++) {
        buttonSelected(challengeDivButtons.children[i], false);
    }
    // challengeDiv.children.forEach(x => buttonActive(x, 0));
    buttonSelected(document.getElementById(difficulty),1);
    switch (difficulty) {
        case "level1" :
            level = "Easy";
            slider_asset.value = 4;
            maxClicks = 25;
            break
        case "level2" :
            level = "Medium";
            slider_asset.value = 5;
            maxClicks = 30;
            break
        case "level3" :
            level = "Hard";
            slider_asset.value = 7;
            maxClicks = 50;
            break
        case "level4" :
            level = "Hell";
            slider_asset.value = 10;
            maxClicks = 65;
            break
        default :
            console.log("Difficulty unknown selected");
            break
    }
    initGame();
    clickCount = maxClicks;
    click_counter.innerHTML = clickCount;
    displayDiv(go_button, "flex");
}

const gameStart = () => {
    gameActive = true;
    displayDiv(go_button, "none");
    // displayDiv(sliderdiv, "none");
    enableSquareBox(true);
    displayDiv(restart_button, "flex");
    displayDiv(clickDiv, "flex");
    document.getElementById("sliderDiv").style.transform = "translateY(-130px)";
    reduceSlider(1);
    reduceChallenge(1);
}

const winCondition = (difficulty = "normal") => {
    switch (difficulty) {
        case "normal" :
            if((color1count <= 1) || (color2count <= 1)) {
                console.log("color1count = " + color1count);
                console.log("color2count = " + color2count);
                playerWin()
            } else if (clickCount == 0 && gameMode == "challenge") { 
                playerLoose()
            }
    }
}

const playerWin = () => {
    displayDiv(prompt,"flex");
    prompt.style.backgroundColor = "rgb(2, 192, 18)"
    document.getElementById("messageEnd").innerHTML = "You Win!";
    gameActive = false;
    removeSquareBorders();
}

const playerLoose = () => {
    displayDiv(prompt,"flex");
    prompt.style.backgroundColor = "rgb(255, 71, 86)"
    document.getElementById("messageEnd").innerHTML = "You Loose!";
    gameActive = false;
    removeSquareBorders();
}
