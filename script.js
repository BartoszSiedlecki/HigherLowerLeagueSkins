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

fetch("championFull.json")
    .then((res) => res.json())
    .then((data) => {
        for(let i in data.data){
            champions.push(data.data[i])
        }

        generateStartingSetup(champions)

        moreBttn.addEventListener("click", e => {
        revealAnswer(1)  
            setTimeout(() =>{
                if(currentSkinCount >= previousSkinCount){
                    nextChampion()
                } else lostGame(champions)
            }, 2000)
        })

        lessBttn.addEventListener("click", e => {
            revealAnswer(1)  
            setTimeout(() =>{
                if(currentSkinCount <= previousSkinCount){
                    nextChampion()
                } else lostGame(champions)
            }, 2000)
        })
    })


function generateStartingSetup(champions){
    score = 0
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

function revealAnswer(i){
    setTimeout(function() {
        currentSkins.innerHTML = i
        i++;
        if (i <= currentSkinCount) {
          revealAnswer(i);
        }
      }, 100)
}

function lostGame(champions){
    loseMenu.style.opacity = 1
    loseMenu.style.pointerEvents = "all"
    loseMenu.animate(fadeIn, 500)
    rankList.forEach(rank =>{
        if(score > 0){
            if(rank.dataset.img === "bronze"){
                rank.style.filter = "grayscale(0)"
                rank.animate(colour, 700)
                briefingText.innerHTML = "Happens to the best! Good luck next time."
            }
        }
        if(score >= 30){
            if(rank.dataset.img === "silver"){
                rank.style.filter = "grayscale(0)"
                rank.animate(colour, 900)
                briefingText.innerHTML = "You put up a good fight! I bet you can do even better."
            }
        }
        if(score >= 60){
            if(rank.dataset.img === "gold"){
                rank.style.filter = "grayscale(0)"
                rank.animate(colour, 1100)
                briefingText.innerHTML = "That's about halfway there. You're getting better!"
            }
        }
        if(score >= 90){
            if(rank.dataset.img === "platinum"){
                rank.style.filter = "grayscale(0)"
                rank.animate(colour, 1300)
                briefingText.innerHTML = "This is actually way better than average. I bet you have a massive skin collection."
            }
        }
        if(score >= 120){
            if(rank.dataset.img === "diamond"){
                rank.style.filter = "grayscale(0)"
                rank.animate(colour, 1500)
                briefingText.innerHTML = "Most people would be satisfied by now, and you're somehow still going... I wonder what they are feeding you with."
            }
        }
        if(score >= 150){
            if(rank.dataset.img === "challanger"){
                rank.style.filter = "grayscale(0)"
                rank.animate(colour, 1700)
                briefingText.innerHTML = "Everyone's dream... But you've made it a reality."
            }
        }
    })
    playAgainBttn.addEventListener("click", () =>{
        generateStartingSetup(champions)
    })
}

