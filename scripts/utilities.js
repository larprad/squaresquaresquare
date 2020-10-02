const generateColor = () => {
    let color
    if(Math.floor(Math.random()*10 > 5)) {
        color = color1;
        color1count += 1;
    } else {
        color = color2;
        color2count += 1;
    }
    return color;
}

const switchTwoColor = (color, count = false) => {
    let output;
    if(color == color1) {
        output = color2;
        count ? color1count -= 1 : null;
        count ? color2count += 1 : null;
    } else {
        output = color1;
        count ? color2count -= 1 : null;
        count ? color1count += 1 : null;
    }
    return output
}

const lighten = (color) => {
    return color.replace("0.99)", "0.8)")
}

// Remove Children of Element
const removeAllChildren = element => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
    console.log("Clearing children.")
}

// Return Id of element where the mouse have fired
const getDivId = mouseEvent => {
    return mouseEvent.target.getAttribute("id");
}

// Return x & y array coordinate from string ID "x..y..""
const getCoord = id => {
    const yIndex = id.indexOf("y");
    let x = id.slice(1, yIndex);
    let y = id.slice(yIndex + 1);
    x = parseInt(x, 10);
    y = parseInt(y, 10);
    return [x, y]
}

// Return side Ids depending on pattern input
const getSideDivs = (divX, divY, pattern) => {
    console.log("Getting divs for " + pattern + " pattern.");
    let divRight;
    let divLeft;
    let divUp;
    let divDown;
    let divRightOp;
    let divLeftOp;
    let divUpOp;
    let divDownOp;
    switch (pattern) {
        case "o" :
                divRight = "x" + (divX + 1) + "y" + divY;
                divLeft = "x" + (divX - 1) + "y" + divY;
                divUp = "x" + divX + "y" + (divY-1);
                divDown = "x" + divX + "y" + (divY + 1);

                divRightOp = "x" + (divX + 1) + "y" + (divY + 1);
                divLeftOp = "x" + (divX + 1) + "y" + (divY - 1);
                divUpOp = "x" + (divX - 1) + "y" + (divY + 1);
                divDownOp = "x" + (divX - 1) + "y" + (divY - 1);
                break;
        case "x" :
                divRight = "x" + (divX + 1) + "y" + (divY + 1);
                divLeft = "x" + (divX + 1) + "y" + (divY - 1);
                divUp = "x" + (divX - 1) + "y" + (divY + 1);
                divDown = "x" + (divX - 1) + "y" + (divY - 1);

                divRightOp = "x" + (divX + 1) + "y" + divY;
                divLeftOp = "x" + (divX - 1) + "y" + divY;
                divUpOp = "x" + divX + "y" + (divY-1);
                divDownOp = "x" + divX + "y" + (divY + 1);
                break;
        default :
                console.log("Not able to get those divs!")
                break;
    }
    console.log("Div Right: " + divRight);
    console.log("Div Left: " + divLeft);
    console.log("Div Up: " + divUp);
    console.log("Div Down: " + divDown);
    return {norm : [divUp, divRight, divDown, divLeft], opposite : [divUpOp, divRightOp, divDownOp, divLeftOp]}
}

const divStateChange = (divId) => {
    document.getElementById(divId).innerHTML == "o" ? document.getElementById(divId).innerHTML = "x" : document.getElementById(divId).innerHTML = "o";
}

// Create content for the Div : "+" or "x" depending on coeff (from 0 to 100%).
const setDivContent = (div, coeff) => {
    const random = Math.floor(Math.random()*coeff);
    random > 50 ? div.innerHTML = "x" : div.innerHTML = "o";
}

const initSquareBox = () => {    
    slider_asset.value = 0;
    slider_value.innerHTML = sliderInitValue;
    removeAllChildren(masterSquare);
    enableSquareBox(false);
}

const enableSquareBox = (bool) => {
    if (bool) {
        squarebox.style.filter = "grayscale(0)";
        squarebox.style.pointerEvents = "auto";
        gameActive = true;
    } else {
        // squarebox.style.filter = "grayscale(1)";
        gameActive = false;
        squarebox.style.pointerEvents = "none";
    };
}

// Display or not SquareBox
const displaySquareBox = (bool) => {
    if (bool) {
        squarebox.style.display = "block";
        squarebox.style.backgroundImage = backgroundTuto;
        introtext.style.display = "none";
    } else {
        squarebox.style.display = "none";
        introtext.style.display = "flex";
    }
}

const displayDiv = (element, display) => {
    element.style.display = display;
    openedDiv.push(element);
}

const hideDisplayedDivs = () => {
    openedDiv.forEach(x => x.style.display = "none");
    openedDiv = [];
}

// Show button active or not
const buttonActive = (element, bool) => {
    bool ? element.setAttribute("class", "button button_selected") : element.classList.remove("button_selected");
}

const buttonSelected = (element, bool) => {
    bool ? element.style.color = "cornsilk" : element.style.color = "rgba(40, 40, 40, 0.308)";
}

const scaleDiv = (element, scale) => {
    element.style.transform = "scale(" + scale + ")"
}

const reduceSlider = (bool) => {
    if (bool) {
        slider_asset.style.opacity = 0;
        slider_value.style.transform = "translateY(-50px)";
    } else {
        slider_asset.style.opacity = 1;
        slider_value.style.transform = "translateY(0)";
    }
}

const reduceChallenge = (bool) => {
    if (bool) {
        challengeDivButtons.style.visibility = "hidden";
        displayMode.innerHTML = level;
        displayMode.setAttribute("class","modeSelected flex")
    } else {
        challengeDivButtons.style.visibility = "visible";
        displayMode.innerHTML = "";
        displayMode.removeAttribute("class","modeSelected")
    }
}

const removeSquareBorders = () => {
    const children = square_content.children;
    for(let i = 0; i < children.length; i++) {
        children[i].style.border = "none"
    }
}