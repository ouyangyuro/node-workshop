
let brand = "Audi";
let color = "blue";
let owner = "";

function setOwner(name){
    owner = name;
}

function showOwner(){
    return owner;
}

function showBrand(){
    return brand;
}

function showColor(){
    return color;
}

module.exports = {
    showOwner,
    showBrand,
    showColor,
    setOwner
}