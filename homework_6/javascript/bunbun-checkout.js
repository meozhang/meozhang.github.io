//GLOBAL VARIBLES
var totalCartNum = 0;
var cartList = [];
var subtotal = 0;

var selectedProductGlazing;


// ONLOAD update the page EVERTHING
function onLoad(){
    //get local storage
    cartList = JSON.parse(localStorage.getItem ("cartList"));
    totalCartNum = JSON.parse(localStorage.getItem ("totalCartNum"))
    console.log(totalCartNum, cartList);

    document.getElementById("cart-num").innerHTML = totalCartNum;

    updateCart();

    calTotalCartNum();
    calculateSubtotal();
    emptyCartBlock();

    deleteItem();
}


function calculateSubtotal(){
    if(cartList.length !== 0){
        subtotal = 0;
        for(i=0; i<cartList.length; i++){
            orderPrice = parseFloat(cartList[i].price.slice(1,));
            orderNum = parseInt(cartList[i].quantity);
            subtotal += (orderPrice*orderNum);
        }
    } else {
        subtotal=0;
    }
    document.getElementById("subtotalNum").innerHTML = "$" + subtotal.toFixed(2),toString();
}

function calTotalCartNum(){
    if(cartList.length !== 0){
        totalCartNum = 0; 
        for(i=0; i<cartList.length; i++){
            orderNum = parseInt(cartList[i].quantity);
            totalCartNum += orderNum;
        }
    } else {
        totalCartNum=0;
    }
    document.getElementById("cart-num").innerHTML = totalCartNum;
}


//show Empty Cart block
function emptyCartBlock(){
    const emptyCart = document.getElementById("emptyCart");
    if(totalCartNum === 0){
        emptyCart.style.display = "block";
    } else {
        emptyCart.style.display = "none";
    }
}

//Update Local Storage
function setLocalStr(){
    localStorage.setItem("totalCartNum", JSON.stringify(totalCartNum));
    localStorage.setItem("cartList",JSON.stringify(cartList));
}


//retrieve the GENERIC cart-item + Update the Content
const cartItem = document.getElementById("cart-item");
function updateCart(){
    //clean the HTML cart list

    for(i=0; i<cartList.length; i++){
        product = cartList[i];

        // take product values
        const productName = product.name;
        const productGlaze = product.glazing;
        const productQuant = product.quantity;
        const productPrice = product.price;
        const productImage = product.image;
        
        //assign values to update cart-item
        cartItem.getElementsByClassName("product-name")[0].innerText = productName;
        cartItem.getElementsByClassName("product-glazing")[0].innerText = productGlaze;
        cartItem.getElementsByClassName("product-quant")[0].innerText = productQuant;
        cartItem.getElementsByClassName("product-price")[0].innerText = productPrice;
        cartItem.getElementsByClassName("product-picture")[0].src = productImage     

        //make a clone of cart-item, make visible
        var newCartItem=cartItem.cloneNode(true);
        newCartItem.style.display = "block";

        document.getElementById("cartList").appendChild(newCartItem);
    }
}


// DELETE an item when click on the cross from *cartList*
function deleteItem(){
    var allDeleteBtn = document.getElementsByClassName("delete-item");
    console.log(allDeleteBtn);

    for(i=1; i<allDeleteBtn.length; i++){

        allDeleteBtn[i].onclick = function(){
            const name = this.parentElement.getElementsByClassName("product-name")[0].innerHTML;
            const glazing = this.parentElement.getElementsByClassName("product-glazing")[0].innerHTML;
            const key = name + "/" + glazing;

            const indexToDelete = cartList.findIndex(item => item.key === key);
            cartList.splice(indexToDelete, 1);
            console.log(cartList);

            //delete the HTML div
            this.parentElement.remove();

            //Update the *totalCartNUm*
            calTotalCartNum();

            //Update the *subtotal*
            calculateSubtotal();

            setLocalStr();

            emptyCartBlock();
        }
    }    
}

//CHANGE NUMBER of item in cart
// MINUS - - - 
function quantMinus(event){
    var minus = event;
    currentNum = parseInt(minus.parentElement.getElementsByClassName("product-quant")[0].innerHTML);
    
    const name = minus.parentElement.parentElement.getElementsByClassName("product-name")[0].innerHTML;
    const glazing = minus.parentElement.parentElement.getElementsByClassName("product-glazing")[0].innerHTML;
    const key = name + "/" + glazing;

    const indexToChange = cartList.findIndex(item => item.key === key);
    if (currentNum >= 2){
        currentNum -=1 ;
        minus.parentElement.getElementsByClassName("product-quant")[0].innerHTML = currentNum;

        //update the number in *cartList*
        cartList[indexToChange].quantity = currentNum;
        console.log(cartList);

    }  else {
        currentNum = 0;
        minus.parentElement.parentElement.remove();

        //update the number in *cartList*
        cartList.splice(indexToChange, 1);
        console.log(cartList);
    }
    //Update the *totalCartNUm*
    calTotalCartNum();

    //Update the *subtotal*
    calculateSubtotal();

    setLocalStr();

    emptyCartBlock();
}

// PLUS + + +
function quantPlus(event){
    var plus = event;
    currentNum = parseInt(plus.parentElement.getElementsByClassName("product-quant")[0].innerHTML);
    
    const name = plus.parentElement.parentElement.getElementsByClassName("product-name")[0].innerHTML;
    const glazing = plus.parentElement.parentElement.getElementsByClassName("product-glazing")[0].innerHTML;
    const key = name + "/" + glazing;

    const indexToChange = cartList.findIndex(item => item.key === key);
    if (currentNum >= 1){
        currentNum +=1 ;
        plus.parentElement.getElementsByClassName("product-quant")[0].innerHTML = currentNum;

        //update the number in *cartList*
        cartList[indexToChange].quantity = currentNum;
        console.log(cartList);
    }
    //Update the *totalCartNUm*
    calTotalCartNum();

    //Update the *subtotal*
    calculateSubtotal();

    setLocalStr();
}


// Change glazing for product -- MODAL

// Get the modal
var modal = document.getElementById("modal");
// Get the <span> element that closes the modal
var modalClose = document.getElementsByClassName("close")[0];


function openGlazingModal(event){
    var changeBtn = event;
    modal.style.display = "block";

    selectedProductGlazing = changeBtn.parentElement.parentElement.getElementsByClassName("product-glazing")[0];

    //update the name of the product
    var name = changeBtn.parentElement.parentElement.getElementsByClassName("product-name")[0].innerHTML;
    modal.getElementsByClassName("modal-title")[0].innerHTML = name;
    
    var currentGlazing = changeBtn.parentElement.getElementsByClassName("product-glazing")[0].innerHTML;
    
    const allModalGlazingButtons = document.getElementsByClassName("modal-glazing");

    //make the current chosen glazing "active"
    for (i = 0; i < allModalGlazingButtons.length; i++) {
        if(allModalGlazingButtons[i].innerHTML === currentGlazing){
            allModalGlazingButtons[i].className += " sm-active";
        }
    }
}


function changeGlazing(event){
    var glazingBtn = event;
    var currentActive = modal.getElementsByClassName("sm-active");

    var oldGlazing = currentActive[0].innerHTML;
    var name = modal.getElementsByClassName("modal-title")[0].innerHTML;
    var key = name + "/" + oldGlazing;

    //make all other numbers inactive
    currentActive[0].className = currentActive[0].className.replace(" sm-active", "");

    //make the clicked number active
    glazingBtn.className += " sm-active";
    
    //update the cartList
    var newGlazing = glazingBtn.innerHTML;
    const indexToChange = cartList.findIndex(item => item.key === key);
    cartList[indexToChange].glazing = newGlazing;
    cartList[indexToChange].key = name + "/" + newGlazing;

    //update the cart item display HTML
    selectedProductGlazing.innerHTML = newGlazing;

    //close the modal
    setTimeout(revertModal, 1000);

    setLocalStr();
}


// When the user clicks on <span> (x), close the modal
modalClose.onclick = function() {
    revertModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        revertModal();
    }
}

// CLOSE the modal and clean all the glazing selection
function revertModal() {
    modal.style.display = "none";
    var currentActive = modal.getElementsByClassName("sm-active");
        for(j = 0; j<currentActive.length; j++){
            currentActive[j].className = currentActive[0].className.replace(" sm-active", "");
            }  
}

