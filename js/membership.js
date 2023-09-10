let signbtn = document.querySelector(".sign-btn");
let inputvalue = document.querySelector(".input-value");
let inputPassword = document.querySelector(".input-password");
let checkPassword = document.querySelector(".check-password");
let statusValue = document.querySelector(".value-status");
let passwordStatus = document.querySelector(".password-status");
let passwordStatusCheck = document.querySelector(".password-status-check");
let signstatus = document.querySelector(".sign-status");
signbtn.addEventListener("click", logign);
function logign(e) {
  e.preventDefault();
  statusValue.innerText = "";
  passwordStatusCheck.innerText = "";
  passwordStatus.innerText = "";
  let userValue = inputvalue.value;
  let passwordValue = inputPassword.value;
  let checkValue = checkPassword.value;
  console.log(passwordValue);
  let isResult = true;
  if (
    userValue.lenght == 0 ||
    userValue.indexOf("@") == -1 ||
    userValue.indexOf(".") == -1
  ) {
    statusValue.innerHTML = "Please Inter Your UserName";
    isResult = false;
  }
  if (passwordValue.length === 0) {
    passwordStatus.innerText = "Please enter your password";
    isResult = false;
  } else if (passwordValue.length <= 4) {
    passwordStatus.innerText = "Your password is too short";
    isResult = false;
  }
  if (passwordValue !== checkValue) {
    passwordStatusCheck.innerText = "Please check Your Password";
    isResult = false;
  }
  if (isResult) {
    alert("You signed in successfullys")
    signstatus.innerText = "You signed in successfully";
    window.open("../html/cart.html");
  }
}
