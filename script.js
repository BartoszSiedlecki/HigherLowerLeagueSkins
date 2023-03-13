const moreBttn = document.getElementById("more-btn")
const lessBttn = document.getElementById("less-btn")
const previousBg = document.getElementById("previous")
const previousName = document.getElementById("previous-name")
const previousSkins = document.getElementById("previous-skins")
const previousPortrait = document.getElementById("previous-portrait")
const currentBg = document.getElementById("current")
const currentName = document.getElementById("current-name")
const currentSkins = document.getElementById("current-skins")
const currentPortrait = document.getElementById("current-portrait")
const scoreContainer = document.getElementById("score")
const loseMenu = document.getElementById("lose-menu")
const playAgainBttn = document.getElementById("play-again")
const rankList = document.querySelectorAll("[data-img]")
const briefingText = document.getElementById("briefing-text")

const previousImg = document.createElement('img')
const currentImg = document.createElement('img')

let champions = new Array
let usedChampions = new Array
let id = 0
let previousId = 500
let previousSkinCount = 0
let currentSkinCount = 0
let score = 0

const moveToLeft = [
    { transform: "translateX(0)"},
    { transform: "translateX(-100%)"}
]

const fadeIn = [
    { opacity: 0},
    { opacity: 1}
]

const colour = [
    { filter: "grayscale(100%)"},
    { scale: "120%"},
    { filter: "grayscale(0%)"}
]

const rankMessages = [
    "Happens to the best! Good luck next time.",
    "You put up a good fight! I bet you can do even better.",
    "That's about halfway there. You're getting better!",
    "This is actually way better than average. I bet you have a massive skin collection.",
    "Most people would be satisfied by now, and you're somehow still going... I wonder what they are feeding you with.",
    "Everyone's dream... But you've made it a reality."
  ];
  
const rankTresholds = [0, 30, 60, 90, 120, 150];

fetch("championFull.json")
    .then((res) => res.json())
    .then((data) => {
        for(let i in data.data){
            champions.push(data.data[i])
        }

        generateStartingSetup(champions)

        moreBttn.addEventListener("click", e => {
            revealAnswer(() =>{
                if(currentSkinCount >= previousSkinCount){
                    nextChampion()
                } else lostGame(champions)
            }) 
        })

        lessBttn.addEventListener("click", e => {
            revealAnswer(() =>{
                if(currentSkinCount <= previousSkinCount){
                    nextChampion()
                } else lostGame(champions)
            }) 
        })
    })

function generateStartingSetup(champions){
    score = 0
    scoreContainer.innerHTML = 0
    loseMenu.style.opacity = 0
    loseMenu.style.pointerEvents = "none"
    usedChampions = []
    generateChampion(champions)
    previousSkinCount = champions[id].skins.length -1
    appendPreviousChamp(champions)
    generateChampion(champions)
    currentSkinCount = champions[id].skins.length -1
    appendCurrentChamp(champions)
}

function generateChampion(champions){
    id = Math.floor(Math.random() * 159)
            if(id === previousId){
                if(id === 0){
                    id++
                }else {
                    id--
                }
            }
    if(usedChampions.includes(champions[id].id)){
        generateChampion(champions)
    }
    usedChampions.push(champions[id].id)
    previousId = id
}

function appendPreviousChamp(champions){
    previousBg.style.backgroundImage = "url(img/splash/" + champions[id].id + "_0.jpg)"
    previousName.innerText = champions[id].name
    previousSkins.innerText = champions[id].skins.length -1
    previousSkinCount = champions[id].skins.length -1
    previousImg.src = "img/loading/" + champions[id].id + "_0.jpg"
    previousPortrait.appendChild(previousImg)
}

function appendCurrentChamp(champions){
    currentBg.style.backgroundImage = "url(img/splash/" + champions[id].id + "_0.jpg)"
    currentName.innerText = champions[id].name
    currentSkinCount = champions[id].skins.length -1
    currentSkins.innerHTML = "?"
    currentImg.src = "img/loading/" + champions[id].id + "_0.jpg"
    currentPortrait.appendChild(currentImg)
}

function nextChampion(){
    addPoints()
    currentBg.animate(moveToLeft, 500)
    setTimeout(() =>{
        appendPreviousChamp(champions)
        generateChampion(champions)
        appendCurrentChamp(champions)
        currentBg.animate(fadeIn, 500)
    }, 490)
}

function addPoints(){
    score++
    scoreContainer.innerText = score
    scoreContainer.animate(fadeIn, 500)
}

function revealAnswer(callback){
    let i = 1
    const interval = setInterval(() =>{
        currentSkins.innerHTML = i
        i++
        if (i > currentSkinCount) {
            clearInterval(interval)
            callback()
        }
    }, 100)
}


function lostGame(champions){
    setTimeout(() => {
        loseMenu.style.opacity = 1
        loseMenu.style.pointerEvents = "all"
        loseMenu.animate(fadeIn, 500)

        for(let i=0; i<rankMessages.length; i++){
            const rank = rankList[i]
            if(score >= rankTresholds[i]){
                rank.style.filter = "grayscale(0)"
                rank.animate(colour, 700 + i * 200)
                briefingText.innerHTML = rankMessages[i]
            }
        }

        playAgainBttn.addEventListener("click", () =>{
            generateStartingSetup(champions)
        })
    }, 500);
}