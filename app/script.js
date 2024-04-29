/** VARIABLES */

const listOfAllDice = document.querySelectorAll(".die"); //Devuelve una colleccion de elementos dados (div)
const scoreInputs = document.querySelectorAll("#score-options input"); //Devuelve una colleccion de elementos input
const scoreSpans = document.querySelectorAll("#score-options span"); //Devuelve una collecion de elementos span
const currentRoundText = document.getElementById("current-round"); //Devuelve 1 elemento span que contieen 1 numero
const currentRoundRollsText = document.getElementById("current-round-rolls"); //Devuelve 1 elemento span que contieen 1 numero
const totalScoreText = document.getElementById("total-score"); //Devuelve 1 elemento span que contiene numero
const scoreHistory = document.getElementById("score-history");  //Devuelve 1 elemento ol que contiene numero

//Botones
const rollDiceBtn = document.getElementById("roll-dice-btn"); //Botton Tirar dados
const keepScoreBtn = document.getElementById("keep-score-btn"); //Botton Seleccionar puntos
const rulesBtn = document.getElementById("rules-btn"); //botton Mostrar reglas
//Div de cuadro de reglas
    const rulesContainer = document.querySelector(".rules-container");