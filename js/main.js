let elTestSection = document.querySelector(".testing-section");
let elMainBox = document.querySelector(".main-box");
let elImage = document.querySelector(".js-image");
let elAnswear = document.querySelectorAll(".js-answear");
let elCountWrong = document.querySelector(".number");
let elRestartBtn = document.querySelector(".restart");
let audioCorrect = new Audio('/audio/correct3-95630.mp3')
let audioWrong = new Audio('/audio/failfare-86009.mp3')
let audioGameOver = new Audio('/audio/audio_2023-03-02_20-23-50.ogg')
let audioYouWin = new Audio('/audio/audio_2023-03-02_20-14-19.ogg')
let time = 0;
let timeMin = 0;
let timeSec = 0;
let userLvl;
let corectAnswear = 0;
let WrongAnswear = 4;

let lvlObj= {
    easy: 1,
    medium: 2,
    hard: 3
}



//! THIS FUNCTION CHEKING TIME
function timeFunc() {
    time = userLvl == 1 ? 8 : userLvl == 2 ? 5 : 3;
    timeMin = time
    timeSec = 0
}

function timeRender(){
   if(timeSec > 0){
    timeSec--;
   } else{
    timeSec = 59;
    timeMin--;
   }
   if(timeMin == 0 && timeSec == 0){
    elTestSection.className = "d-none"
        document.querySelector(".restart-box").className = "d-block";
   }
    document.querySelector(".time").textContent = `TIME : ${timeMin} : ${timeSec}`;
}


function correctFunc(params) {
    let randonNumber = Math.floor(Math.random() * 96)
    elAnswear.forEach((valu, index) => {
        if (index == params) {
            valu.style.backgroundColor = "green";
            corectAnswear++
            audioCorrect.play()
            document.querySelector(".correct-answear").textContent = `Correct answear: ${corectAnswear}`;
            if(corectAnswear >=8){
                elTestSection.className = "d-none"
                audioYouWin.play()
            document.querySelector(".win-box").className = "d-block";
            }
            setTimeout(() => {
                valu.style.backgroundColor = "#ffc107";
                renderElement(roadSymbol.slice(randonNumber, randonNumber + 3))
            }, 500)
        } else {
            valu.classList.add("disabled");
            setTimeout(() => {
                valu.classList.remove("disabled");
            }, 500)
        }
    })
}

function wrongFunc(params) {
    let randonNumber = Math.floor(Math.random() * 96)
    elAnswear.forEach((valu, index) => {
        if (index == params) {
            valu.style.backgroundColor = "red";
            valu.style.color = "white";
            audioWrong.play()
            setTimeout(() => {
                valu.style.backgroundColor = "#ffc107";
                valu.style.color = "black";
                renderElement(roadSymbol.slice(randonNumber, randonNumber + 3))
                elCountWrong.textContent = `Number of
                    attempts: ${WrongAnswear--}`

            }, 500)
        } else {
            if(WrongAnswear==0){
               elTestSection.className = "d-none"
               document.querySelector(".restart-box").className = "d-block"
               audioGameOver.play()
            }
            valu.classList.add("disabled");
            setTimeout(() => {
                valu.classList.remove("disabled");
            }, 500)
        }
    })
}

function renderElement(arra) {
    let randonNumber = Math.floor(Math.random() * 2)
    arra.forEach((valu, index) => {
        elAnswear[index].textContent = valu.symbol_title
        if (index == randonNumber) {
            elImage.src = valu.symbol_img
            elAnswear[index].setAttribute("onclick", `correctFunc(${index})`)
        } else {
            elAnswear[index].setAttribute("onclick", `wrongFunc(${index})`)

        }
    })
}

// //! BU FUNKSIYA TEST QISMINI OCHIB BERADI
document.querySelectorAll(".js-main-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        let randonNumber = Math.floor(Math.random() * 96)
        document.querySelector(".level").textContent = `Level: ${btn.textContent.slice(0, btn.textContent.length - 7)}`
        
        elTestSection.className = "d-block"
        elMainBox.className = "d-none"
        renderElement(roadSymbol.slice(randonNumber, randonNumber + 3))
    });
})

document.addEventListener("click", (evt) => {
    if(evt.target.id === "lvl"){
        if(evt.target.dataset.lvl == "easy"){
            userLvl = lvlObj.easy;
        } else if(evt.target.dataset.lvl == "medium"){
            userLvl = lvlObj.medium;
        }else if(evt.target.dataset.lvl == "hard"){
            userLvl = lvlObj.hard;
        }
        timeFunc();

        document.querySelector(".time").textContent = `TIME : ${timeMin} : ${timeSec}`;
        setInterval(timeRender, 1000);
    }
})


