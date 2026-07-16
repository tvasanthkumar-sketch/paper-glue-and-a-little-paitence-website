// ==========================
// CART SYSTEM
// ==========================


// Get saved cart or create empty one

let cart = JSON.parse(localStorage.getItem("cart")) || [];





// Add item to cart

function addToCart(name, price, quantity = 1){


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


    let option =
    card.querySelector(".product-option").value;


    let quantity =
    card.querySelector(".quantity").value;



    let details = option.split("|");



    let price = Number(details[0]);

    let material = details[1];



    addToCart(
        productName + " - " + material,
        price,
        Number(quantity)
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


    let name =
    document.getElementById("customer-name").value;


    let email =
    document.getElementById("customer-email").value;


    let notes =
    document.getElementById("order-notes").value;

   let phone =
    document.getElementById("customer-phone").value;


     let method =
      document.getElementById("order-method").value;

    let orderText =
    "New Handmade Order 🌸%0A%0A";



    orderText +=
    "Customer: " + name + "%0A";


    orderText +=
    "Email: " + email + "%0A%0A";



    orderText +=
    "Items:%0A";



    let total = 0;



    cart.forEach(function(item){


        orderText +=
        "- " + item.name +
        " x" + item.quantity +
        " ($" + (item.price * item.quantity) + ")%0A";



        total += item.price * item.quantity;


    });



    orderText +=
      
    orderText +=
      
"Email: " + email + "%0A";

orderText +=
"Phone: " + phone + "%0A";

orderText +=
"Order Method: " + method + "%0A%0A";
   
"%0ATotal: $" + total;

 orderText +=
"%0A%0ANotes:%0A" + notes;

localStorage.removeItem("cart");

 window.location.href =
 "mailto:taniavasanth@gmail.com?subject=New Handmade Order&body="
  + orderText;


}





function addCustomBouquet(){

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

if(styleChoice !== "Book Paper"){


}

addToCart(bouquetName,price);

}


let flowersBox = document.getElementById("flowers");
let priceBox = document.getElementById("price");

if(flowersBox){
    flowersBox.value = cart.map(item => item.name).join(", ");
}

if(priceBox){
    priceBox.value = "$" + total;
}
// Load cart when page opens

window.onload = function(){


    displayCart();

    updateCartCount();


};
