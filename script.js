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

const previousImg = document.createElement('img')
const currentImg = document.createElement('img')

let champions = new Array
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

fetch("championFull.json")
    .then((res) => res.json())
    .then((data) => {
        for(let i in data.data){
            champions.push(data.data[i])
        }

        generateStartingSetup(champions)

        moreBttn.addEventListener("click", e => {
            if(currentSkinCount >= previousSkinCount){
                nextChampion()
            } else lostGame()
        })

        lessBttn.addEventListener("click", e => {
            if(currentSkinCount <= previousSkinCount){
                nextChampion()
            } else lostGame()
        })
    })


function generateStartingSetup(champions){
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
    previousId = id
}

function appendPreviousChamp(champions){
    previousBg.style.backgroundImage = "url(img/splash/" + champions[id].id + "_0.jpg)"
    previousName.innerText = champions[id].name
    previousSkins.innerText = champions[id].skins.length -1
    previousImg.src = "img/loading/" + champions[id].id + "_0.jpg"
    previousPortrait.appendChild(previousImg)
}

function appendCurrentChamp(champions){
    currentBg.style.backgroundImage = "url(img/splash/" + champions[id].id + "_0.jpg)"
    currentName.innerText = champions[id].name
    currentSkinCount = champions[id].skins.length -1
    currentImg.src = "img/loading/" + champions[id].id + "_0.jpg"
    currentPortrait.appendChild(currentImg)
}

function nextChampion(){
    addPoints()
    currentBg.animate(moveToLeft, 500)
    setTimeout(() => {
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

function lostGame(){
    console.log("Not implemented yet")
}