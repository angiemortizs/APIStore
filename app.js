const url = 'https://fakestoreapi.com/products';
const containerCards = document.getElementById("cardsContainer");

let cart = []; // Arreglo que almacena productos añadidos al carrito
let total = 0; // Número que mantendrá el total de la compra acumulada.

// FUNCION PARA OBTENER LOS DATOS DE LA API(asíncrona, espera una promesa)
const getAPI = async (URL) => { 
    const response = await fetch(URL); //Se usa METODO Fetch  para hacer una solicitud HTTP a una URL, 
    //es decir, se solicita información de la API.
    const data = await response.json(); //Convierte la respuesta en JSON.
    return data; //Devuelve los datos (osea la lista)
};

// VARIABLES DEL MODAL CARRITO.
const cartModal = document.getElementById("cartModal"); //Muestra el contenido del carrito
const openCartBtn = document.getElementById("openCart"); //Botón que abre la modal
const closeCartBtn = document.getElementById("closeCart"); //Botón que cierra la modal

openCartBtn.addEventListener("click", () => { 
    cartModal.classList.toggle("show"); // ALTERNA LA PRESENCIA DE LA CLASE SHOW
});

closeCartBtn.addEventListener("click", () => {// Se agrega un evento al botón de cerrar carrito
    cartModal.classList.remove("show");//Cuando se hace clic, en este caso se ELIMINA la clase SHOW ocultando el modal.
});

// FUNCION PARA ACTUALIZAR CARRITO EN EL MODAL.
const updateCart = () => {
    const cartCount = document.getElementById("cart-count");//Cantidad de artículos en el carrito
    const cartTotal = document.getElementById("cart-total");//Total de los precios
    const cartTotalModal = document.getElementById("cart-total-modal");//Muestra el total pero en el modal
    const cartItems = document.getElementById("cartItems");//El contener ul donde se listan los productos en el carrito.

    cartCount.textContent = cart.length; // Actualizar el contenido de cartCount para que se refleje el numero de productos en el carrito.
    cartTotal.textContent = total.toFixed(2); // Actualizar total arriba (HEADER)(Y es un formato numérico con dos decimales)
    cartTotalModal.textContent = total.toFixed(2); // Actualizar total en el modal

    cartItems.innerHTML = ""; // Se vacía primero carItems para que no se repitan los elementos en el carrito.

    cart.forEach((clothe, index) => { //Se itera cada producto. Y se obtiene su índice.
        const li = document.createElement("li");//Se crea un elemento de lista para cada producto.
        li.textContent = `${clothe.title} - $${clothe.price.toFixed(2)}`;//Se establece que en la lista va a estar el titulo y el precio.
        
        const removeButton = document.createElement("button"); //Se crea botón para eliminar productos del carrito.
        removeButton.textContent = "Eliminar";//Se establece el texto que aparece en el botón
        removeButton.addEventListener("click", (event) => removeFromCart(index, event)); // Evento para eliminar al dar click
        li.appendChild(removeButton);//Se añade el botón al elemento de la lista, que reperesenta cada producto. Así cada uno tiene su propio botón.
        
        cartItems.appendChild(li);
    });
};

// FUNCION PARA AÑADIR UN PRODUCTO AL CARRITO
const addToCart = (clothe, event) => { //Recordaar la funcion de flecha
    event.preventDefault();//Evitar algun comportamiento por defecto del evento
    cart.push(clothe); //Se usa el método push para agregar el objeto(Clothe) al array CART. Cada que se hace click, se añade a la lista de productos.
    total += clothe.price;//Incrementa el precio.
    updateCart();//Se actualiza el total y el valor a pagar en la lista.
};

// FUNCION PARA ELIMINAR UN PRODUCTO DEL CARRITO
const removeFromCart = (index, event) => {
    event.preventDefault();//Previene acción por defecto del evento
    const removedProduct = cart.splice(index, 1)[0];//index es el índice del producto que se quiere eliminar. splice modifica el 
    //array original y devuelve un array con el/los elementos eliminados.
// Aquí, tomamos solo el primer elemento [0] ya que estamos eliminando solo uno.
    total -= removedProduct.price;//Se reduce el total, se resta el precio del producto eliminado.
    updateCart();//Actualiza el carrito.
};

// FUNCION PARA FINALIZAR COMPRA
const finalizePurchaseBtn = document.getElementById("finalizePurchase");//Se llama el elemto que está en el DOM, y se almacena en la 
//constante finalizePurchase
finalizePurchaseBtn.addEventListener("click", () => {//Se llama el evento para cuando se haga click, con funcion de flecha para deinir que va a pasar
    alert("Compra finalizada, gracias por preferirnos.");//Se muestra la alerta con el mensaje
});

// Crear las cards de productos.
const createClothes = (clothe) => {
    const card = document.createElement("div");
    card.classList.add("clothes_container");

    const imgClothes = document.createElement("img");
    imgClothes.src = clothe.image;
    imgClothes.alt = clothe.title;

    // Contenedor de texto y detalles (sin descripción)
    const textContainer = document.createElement("div");
    textContainer.classList.add("text_container");

    const nameClothes = document.createElement("h3");
    nameClothes.textContent = clothe.title;

    const priceClothes = document.createElement("p");
    priceClothes.textContent = `$${clothe.price}`;

    const button = document.createElement("button");
    button.textContent = "Añadir al carrito";
    button.addEventListener("click", (event) => addToCart(clothe, event));

    card.appendChild(imgClothes);
    textContainer.appendChild(nameClothes);
    textContainer.appendChild(priceClothes);
    textContainer.appendChild(button);
    card.appendChild(textContainer);

    containerCards.appendChild(card);
};

const getClothes = async () => {
const data = await getAPI(url);
data.forEach((clothe) => createClothes(clothe));
    
};

window.addEventListener("DOMContentLoaded", getClothes);