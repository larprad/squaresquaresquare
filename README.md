# Squaresquaresquare

A game about clicking on squares to make squares. Squares.

🕹️ https://larprad.github.io/squaresquaresquare/

## Context

Small puzzle game made in pure JavaScript over a week at the end of 2019 in order to practice the manipulations of the DOM.

## Presentation

A procedurally generated grid of squares is presented to the player who must, in order to win, ensure that only one pink or green square remains, or possibly that only one color remains on the grid ( which is more difficult!).

![Square victory](https://user-images.githubusercontent.com/59915248/95474199-23272380-0985-11eb-86fe-66ea9de9bbee.png)

By clicking on the squares, the player will change the color of this square as well as the color of certain adjacent blocks, this according to the symbol present on the clicked square:

* by clicking on a **O** symbol the squares above, below, to the left and to the right will switch color
* by clicking on the **X** symbol the squares located diagonally will switch color.

Once the block is clicked, in addition to its color, its symbol will change to become **X** or **O**.

![Square clicking](https://user-images.githubusercontent.com/59915248/95474541-81ec9d00-0985-11eb-9852-66a93e6b7f34.png)

2 game modes are available:

* **Freemode**, where it is possible to size the grid as desired.
* **Challenge**, where the player will have to choose between 4 difficulties. The size of the grid is set according to the difficulty as well as the maximum number of clicks to achieve victory.
