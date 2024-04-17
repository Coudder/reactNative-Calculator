import { useEffect, useRef, useState } from "react"


//operators
enum Operator {
    add = '+',
    substract = '-',
    multiply = '*',
    divide = '÷',
}



export const useCalculator = () => {


    //Formula para tipo ppixel
    const [formula, setFormula] = useState('')
    
    //1 Estado inicial 0
    const [number, setNumber] = useState('0');

    //6
    const [previusNumber, setPreviusNumber] = useState('0');

    //7
    const lastOperation = useRef<Operator>();

    //useEffect para la formula
    useEffect(() => {

        if(lastOperation.current){
            const firstFormulaPath = formula.split( ' ' ).at(0);
            setFormula(`${ firstFormulaPath } ${lastOperation.current} ${number}`) //10+10 asi aparece abajo de la calculadora
        }else {
            setFormula(number);
        }

    
     
    }, [number]) //se dispara cada que el number cambie
    

    //useefect para mostrar el resulaado aritmetico abajo
    useEffect(() => {
        
        const subResult = calculateSubResult();

        setPreviusNumber(`${subResult}`);

    }, [formula])
    


    //2 Construccion del numero  boton que presionamos
    const buildNumber = ( numberString:string ) => {

        //validacion para solo incluir un solo punto
        if(number.includes('.') && numberString === '.' ) return;

        if(number.startsWith('0') || number.startsWith('-0') ){

            //punto decimal solo uno
            if(numberString === '.'){
                return setNumber(number +  numberString);
            }

            //Evaluamos si es otro cero y no hay punto
            if(numberString === '0' && number.includes('.')){
                return setNumber(number + numberString);
            }

            //Evaluar si es diferente de cero , no hay punto y es el primer numero
            if( numberString !== '0' && !number.includes('.') ){
                return setNumber(numberString)
            }

            //Evaluar evitar el 00000000000 al menos que aia un punto decimal
            if(numberString === '0' && number.includes('.')){
                return;
            }


            return setNumber(number + numberString);
        }

        setNumber(number + numberString);
    }

    //3 limpiar los numeros
    const clean = () => {
        setNumber('0');
        setPreviusNumber('0');
        lastOperation.current = undefined;
        setFormula('')
    }

    //4 borrar el ultimo numero que se ingresa
    const deleteOperation = () => {

        let currentSign = '' //simboiloactual
        let temporalNumber = number;

        //si el numero incluye el signo negativo
        if(number.includes('-')){
            currentSign = '-';
            temporalNumber = number.substring(1) //si tenia -88 quita el primer dato y quita el simbolo negativo

        }

        if(temporalNumber.length > 1){
          return  setNumber( currentSign + temporalNumber.slice(0,-1)); //elimina el ultimo dato
        }

        setNumber('0');
    }

    //5 Poner el signo menos
    const toggleSign = () => {
        if(number.includes('-')){
            return setNumber( number.replace('-',''))
        }

        setNumber('-' + number)
    }

    //8
    const setLastNumber = () => {
      

        calculateResult();


        if(number.endsWith('.')){
            setPreviusNumber(number.slice(0,-1));
        }else{
            setPreviusNumber(number);
        }

        setNumber('0');
    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current =  Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current =  Operator.multiply;
    }
    const substractOperation = () => {
        setLastNumber();
        lastOperation.current =  Operator.substract;
    }
    const addOperation = () => {
        setLastNumber();
        lastOperation.current =  Operator.add;
    }


    //Realizar calculo
    const calculateResult = () => {

        const result = calculateSubResult();

        setFormula(`${result}`);

        lastOperation.current = undefined;

     
        //establecemos a 0 
        setPreviusNumber('0');

    }

    const calculateSubResult =():number => {
         //Transofmramos los trings a numeros
         const [ firstValue, operation, secondValue ] = formula.split(' ');
        
         const num1 = Number(firstValue);
         const num2 = Number(secondValue);

         if(isNaN(num2)) return num1;

         //Swicth para los casos de operaciones. eevaluamos el lastoperation.current
         switch( operation ) {
 
             //Caso para sumar
             case Operator.add:
                 return  num1 + num2 ;
                 //break;
 
             //Caso para restar                
             case Operator.substract:
                 return num1 - num2 ;
                 //break;
 
             //Caso parta multiplicar
             case Operator.multiply:
                 return num1 * num2 ;
                 //break;
 
             //Caso para dividir
             case Operator.divide:
                 return num1 / num2;
                 //break;
             
             //si hay algo que no hemos implementado
             default:
                 throw new Error('Operación no implementada');
 
         }
    }





    return {
        //props
        number,
        previusNumber,
        formula,

        //methods
        buildNumber,
        clean,
        deleteOperation,
        toggleSign,
        divideOperation,
        multiplyOperation,
        substractOperation,
        addOperation,
        calculateResult
  }
}
