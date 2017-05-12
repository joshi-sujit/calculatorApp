var app = angular.module("calculatorApp", []);

app.controller("CalculatorController", function () {

    this.enteredNumber = "";
    this.regex = "^[0-9]+[.]?[0-9]*$";
    this.result = 0;
    this.expression = "";
    this.operations = ["+", "-", "*", "/", "^", "sqrt"];
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.expressionArray =[];

    /*Creating a expression on the basis of input values*/
    this.buttonClicked = function (btnValue) {
        if(this.result != "")
        {
            this.expression = "";
            this.result = "";
        }
        if (btnValue == "+" || btnValue == "-" || btnValue == "*" || btnValue == "/" || btnValue == "^" || btnValue == "sqrt") {
            //Add the number to expression
            if (this.enteredNumber != "") {
                
                this.expressionArray.push(this.enteredNumber);
                this.enteredNumber = "";
            }
            //check if expression length is 0 THEN CANNOT ADD OPERATIONS AT FIRST
            // ELSE check the last element of expn is number or sign if it is sign replace with new sign otherwise append to expression
            var expressionLength = this.expression.length;
            var arrLength = this.expressionArray.length;
            if (arrLength == 0) {
                this.expressionError = "Wrong Expression. Try again!";
            }
            else {
                var lastChar = this.expressionArray[arrLength-1];
                if (isNaN(parseInt(lastChar))) {
                    this.expressionArray[arrLength-1] = btnValue;
                    this.enteredNumber = "";
                }
                else {
                    //this.expression = this.expression.concat(btnValue);
                    this.expressionArray.push(btnValue);
                    this.enteredNumber = "";
                }
                
            }
        }
        else if (btnValue == "C") {
            //RESETING FUNCTION
            this.result = 0;
            this.expressionArray= [];
            this.enteredNumber = "";
            this.expressionError = "";
            this.expression = "";
        }
        else {
            //CONCATENATE THE NUMBER TO DISPLAY
            this.expressionError = "";
            this.enteredNumber = this.enteredNumber.concat(btnValue);
        }
        this.expression = this.expressionArray.toString().replace(/,/g ," ");
    }

    /*Creating a expression on the basis of input values*/
    this.calculate = function () {
        var arrLength = this.expressionArray.length;
        var lastChar = this.expressionArray[arrLength-1];

        if (isNaN(parseInt(lastChar)) && this.enteredNumber == "" && lastChar != 'sqrt') {
            this.expressionError = "Wrong Expression. Try again!";
            this.expressionArray = [];
            this.expression = "";
        } else {
            this.expressionArray.push(this.enteredNumber);
            this.expression = this.expressionArray.toString().replace(/,/g ," ");
            for(var i=0; i<arrLength;i++){
                if(this.expressionArray[i] == "sqrt"){
                    tmp = Math.sqrt(this.expressionArray[i-1]);
                    this.expressionArray[i-1] = tmp;
                    this.expressionArray.splice(i,1);
                }
            }

            for(var i=0; i<arrLength;i++){
                if(this.expressionArray[i] == "^"){
                    tmp = Math.pow(this.expressionArray[i-1],this.expressionArray[i+1]);
                    this.expressionArray[i-1] = tmp;
                    this.expressionArray.splice(i,2);
                }
            }
            //CONVERTING ARRAY TO NORMAL STRING EXPRESSION FOR EVALUATION
            var e = this.expressionArray.toString().replace(/,/g ," ");
            
            //console.log(e);
            this.result = eval(e);
            this.expressionArray =[];
            this.enteredNumber = "";

        }
    }
});
