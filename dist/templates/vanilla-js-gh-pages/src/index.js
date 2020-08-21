"use strict";
var output = document.getElementById('output');
var incrementButton = document.getElementById('increment-button');
incrementButton.addEventListener('click', function () {
    var currentNumber = Number.parseInt(output.innerText);
    output.innerText = currentNumber + 1;
});
