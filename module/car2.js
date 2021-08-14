console.log("car2")

let brand = "Ford";
let color = "black";
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