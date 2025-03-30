const DELIMETER = " "
const MAX_RANDOM_INT = 8;


function generateMultiply() {
    console.log("Multiply");
    document.getElementById('multiply-errors').innerHTML = '';
    let multiplyData = document.getElementById("multiply-data").value;
    let errors = validateMultiply(multiplyData);
    if (errors != undefined && errors.length == 0) {
        console.log("Generate multilty");
        let examples = generateMultiplyExamples(multiplyData);
        showExamples(examples, 'multiply-examples')
    } else {
        showErrors(errors, 'multiply-errors');
    }
}

function generateMultiplyExamples(multiplyData) {
    let firstDigits = multiplyData.split(DELIMETER);
    let countExample = document.getElementById("multiply-example-count").value;
    let examples = new Set();
    console.log(examples);
    let digitIndex = 0;
    for (let i = 0; i < countExample; i++) {
        let firstMultiplier = firstDigits[digitIndex] * 10 + getRandomInt(MAX_RANDOM_INT);

        do {
           let secondMultiplier = getRandomInt(MAX_RANDOM_INT) + 1;
           let example = "" + firstMultiplier + " * " + secondMultiplier + " = ";
           if (!examples.has(example)) {
                examples.add(example);
                break;
           }
        } while (false)
        digitIndex = digitIndex == firstDigits.length - 1 ? 0 : digitIndex + 1;
    }
    console.log("Examples: ", examples);
    return Array.from(examples);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateDivision() {
    console.log("Division: ")
}

function showExamples(examples, containerElementId) {
    var examplesString = examples.map(el => '<p>'  + el + '</p>').join('');
    document.getElementById(containerElementId).innerHTML = examplesString;
}

function showErrors(errors, errorElementId) {
    var errorsString = errors.map(el => '<p>'  + el + '</p>').join('');
    document.getElementById(errorElementId).innerHTML = errorsString;
}

function validateMultiply(multiplyData) {
    console.log("multiply data: " + multiplyData);
    let errors = [];
    let data = multiplyData.split(DELIMETER);
    data.forEach(el => {
        if( isNaN(parseInt(el))) {
            errors.push("Значение [" + el + "] не целое число");
        } else if (el <= 0 || el >= 10) {
            errors.push("Значение [" + el + "] значние должно быть от 1 до 9");
        }
    })
    let countExample = document.getElementById("multiply-example-count").value;
    if (isNaN(parseInt(countExample))) {
        errors.push("Значение количества примеров [" + countExample + "] должно быть целым");
    }
    return errors;
}