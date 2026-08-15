function chngeColor(boxId, colorName) {
  let boxElement = document.getElementById(boxId);
  boxElement.style.backgroundColor = colorName;
}

function chngeGreeting() {
  let inptVal = document.getElementById("inptNme").value;
  let gretHeader = document.getElementById("gret-header");
  gretHeader.innerText = "Helo, " + inptVal;
}
