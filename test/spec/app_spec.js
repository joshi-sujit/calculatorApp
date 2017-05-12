describe('Calculator App', function()
{
    beforeEach(module('calculatorApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('BUTTONS CLICKED', function() {
        var controller;

        beforeEach(function() {
            controller = $controller('CalculatorController', {});
        });

        it('Should give error message if operators are pressed in before numbers', function() {
            controller.buttonClicked("+");
            expect(controller.expressionError).toEqual('Wrong Expression. Try again!');
        });


        it('Should create a sequence of expression according to numbers and operators clicked', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("+");
            controller.buttonClicked("3");
            controller.buttonClicked("*");
            controller.buttonClicked("4");
            controller.buttonClicked("^");
            controller.buttonClicked("2");
            controller.calculate();
            expect(controller.expression).toEqual('2 + 3 * 4 ^ 2');
        }); 

        it('Should reset all the values', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("+");
            controller.buttonClicked("3");
            controller.buttonClicked("C");
            expect(controller.expression).toEqual('');
        });   

        it('Should reset expression and result values after a button is pressed again for new calculation', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("+");
            controller.buttonClicked("3");
            controller.calculate();
            controller.buttonClicked("3");            
            expect(controller.result).toEqual("");
            expect(controller.expression).toEqual("");
        }); 



    });


    describe('Calculation Test', function() {
        var controller;

        beforeEach(function() {
            controller = $controller('CalculatorController', {});
        });

        it('Addition', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("+");
            controller.buttonClicked("3");
            controller.calculate();
            expect(controller.result).toEqual(5);
        });


        it('Subtraction', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("-");
            controller.buttonClicked("3");
            controller.calculate();
            expect(controller.result).toEqual(-1);
        });

        it('Multiplication', function() {
            controller.buttonClicked("20");
            controller.buttonClicked("*");
            controller.buttonClicked("30");
            controller.calculate();
            expect(controller.result).toEqual(600);
        });

        it('Division', function() {
            controller.buttonClicked("100");
            controller.buttonClicked("/");
            controller.buttonClicked("25");
            controller.calculate();
            expect(controller.result).toEqual(4);
        });

        it('Exponent', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("^");
            controller.buttonClicked("4");
            controller.calculate();
            expect(controller.result).toEqual(16);
        });

        it('Square Root', function() {
            controller.buttonClicked("25");
            controller.buttonClicked("sqrt");
            controller.calculate();
            expect(controller.result).toEqual(5);
        });

        it('Perform Order of operations ', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("+");
            controller.buttonClicked("4");
            controller.buttonClicked("/");
            controller.buttonClicked("2");
            controller.buttonClicked("*");
            controller.buttonClicked("5");
            controller.calculate();
            expect(controller.result).toEqual(12);
        });

        it('should calculate complex expression with sqrt and sqr => (2^4SQRT) => 4', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("^");
            controller.buttonClicked("4");
            controller.buttonClicked("sqrt");
            controller.calculate();
            expect(controller.result).toEqual(4);
        });

        it('Should give error message if expression ends with any operator sign (+ - / * ^)except sqrt', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("+");
            controller.calculate();
            expect(controller.expressionError).toEqual('Wrong Expression. Try again!');
        });

        it('Should display expression and its answer both after calculation', function() {
            controller.buttonClicked("2");
            controller.buttonClicked("+");
            controller.buttonClicked("3");
            controller.calculate();
            expect(controller.result).toEqual(5);
            expect(controller.expression).toEqual("2 + 3");
        });


    });
});
