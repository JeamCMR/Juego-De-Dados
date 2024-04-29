/** VARIABLES */

const listOfAllDice = document.querySelectorAll(".die"); //Devuelve una colleccion de elementos dados (div)
const scoreInputs = document.querySelectorAll("#score-options input"); //Devuelve una nodelist de elementos input
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
const rulesContainer = document.querySelector(".rules-container"); //Devuelve un elemento div que conteien varios elementos


let isModalShowing = false;  //variable que controla Mostrar y ocultar reglas 
let diceValuesArr = [] //Controla el seguimiento de resultados de los datos
let rolls = 0; 
let score = 0;
let totalScore = 0;
let round = 1;

//Eventos y funciones

//Funcion Tirar dados
const rollDice = () => {
    diceValuesArr = [];
    for (let i = 0; i < 5; i++) {
        const randomDice = Math.floor(Math.random() * 6) + 1;
        diceValuesArr.push(randomDice);

    };
    listOfAllDice.forEach((dice,index) => {
        dice.textContent = diceValuesArr[index];
    });
}

//Evento botton Tirar dados
rollDiceBtn.addEventListener("click",()=>{
   if(rolls === 3){
    alert("Has hecho tres tiradas esta ronda. Por favor, seleccione una puntuación");
    }else{
        rolls++
        rollDice();
    }
}) 

//Mostrar y ocultar div con reglas
rulesBtn.addEventListener("click", ()=>{
    isModalShowing = !isModalShowing;
    if (isModalShowing) {
        rulesBtn.textContent = "Hide Rules";
        rulesContainer.style.display = "block";
    }else{
        rulesBtn.textContent = "Show Rules";
        rulesContainer.style.display = "none";
    }
});

