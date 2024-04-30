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
//FUNCION Actualiza el valor de rolls y round
const updateStats = () => { 
    currentRoundRollsText.textContent = rolls
    currentRoundText.textContent = round;
}

//FUNCION Seleccionar option y sumar puntuacion
const updateRadioOption = (optionNode, score) => {
    scoreInputs[optionNode].disabled = false;
    scoreInputs[optionNode].value = score;
    scoreSpans[optionNode].textContent = `, score = ${score}`
}

//FUNCION para dectectar los duplicados y mostrar la puntacion
const getHighestDuplicates = (arr) =>{
    const counts = {}
    for (const num of arr) {
        if (counts[num]) {
            counts[num]++;
        } else {
            counts[num] = 1
        }
    }
    let highestCount = 0;
    for (const num of arr){
        const count = counts[num]
        if(count >= 3 && count > highestCount ){
            highestCount = count;
        }
        if (count >= 4 && count > highestCount){
            highestCount = count;
        }
    }
    const sumOfAllDice = diceValuesArr.reduce((a,b)=> a + b ,0);
    if (highestCount >= 4) {
        updateRadioOption(1,sumOfAllDice);
    }
    if (highestCount >= 3) {
        updateRadioOption(0,sumOfAllDice);
    }
    updateRadioOption(5,0);
}

//FUCION PARA RESETEAR INPUTS Y SPAN
const resetRadioOption = () =>{
    scoreInputs.forEach(input =>{
        input.disabled = true;
        input.checked = false;
    });
    scoreSpans.forEach(span=>{ 
        span.textContent = "";
    });
}


//Funcion para seguimientos de los puntos en las 6 rondas
const updateScore = (selectedValue,achieved) => {
    totalScore += parseInt(selectedValue);
    totalScoreText.textContent = totalScore;
    scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`
}

//Funcion para reset al juego 
const resetGame = () =>{
    diceValuesArr = [0,0,0,0,0];
    score = 0;
    rolls = 0;
    totalScore = 0;
    round = 1;
    listOfAllDice.forEach((dice,index) =>{
        dice.textContent = diceValuesArr[index];
    });
    totalScoreText.textContent = totalScore;
    scoreHistory.innerHTML = "";
    currentRoundRollsText.textContent = rolls;
    currentRoundText.textContent = round;
    resetRadioOption();
}

//EVENTO botton Tirar dados
rollDiceBtn.addEventListener("click",()=>{
    if(rolls === 3){
     alert("Has hecho tres tiradas esta ronda. Por favor, seleccione una puntuación");
     }else{
         rolls++
         resetRadioOption();
         rollDice();
         updateStats();
         getHighestDuplicates(diceValuesArr);
     }
 }) 
 

//EVENTO Mostrar y ocultar div con reglas
rulesBtn.addEventListener("click", ()=>{
    isModalShowing = !isModalShowing;
    if (isModalShowing) {
        rulesBtn.textContent = "Ocultar Rules";
        rulesContainer.style.display = "block";
    }else{
        rulesBtn.textContent = "Mostrar Rules";
        rulesContainer.style.display = "none";
    };
});


//EVENTO Seleccionar puntuacion
keepScoreBtn.addEventListener("click",()=>{
    let selectedValue;
    let achieved;
    for (const radioButton of scoreInputs) {
        if(radioButton.checked){
            selectedValue = radioButton.value;
            achieved = radioButton.id;
            break;
        };
    };
    if (selectedValue) {
        rolls = 0;
        round ++;
        updateStats();
        resetRadioOption();
        updateScore(selectedValue,achieved);
        if (round > 6) {
            setTimeout(()=>{
                alert(`Game Over! Your total score is ${totalScore}`);
                resetGame();
            },500)
        }
    }else{
        alert("Seleccione una opción o tire los dados");
    };
});