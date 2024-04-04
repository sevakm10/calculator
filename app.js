let btn_0 = document.getElementById('btn_0');
let btn_1 = document.getElementById('btn_1');
let btn_2 = document.getElementById('btn_2');
let btn_3 = document.getElementById('btn_3');
let btn_4 = document.getElementById('btn_4');
let btn_5 = document.getElementById('btn_5');
let btn_6 = document.getElementById('btn_6');
let btn_7 = document.getElementById('btn_7');
let btn_8 = document.getElementById('btn_8');
let btn_9 = document.getElementById('btn_9');

let btn_ac = document.getElementById('btn_ac');
let btn_plus_minus = document.getElementById('btn_plus-minus');
let btn_percent = document.getElementById('btn_percent');
let btn_divide = document.getElementById('btn_divide');
let btn_multiply = document.getElementById('btn_multiply');
let btn_minus = document.getElementById('btn_minus');
let btn_plus = document.getElementById('btn_plus');
let btn_dot = document.getElementById('btn_dot');
let btn_equals = document.getElementById('btn_equals');
let screen = document.getElementById('screen');
let allClassCheked = document.querySelectorAll('.btn_2')
let num_1 = '';  // первый операнд
let num_2 = '';  // второй операнд
let num_3 = '';  // запасной операнд который будет равен выбранному оператору между num_1 и num_2
let test = true;   //для переключения внесения изменений  между операндами num_1 и num_2                                                     
let sign = 0 // 1 = '+', 2 = '-', 3 = '*', 4 = '/'.


// Функция которая обнуляет каклькулятор 
const Delete = function () {  
    num_1 = ''
    num_2 = ''
    num_3 = ''
    sign = 0
    screen.innerText = '0'
    allClassCheked .forEach( el => el.className = 'btn_2')
}

// функция которая даёт значение либо первому операнду либо второму
const BtnNumberClick = function (n) {              
    allClassCheked .forEach( el => el.className = 'btn_2') // так мы меняем цвет нажатого оператора на стандартный жёлтый
    let currentNum = test ? num_1 : num_2;
    if (currentNum.length < 9) {
        if (currentNum === '0') {
            currentNum = String(n);
        } else {
            currentNum += n;
        }
    }
    
    if (test) {
        num_1 = currentNum;
        screen.innerText = num_1;
    } else {
        num_2 = currentNum;
        screen.innerText = num_2;
    }
}

// Функция на подобие равно только срабатывает при нажатии на какой либо оператор во второй раз
const Operator = function (n,key){   
    if (!test) { BtnEquals() }
    allClassCheked .forEach( el => el.className = 'btn_2')
    key.className = 'btn_2_click' //меняем цвет оператора если user нажал на неё, чтобы было видно какой оператор используется
    num_2 = ''
    if (test) { test = !test }
    sign = n
}

// здесь при нажатии на любую цифру на калькуляторе запускается функция BtnNumberClick
btn_0.addEventListener('click', () => BtnNumberClick(0))
btn_1.addEventListener('click', () => BtnNumberClick(1))
btn_2.addEventListener('click', () => BtnNumberClick(2))
btn_3.addEventListener('click', () => BtnNumberClick(3))
btn_4.addEventListener('click', () => BtnNumberClick(4))
btn_5.addEventListener('click', () => BtnNumberClick(5))
btn_6.addEventListener('click', () => BtnNumberClick(6))
btn_7.addEventListener('click', () => BtnNumberClick(7))
btn_8.addEventListener('click', () => BtnNumberClick(8))
btn_9.addEventListener('click', () => BtnNumberClick(9))
btn_ac.addEventListener('click', () => Delete()) 

btn_plus.addEventListener('click', () => Operator(1,btn_plus))
btn_minus.addEventListener('click', () => Operator(2,btn_minus))
btn_multiply.addEventListener('click', () => Operator(3,btn_multiply))
btn_divide.addEventListener('click', () => Operator(4,btn_divide))

// функцию вычесляет и отображает результат на экран
const BtnEquals = function () {       
    if (sign == 1) {
        num_3 = Number(num_1) + Number(num_2);
    } else if (sign == 2) {
        num_3 = Number(num_1) - Number(num_2);
    } else if (sign == 3) {
        num_3 = Number(num_1) * Number(num_2);
    } else if (sign == 4) {
        num_3 = Number(num_1) / Number(num_2);
    }

    num_1 = String(num_3);

    if (num_1.length > 9) {
        if (Math.abs(num_3) >= 1e9) {
            num_1 = num_3.toExponential(2);
        } else {
            num_1 = num_1.substr(0, 9);
        }
    }

    screen.innerText = num_1;
    test = true;
}
btn_equals.addEventListener('click', () => BtnEquals())   // 

// данная функция поменяет знак числа на экране на противоположный
const ToggleSign = function () {    
    if (test) {
        num_1 = String(-Number(num_1));
        screen.innerText = num_1;
    } else {
        num_2 = String(-Number(num_2));
        screen.innerText = num_2;
    }
}
btn_plus_minus.addEventListener('click', () => {
    ToggleSign();
});

// данная функия находит процент от числа
const TogglePercent = function () {    
    if (test) {
        num_1 = String(Number(num_1) / 100);
        screen.innerText = num_1;
    } else {
        num_2 = String(-Number(num_2) / 100);
        screen.innerText = num_2;
    }
}
btn_percent.addEventListener('click', () => TogglePercent())

// добавить целые значения, то есть '.' между цифрами
btn_dot.addEventListener('click', () => {  
    if (test) {
        if (!num_1.includes('.') && num_1 !== '') {
            num_1 += '.';
            screen.innerText = num_1;
        }
    } else {
        if (!num_2.includes('.') && num_2 !== '') {
            num_2 += '.';
            screen.innerText = num_2;
        }
    }
});