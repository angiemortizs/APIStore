const url = 'https://fakestoreapi.com/products';
const containerCards = document.getElementById("cardsContainer");


// Método que llama la API mediante la URL
const getAPI = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
};

let cart = []; // Carrito de compras vacío
let total = 0; // Total inicial del carrito

// Función para actualizar el carrito y el total
const updateCart = () => {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    cartCount.textContent = cart.length; // Actualizar número de productos
    cartTotal.textContent = total.toFixed(2); // Actualizar total con 2 decimales
};


// Función para añadir un producto al carrito
const addToCart = (clothe, event) => {
    event.preventDefault(); // Evita la recarga de la página
    cart.push(clothe); // Añadir producto al carrito
    total += clothe.price; // Sumar el precio del producto al total
    updateCart(); // Actualizar el carrito visualmente
};

const createClothes = (clothe) => {
    const card = document.createElement("div");
    card.classList.add("clothes_container");

    const imgClothes = document.createElement("img");
    imgClothes.src = clothe.image;
    imgClothes.alt = clothe.title;

    const divDescription = document.createElement("div");
    divDescription.classList.add("clothes_description");

    const priceClothe = document.createElement("h3");
    priceClothe.textContent = clothe.price;

    const titleClothe = document.createElement("p");
    titleClothe.textContent = clothe.title;

    const shoppingCart = document.createElement("button");
    shoppingCart.textContent = "Añadir al carrito";
    shoppingCart.addEventListener("click", (event) => addToCart(clothe, event)); // Evento para añadir al carrito


    containerCards.appendChild(card);
    card.appendChild(imgClothes);
    card.appendChild(divDescription);

    divDescription.appendChild(priceClothe);
    divDescription.appendChild(titleClothe);
    divDescription.appendChild(shoppingCart);
};

const getClothes = async () => {
    const data = await getAPI(url);
    data.forEach((clothe) => createClothes(clothe));
};

window.addEventListener("DOMContentLoaded", getClothes);

// const realizarCompraButton = document.getElementById("realizarCompra");

// realizarCompraButton.addEventListener("click", () => {
//     mostrarAlertaCompraExitosa();
// });

// const mostrarAlertaCompraExitosa = () => {
//     alert("¡Compra realizada con éxito! ¡Gracias por tu pedido!");
// };
