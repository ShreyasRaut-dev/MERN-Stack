// homework for compund interest

// static variables
var p = 5000; // principle amount
var r = 0.06; // annual interest rate (6%)
var n = 12; // compounded monthly (12 times a year)
var t = 3; // time in years

// calculate the total amount using Math.pow
var A = p * Math.pow((1 + r / n), (n * t));

// calculate compound interest
var CI = A - p;

// displaying results in console
console.log("The compound interest after" + t + " years is: " + CI);
console.log("Total Amount: " + A);
