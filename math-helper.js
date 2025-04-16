const DELIMETER = " "
const MIN_RANDOM_INT = 2;
const MAX_RANDOM_INT = 8;
const EXPECTED_RANGE_DATA = 2;


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
           let example = "" + firstMultiplier + " \u2219 " + secondMultiplier + " = ";
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

function getRandomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDivision() {
    console.log("Division: ");
    document.getElementById('division-errors').innerHTML = '';
    let rangeData = document.getElementById("division-data").value;
    let errors = validateRangeData(rangeData);
    if (errors != undefined && errors.length == 0) {
            console.log("Generate division");
            let examples = generateDivisionExamples(rangeData);
            showExamples(examples, 'division-examples')
        } else {
            showErrors(errors, 'division-errors');
        }
}

function generateDivisionExamples(rangeData) {
    let countExample = document.getElementById("division-example-count").value;
    let values = rangeData.split(DELIMETER);
    console.log("Division example: " + countExample);
    let examples = new Set();
    let digitIndex = 0;
    let value1 = parseInt(values[0]);
    let value2 = parseInt(values[1]);
    let i =0;
    do {
        do {
            console.log("Range data: ", value1, value2);
            let firstMultiplier = getRandomIntRange(value1, value2);
            let secondMultiplier = getRandomIntRange(MIN_RANDOM_INT, MAX_RANDOM_INT) + 1;
            let multiplyResult = firstMultiplier * secondMultiplier;
            console.log("firstMultiplier: " + firstMultiplier + "*" + secondMultiplier);
            let example = "" + multiplyResult + " : " + secondMultiplier + " = ";
            console.log("example", example);
            console.log("examples.has", examples.has(example));
            if (!examples.has(example)) {
                examples.add(example);
                i++;
                break;
            }
        } while (false);

    } while (i < countExample)
    return Array.from(examples);
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

function validateRangeData(rangeData) {
    let errors = [];
    let data = rangeData.split(DELIMETER);
    if (data.length != EXPECTED_RANGE_DATA) {
        errors.push("Нужно ввести два целых числа разделённых пробелом")
    } else {
        let isDigits = true;
        data.forEach(el => {
                if( isNaN(parseInt(el))) {
                    errors.push("Значение [" + el + "] не целое число");
                    isDigits = false;
                }
        });
        if (isDigits) {
            if (parseInt(data[0]) >= parseInt(data[1])) {
                errors.push("Неверно указан диапазон ответов. Первое число должно быть меньше второго");
            }
        }

    }
    return errors;
}