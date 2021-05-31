const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const container = document.querySelector("#dog-image-container")
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ulContainer = document.querySelector("#dog-breeds")
const dropDown = document.querySelector("#breed-dropdown")
let breedsArray = []

ulContainer.addEventListener('click', handleClick)
dropDown.addEventListener('change', handleChange)

function dogImgs() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => {
        const imgs = images.message
        let imageArray = imgs.map((img) => {
            let i = `<img src=${img}>`
            return i
        })
        imageArray.forEach(element => {
            container.innerHTML += element
        })
    })
}

function getBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        breedsArray = Object.keys(breeds.message)
        let breedsLi = breedsArray.map((breed) => {
            let li = `<li>${breed}</li>`
            return li
        })
        breedsLi.forEach((breedLi) => {
            ulContainer.innerHTML += breedLi
        })
    })
}

function handleClick(e) {
    if(e.target.nodeName === 'LI') {
        if (e.target.style.color === 'green') {
            e.target.style.color = 'black'
        } else {
            e.target.style.color = 'green'
        }
    }
}

function handleChange(e) {
    const letter = e.target.value
    const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter))
    
    let filLi = filteredBreeds.map((breed) => {
        let li = `<li>${breed}</li>`
        return li
    })
    ulContainer.innerHTML = ''
    filLi.forEach((filtLi) => {
        ulContainer.innerHTML += filtLi
    })
}

dogImgs();
getBreeds();