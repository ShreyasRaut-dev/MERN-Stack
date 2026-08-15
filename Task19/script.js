let servicesData = {
  dry: { name: "Dry Cleaning", price: 200 },
  wet: { name: "Wet Wash", price: 100 },
  iron: { name: "Ironing & Folding", price: 50 }
};

let selectedServices = [];
let cartItems = [];

function selectService(serviceKey, isSelected) {
  let card = document.getElementById("card-" + serviceKey);
  if (isSelected) {
    if (!selectedServices.includes(serviceKey)) {
      selectedServices.push(serviceKey);
    }
    card.classList.add("selected");
  } else {
    let index = selectedServices.indexOf(serviceKey);
    if (index > -1) {
      selectedServices.splice(index, 1);
    }
    card.classList.remove("selected");
  }
  updateSelectionStatus();
}

function updateSelectionStatus() {
  let statusDiv = document.getElementById("select-status");
  if (selectedServices.length === 0) {
    statusDiv.innerText = "Selected: None";
  } else {
    let names = selectedServices.map(function(key) {
      return servicesData[key].name;
    });
    statusDiv.innerText = "Selected: " + names.join(", ");
  }
}

function addSelectedToCart() {
  for (let i = 0; i < selectedServices.length; i++) {
    let key = selectedServices[i];
    if (!cartItems.includes(key)) {
      cartItems.push(key);
    }
  }
  
  selectedServices = [];
  document.getElementById("card-dry").classList.remove("selected");
  document.getElementById("card-wet").classList.remove("selected");
  document.getElementById("card-iron").classList.remove("selected");
  updateSelectionStatus();
  
  renderCart();
}

function renderCart() {
  let cartList = document.getElementById("cart-list");
  let totalAmtSpan = document.getElementById("toalAmt");
  
  if (cartItems.length === 0) {
    cartList.innerHTML = '<li class="empty-msg">No items have been added.</li>';
    totalAmtSpan.innerText = "0";
    return;
  }
  
  let html = "";
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let key = cartItems[i];
    let item = servicesData[key];
    html += "<li>" + item.name + " - ₹" + item.price + "</li>";
    total += item.price;
  }
  
  cartList.innerHTML = html;
  totalAmtSpan.innerText = total;
}

function handleFormBooking() {
  let name = document.getElementById("cust-name").value;
  
  if (cartItems.length === 0) {
    alert("Please add services to cart before booking!");
    return;
  }
  
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let key = cartItems[i];
    total += servicesData[key].price;
  }
  
  alert("Thank you " + name + "! Booking confirmed for your selected services. Total Amount: ₹" + total);
  
  cartItems = [];
  renderCart();
  document.getElementById("book-form").reset();
}

function bookSelectedImmediately() {
  if (selectedServices.length === 0) {
    alert("Please select at least one service to book!");
    return;
  }
  
  addSelectedToCart();
  alert("Services added to booking cart! Please fill the Book Now form on the left to complete your order.");
}
