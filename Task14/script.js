// homework: playing with numbers and checking if they are special

var num = 153;

// task 1: find sum of first n natural numbrs
var sumNatural = 0;
for (var i = 1; i <= num; i++) {
    sumNatural = sumNatural + i;
}

// task 2: check if it is a palindrom
var numStr = "" + num;
var reversedStr = "";
for (var i = numStr.length - 1; i >= 0; i--) {
    reversedStr = reversedStr + numStr[i];
}
var isPalindrome = "No";
if (numStr == reversedStr) {
    isPalindrome = "Yes";
}

// task 3: check if it is a prime number
var isPrime = "Yes";
if (num <= 1) {
    isPrime = "No";
} else {
    for (var i = 2; i < num; i++) {
        if (num % i == 0) {
            isPrime = "No";
            break;
        }
    }
}

// task 4: printing all the facters
var factors = "";
for (var i = 1; i <= num; i++) {
    if (num % i == 0) {
        factors = factors + i + " ";
    }
}

// task 5: sum of all digits
var digitSum = 0;
for (var i = 0; i < numStr.length; i++) {
    digitSum = digitSum + Number(numStr[i]);
}

// task 6: check if it is an armstronge number
var totalDigits = numStr.length;
var armstrongSum = 0;
for (var i = 0; i < totalDigits; i++) {
    var digit = Number(numStr[i]);
    armstrongSum = armstrongSum + Math.pow(digit, totalDigits);
}
var isArmstrong = "No";
if (armstrongSum == num) {
    isArmstrong = "Yes";
}

// task 7: printing everything to console
console.log("Number: " + num);
console.log("Sum of first n numbers: " + sumNatural);
console.log("Is it a Palindrome? " + isPalindrome);
console.log("Is it Prime? " + isPrime);
console.log("Factors: " + factors);
console.log("Sum of Digits: " + digitSum);
console.log("Is it an Armstrong Number? " + isArmstrong);
