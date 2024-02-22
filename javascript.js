// slider
const inputSlider = document.querySelector(".slider");
const lengthDisplay = document.querySelector(".length_num");
const minusBtn = document.querySelector("#minus");
const plusBtn = document.querySelector("#plus");

// display password
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector(".data_copy");
const indicator = document.querySelector(".data_indicator");
const generateBtn = document.querySelector(".generate_Button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


// checkbox
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const characterCheck = document.querySelector("#character");


// variables to be used
let sliderLength = 10;
let checkCount = 0;
let password = "";


                                    // handling Slider section

// displaying it on the screen
handleSlider();
function handleSlider(){
    lengthDisplay.innerText = sliderLength;
    inputSlider.value = sliderLength;
}

// taking input from the slider
inputSlider.addEventListener( 'input', (e) => {
    sliderLength =  e.target.value;
    handleSlider();
} );

// minus btn
minusBtn.addEventListener( 'click' , () => {
    if( sliderLength > 0 ){
        sliderLength--;
    }
    handleSlider();
} );

// plus Btn
plusBtn.addEventListener( 'click' , () => {
    if( sliderLength < 20 ){
        sliderLength++;
    }
    handleSlider();
} );


                                        // check Box's


function handleCheckBoxChange(){
    checkCount = 0;

    allCheckBox.forEach( (checkBox) => {
        if( checkBox.checked ){
            checkCount++;
        }
    } )

    // if length of slider is less then the no. of selected checkbox
    if( sliderLength < checkCount ){
        sliderLength = checkCount;
        handleSlider();
    }

}

allCheckBox.forEach( (checkBox) => {
    checkBox.addEventListener( 'change' , handleCheckBoxChange );
});


                                        // Copy Button


async function copyPassword(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        await console.log("copied");
    }
    catch(e){
        alert(e);
    }
}


copybtn.addEventListener( 'click' , () => {
    if( passwordDisplay.value ){
        copyPassword();
    }
} );

                                    // strength indicator

// function to print
function setIndicator( str ){
    indicator.innerText = str ;
}

// claculating strength function

function clacStrength(){
    let hasInt = false ;
    let hasSym = false ;
    let hasUppercase = false ;
    let hasLowercase = false ;

    // integers
    if( numbersCheck.checked ){
        hasInt = true;
    }

    // symbols
    if( characterCheck.checked ){
        hasSym = true;
    }

    // uppercase
    if( uppercaseCheck.checked ){
        hasUppercase = true;
    }

    // lowercase
    if( lowercaseCheck.checked ){
        hasLowercase = true;
    }


    if( hasUppercase && hasLowercase && (hasInt || hasSym)  || sliderLength > 13 )
    {
        setIndicator("strong");
    }
    else if( (hasUppercase || hasLowercase) && (hasInt || hasSym) || sliderLength > 8 ){
        setIndicator("good")
    }
    else{
        setIndicator("weak");
    }
}


                                // Very Imp in this page 


// generating random value
function getRandomValue( min , max ){
    return Math.floor(Math.random() * (max - min)) + min ;
}

// generating random integer
function getRandomInt(){
    return getRandomValue( 0 , 9 );
}

// generating random uppercase
function getRandomUppercase(){
    return String.fromCharCode(getRandomValue( 65 , 91 ));
}

// generating random lowercase
function getRandomLowercase(){
    return String.fromCharCode(getRandomValue( 97 , 123 ));
}

// generating random symbols
function getRandomSymbol(){
    return symbols.charAt(getRandomValue(0 , symbols.length));
}




                                    
                                    // Generate Button

generateBtn.addEventListener( 'click' , () => {

    // none of the checkbox are selected
    if( checkCount == 0 ){
        return;
    }

    // if length of slider is less then the no. of selected checkbox
    if( sliderLength < checkCount ){
        sliderLength = checkCount;
        handleSlider();
    }

    // while clicking generate button it clear the privious password
    password = " ";

    // creating array to store 
    let funcArr = [];

    // checking for interget is added or not
    if( numbersCheck.checked ){
        funcArr.push( getRandomInt );
    }

    // symbols
    if( characterCheck.checked ){
        funcArr.push( getRandomSymbol );
    }

    // uppercase
    if( uppercaseCheck.checked ){
        funcArr.push( getRandomUppercase );
    }

    // lowercase
    if( lowercaseCheck.checked ){
        funcArr.push( getRandomLowercase );
    }

    
    //compulsory to add in password
    for( let i = 0; i < checkCount; i++ ){
        password = password + funcArr[i]();
    } 

    // remaning to add in password
    for(let i = 0; i < (sliderLength - funcArr.length); i++){
        let random = getRandomValue( 0 , funcArr.length );
        password = password + funcArr[random]();
    } 

    // printing the value on screen
    passwordDisplay.value = password;

    // strength
    clacStrength();
    indicator.style.opacity = "1";

});
                                        
                                    