let products = document.getElementsByClassName("product-container");
let cart = [];

Array.from(products).forEach(element => {
    let addButton = element.getElementsByClassName("add-item-button")[0];
    let itemName = element.getElementsByClassName("item-name")[0].innerText;
    let price = element.getElementsByClassName("price")[0].innerText;
    let metric = element.getElementsByClassName("metric")[0].innerText;

    addButton.addEventListener("click", function(){handleAdd(itemName, price, metric)});
});

function openPopup(){
    preparePriceSummary();
    document.getElementById("popup").classList.remove("popup-inactive");
    document.getElementById("shader").classList.remove("shader-inactive");
}
function closePopup(){
    document.getElementById("popup").classList.add("popup-inactive");
    document.getElementById("shader").classList.add("shader-inactive");
    cart = [];
    document.getElementById("purchase-button").disabled = true;
    displayCart();
}

function preparePriceSummary(){
    let container = document.getElementById("price-summary");
    container.innerHTML = "<div>Végösszeg:</div>";
    let list = document.createElement("ul");
    let payable = getTotalPrice();
    payable.forEach(item =>{
        let listItem = document.createElement("li");
        listItem.innerText = item.price +" "+item.metric;
        list.appendChild(listItem);
    })
    container.appendChild(list);
}

function getTotalPrice(){
    let payable = [{"price": 1, "metric": "emlék"}];
    cart.forEach(element => {
        let index = -1;
        payable.forEach(function(item, i){
            if(item.metric == element.metric){
                index = i;
                return;
            }
        })
        if(index==-1){
            payable.push({"price": element.price, "metric":element.metric})
        } else {
            payable[index].price += element.price;
        }

    })
    return payable;
}
function displayCart(){
    let cartTable = document.getElementById("cart-table");
    cartTable.innerHTML = "<tr><th>Termék</th><th>Mennyiség</th><th>Fizetendő</th></tr>";
    cart.forEach(element => {
        let nameCell = document.createElement("td");
        nameCell.innerText = element.name;
        let quantityCell = document.createElement("td");
        quantityCell.innerText = element.quantity;
        let sumPriceCell = document.createElement("td");
        sumPriceCell.innerText = element.price+" "+element.metric;

        let row = document.createElement("tr");
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(sumPriceCell);
        cartTable.appendChild(row);
    })
    cartTable.innerHTML +=  "<tr><td>Szervizdíj</td><td>1</td><td>1 emlék</td></tr> ";
}

function handleAdd(itemName, price, metric) {
    document.getElementById("purchase-button").disabled = false;
    let index = -1;
    cart.forEach(function(element, i){
        if(element.name == itemName){
            index = i;
            return;
        }
    })
    if(index == -1){
        cart.push({"name":itemName, "quantity": 1, "price": parseInt(price), "metric": metric});
    } else {
        cart[index].quantity++;
        cart[index].price+=parseInt(price);
    }
    displayCart();
}

