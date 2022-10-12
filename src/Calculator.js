import { useState } from 'react'
import './index.css'

const optionCalculation = [
    "%","√","C","x",
    7,8,9,"/",
    4,5,6,"+",
    1,2,3,"-",
    "@",0,".", "="
   ]


const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (number) => number.toString().replace(/\s/g, "");

function Calculator() {
   let [count, setCount] = useState({
    number : 0,
    result: 0,
    sign : ""
   })

   
   const numberClickHandler = (e) => {
       e.preventDefault();
       const number = e.target.innerHTML;

        if(removeSpaces(count.number).length < 16) {
            setCount({
                ...count, 
                number :
                count.number === 0 && number === "0" ? "0" :
                count.number % 1 === 0 ? toLocaleString(Number(count.number+ number)) :
                toLocaleString(count.number + number),
                result : !count.sign ? 0 : count.result, 
                })
        }     
   }


   const commaClickHandler = (e) => {
      e.preventDefault()
      const comma = e.target.innerHTML 

      setCount({
        ...count,
        number : !count.number.toString().includes(".") ? count.number + comma : count.number,
      });
   };

   const signClickHandler = (e) => {
    e.preventDefault()
    const valueSign = e.target.innerHTML;

    setCount({
        ...count,
        sign: valueSign,
        result : !count.result && count.number ? count.number : count.result,
        number : 0,
    })
   }
 
   const equalsClickHandler = () => {
     if (count.sign && count.number) {
        const math = (a, b, sign) =>
            sign === "+" ? a + b :
            sign === "-" ? a - b :
            sign === "x" ? a * b :
            a / b;
        
        setCount({
            ...count,
            result:
                count.number === "0" && count.sign === "/" ? "Can't divide with 0" :
                toLocaleString(math(Number(removeSpaces(count.result)), Number(removeSpaces(count.number)), count.sign)),
            sign : "",
            number: 0,
        });
     }
   }

   const percenClickHandler = () => {
    let number = count.number ? parseFloat(removeSpaces(count.number)) : 0;
    let result = count.result ? parseFloat(removeSpaces(count.result)) : 0;
  
    setCount({
      ...count,
      number: (number /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      sign: "",
    });
  };

    const clearClickHandler = () => {
        setCount({
        ...count,
        number:0,
        sign:"",
        result:0,
        });
    };


   const button = optionCalculation.map((item, i) => 
      <button 
       key={i} 
       value={item} 
       onClick={
        item === "C" ? clearClickHandler :
        item === "." ? commaClickHandler :
        item === "+" || item === "-" || item === "x" || item === "/" ? signClickHandler:
        item === "=" ? equalsClickHandler :
        item === "%" ? percenClickHandler:
        numberClickHandler
      }>{item}</button>
   )

   return (
       <>
            <div className="calculation-body">
                <h1>Calculator App</h1>
                <h1 className="bar-count">{count.number ? count.number : count.result}</h1>
                {button}
            </div>
       </>
   )
}

export default Calculator;