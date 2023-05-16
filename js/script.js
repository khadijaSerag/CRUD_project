

var productNameInput = document.getElementById("productNameInput"); // m2sek el input kolo
var productPriceInput = document.getElementById("productPriceInput");
var CategoryInput = document.getElementById("CategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addBtn = document.getElementById("addBtn");
var regex;
var currentIndex;



///////////////////////////////////////////////////////////////////////////////////////////
// var productsCounter = []; // This is not true. It must be divided into if - else
var productsCounter;
// if you open the site for the first time from a new browser
if (localStorage.getItem("products") == null) {
    productsCounter = [];
}
// if I had data originally, I would have stored it before, and I would have closed and opened the site or made a refresh for the data site that was stored before.
else {
    productsCounter = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

// validate more...

// if (productNameInput.value == "" || productPriceInput.value == "" || CategoryInput.value == "" || productDescInput.value == "") {
//     addBtn.disabled = true;
// }
// else{
//     addBtn.removeAttribute("diabled");
// }

// if (validateProductName() == "is-valid" && validateProductPrice() == "is-valid" && validateProductCategory() == "is-valid") {
//     addProduct();
// }
// else {
//     window.alert("please enter your corrrect data");
// }


/////////////////////////////////////////////////////////////////////////////////////////
// to add the elements that he entered into the table when he relied on it 
function addProduct() {
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: CategoryInput.value,
        desc: productDescInput.value,
    }
    
    if (addBtn.innerHTML == "add") {
        productsCounter.push(product);
        localStorage.setItem("products", JSON.stringify(productsCounter)); // to store my data in a localstorage Database and take two string values, so convert my array to string data.
    }
    else {
        edit();
        addBtn.innerHTML = "add";
    }
    displayProducts(); // When I click on the button, the add shows me the data in the table
    clear();

    console.log(productsCounter);
}
// Here there is a problem, you will meet me that every time I enter elements, it only takes the last element
// And the one before it is deleted, so that it takes all the elements that I will enter by making a review and push on these elements
// So I see of the object



// // validate to ProductNameInput
function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productNameInput.value) == true) {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");

        // console.log("is-valid");
    }
    else {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        // console.log("is-invalid");
    }
}
productNameInput.addEventListener("keyup", validateProductName);


// // validate to ProductPriceInput
function validateProductPrice() {
    var regex = /^[0-9]{1,5}$/;
    if (regex.test(productPriceInput.value) == true) {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        // console.log("is-valid");
    }
    else {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        // console.log("is-invalid");
    }

}
productPriceInput.addEventListener("keyup", validateProductPrice);


// // validate to productCategoryInput
function validateCategory() {
    var regex = /^[a-z A-Z]{2,7}$/;
    if (regex.test(CategoryInput.value) == true) {
        CategoryInput.classList.add("is-valid");
        CategoryInput.classList.remove("is-invalid");
        // console.log("is-valid");
    }
    else {
        CategoryInput.classList.add("is-invalid");
        CategoryInput.classList.remove("is-valid");
        // console.log("is-invalid");
    }

}
CategoryInput.addEventListener("keyup", validateCategory);




/////////////////////////////////////////////////////////////////////////////////////////
// every time clear the input after the entire fills up and push the values in my array
function clear() {
    productNameInput.value = "";
    productPriceInput.value = "";
    CategoryInput.value = "";
    productDescInput.value = "";
}

/////////////////////////////////////////////////////////////////////////////////////////
//  to take the data that the user will enter and show it in the table below
function displayProducts() {
    var cartona = ``;

    for (var i = 0; i < productsCounter.length; i++) {

        cartona += `<tr>
        <td>`+ i + `</td>
        <td>`+ productsCounter[i].name + `</td>
        <td>`+ productsCounter[i].price + `</td>
        <td>`+ productsCounter[i].category + `</td>
        <td>`+ productsCounter[i].desc + `</td>
        <td><button onclick="update(`+ i + `)" class="btn btn-outline-warning">update</button></td>
        <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger">delete</button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;

};



/////////////////////////////////////////////////////////////////////////////////////////
// when I come to search for an item, I make it search with name and catogri
function searchProduct(searchTerm) {
    var cartona = ``;
    for (var i = 0; i < productsCounter.length; i++) {

        if (productsCounter[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true
            || productsCounter[i].category.toLowerCase().includes(searchTerm.toLowerCase()) == true) {
            cartona += ` <tr>
        <td>`+ [i] + `</td>
        <td>`+ productsCounter[i].name + `</td>
        <td>`+ productsCounter[i].price + `</td>
        <td>`+ productsCounter[i].category + `</td>
        <td>`+ productsCounter[i].desc + `</td>
        <td><button class="btn btn-outline-warning">update</button></td>
        <td><button class="btn btn-outline-danger">delete</button></td>
    </tr>`

        }
    }
    document.getElementById("tableBody").innerHTML = cartona;

}

/////////////////////////////////////////////////////////////////////////////////////////
// Function Button Delete
function deleteProduct(indexitem) {
    productsCounter.splice(indexitem, 1);
    localStorage.setItem("products", JSON.stringify(productsCounter));
    displayProducts();
}

// 00000000000000000000000000000000000000000000000000000000000000000000



function update(indexitem) {
    // to transfer the data from the table to the top of the input, according to the index of the data on which it was clicked
    productNameInput.value = productsCounter[indexitem].name,
        productPriceInput.value = productsCounter[indexitem].price,
        CategoryInput.value = productsCounter[indexitem].category,
        productDescInput.value = productsCounter[indexitem].desc;

    addBtn.innerHTML = "Edit";

    currentIndex = indexitem;
}

function edit() {

    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: CategoryInput.value,
        desc: productDescInput.value,
    }
    productsCounter[currentIndex] = product; //to bring the values that I entered in the update and store its index in order to modify it and store it in the new value
    localStorage.setItem("products", JSON.stringify(productsCounter));

    // productsCounter[index].name =  productNameInput.value,
    // productsCounter[index].price =  productPriceInput.value,
    // productsCounter[index].category = CategoryInput.value,
    // productsCounter[index].desc = productDescInput.value
    // addBtn.innerHTML = "add";
}

