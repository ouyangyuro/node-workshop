
let brand = "Audi";
let color = "blue";
let owner = "";

function showOwner(name){
    owner = name;
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
    showColor
}