console.log("THIS IS THE CART SCRIPT");

// ==========================
// CART SYSTEM
// ==========================


// Get saved cart or create empty one

let cart = JSON.parse(localStorage.getItem("cart")) || [];





// Add item to cart

function addToCart(name, price, quantity = 1){
console.log("ADDING PRODUCT:", name);
    let existingItem = cart.find(function(item){

        return item.name === name;

    });



    if(existingItem){

        existingItem.quantity += quantity;

    } else {


        let item = {

            name: name,
            price: price,
            quantity: quantity

        };


        cart.push(item);

    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    updateCartCount();


    alert(name + " added to cart 🌸");


}







// New product system for flowers

function addProductToCart(button, productName){

    let card = button.parentElement;

    let option = card.querySelector(".product-option").value;

    let details = option.split("|");

    let price = Number(details[0]);

    let choice = details[1];

    let quantityBox = card.querySelector(".quantity");

    let quantity = 1;

    if(quantityBox){
        quantity = Number(quantityBox.value);
    }

    addToCart(
        productName + " - " + choice,
        price,
        quantity
    );
}








// Show cart items

function displayCart(){


    let cartBox =
    document.getElementById("cart-items");


    let totalBox =
    document.getElementById("cart-total");



    if(!cartBox){

        return;

    }



    cartBox.innerHTML = "";



    let total = 0;



    if(cart.length === 0){


        cartBox.innerHTML =
        "<p>Your cart is empty.</p>";


    }



    cart.forEach(function(item,index){



        let itemDiv =
        document.createElement("div");



        itemDiv.className =
        "cart-item";



        itemDiv.innerHTML = `

        <p>

        ${item.name}

        x${item.quantity}

        -

        $${item.price * item.quantity}

        </p>


       <button class="remove-button" onclick="removeItem(${index})">
         Remove
     </button>


        `;



        cartBox.appendChild(itemDiv);



        total += item.price * item.quantity;


    });



    if(totalBox){

        totalBox.innerHTML =
        "$" + total;

    }


}








// Remove item

function removeItem(index){


    cart.splice(index,1);



    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );



    displayCart();

    updateCartCount();


}








// Cart number icon

function updateCartCount(){


    let count = 0;



    cart.forEach(function(item){


        count += item.quantity;


    });



    let badge =
    document.getElementById("cart-count");



    if(badge){

        badge.innerHTML = count;

    }


}








// Send order email
function sendOrder(){

    let flowersBox = document.getElementById("flowers");
    let priceBox = document.getElementById("price");
    let colourBox = document.getElementById("colour");

    let total = 0;

    cart.forEach(function(item){
        total += item.price * item.quantity;
    });


    if(flowersBox){
        flowersBox.value = cart.map(item =>
            item.quantity + "x " + item.name
        ).join(", ");
    }


    if(priceBox){
        priceBox.value = "$" + total;
    }


    if(colourBox){
        colourBox.value = cart.map(item => item.colour || "").join(", ");
    }

}

function addCustomBouquet() {

    let flowers = [];

    if(document.getElementById("rose").checked){
        flowers.push("Roses");
    }

    if(document.getElementById("hydrangea").checked){
        flowers.push("Hydrangeas");
    }

    if(document.getElementById("lily").checked){
        flowers.push("Lilies");
    }

    if(document.getElementById("tulip").checked){
        flowers.push("Tulips");
    }

    if(document.getElementById("lavender").checked){
        flowers.push("Lavender");
    }

    if(document.getElementById("sunflower").checked){
        flowers.push("Sunflowers");
    }

    if(document.getElementById("poppy").checked){
        flowers.push("Poppies");
    }

     if(document.getElementById("cherry blossom").checked){
        flowers.push("Cherry Blossom");
    }
    let colour =
    document.getElementById("colour-theme").value;
    


   let flowerAmount =
    document.getElementById("flower-count");


let price =
Number(flowerAmount.value);
  let style =
 document.querySelector('input[name="style"]:checked');

let styleChoice = "";

if(style){

    styleChoice = style.value;

}
  
    let bouquetName = "Custom Bouquet";

if(flowers.length > 0){

    bouquetName += " (" + flowers.join(", ") + ")";

}

if(styleChoice){

    bouquetName += " - " + styleChoice;

}


if(styleChoice !== "Book Paper"){

    bouquetName += " - " + colour;

}


addToCart(bouquetName, price);

}

function clearCart(){

    localStorage.removeItem("cart");

    cart = [];

    displayCart();

    updateCartCount();

}
// Load cart when page opens
console.log("Cart loaded:", cart);
document.addEventListener("DOMContentLoaded", function(){

    displayCart();

    updateCartCount();

});
