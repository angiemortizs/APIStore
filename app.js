const url = 'https://fakestoreapi.com/products'
const containerCards = document.getElementById("cardsContainer")

// Metodo que llama la API mediante la URL
const getAPI = async (URL) => {
    const response = await fetch(URL)
    const data = await response.json()
    return data
} 

const createClothes = (clothe) => {
    const card = document.createElement ("div")
    card.classList.add("clothes_container")

    const imgClothes = document.createElement("img")
    imgClothes.src = clothe.image
    imgClothes.alt = clothe.title

    const divdescription = document.createElement("div")
    divdescription.classList.add("clothes_container")

    const descriptionClothe = document.createElement("h3")
    descriptionClothe.textContent = clothe.description

    const priceClothe = document.createElement("h3")
    priceClothe.textContent = clothe.price

    const shoppingCart = document.createElement("button")
    shoppingCart.textContent = "Comprar"

    containerCards.appendChild(card)
    card.appendChild(imgClothes)
    card.appendChild(divdescription)

    divdescription.appendChild(priceClothe)
    divdescription.appendChild(shoppingCart)
    divdescription.appendChild(descriptionClothe)
}   

const getClothes = async () => {
    const data = await getAPI(url)
    data.forEach(clothe => createClothes(clothe))
}

window.addEventListener("DOMContentLoaded", getClothes)

