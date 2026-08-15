(function() {
  emailjs.init("YOUR_PUBLIC_KEY");
})();

let servicesData = {
  dry: { name: "Dry Cleaning", price: 200 },
  wash: { name: "Wet Wash", price: 100 },
  iron: { name: "Ironing", price: 50 }
};

let cartItems = [];

function scrollToBooking() {
  let bookingSection = document.getElementById("booking");
  bookingSection.scrollIntoView({ behavior: "smooth" });
}

function addService(serviceKey) {
  cartItems.push(serviceKey);
  renderCart();
}

function removeService(serviceKey) {
  let index = cartItems.indexOf(serviceKey);
  if (index > -1) {
    cartItems.splice(index, 1);
  }
  renderCart();
}

function renderCart() {
  let cartList = document.getElementById("cart-list");
  let totalAmtSpan = document.getElementById("totlAmout");
  
  if (cartItems.length === 0) {
    cartList.innerHTML = '<li class="empty-msg">No added items.</li>';
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

function sndEmail() {
  let userName = document.getElementById("user-name").value;
  let userEmail = document.getElementById("user-email").value;
  let userPhone = document.getElementById("user-phone").value;
  
  if (cartItems.length === 0) {
    alert("Please add at least one service before booking!");
    return;
  }
  
  let orderDetails = "";
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let key = cartItems[i];
    let item = servicesData[key];
    orderDetails += item.name + " (₹" + item.price + "), ";
    total += item.price;
  }

  let templateParams = {
    to_name: userName,
    user_email: userEmail,
    user_phone: userPhone,
    order_details: orderDetails,
    total_price: total
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(function(response) {
      console.log("Email sent successfully!", response.status, response.text);
    }, function(error) {
      console.log("Email sending failed...", error);
    });

  let confirmMsg = document.getElementById("confirm-msg");
  confirmMsg.innerText = "Thank you For Booking the Service We will get back to you soon!";
  
  cartItems = [];
  renderCart();
  document.getElementById("booking-details-form").reset();
}
