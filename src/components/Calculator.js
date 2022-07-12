import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCalculator } from "../Api";

const Calculator = (props) => {
  const {
    num1,
    setNum1,
    num2,
    setNum2,
    operation,
    setOperation,
    message,
    setMessage
  } = props;


  const updateVal = (value) => {
    setMessage("");
    if (operation === "") {
      if (num1 === "") {
        if (value !== ".") setNum1(num1 + value);
      } else {
        if (!num1.includes(".")) setNum1(num1 + value);
        else if (value !== ".") setNum1(num1 + value);
      }
    } else {
      if (num2 === "") {
        if (value !== ".") setNum2(num2 + value);
      } else {
        if (!num2.includes(".")) setNum2(num2 + value);
        else if (value !== ".") setNum2(num2 + value);
      }
    }
  };

  const updateOperation = (value) => {
    setMessage("");
    if (num1 !== "") {
      if (operation.length === 0){
        if(num1.substr(-1) !== ".") setOperation(value);
      } 
    }
  };

  const cleanDisplay = () => {
    setNum1("");
    setNum2("");
    setOperation("");
    setMessage("");
  };

  const fetchResult = async () => {
    setMessage("");
    if(operation === "/" && num2 ==="0"){
      setMessage("No es posible dividir por 0.")
      setNum1("");
      setNum2("");
      setOperation("");
    }else{
      try {
        if (num1 !== "" && num2 !== "" && operation !== "") {
          if (operation === "+") {
            const data = await fetchCalculator(num1, num2, "suma");
            setNum1(data.toString());
            setNum2("");
            setOperation("");
            
          } else {
            const data = await fetchCalculator(num1, num2, operation);
            setNum1(data.toString());
            setNum2("");
            setOperation("");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const digitos = () => {
    const botones = [];
    for (let i = 1; i < 10; i++) {
      botones.push(
        <Button variant="dark" key={i} onClick={() => updateVal(i.toString())}>
          {i}
        </Button>
      );
    }
    return botones;
  };

  return (
    <>
    <div class ="container">

    {message ? <div class="mensaje">{message}</div> : ""}

      <div class="calculadora">
        <div class="superior">
          
          <div class="pantalla">
            {num1}{operation}
            {num2}
          </div>
          <Button variant="warning" onClick={() => cleanDisplay()}>
            C
          </Button>
        </div>

        <div class="calculadora-botones">
          <div class="numeros">
            {digitos()}
            <Button variant="dark" onClick={() => updateVal(".")}>
              .
            </Button>
            <Button variant="dark" onClick={() => updateVal("0")}>
              0
            </Button>
            <Button variant="dark" onClick={() => fetchResult()}>
              =
            </Button>
          </div>

          <div class="operadores">
            <Button variant="secondary" onClick={() => updateOperation("+")}>
              +
            </Button>
            <Button variant="secondary" onClick={() => updateOperation("-")}>
              -
            </Button>
            <Button variant="secondary" onClick={() => updateOperation("*")}>
              &times;
            </Button>
            <Button variant="secondary" onClick={() => updateOperation("/")}>
              &divide;
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Calculator;
