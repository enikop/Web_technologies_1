function clickHome(){
    location.href = "index.html"
}

function clickShop(){
    location.href = "shop.html"
}

function clickSeance(){
    location.href = "seance.html"
}

function clickDivination(){
    location.href = "divination.html"
}

function clickQuestions(){
    location.href = "questions.html"

}

function openMobileMenu(){
    document.getElementById("menu").style.setProperty("--xtrans", "-50%");
    document.getElementById("menu").style.setProperty("--ytrans", "0");
}

function closeMobileMenu(){
    document.getElementById("menu").style.setProperty("--xtrans", "-50%");
    document.getElementById("menu").style.setProperty("--ytrans", "100%");
}