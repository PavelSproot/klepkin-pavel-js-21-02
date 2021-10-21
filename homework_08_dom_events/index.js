
function handleButton () {
    if (inputName.value && inputPhone.value) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${inputName.value}</td><td>${inputPhone.value}</td>`;
        const newTd = document.createElement("td");
        const newBut = document.createElement("input");
        newBut.type = "button";
        newBut.value="Удалить"
        newBut.addEventListener("click", handleRemoveRow);
        newTd.append(newBut);
        newRow.append(newTd);
        telTBody.append(newRow);
        inputName.value = "";
        inputPhone.value = "";
    }
}

function handleRemoveRow (ev) {
    ev.target.closest("tr").remove();
}

function validateName(name) {
    const regexp = /^[А-яёЁ\s-]*$/g;
    return regexp.test(name);
}

function validatePhone(phone) {
    const regexp = /^[\d-]*$/g;
    return regexp.test(phone);
}

let newName = "";
function handleNameChange (ev) {
    if (validateName(ev.target.value)) newName = ev.target.value;
}
function handleNameFix () {
    inputName.value = newName;
}

let newPhone = "";
function handlePhoneChange (ev) {
    if (validatePhone(ev.target.value)) newPhone = ev.target.value;
}
function handlePhoneFix () {
    inputPhone.value = newPhone;
}



const telTable = document.getElementById("telTable");
const telTBody = telTable.getElementsByTagName('tbody')[0];
const inputName = document.getElementById("iName");
const inputPhone = document.getElementById("iPhone");
inputName.addEventListener('input', handleNameChange);
inputName.addEventListener('input', handleNameFix);
inputPhone.addEventListener('input', handlePhoneChange);
inputPhone.addEventListener('input', handlePhoneFix);
document.getElementById("iButton").addEventListener("click", handleButton);

document.getElementById("colorButton1").addEventListener("click", () => {
    telTBody.classList.remove("cscheme2");
    telTBody.classList.remove("cscheme3");
    telTBody.classList.toggle("cscheme1");
});

document.getElementById("colorButton2").addEventListener("click", () => {
    telTBody.classList.remove("cscheme1");
    telTBody.classList.remove("cscheme3");
    telTBody.classList.toggle("cscheme2");
});

document.getElementById("colorButton3").addEventListener("click", () => {
    telTBody.classList.remove("cscheme1");
    telTBody.classList.remove("cscheme2");
    telTBody.classList.toggle("cscheme3");
});


