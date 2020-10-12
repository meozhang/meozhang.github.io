// Get the modal
var modal = document.getElementById("modal");

// Get the products that opens the modal
var products = document.getElementsByClassName("product-block");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the products, open the modal 
for (i = 0; i < products.length; i++) { 
    const currentProductIndex = i;
    products[currentProductIndex].getElementsByClassName("product-picture")[0].onclick = function() {
        modal.style.display = "block";

        // take product values
        const productDescription = products[currentProductIndex].getElementsByClassName("product-description")[0].innerText;
        const productPrice = products[currentProductIndex].getElementsByClassName("product-price")[0].innerText;
        const productTitle = products[currentProductIndex].getElementsByClassName("product-title")[0].innerText;
        const productPicture = products[currentProductIndex].getElementsByClassName("product-picture")[0];

        // assign to modal values
        modal.getElementsByClassName("modal-description")[0].innerText = productDescription;
        modal.getElementsByClassName("modal-price")[0].innerText = productPrice;
        modal.getElementsByClassName("modal-title")[0].innerText = productTitle;
        modal.getElementsByClassName("modal-picture")[0].src = productPicture.src
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}