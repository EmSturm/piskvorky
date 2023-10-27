import { findWinner } from "https://unpkg.com/piskvorky@0.1.4";

const allButtons = document.querySelectorAll(".button");

let currentPlayer = "circle";

const convertToSymbol = (button) => {
  if (button.classList.contains("board__field--circle")) {
    return "o";
  } else if (button.classList.contains("board__field--cross")) {
    return "x";
  } else {
    return "_";
  }
};
async function makeCircleAndCross(event) {
  if (currentPlayer === "circle") {
    event.target.classList.add("board__field--circle");
    currentPlayer = "cross";
    document.querySelector("#play__sign").src = "circle.svg";
    document.querySelector("#play__sign").alt = "právě hraje kroužek";
    // allButtons.disabled = true
    const allButtonsArray = Array.from(allButtons);
    let symbolsArray = allButtonsArray.map((button) =>
      convertToSymbol(button)
    );
    console.log(symbolsArray);

    // potom co zahrálo kolečko, zkontrolovat vítězu
    let result = findWinner(symbolsArray);

    if (result === "x") {
      alert("Vyhrál křížek!");
    } else if (result === "o") {
      alert("Vyhrálo kolečko!");
    } else if (result === "tie") {
      alert("Nerozhodně!");
    } else if (result === "null") {
      alert("Hra ještě probíhá!");
    }

    // zajistit, aby se nedalo klikat na herní plochu
    // allButtons.disabled = true

    // Volám API
    const response = await fetch(
      "https://piskvorky.czechitas-podklady.cz/api/suggest-next-move",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          board: symbolsArray,
          player: "x",
        }),
      }
    );

    const data = await response.json();
    const { x, y } = data.position; // x bude 0 a y bude 1, protože to je jediné volné políčko. x 0 odpovídá prvnímu sloupci a y 1 druhému řádku.
    const field = symbolsArray[x + y * 9]; // Najde políčko na příslušné pozici.

    console.log("data", data);

    // vykrelit tah křížku

    let btnRowsElm = document.querySelectorAll(".button__row");

    console.log(btnRowsElm);

    let btnElements = btnRowsElm[y].querySelectorAll(".button");

    console.log(btnElements)

    const buttonReal = btnElements[x]

    buttonReal.classList.add("board__field--cross");
    currentPlayer = "circle";
    document.querySelector("#play__sign").src = "cross.svg";
    document.querySelector("#play__sign").alt = "právě hraje křížek";

    symbolsArray = allButtonsArray.map((button) =>
      convertToSymbol(button)
    );
    console.log(symbolsArray);
    //znovu zkontrolovat vítěze
    result = findWinner(symbolsArray);

    if (result === "x") {
      alert("Vyhrál křížek!");
    } else if (result === "o") {
      alert("Vyhrálo kolečko!");
    } else if (result === "tie") {
      alert("Nerozhodně!");
    } else if (result === "null") {
      alert("Hra ještě probíhá!");
    }
    //povolit, aby se dalo klikat na herní plochu
  } else {
    event.target.classList.add("board__field--cross");
    currentPlayer = "circle";
    document.querySelector("#play__sign").src = "cross.svg";
    document.querySelector("#play__sign").alt = "právě hraje křížek";
    document.querySelectorAll(".button").disabled = true;
  }
  event.target.disabled = true;
}

allButtons.forEach((button) => {
  button.addEventListener("click", makeCircleAndCross);
});
