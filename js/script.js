

var productNameInput = document.getElementById("productNameInput"); // m2sek el input kolo
var productPriceInput = document.getElementById("productPriceInput");
var CategoryInput = document.getElementById("CategoryInput");
var productDescInput = document.getElementById("productDescInput");
var addBtn = document.getElementById("addBtn");
var regex;
var currentIndex;



///////////////////////////////////////////////////////////////////////////////////////////
// var productsCounter = []; // دى مش صح لازم تتقسم ل اف وايلس 
var productsCounter;
// ده عشان لو بفتح الموقع اول مرة من متصفح جديد
if (localStorage.getItem("products") == null) {
    productsCounter = [];
}
// ده عشان لو عندى داتا اصلا كنت مخزناها قبل كده وجيت قفلت وفتحت الموقع او عملت ريفريش
// للموقع الداتا اللى متخزنة من قبل كده متضيعش وتتعرضلى فى التيبول اول لما افتح الموقع
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
// دى فانكشن البوتون اللى اسمه اد عشان يضيف العناصر اللى دخلها فى تيبول لما اتك عليه
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
        localStorage.setItem("products", JSON.stringify(productsCounter)); // دى عشان يخزن الداتا بتاعتى دى فى لوكل استرودج داتا بيز صغيرة وبتاخد قيميتن استرنج عشان كدا بحاول الاراى بتاعى لاسترنج عن طريق جزوناف استرنج فاى
    }
    else {
        edit();
        addBtn.innerHTML = "add";
    }
    displayProducts(); // دى عشان اكول الفانكشن بتاعت ديسبلاى لما اتك على بوتن الاد يعرضلى الداتا فى الجدول
    clear();

    console.log(productsCounter);
}

// هنا فى مشكلة هتقابلنى انه كل مرة بدخل فيها عناصر بياخد اخر عنصر بس 
// واللى قبله بيتمسح فعشان ياخد كل العناصر اللى هدخلها بعمل اراى وابوش فيها العناصر دى 
// فهيبقى اراى اوف اوبجيكت 



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
// دى فانكشن عشان كل مرة تفضيلى الانبوت بعد مايملى الانبوت كلها وابوش القيم فى اراى 
function clear() {
    productNameInput.value = "";
    productPriceInput.value = "";
    CategoryInput.value = "";
    productDescInput.value = "";
}

/////////////////////////////////////////////////////////////////////////////////////////
//  دى فانكشن عشان تاخد الداتا اللى هيدخلها اليوزر وتظهرها فى الجدول تحت 
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
// ده فانكشن السيرش عشان لما اجى اسيرش على عنصر وانا بخليه يسيرش بالنيم والكاتوجرى 
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
// دى فانكشن لزرار الديليت 
function deleteProduct(indexitem) {
    productsCounter.splice(indexitem, 1);
    localStorage.setItem("products", JSON.stringify(productsCounter));
    displayProducts();
}

// 00000000000000000000000000000000000000000000000000000000000000000000



function update(indexitem) {
    // دول عشان تحول الداتا من التيبول لفوق فى النبوت على حسب النديكس بتاع الداتا اللى هتك عليه
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
    productsCounter[currentIndex] = product; //عشان تجيب القيم اللى انا دخلتها فى الابدديت وتخزن الانديكس بتاع عشان تعدل فيه هو وتخزنها فيه القيمة الجديدة 
    localStorage.setItem("products", JSON.stringify(productsCounter));

    // productsCounter[index].name =  productNameInput.value,
    // productsCounter[index].price =  productPriceInput.value,
    // productsCounter[index].category = CategoryInput.value,
    // productsCounter[index].desc = productDescInput.value
    // addBtn.innerHTML = "add";
}

