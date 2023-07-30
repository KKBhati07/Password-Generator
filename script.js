//SETTING TOASTR FOR NOTIFICATIONS
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    // "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "opacity": "1"
  }


//getting elements by their IDs
const pwEl = document.getElementById("pw");
const copyPassword = document.getElementById("copy");
const passwordLength = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generatePasswordBtn = document.getElementById("generate");

//declaring variables
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=[{]};:,<?/.>~";


//to setup the string according to user input, and generate password
function generatePassword() {
    const len = passwordLength.value;
    let passwordString = "";

    if (upperEl.checked) passwordString += upperLetters;
    if (lowerEl.checked) passwordString += lowerLetters;
    if (numberEl.checked) passwordString += numbers;
    if (symbolEl.checked) passwordString += symbols;

    //if the password string is empty
    if (passwordString.length==0) return;

    //using shuffle to add more randomness
    pwEl.innerText=password(shuffle(passwordString),len);
}

//to randomize the password string
function shuffle(string){
    let randomString="";
    for(let i=0;i<string.length;i++){  
        randomString+= string[Math.floor(Math.random()*string.length)]}
        return randomString;
}

//to generate a password of given length
function password(string,length){
    let pass="";
    for(let i=0; i <length; i++) pass += string[Math.floor(Math.random()*string.length)]
    return pass;
}


//event handler to copy the password to clipboard
function onCopyBtnPressHandler(){
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    //is password text is empty
    if (!password){
        toastr.error("Password is empty");
        return;
    } 

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    toastr.success("Password copied to clipboard")
}



// ================EVENT LISTENERS===============

//event listener for password length change
passwordLength.addEventListener("input", generatePassword);

//event listeners for checkbox change
upperEl.addEventListener("change",generatePassword);
lowerEl.addEventListener("change",generatePassword);
numberEl.addEventListener("change",generatePassword);
symbolEl.addEventListener("change",generatePassword);

//setting event listener on clicking the generate password button
generatePasswordBtn.addEventListener("click", generatePassword);
//event listener to copy the generated password
copyPassword.addEventListener("click", onCopyBtnPressHandler);
