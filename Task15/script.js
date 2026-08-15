function finddMaxxNumbr(testAray) {
  let maxNumbr = testAray[0];
  for (let i = 1; i < testAray.length; i++) {
    if (testAray[i] > maxNumbr) {
      maxNumbr = testAray[i];
    }
  }
  return maxNumbr;
}

const calulateSumm = function(someAray) {
  let totalSumm = 0;
  for (let i = 0; i < someAray.length; i++) {
    totalSumm = totalSumm + someAray[i];
  }
  return totalSumm;
};

const counttOddNumbrs = (oddAray) => {
  let countOdd = 0;
  for (let i = 0; i < oddAray.length; i++) {
    if (oddAray[i] % 2 !== 0) {
      countOdd = countOdd + 1;
    }
  }
  return countOdd;
};

let testtArray = [4, 8, 2, 11, 6, 7, 10];

function runnMyLogs() {
  console.log("Consol log testing starts here:");
  console.log("Ex Array:-", testtArray);

  let maximumResult = finddMaxxNumbr(testtArray);
  console.log("Maxmum numbr is:", maximumResult);

  let sumResult = calulateSumm(testtArray);
  console.log("Summ of array is:", sumResult);

  let oddCountResult = counttOddNumbrs(testtArray);
  console.log("Count of odd numbrs:", oddCountResult);

  if (document.getElementById("max-output")) {
    document.getElementById("max-output").innerText = "Maxmum numbr is: " + maximumResult;
  }
  if (document.getElementById("sum-output")) {
    document.getElementById("sum-output").innerText = "Summ of array: " + sumResult;
  }
  if (document.getElementById("odd-output")) {
    document.getElementById("odd-output").innerText = "Odd numbr count: " + oddCountResult;
  }
}

runnMyLogs();
