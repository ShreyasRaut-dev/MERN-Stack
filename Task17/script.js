const divdeNumbers = (numbr1, numbr2) => {
  return new Promise((resolve, reject) => {
    if (numbr2 === 0) {
      reject("Errror: Divsion by zero is not allowed.");
    } else {
      resolve(numbr1 / numbr2);
    }
  });
};

let casesAray = [
  { a: 10, b: 2 },
  { a: 10, b: 0 },
  { a: 15, b: 3 },
  { a: 8, b: 0 },
  { a: 20, b: 4 }
];

function runnCase(indexx) {
  if (indexx >= casesAray.length) {
    return;
  }
  let currentCase = casesAray[indexx];
  console.log("Dividng " + currentCase.a + " by " + currentCase.b + "...");
  
  let outputBox = document.getElementById("output-boxx");
  if (outputBox) {
    outputBox.innerHTML += "<p>Dividng " + currentCase.a + " by " + currentCase.b + "...</p>";
  }

  divdeNumbers(currentCase.a, currentCase.b)
    .then((resultt) => {
      console.log("Resultt: " + resultt);
      console.log("");
      if (outputBox) {
        outputBox.innerHTML += "<p><strong>Resultt: " + resultt + "</strong></p><br>";
      }
      runnCase(indexx + 1);
    })
    .catch((errr) => {
      console.log(errr);
      console.log("");
      if (outputBox) {
        outputBox.innerHTML += "<p style='color: red;'><strong>" + errr + "</strong></p><br>";
      }
      runnCase(indexx + 1);
    });
}

runnCase(0);
