//GLOBAL VARIBLES

var totalCartNum = 0;
var cartList = [];


// Items adding to the card
class CartItem {
    constructor(name, price, quantity, glazing, image) {
      this.name = name;
      this.price = price;
      this.quantity = quantity;
      this.glazing = glazing;
      this.image = image;
    }
  }


//Update Number of Items in Cart
function updateCartValue(amount){
    totalCartNum += amount;
    console.log(totalCartNum);
    document.getElementById("cart-num").innerHTML = totalCartNum;
}

//HOME page: create a new CartItem object when click on add to cart
function addCartItem(addBtn,amount){
    var name = addBtn.parentElement.getElementsByClassName("product-title")[0].innerText;
    var price = addBtn.parentElement.getElementsByClassName("product-price")[0].innerText;
    var glazing = "none;"
    var quantity = amount;
    var image = addBtn.parentElement.getElementsByClassName("product-picture")[0].src;
    let itemToAdd = new CartItem(name, price, quantity, glazing, image);
    cartList.push(itemToAdd);
    console.log(cartList);
}

//MODAL page: create a new CartItem object
function addCartItem2(amount){
    var modal = document.getElementsByClassName("modal-content")[0]

    var name = modal.getElementsByClassName("modal-title")[0].innerText;
    var price = modal.getElementsByClassName("modal-price")[0].innerText;
    var glazing = modal.getElementsByClassName("sm-active")[0].innerText;
    var quantity = amount;
    var image = modal.parentElement.getElementsByClassName("modal-picture")[0].src;

    let itemToAdd = new CartItem(name, price, quantity, glazing, image);
    cartList.push(itemToAdd);
    console.log(cartList);
}

//Update Local Storage
function setLocalStr(){
    localStorage.setItem("totalCartNum", JSON.stringify(totalCartNum));
    localStorage.setItem("cartList",JSON.stringify(cartList));
    document.getElementById("cart-num").innerHTML = totalCartNum;
}

//Fetch from Local Storage
function getLocalStr(){
    totalCartNum = JSON.parse(localStorage.getItem("totalCartNum"));
    cartList = JSON.parse(localStorage.getItem("cartList"));
} 

//Button display "added" onclick
function displayAdded(button) {
    button.innerHTML="add to cart";
}




// HOME: SELECT THE NUMBER + ADD TO CART

// create a list of all products
var allProduct= document.getElementsByClassName("product-block");

// Loop all the product, 
for (i = 0; i < allProduct.length; i++) {
    //get the number choices in a list
    var orderNumChoice = allProduct[i].getElementsByClassName("order-num");
    console.log(orderNumChoice);

    for(j = 0; j < orderNumChoice.length; j++){
        console.log(orderNumChoice[j]);
        orderNumChoice[j].onclick = function(){

            //make all other numbers inactive
            var current = this.parentElement.getElementsByClassName("active");
            if (current.length > 0) { 
                current[0].className = current[0].className.replace(" active", "");
            }    
            //make the clicked number active
            this.className += " active";
        }
    }
}

// Add To Cart
for (i = 0; i < allProduct.length; i++) {
    var addBtn = allProduct[i].getElementsByTagName("button");
    addBtn[0].onclick = function(){

        //find the current active number choice
        var orderNumActive = this.parentElement.getElementsByClassName("active");

        //update totalCartNum
        updateCartValue(parseInt(orderNumActive[0].innerHTML));

        //update cartList
        addCartItem(this, parseInt(orderNumActive[0].innerHTML));

        //update local sttorage
        setLocalStr();
        
        
        this.innerHTML="added &#10003;";
        setTimeout(displayAdded, 1500, this);
        // setTimeout(button => {button.innerHTML="add to cart";}, 1500);

        //remove the active choice
        orderNumActive[0].className = orderNumActive[0].className.replace(" active", "");

    }
}


// PRODUCT DETAIL: UPDATE THE MODAL
// Get the modal
var modal = document.getElementById("modal");

// Get the products that opens the modal
var products = document.getElementsByClassName("product-block");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the products, open the modal 
for (i = 0; i < products.length; i++) { 
    products[i].getElementsByClassName("product-picture")[0].onclick = function() {
        modal.style.display = "block";

        // take product values
        const productDescription = this.parentElement.getElementsByClassName("product-description")[0].innerText;
        const productPrice = this.parentElement.getElementsByClassName("product-price")[0].innerText;
        const productTitle = this.parentElement.getElementsByClassName("product-title")[0].innerText;
        const productPicture = this.parentElement.getElementsByClassName("product-picture")[0];

        // assign to modal values
        modal.getElementsByClassName("modal-description")[0].innerText = productDescription;
        modal.getElementsByClassName("modal-price")[0].innerText = productPrice;
        modal.getElementsByClassName("modal-title")[0].innerText = productTitle;
        modal.getElementsByClassName("modal-picture")[0].src = productPicture.src
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    revertModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        revertModal();
    }
}

function revertModal() {
    modal.style.display = "none";
    modalPurchase.value = 1;
}


// MODAL FUNCTIONS

// modalPurchaseAmount field, default to 1
const modalPurchase = document.getElementById("modal-purchase-amount");
modalPurchase.value = 1;

// modal glazin buttons
const allModalGlazingButtons = document.getElementsByClassName("modal-glazing");
for (i = 0; i < allModalGlazingButtons.length; i++) {
    allModalGlazingButtons[i].onclick = function(){

        //make all other numbers inactive
        var currentActive = this.parentElement.getElementsByClassName("sm-active");
        if (currentActive.length > 0) { 

            //only one is active so it's always [0]
            currentActive[0].className = currentActive[0].className.replace(" sm-active", "");
        }    
        //make the clicked number active
        this.className += " sm-active";
    }
}

// modal add to cart button
document.getElementsByClassName("modal-add-button")[0].onclick = function() {
    //update totalCartNum
    updateCartValue(parseInt(modalPurchase.value));

    //update cartList
    addCartItem2(parseInt(modalPurchase.value));

    //update local sttorage
    setLocalStr();

    this.innerHTML="added &#10003;";
    setTimeout(displayAdded, 1500, this);
}

//use "-" and "+" to adjust ammount
document.getElementById("sm-minus").onclick = function() {
    const currentValue = new Number(modalPurchase.value);
    if (currentValue > 1) {
        modalPurchase.value = new Number(modalPurchase.value) - 1;
    }
}

document.getElementById("sm-plus").onclick = function() {
    modalPurchase.value = new Number(modalPurchase.value) + 1;
}