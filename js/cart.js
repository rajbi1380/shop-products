let YourCart = document.querySelector(".your-cart");
let CartIcon = document.querySelector(".cart-icon");
let CloseCart = document.querySelector(".close-cart");
let CartAdd = document.querySelectorAll(".cart-add");
let CartContact = document.querySelectorAll(".cart-contact");
let btnbuy = document.querySelector(".btn-buy");
let btnSend = document.querySelector(".btn-send");
let inputEmail = document.querySelector(".input-email");
let inputName = document.querySelector(".input-name");
let inputSubject = document.querySelector(".input-subject");
let inputText = document.querySelector(".input-text");
let listIcon = document.querySelector(".list-icon");
let menu = document.querySelector(".menu");
let closeMenu = document.querySelector(".close-menu");
let creatbtn = document.querySelector(".creat-btn");
let count = document.querySelector(".count");

CartIcon.addEventListener("click", openYourCart);
function openYourCart(e) {
  e.preventDefault();
  YourCart.classList.add("active");
}
CloseCart.addEventListener("click", closeYourCart);
function closeYourCart() {
  YourCart.classList.remove("active");
}

CartAdd.forEach((cart) => {
  cart.addEventListener("click", (e)=> {
    let total = 0;
    let num = Number(count.innerHTML);
    total = num + 1;
    count.innerText = total;
    console.log(total);
    let target = e.target;

    let check = target.parentElement.parentElement.parentElement;
    let img = check.querySelector(".cart-img img").src;
    let name = check.querySelector(".cart-title").innerText;
    let price = check.querySelector(".cart-footer .price").innerText;

    let cartbox = document.createElement("div");
    cartbox.classList.add("cart-box");
    let contact = `<div class="row d-flex">
    <div class="col-sm-4">
      <img src=${img} class="img-fluid img-box" />
    </div>
    <div class="col-sm-6">
      <div class="detail-box">
        <div class="subject-box">${name}</div>
        <div class="price-box">${price}</div>
        <input type="number" value="1" class="quantity-box" />
      </div>
    </div>
    <div class="col-sm-2">
      <i class=" remove-box bi bi-trash3-fill "></i>
    </div>`;

    CartContact.forEach((carts) => {
      cartbox.innerHTML = contact;

      carts.appendChild(cartbox);
    });
    let quentityInputs = document.querySelectorAll(".quantity-box");
    quentityInputs.forEach((input) => {
      console.log(input);
      input.addEventListener("change", quantitychange);
    });
    document.querySelectorAll(".remove-box").forEach((removeicon) => {
      removeicon.addEventListener("click", (e) => {
        let target = e.target;
        count.innerText = num--;
        let removeitem = target.parentElement.parentElement.parentElement;

        removeitem.remove();
            updatecart();
      });
    });

    updatecart();
  });
});

function updatecart() {
  let cartboxs = document.querySelectorAll(".cart-box");
  let total = 0;
  cartboxs.forEach((cartbox) => {
    let price = cartbox.querySelector(".price-box");

    let quantity = cartbox.querySelector(".quantity-box");
    let repprice = price.innerHTML.replace("$", "");
    let valuequantity = quantity.value;

    total = total + valuequantity * repprice;
  });
  document.querySelector(".total-price").innerHTML = "$" + total;
}
function quantitychange(e) {
  let inputvalue = e.target;
  console.log(inputvalue);
  if (isNaN(inputvalue.value) || inputvalue.value <= 0) {
    inputvalue.value = 1;
  }
  updatecart();
}
btnbuy.addEventListener("click", () => {
  alert("thank you for your buy");
  CartContact.forEach((item) => {
    item.remove();
    document.querySelector(".total-price").innerHTML = "$0";
    count.innerText = "0";
  });
  updatecart();
});
////////////
btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".status-email").innerText = "";
  document.querySelector(".status-name").innerText = "";
  document.querySelector(".status-sing").innerText = "";
  let inputEmailvalue = inputEmail.value;
  let inputNamevalue = inputName.value;
  let inputSubjectvalue = inputSubject.value;
  let inputTextvalue = inputText.value;

  let isRes = true;
  if (
    inputEmailvalue.indexOf("@") == -1 ||
    inputEmailvalue.length == 0 ||
    inputEmailvalue <= 4
  ) {
    document.querySelector(".status-email").innerText =
      "Please Inter Correct Email";
    isRes = false;
  }
  if (
    inputNamevalue.indexOf("@") == 1 ||
    inputNamevalue.length <= 4 ||
    inputNamevalue.length == 0
  ) {
    document.querySelector(".status-name").innerText =
      "Please Inter Correct Name";
    isRes = false;
  }
  if (inputSubjectvalue.length == 0) {
    document.querySelector(".status-sub").innerText =
      "Please Inter Correct subject";
    isRes = false;
  }
  if (isRes) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        email: inputEmailvalue,
        name: inputNamevalue,
        sub: inputSubjectvalue,
        massage: inputTextvalue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) {
        document.querySelector(".status-sing").innerText =
          "Your message has been successfully registered";
      }
    });
  }
});
listIcon.addEventListener("click", openmenu);
function openmenu(e) {
  e.preventDefault();
  menu.classList.add("activemenu");
}
closeMenu.addEventListener("click", closemenu);
function closemenu(e) {
  e.preventDefault();
  menu.classList.remove("activemenu");
}
