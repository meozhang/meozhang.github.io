//GLOBAL VARIBLES
var totalCartNum = 0;
var cartList = [];
var subtotal = 0;


function calculateSubtotal(){
    for(i=0; i<cartList.length; i++){
        orderPrice = parseFloat(cartList[0].price.slice(1,));
        orderNum = parseInt(cartList[0].quantity);
        subtotal += (orderPrice*orderNum);
    }
}


function onLoad(){
    //get local storage
    cartList = JSON.parse(localStorage.getItem ("cartList"));
    totalCartNum = JSON.parse(localStorage.getItem ("totalCartNum"))
    console.log(totalCartNum, cartList);
    //update cart number
    document.getElementById("cart-num").innerHTML = totalCartNum;
    
    //calculate and update Subtotal
    calculateSubtotal();
    document.getElementById("subtotalNum").innerHTML = "$" + subtotal.toFixed(2),toString();
    }



