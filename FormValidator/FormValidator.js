//form validator 


const name = document.getElementById("namein");
const email = document.getElementById("emailin");
const password = document.getElementById("passin");
const submit = document.getElementById("submit");

const users = getFromLocal()

const validateName = () => {
    const nameError = document.getElementById("nameError");

    if (name.value.trim() !== "") {
        nameError.style.display = "none";
        return name.value.trim();
    }
    else {
        name.value = "";
        nameError.style.display = "block";
        nameError.style.color = "var(--col008)";
        return "";
    }
}
const validateEmail = () => {
    const emailError = document.getElementById("emailError");
    const li = emailError.querySelectorAll("ul li");

    if (email.value.trim() !== "") {

        if (email.value.includes(".") == true && email.value.includes("@")) {
            emailError.style.display = "none";
            return email.value.trim();
        }
        else {
            li[1].style.display = "none";
            li[0].style.display = "block";
            emailError.style.display = "block";
            emailError.style.color = "var(--col008)";
            return "";
        }
    }
    else {
        email.value = "";
        emailError.style.display = "block";
        li[0].style.display = "none";
        li[1].style.display = "block";
        emailError.style.color = "var(--col008)";
        return "";
    }
}

const validatePass = () => {
    const passError = document.getElementById("passError");
    const li = passError.querySelectorAll("ul li");
    if (password.value.trim() !== "") {

        if (password.value.length >= 8 && password.value.length <= 24) {
            passError.style.display = "none";
            return password.value.trim();
        }
        else {
            passError.style.display = "block";

            li[1].style.display = "none";
            li[0].style.display = "block";
            passError.style.color = "var(--col008)";
            return "";
        }
    }
    else {
        password.value = "";
        passError.style.display = "block";
        li[0].style.display = "none";
        li[1].style.display = "block";
        passError.style.color = "var(--col008)";
        return "";
    }
}

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const result = document.getElementById("result");
    const li = result.querySelector("ul li");
    const newUser = {
        userName: validateName(),
        userEmail: validateEmail(),
        userPass: validatePass(),
    }
    if (newUser.userName !== "" && newUser.userEmail !== "" && newUser.userPass !== "") {
        result.style.display = "block";
        li.style.display = "block";
        li.style.color = "var(--col009)";
        li.textContent = "Success";
        name.value = "";
        email.value = "";
        password.value = "";
        users.push(newUser);
        addToLocal();
    }
    else {
        result.style.display = "block";
        li.style.display = "block";
        li.style.color = "var(--col008)";
        li.textContent = "Failed";
    }

});

function addToLocal() {
    localStorage.setItem("userlist", JSON.stringify(users));
}
function getFromLocal() {
    let user = JSON.parse(localStorage.getItem("userlist"));
    return user === null ? [] : user;
}