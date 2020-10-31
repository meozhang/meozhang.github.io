//GLOBAL VARIBLES
var totalCartNum = 0;
var cartList = [];
var subtotal = 0;


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


//CHANGE NUMBER of item in cart
function updateItemNum(){}


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

